"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Entry gate: a field of drifting monochrome data. Somewhere in it sits the
// string PROJECT 32, which glints in signal blue every 3.2s. Clicking it
// (or tabbing to it and pressing Enter) locks a hairline across the screen
// and collapses the whole field into that line, revealing the site.
//
// Shown once per tab session. The inline script in app/layout.tsx adds
// `p32-gated` to <html> before paint when the session has not entered yet;
// CSS only displays the gate under that class, so without JS (or without
// sessionStorage) the site is simply open. While gated, page animations are
// paused, so the hero film starts as the gate opens rather than behind it.

const STORAGE_KEY = "p32-entered";
const TARGET = "PROJECT 32";
const DECOYS = ["PROJECT 31", "PROJECT 23", "OBJECT 32", "PROJECT_32", "PROJECT 3"];
// Approved by the client (October 2026): the field reads as P32's own
// vocabulary, mixed with live coordinates and codes for texture.
const KEYWORDS = [
  "defense technology", "operational challenge", "technology scouting", "deep tech",
  "mission deconstruction", "custom development", "systems integration", "orchestration",
  "holistic solution", "defense architecture", "physical protection", "cyber intelligence",
  "security survey", "risk assessment", "executive protection", "secure transportation",
  "trusted executor", "no conflict of interest", "success & impact", "serving those who serve",
  "tel aviv", "israel",
];

// `target` is the index of the PROJECT 32 button on this row, or null.
type Row = { before: string; after: string; target: number | null; drift: number; tone: number };

function rand(n: number) {
  return Math.floor(Math.random() * n);
}

function token() {
  const r = Math.random();
  if (r < 0.16) return rand(0xffff).toString(16).padStart(4, "0");
  if (r < 0.26) return `0x${rand(0xfff).toString(16).toUpperCase().padStart(3, "0")}`;
  if (r < 0.34) return `${Math.random() < 0.5 ? "31" : "32"}.${String(rand(10000)).padStart(4, "0")} N`;
  if (r < 0.39) return `34.${String(rand(10000)).padStart(4, "0")} E`;
  if (r < 0.43) return "::";
  if (r < 0.47) return DECOYS[rand(DECOYS.length)];
  return KEYWORDS[rand(KEYWORDS.length)];
}

function line(chars: number) {
  let s = "";
  while (s.length < chars) s += token() + (Math.random() < 0.2 ? "    " : "  ");
  return s;
}

function buildField(): Row[] {
  const charW = window.innerWidth < 640 ? 6.6 : 7.2;
  const lineH = window.innerWidth < 640 ? 18 : 20;
  // Sized to the whole screen, not the window, so resizing never uncovers
  // an empty edge.
  const cols = Math.ceil((Math.max(window.innerWidth, screen.width) / charW) * 1.5);
  const count = Math.ceil(Math.max(window.innerHeight, screen.height) / lineH) + 1;
  // Several targets, one per horizontal band of the visible screen (kept off
  // the top and bottom edges), each at a random column within what is
  // visible at the row's starting drift offset.
  const targets = window.innerWidth < 640 ? 3 : 4;
  const visibleRows = Math.floor(window.innerHeight / lineH);
  const visible = Math.floor(window.innerWidth / charW);
  const targetRows = Array.from({ length: targets }, (_, t) => {
    const band = 0.7 / targets;
    return Math.floor(visibleRows * (0.12 + band * t + Math.random() * band * 0.8));
  });
  return Array.from({ length: count }, (_, i) => {
    const drift = (i % 2 ? 1 : -1) * (70 + rand(60));
    const t = targetRows.indexOf(i);
    if (t === -1) return { before: line(cols), after: "", target: null, drift, tone: rand(3) };
    // Target rows only sway a little (see .intro-row[data-target]) so they stay in reach.
    const col = Math.floor(visible * (0.08 + Math.random() * 0.62));
    return { before: line(col).slice(0, col) + "  ", after: "  " + line(cols - col), target: t, drift: 40, tone: 0 };
  });
}

// Live numbers: coordinates and hex values are wrapped in spans that an
// interval rewrites in place (whole value at a time, same width, so lines
// never jitter). Coordinates creep like a tracking feed; hex refreshes.
const LIVE = /(\d{2}\.\d{4} [NE]|0x[0-9A-F]{3}|\b[0-9a-f]{4}\b)/;

function Live({ text }: { text: string }) {
  return text.split(LIVE).map((part, i) => (i % 2 ? <span key={i} className="intro-num">{part}</span> : part));
}

function tick(value: string) {
  if (value.startsWith("0x")) return `0x${rand(0xfff).toString(16).toUpperCase().padStart(3, "0")}`;
  if (value.length === 4) return rand(0xffff).toString(16).padStart(4, "0");
  const next = Math.min(Math.max(parseFloat(value) + (Math.random() - 0.5) * 0.008, 31), 34.9999);
  return `${next.toFixed(4)}${value.slice(-2)}`;
}

// Read once per page load: whether the before-paint script gated this
// session, and the field built for this viewport. Module-level so they are
// stable across renders; read through useSyncExternalStore so the server
// render (gate shell, no field) hydrates cleanly.
let gatedAtLoad: boolean | undefined;
let field: Row[] | undefined;
const noSubscribe = () => () => {};

export function IntroGate() {
  const gated = useSyncExternalStore(
    noSubscribe,
    () => (gatedAtLoad ??= document.documentElement.classList.contains("p32-gated")),
    () => true
  );
  const rows = useSyncExternalStore(
    noSubscribe,
    () => (gated ? (field ??= buildField()) : undefined),
    () => undefined
  );
  const [phase, setPhase] = useState<"idle" | "lock" | "open" | "done">("idle");
  const [lineY, setLineY] = useState(0);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fieldRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nums = Array.from(el.querySelectorAll<HTMLElement>(".intro-num"));
    const perTick = Math.ceil(nums.length * 0.04);
    const id = window.setInterval(() => {
      for (let i = 0; i < perTick; i++) {
        const n = nums[rand(nums.length)];
        n.textContent = tick(n.textContent ?? "");
      }
    }, 80);
    return () => window.clearInterval(id);
  }, [rows]);

  function enter(event: React.MouseEvent<HTMLButtonElement>) {
    if (phase !== "idle") return;
    // Mark the clicked target so its row stays lit while the rest fade.
    event.currentTarget.dataset.hit = "";
    const rect = event.currentTarget.getBoundingClientRect();
    const y = rect.top + rect.height / 2;
    setLineY(y);
    setPhase("lock");
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      setPhase("open");
      // Release the page as the field collapses, so the hero film starts
      // while the gate is still closing over it.
      document.documentElement.classList.remove("p32-gated");
    }, reduced ? 0 : 650);
    window.setTimeout(() => setPhase("done"), reduced ? 0 : 1500);
  }

  if (!gated || phase === "done") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="P32 entry"
      className="intro-gate"
      data-phase={phase}
      style={{ "--lock-y": `${lineY}px` } as React.CSSProperties}
    >
      {rows && (
        <div ref={fieldRef} className="intro-field" aria-hidden={phase !== "idle" ? true : undefined}>
          {rows.map((row, i) => (
            <div
              key={i}
              className="intro-row"
              data-tone={row.tone}
              data-target={row.target !== null || undefined}
              style={{ animationDuration: `${Math.abs(row.drift)}s`, animationDirection: row.drift > 0 ? "normal" : "reverse" }}
            >
              <span aria-hidden="true"><Live text={row.before} /></span>
              {row.target !== null && (
                <>
                  <button
                    type="button"
                    className="intro-target"
                    onClick={enter}
                    aria-label="Enter the P32 site"
                    // Stagger the glints so the targets light up in turn.
                    style={{ animationDelay: `${1.2 + row.target * 0.8}s` }}
                  >
                    {TARGET}
                  </button>
                  <span aria-hidden="true"><Live text={row.after} /></span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="intro-lock" aria-hidden="true" />
      <p className="intro-hint" aria-hidden="true">
        <span className="intro-hint-dot" />
        Locate the signal to enter
      </p>
    </div>
  );
}

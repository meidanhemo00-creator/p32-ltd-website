"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { P32LogoOnDark } from "./Logo";

const links = [["#approach", "Our approach"], ["#how-we-work", "How we work"], ["#team", "The team"], ["#contact", "Contact"]];

export function Nav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    }
    function onResize() { if (window.innerWidth >= 1024) setOpen(false); }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("keydown", onKeyDown); window.removeEventListener("resize", onResize); };
  }, [open]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/90 text-p32-white backdrop-blur-xl">
      <div className="p32-container flex h-20 items-center justify-between gap-5">
        <Link href="#top" prefetch={false} aria-label="P32, back to top" onClick={() => setOpen(false)} className="shrink-0 py-3">
          <P32LogoOnDark height={22} priority />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map(([href, label]) => <Link key={href} href={href} prefetch={false} className="p32-press py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-p32-gray-300 transition-colors hover:text-p32-signal">{label}</Link>)}
        </nav>
        <button ref={menuButton} type="button" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)} className="flex min-h-11 items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] lg:hidden">
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="relative block h-4 w-5">
            <span className={`absolute top-1 left-0 h-px w-5 bg-p32-signal transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`absolute top-3 left-0 h-px w-5 bg-p32-signal transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      <nav id={menuId} aria-label="Mobile primary" className={`${open ? "block" : "hidden"} max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-white/10 bg-p32-black px-6 py-3 lg:hidden`}>
        {links.map(([href, label], i) => <Link key={href} href={href} prefetch={false} onClick={() => setOpen(false)} className="flex min-h-14 items-center gap-5 border-b border-p32-gray-800 py-4 font-mono text-sm uppercase tracking-[0.08em] text-p32-white last:border-0 hover:text-p32-signal"><span aria-hidden="true" className="text-[10px] text-p32-signal">{String(i + 1).padStart(2, "0")}</span>{label}</Link>)}
      </nav>
    </header>
  );
}

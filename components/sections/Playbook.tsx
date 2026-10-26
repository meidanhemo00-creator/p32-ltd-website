"use client";

import type { CSSProperties } from "react";
import { useId, useState } from "react";
import { playbook } from "@/lib/content";
import { NasaPhoto } from "@/components/media/NasaPhoto";
import { splitWords } from "@/lib/splitWords";

// Editorial split: the four steps as a large typographic list on the left,
// the active step's photograph on the right (inside the open step on
// phones), shown clean -- no text laid
// over it, only a small step counter. Each title is said once; the active
// step opens in place (statement, then detail) and the others stay one line
// tall, so the list reads as a table of contents. Click/Enter to switch, not
// hover: opening a row moves the rows below it, which must not happen under
// a passing cursor.
const STEP_PHOTOS = [
  {
    // Real, unstaged workshop photograph (NASA public domain, see
    // ASSET_CREDITS.md): an engineering technician at a milling machine --
    // hands-on breakdown of a problem into parts. No logos in frame.
    src: "/media/nasa/optimized/fabrication-shop-milling.webp",
    alt: "An engineering technician operating a milling machine in a fabrication workshop",
    objectPosition: "62% 40%",
  },
  {
    src: "/media/nasa/optimized/blue-marble-earth.webp",
    alt: "Blue Marble composite of Earth's full disc, land and cloud cover (NASA)",
    objectPosition: "48% 22%",
  },
  {
    src: "/media/nasa/optimized/city-lights-lucknow.webp",
    alt: "Satellite view of dense urban infrastructure and lights, Lucknow (NASA)",
    objectPosition: "center",
  },
  {
    src: "/media/nasa/optimized/black-marble-earth-at-night.webp",
    alt: "Satellite composite of Earth's city lights at night (NASA Black Marble)",
    objectPosition: "58% 38%",
  },
];

export function Playbook() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const total = String(playbook.length).padStart(2, "0");

  // White, continuing the Approach section above it with no break; its
  // bottom padding already separates them, so this one starts close.
  return (
    <section className="p32-section tx-grain-light bg-p32-white text-p32-black" id="playbook" style={{ paddingTop: "1rem" }}>
      <div className="p32-container">
        <div>
          <h2
            data-reveal="words"
            className="font-display text-4xl font-medium uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {splitWords("The Playbook")}
          </h2>
        </div>

        <div className="mt-10 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
          <div
            data-reveal="image"
            className="relative hidden overflow-hidden bg-p32-gray-100 lg:order-2 lg:col-span-7 lg:block lg:min-h-[34.5rem]"
          >
            {STEP_PHOTOS.map((photo, i) => (
              <div
                key={photo.src}
                aria-hidden={active !== i}
                className="playbook-photo absolute inset-0"
                data-active={active === i || undefined}
              >
                <NasaPhoto
                  src={photo.src}
                  alt={photo.alt}
                  objectPosition={photo.objectPosition}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  gradient="180deg, rgba(0,0,0,0) 62%, rgba(0,0,0,0.5) 100%"
                  contrast={1.08}
                />
              </div>
            ))}
            <p
              aria-hidden="true"
              className="absolute bottom-4 left-4 font-mono text-xs tracking-[0.16em] text-p32-white md:bottom-6 md:left-6"
            >
              <span className="text-p32-signal">{playbook[active].index}</span>
              <span className="text-p32-gray-300"> / {total}</span>
            </p>
          </div>

          {/* Stretches to the photo's height, closing on its own bottom rule so
              both columns end on one line whichever step is open. */}
          <ol className="border-b border-p32-gray-300 lg:order-1 lg:col-span-5">
            {playbook.map((step, i) => {
              const isActive = active === i;
              const panelId = `${baseId}-panel-${i}`;
              return (
                <li
                  key={step.index}
                  data-reveal="up"
                  style={{ "--reveal-index": i } as CSSProperties}
                  className="playbook-step relative border-t border-p32-gray-300"
                  data-active={isActive || undefined}
                >
                  <span aria-hidden="true" className="playbook-step-rule absolute inset-x-0 -top-px h-px bg-p32-signal-deep" />
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActive(i)}
                      className="group flex w-full items-baseline gap-5 py-5 text-left md:py-6"
                    >
                      <span
                        className={`font-mono text-xs tracking-[0.14em] transition-colors duration-300 md:text-sm ${
                          isActive ? "text-p32-signal-deep" : "text-p32-gray-500"
                        }`}
                      >
                        {step.index}
                      </span>
                      <span
                        className={`flex-1 text-balance text-2xl font-medium leading-tight tracking-tight transition-colors duration-300 md:text-3xl ${
                          isActive ? "text-p32-black" : "text-p32-gray-500 group-hover:text-p32-gray-700"
                        }`}
                      >
                        {/* Keep "&" on the first line, never leading the second. */}
                        {step.title.replace(" & ", "\u00a0& ")}
                      </span>
                      <span aria-hidden="true" className="playbook-toggle relative mt-2 h-3 w-3 shrink-0 text-p32-gray-500" />
                    </button>
                  </h3>
                  <div id={panelId} className="playbook-panel" inert={!isActive}>
                    <div className="overflow-hidden">
                      <div className="pb-7 pl-[calc(1.25rem+2ch)] md:pb-8">
                        <p className="text-pretty text-lg leading-snug text-p32-black md:text-xl">{step.statement}</p>
                        <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-p32-gray-600 md:text-base">
                          {step.expanded}
                        </p>
                      </div>
                      {/* Phones: the photo opens with its step, so a change
                          is always on screen (the desktop stage is hidden). */}
                      {/* The world maps carry a ragged polar edge at their
                          full height; a slight zoom keeps it out of frame. */}
                      <div className="relative mb-7 aspect-[4/3] overflow-hidden bg-p32-gray-100 lg:hidden [&_img]:scale-[1.15]">
                        <NasaPhoto
                          src={STEP_PHOTOS[i].src}
                          alt={STEP_PHOTOS[i].alt}
                          objectPosition={STEP_PHOTOS[i].objectPosition}
                          sizes="100vw"
                          gradient="180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,0.3) 100%"
                          contrast={1.08}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

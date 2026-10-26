import type { CSSProperties } from "react";
import { gap } from "@/lib/content";
import { splitWords } from "@/lib/splitWords";

// Typographic, not pictorial: the three pressures set as an editorial index,
// each statement said once. Every row sits under a hairline with a literal
// gap in it; when the row reaches the viewport the two halves draw together
// once (see .gap-rule in globals.css) -- the section's subject, closed by the
// firm that follows it. No imagery, so the image-led Playbook reads as the
// contrast beat.
export function Gap() {
  return (
    <section className="p32-section bg-p32-black text-p32-white">
      <div className="p32-container">
        <div className="grid gap-5 md:grid-cols-12 md:gap-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-p32-signal md:col-span-3 md:pt-3 md:text-sm">
            {gap.label}
          </p>
          <h2
            data-reveal="words"
            className="max-w-4xl text-balance font-display text-3xl font-medium uppercase leading-[1.08] tracking-tight sm:text-5xl md:col-span-9 lg:text-6xl"
          >
            {splitWords(gap.headline)}
          </h2>
        </div>

        <ol className="mt-12 border-b border-p32-gray-700 md:mt-20">
          {gap.points.map((point, i) => (
            <li
              key={point.statement}
              data-reveal="gap"
              style={{ "--reveal-index": i } as CSSProperties}
              className="gap-row group relative grid gap-3 pt-6 pb-10 md:grid-cols-12 md:gap-10 md:pt-8 md:pb-14"
            >
              <span aria-hidden="true" className="gap-rule absolute inset-x-0 top-0 flex">
                <span className="gap-rule-left" />
                <span className="gap-rule-right" />
              </span>
              {/* Set at the statement's size so the index carries the left
                  column instead of leaving it empty. */}
              <span
                aria-hidden="true"
                className="font-mono text-xl leading-[1.15] text-p32-gray-700 transition-colors duration-300 group-hover:text-p32-signal sm:text-2xl md:col-span-3 lg:text-[2rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-balance text-xl font-medium leading-[1.15] tracking-[-0.01em] sm:text-2xl md:col-span-5 lg:text-[2rem]">
                {point.statement}
              </p>
              <p className="max-w-md text-pretty text-base leading-relaxed text-p32-gray-300 md:col-span-4 md:pt-1 md:text-lg">
                {/* Glue each " - " dash to the word before it, so no line starts on one. */}
                {point.context.replaceAll(" - ", "\u00a0- ")}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import type { CSSProperties } from "react";
import { physicalProtection, contact } from "@/lib/content";
import { splitWords } from "@/lib/splitWords";

export function PhysicalProtection() {
  const content = physicalProtection;
  return (
    <section id="physical-protection" aria-labelledby="physical-title" className="p32-section tx-grain-light bg-p32-white text-p32-black">
      <div className="p32-container relative z-[2]">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p data-reveal="up" className="font-mono text-xs uppercase tracking-[0.18em] text-p32-signal-deep sm:text-sm">{content.label}</p>
          <h2 id="physical-title" data-reveal="words" className="mt-6 max-w-4xl text-balance font-display text-3xl font-medium uppercase leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">{splitWords(content.headline)}</h2>
          <p data-reveal="up" className="mt-7 max-w-3xl text-pretty text-base leading-relaxed text-p32-gray-700 sm:text-lg md:mt-9 md:text-xl">{content.intro}</p>
        </div>
        <ol aria-label="Physical security program lifecycle" data-reveal="up" className="mx-auto mt-10 grid max-w-4xl grid-cols-2 border-y border-p32-gray-300 sm:mt-14 sm:grid-cols-4">
          {content.stages.map((stage, i) => (
            <li key={stage} className="flex items-center justify-center gap-3 border-p32-gray-300 px-3 py-5 odd:border-r sm:mt-0 sm:border-r sm:last:border-r-0 md:py-7">
              <span className="font-mono text-[10px] text-p32-signal-deep">0{i + 1}</span>
              <span className="font-mono text-xs uppercase tracking-[0.1em] sm:text-sm">{stage}</span>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid gap-x-14 md:mt-16 lg:grid-cols-2">
          {content.services.map((service, i) => (
            <details key={service.title} data-reveal="up" style={{ "--reveal-index": i % 2 } as CSSProperties} className="physical-service group border-t border-p32-gray-300">
              <summary className="flex min-h-24 cursor-pointer list-none items-center gap-4 py-6 md:gap-5">
                <span aria-hidden="true" className="self-start pt-1 font-mono text-[11px] text-p32-signal-deep">0{i + 1}</span>
                <h3 className="flex-1 text-lg font-medium leading-snug tracking-tight sm:text-xl">{service.title}</h3>
                <span aria-hidden="true" className="physical-toggle relative ml-2 block size-6 shrink-0 text-p32-signal-deep" />
              </summary>
              <p className="max-w-[58ch] pb-7 pl-8 pr-9 text-base leading-relaxed text-p32-gray-700 md:pl-9">{service.detail}</p>
            </details>
          ))}
        </div>
        <div data-reveal="up" className="mt-10 flex flex-col items-center gap-7 border-t border-p32-gray-300 pt-10 text-center md:mt-14 md:pt-12">
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-p32-gray-700 md:text-xl">{content.closing}</p>
          <a href={contact.emailHref} className="p32-press inline-flex min-h-12 items-center justify-center gap-6 bg-p32-black px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-p32-white transition-colors hover:bg-p32-gray-700">Discuss your security needs <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

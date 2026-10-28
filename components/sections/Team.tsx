import type { CSSProperties } from "react";
import Image from "next/image";
import { team } from "@/lib/content";
import { assetPath } from "@/lib/basePath";
import { splitWords } from "@/lib/splitWords";
import { Personnel } from "@/components/sections/Personnel";

// The client's own approved photograph -- real, unstaged, cinematic
// black-and-white. No people/weapons/insignia/effects are added. Alt text
// describes only what is visible, and no claim about the identity, unit, or
// employment of the people photographed is made anywhere on the page.
//
// One section, titled The Team: headline, photograph, copy, the people as a
// single register, then a closing line into Contact. The photograph is a
// supporting introduction, not the section's subject: a controlled editorial frame (~85%
// of the content width, 240-330px tall on mobile, 380-480px on desktop)
// instead of a full-bleed viewport-height image. The source is 3:2 with the
// group's helmets at ~18% from the top; `center 28%` keeps every head and
// torso inside the wider frame and trims only legs and empty ground.

export function Team() {
  return (
    <section id="team" className="relative bg-p32-black pt-14 pb-16 text-p32-white md:pt-20 md:pb-24">
      <div className="p32-container flex flex-col items-center text-center">
        <h2
          data-reveal="words"
          className="font-display text-4xl font-medium uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {splitWords(team.title)}
        </h2>
        <p
          data-reveal="up"
          className="mt-5 max-w-2xl text-balance text-xl leading-snug text-p32-gray-300 md:mt-6 md:text-2xl"
        >
          {/* Each sentence on its own line. */}
          {team.headline.split(/(?<=\.)\s+/).map((sentence) => (
            <span key={sentence} className="block">
              {sentence}
            </span>
          ))}
        </p>
      </div>

      <div className="p32-container mt-8 md:mt-12">
        <div
          data-reveal="up"
          className="relative mx-auto h-[clamp(240px,72vw,330px)] w-full max-w-6xl overflow-hidden md:h-[clamp(380px,40vw,480px)] md:w-[86%]"
        >
          <Image
            src={assetPath("/media/team/optimized/team-desert-silhouettes.webp")}
            alt="Silhouetted figures in tactical gear walking across desert terrain at low sun"
            fill
            sizes="(min-width: 768px) 86vw, 100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 28%",
              filter: "grayscale(1) contrast(1.1) brightness(0.92)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.28) 100%)",
            }}
          />
        </div>
        <p
          data-reveal="up"
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-p32-gray-300 sm:text-xl md:mt-8"
        >
          {team.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      <Personnel />

      {/* The motto, SERVE², set alone between hairlines before the close. */}
      <div className="p32-container mt-20 md:mt-28">
        <p
          data-reveal="up"
          className="border-y border-p32-gray-800 py-10 text-center font-display text-2xl font-medium tracking-tight text-p32-white sm:text-4xl md:py-14"
          style={{ textWrap: "balance" }}
        >
          {team.motto}
          <sup className="ml-[0.04em] text-[0.55em] text-p32-signal">2</sup>
        </p>
      </div>

      <div className="p32-container mt-16 flex flex-col items-center text-center md:mt-20">
        <p
          data-reveal="up"
          className="max-w-3xl text-balance font-display text-2xl font-medium uppercase leading-[1.15] tracking-tight sm:text-4xl"
        >
          <span className="block text-balance">{team.closing[0]}</span>
          <span className="block text-balance text-p32-gray-300">{team.closing[1]}</span>
        </p>
        <a
          href="#contact"
          data-reveal="up"
          style={{ "--reveal-index": 1 } as CSSProperties}
          className="team-cta p32-press mt-8 inline-flex items-center gap-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-p32-signal md:mt-10 md:text-sm"
        >
          {team.cta}
          <span aria-hidden="true" className="team-cta-rule" />
        </a>
      </div>
    </section>
  );
}

import type { CSSProperties } from "react";
import { P32Logo } from "@/components/Logo";
import { uniqueness } from "@/lib/content";
import { splitWords } from "@/lib/splitWords";

function Headline() {
  const [before, after] = uniqueness.headline.split("P32");
  const logoIndex = before.trim().split(" ").filter(Boolean).length;
  return (
    <h2
      data-reveal="words"
      className="max-w-4xl text-balance font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
    >
      {splitWords(before)}{" "}
      <span
        className="word-reveal inline-flex items-center align-baseline"
        style={{ "--word-index": logoIndex } as CSSProperties}
      >
        <P32Logo height={34} className="ml-[0.08em] inline-block h-[0.62em] w-auto -translate-y-[0.04em]" />
      </span>{" "}
      {splitWords(after, logoIndex + 1)}
    </h2>
  );
}

// The lifecycle as one resolved line with a node per stage: horizontal from
// sm up (labels centered under their nodes), vertical on phones, where four
// columns would crush the long third label.
function LifecycleTrace() {
  return (
    <ol data-reveal="scale" className="relative mx-auto mt-10 grid w-fit max-w-[17rem] gap-6 sm:w-full sm:max-w-4xl sm:grid-cols-4 sm:gap-6 md:mt-24">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[4px] w-[1.5px] bg-p32-signal-deep sm:top-[4px] sm:right-[12.5%] sm:bottom-auto sm:left-[12.5%] sm:h-[1.5px] sm:w-auto" />
      {uniqueness.lifecycle.map((stage) => (
        <li key={stage} className="relative flex items-start gap-4 text-left sm:flex-col sm:items-center sm:gap-4 sm:text-center">
          <span aria-hidden="true" className="relative mt-1 h-[10px] w-[10px] shrink-0 rounded-full border-[1.5px] border-p32-signal-deep bg-p32-black sm:mt-0" />
          <span className="text-balance font-mono text-sm leading-snug text-p32-gray-600">
            {/* Keep "of a Holistic" together so "of a" never ends a line. */}
            {stage.replace("of a Holistic", "of\u00a0a\u00a0Holistic")}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function Uniqueness() {
  return (
    <section id="approach" className="p32-section tx-grain-light bg-p32-white text-p32-black">
      <div className="p32-container flex flex-col items-center text-center">
        <Headline />
        <p
          data-reveal="up"
          // Inline: the sitewide p { text-wrap: pretty } rule outranks the utility.
          style={{ textWrap: "balance" }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-p32-gray-700 sm:text-lg md:mt-10 md:text-xl"
        >
          {/* Glue each " - " dash to the word before it, so no line starts on one. */}
          {uniqueness.body.replaceAll(" - ", "\u00a0- ")}
        </p>
        <LifecycleTrace />
      </div>
    </section>
  );
}

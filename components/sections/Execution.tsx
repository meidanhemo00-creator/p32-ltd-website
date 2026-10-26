import { execution } from "@/lib/content";
import { splitWords } from "@/lib/splitWords";

// A standalone statement band between The Playbook and Physical Protection:
// its own soft gray ground marks it as a separate beat without the jolt of a
// full-screen dark interruption, and it is centered like the site's other
// statement sections. Typography only.
export function Execution() {
  return (
    <section className="bg-p32-gray-050 py-20 text-p32-black md:py-32">
      <div className="p32-container flex flex-col items-center text-center">
        <span aria-hidden="true" className="mb-8 h-px w-16 bg-p32-gray-300 md:mb-12" />
        <h2
          data-reveal="words"
          className="max-w-4xl text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
        >
          <span className="block">{splitWords(execution.lineOne)}</span>
          <span className="mt-2 block text-p32-gray-500 md:mt-3">
            {splitWords(execution.lineTwo, execution.lineOne.split(" ").filter(Boolean).length)}
          </span>
        </h2>
      </div>
    </section>
  );
}

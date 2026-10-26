import { execution } from "@/lib/content";
import { splitWords } from "@/lib/splitWords";

// The Playbook's closing statement, set on the same white ground and grid
// rather than as a full-screen dark interruption: one hairline, then the
// two lines as a single statement, the second in gray. Typography only.
export function Execution() {
  return (
    <section className="p32-section tx-grain-light bg-p32-white text-p32-black" style={{ paddingTop: 0 }}>
      <div className="p32-container">
        <div className="border-t border-p32-gray-300 pt-12 md:pt-20">
          <h2
            data-reveal="words"
            className="max-w-5xl text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="block">{splitWords(execution.lineOne)}</span>
            <span className="block text-p32-gray-500">
              {splitWords(execution.lineTwo, execution.lineOne.split(" ").filter(Boolean).length)}
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}

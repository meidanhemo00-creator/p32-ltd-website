import type { CSSProperties } from "react";
import Image from "next/image";
import { personnel, type Person } from "@/lib/content";
import { assetPath } from "@/lib/basePath";

// The whole team as one register: a single numbered grid, no group bands
// (the client asked for one list, October 2026). Everyone shares the same
// portrait size and type.
//
// Portraits: every file in /media/team/portraits was normalized once, offline,
// to the same square crop, head scale, grayscale tone curve, and (for the
// five studio cutouts from the team deck) the same neutral-gray backdrop, so
// all seven sit as one series. Hover/focus lifts them from a softer to a
// firmer monochrome and extends the pale-blue index rule; nothing is hidden
// behind hover -- names and roles are always visible, on every device.
function PersonEntry({ person, index }: { person: Person; index: number }) {
  return (
    <li data-reveal="up" style={{ "--reveal-index": index } as CSSProperties}>
      <figure
        tabIndex={0}
        aria-label={`${person.name}, ${person.roles.join(", ")}`}
        className="personnel-entry group grid grid-cols-[7rem_1fr] items-start gap-4 outline-none sm:block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-p32-signal"
      >
        <div className="relative aspect-square overflow-hidden bg-p32-gray-800">
          {person.portrait ? (
            <Image
              src={assetPath(`/media/team/portraits/${person.portrait}.webp`)}
              alt={`Portrait of ${person.name}`}
              fill
              sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 112px"
              className="personnel-portrait"
            />
          ) : (
            <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-mono text-2xl tracking-[0.12em] text-p32-gray-500 sm:text-4xl">
              {person.name.split(" ").map((part) => part[0]).join("")}
            </span>
          )}
        </div>
        <figcaption className="sm:mt-4">
          <span aria-hidden="true" className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.12em] text-p32-gray-500 transition-colors duration-300 group-hover:text-p32-signal group-focus-visible:text-p32-signal">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="personnel-rule h-px bg-p32-signal-deep" />
          </span>
          <span className="mt-3 block text-lg font-medium leading-tight tracking-tight text-p32-white sm:text-xl">
            {person.name}
          </span>
          <span className="mt-2 block space-y-0.5 text-sm leading-snug text-p32-gray-300">
            {person.roles.map((role) => (
              <span key={role} className="block">
                {role}
              </span>
            ))}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

export function Personnel() {
  return (
    <ul className="p32-container mt-14 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 md:mt-20 lg:grid-cols-4">
      {personnel.people.map((person, i) => (
        <PersonEntry key={person.name} person={person} index={i} />
      ))}
    </ul>
  );
}

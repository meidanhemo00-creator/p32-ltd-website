// P32 content from the approved brief, with the October 2026 client updates.
// Physical protection describes the supplied service scope in general terms.
// No client-specific operations or commercial terms are published.

export const vision = {
  headline: "DEFENSE SOLUTION ARCHITECTS that will make your MISSION POSSIBLE",
  body: "Trusted by nations and intelligence agencies around the globe to bridge the gap between complex operational needs and cutting-edge execution.",
};

// Superseded hierarchy/copy, supplied directly by the client to replace the
// original threefold-list presentation below. The `context` line per point
// is the one piece of copy on this page NOT supplied by the client -- it
// was written to satisfy an explicit "supporting context becomes visible"
// interaction requirement with nothing to elaborate with. It stays strictly
// a restatement of the pressure itself (no new P32 capability, client, or
// metric claims) and should be flagged for the client's review/replacement.
export const gap = {
  label: "THE GAP IN MODERN DEFENSE",
  headline: "THREE PRESSURES DEFINE THE MODERN OPERATIONAL GAP.",
  points: [
    {
      statement: "AN EVOLVING TECHNOLOGICAL LANDSCAPE.",
      context: "Requirements shift as fast as the technology does - yesterday's platform is rarely tomorrow's answer.",
    },
    {
      statement: "FRICTION BETWEEN DISPARATE SYSTEMS.",
      context: "Independently built systems rarely speak the same language, and integrating them after the fact costs time no mission can spare.",
    },
    {
      statement: "THE SECURITY RISK OF EXPOSING SENSITIVE NEEDS TO THE OPEN MARKET.",
      context: "Describing a sensitive requirement to the open market can itself become the exposure - the search for a solution becoming the vulnerability.",
    },
  ],
};

export const uniqueness = {
  headline: "As an objective & Trusted Executor, P32 operates without conflict of interest.",
  body: "We manage the entire lifecycle: from scouting and development - to integration - to ensure an unfair advantage in the field.",
  lifecycle: ["Scouting", "Development", "Integration"],
};

export const playbook = [
  {
    index: "01",
    title: "Mission Deconstruction",
    statement:
      "We don't just look at the problem; we reverse-engineer it to its core components.",
    expanded:
      "We break massive, seemingly impossible operational challenges down into distinct, solvable blocks. It is about understanding the 'what' and the 'how' at a granular level so that no detail is left to chance.",
  },
  {
    index: "02",
    title: "Technological Identification",
    statement:
      "Scanning the global landscape for Deep Tech and existing innovations that fit the gap.",
    expanded:
      "We continuously scout the global landscape - from defense innovations to cyber capabilities - to pinpoint the exact tools that match your specific mission gaps.",
  },
  {
    index: "03",
    title: "Custom Development",
    statement:
      "When the market falls short, we build. From AI architectures to specialized hardware.",
    expanded:
      "We shift from curators to creators, engineering purpose-built technologies from the ground up when existing solutions aren't enough.",
  },
  {
    index: "04",
    title: "Orchestration & Integration",
    statement:
      "Turning disparate systems into a single, unified, and frictionless organism.",
    expanded:
      "A pile of advanced technology is useless without synergy. We connect custom code, hardware, and sensors so they operate as one seamless, unified entity.",
  },
];

export const execution = {
  lineOne: "We deliver defense. We execute.",
  lineTwo: "From high-level architecture to the red button.",
};

export const team = {
  title: "The Team",
  headline: "The world sees the outcome. It almost never sees the people who built it.",
  bodyOne:
    "Our team combines elite operational command experience with decades of proven technological innovation.",
  bodyTwo:
    "We come from the units that faced these challenges, and we bring the track record of scaling ideas into successful war capabilities based on advanced technology.",
  // Closing line chosen by the client (October 2026), leading into Contact.
  closing: ["Some of our work can't be shown here.", "Let's talk about yours."],
  cta: "Get in touch",
};

export const contact = {
  address: "HaNechoshet 3, Tel Aviv",
  email: "info@p32.ltd",
  phone: "+972 3 653 0997",
  phoneHref: "tel:+97236530997",
  emailHref: "mailto:info@p32.ltd",
};

export const hero = {
  lineOne: "Deconstructing Challenges.",
  lineTwo: "Reconstructing Solutions.",
};

// Team members, shown as one list (the client asked for no group
// divisions, October 2026). Names and roles are the client's authoritative
// list from the September 2026 brief -- it supersedes the older names/titles
// printed in the source team deck (p32 (14).pdf). Roles are split on the
// client's own "|" separators so each part can set on its own line. No
// biographies were approved, so none are shown.
export type Person = {
  name: string;
  roles: string[];
  portrait: string;
};

export const personnel = {
  supportOne:
    "With a foundation built on expertise and innovation, our team of industry veterans and visionary engineers is dedicated to pushing the boundaries of defense technology.",
  supportTwo:
    "From artificial intelligence to cybersecurity, we explore every avenue to ensure our solutions are not just innovative, but also effective and reliable.",
  people: [
    { name: "Liron Farache", roles: ["CEO", "Director", "Co-Founder"], portrait: "liron-farache" },
    { name: "Boris Shaglov", roles: ["VP Business Development", "Director", "Co-Founder"], portrait: "boris-shaglov" },
    { name: "Daniel Goldberg", roles: ["COO", "Director", "Co-Founder"], portrait: "daniel-goldberg" },
    { name: "Guy Farache", roles: ["CGO, USA, Canada & Australia", "Co-Founder"], portrait: "guy-farache" },
    { name: "Boris Plis", roles: ["CTO", "Co-Founder"], portrait: "boris-plis" },
    { name: "Dana Toren", roles: ["VP Cyber Solutions"], portrait: "dana-toren" },
    { name: "Yuval Segev", roles: ["Senior Advisor, National-Level Cyber Strategy"], portrait: "yuval-segev" },
    { name: "Eran Mesika", roles: ["Head of Security & Regulation"], portrait: "eran-mesika" },
  ] satisfies Person[],
};

export const physicalProtection = {
  label: "Layered Physical Protection",
  headline: "From security survey to fully operational protection.",
  intro: "P32 designs, builds, and manages physical security programs around the people, places, and operations that matter. We begin with a comprehensive security survey and risk assessment, then translate the findings into a tailored operational framework - bringing together qualified personnel, security technologies, clear procedures, and ongoing oversight.",
  closing: "From executive and family protection to residential and corporate security, secure transportation, and emergency readiness, every layer works together under one coordinated plan.",
  stages: ["Assess", "Design", "Deploy", "Manage"],
  services: [
    { title: "Security Surveys & Risk Assessments", detail: "On-site assessments, vulnerability mapping, and prioritized recommendations. We evaluate existing measures, identify gaps, and define the protection your environment requires." },
    { title: "Security Program Design & Implementation", detail: "Security architecture, staffing plans, routine and emergency SOPs, and coordination of security systems. We turn assessment findings into an operational security program." },
    { title: "Executive & Family Protection", detail: "Discreet close protection tailored to daily routines and individual risk, supported by qualified personnel and clear contingency procedures." },
    { title: "Residential & Corporate Security", detail: "Facility protection, access control, surveillance, and mail and package screening, coordinated across homes, offices, and additional assets." },
    { title: "Secure Transportation & Travel Planning", detail: "Protective driving, route planning, vetted local security providers, and contingency arrangements for daily movements and international travel." },
    { title: "Operational Management & Readiness", detail: "Personnel vetting, training, supervision, emergency response planning, and periodic audits. Continuous review keeps the program aligned with changing risks and operational needs." },
  ],
};

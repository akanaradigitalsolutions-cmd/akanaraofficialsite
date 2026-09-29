export const site = {
  name: "AKANARA",
  legal: "CV Akanara Digital Solutions",
  tagline: "Digital craft for brands that deserve to be remembered.",
  email: "hello@akanara.studio",
  phone: "+62 812 0000 0000",
  whatsapp: "https://wa.me/6281200000000",
  instagram: "https://instagram.com/akanara",
  linkedin: "https://linkedin.com/company/akanara",
  address: "Jl. Raya Pererenan, Canggu — Bali, Indonesia",
};

export const clients = [
  "AMANKIRA",
  "SOORI",
  "RELAXHA",
  "POTATO HOUSE",
  "ULUWATU CLIFF",
  "DESA SENI",
  "NIHI",
  "COMO BEACH",
];

export const services = [
  {
    no: "01",
    title: "Web Design & Development",
    copy: "Editorial, motion-led websites engineered for speed. Every pixel considered, every millisecond measured.",
    points: ["Art direction", "Next-gen front-end", "CMS & editorial tooling"],
  },
  {
    no: "02",
    title: "Booking Engines & SaaS",
    copy: "Reservation systems, marketplaces and internal platforms that hold up under real operational load.",
    points: ["Booking engines", "Multi-property dashboards", "Payments & integrations"],
  },
  {
    no: "03",
    title: "Hospitality Marketing",
    copy: "Direct-booking strategy for resorts, spas and villas — less OTA dependency, more owned revenue.",
    points: ["Direct booking funnels", "Lifecycle email", "Revenue reporting"],
  },
  {
    no: "04",
    title: "Branding & Creative Direction",
    copy: "Identity systems with restraint: type, tone, texture and a visual language that travels.",
    points: ["Identity systems", "Photography direction", "Brand guidelines"],
  },
  {
    no: "05",
    title: "SEO, Ads & Social",
    copy: "Compounding visibility. Technical SEO, paid search and social built on one measurement spine.",
    points: ["Technical SEO", "Google Ads", "Social & content"],
  },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  accentFrom: string;
  accentTo: string;
};

export const projects: Project[] = [
  {
    slug: "relaxha",
    name: "Relaxha",
    category: "In-house SaaS · Spa booking engine",
    year: "2026",
    summary:
      "A wellness marketplace and booking engine connecting spas across Bali with guests who book in under sixty seconds.",
    challenge:
      "Independent spas were losing bookings to phone tag and marketplace commissions, with no shared inventory layer.",
    solution:
      "We built a multi-tenant booking engine with real-time therapist availability, deposits, and a consumer marketplace on top.",
    results: ["61% faster booking flow", "3.4x direct reservations", "120+ partner venues"],
    accentFrom: "oklch(0.672 0.116 45)",
    accentTo: "oklch(0.42 0.06 30)",
  },
  {
    slug: "amankira-retreat",
    name: "Amankira Retreat",
    category: "Website · Direct booking",
    year: "2025",
    summary:
      "A cliffside resort relaunch built around a single idea: arrival should begin on the homepage.",
    challenge:
      "A beautiful property represented by a slow, template site that sent 80% of bookings through OTAs.",
    solution:
      "Cinematic art direction, a rebuilt rate engine, and a booking flow tuned for mobile guests in transit.",
    results: ["+48% direct revenue", "1.2s LCP on mobile", "-31% OTA dependency"],
    accentFrom: "oklch(0.78 0.076 58)",
    accentTo: "oklch(0.35 0.03 60)",
  },
  {
    slug: "soori-villas",
    name: "Soori Villas",
    category: "Branding · Website",
    year: "2025",
    summary:
      "An identity system built from volcanic sand, black stone and a single warm light.",
    challenge: "Three sub-brands with no shared visual grammar and inconsistent guest expectation.",
    solution:
      "One typographic system, one photography direction, one modular site architecture across properties.",
    results: ["3 properties unified", "+27% enquiry rate", "Full brand toolkit"],
    accentFrom: "oklch(0.62 0.09 40)",
    accentTo: "oklch(0.3 0.02 50)",
  },
  {
    slug: "desa-seni",
    name: "Desa Seni",
    category: "Platform · Retreat operations",
    year: "2024",
    summary:
      "A retreat operations platform: programmes, cohorts, payments and guest comms in one place.",
    challenge: "Retreat programming ran on spreadsheets; every cohort meant manual reconciliation.",
    solution: "A scheduling and payments platform with guest portals and automated pre-arrival flows.",
    results: ["14h/week saved", "Zero double-bookings", "98% guest portal adoption"],
    accentFrom: "oklch(0.7 0.1 55)",
    accentTo: "oklch(0.33 0.04 40)",
  },
  {
    slug: "uluwatu-cliff",
    name: "Uluwatu Cliff Club",
    category: "Website · Events",
    year: "2024",
    summary: "A beach club presence with live event programming and table reservations.",
    challenge: "Event listings lived on social; reservations lived in DMs.",
    solution: "A programmable events system with table inventory, deposits and guest lists.",
    results: ["+64% table bookings", "2x event page traffic", "Sold-out weekends"],
    accentFrom: "oklch(0.74 0.09 50)",
    accentTo: "oklch(0.28 0.02 55)",
  },
];

export const products = [
  {
    name: "Relaxha",
    kind: "Spa booking engine & wellness marketplace",
    copy: "Real-time therapist availability, deposits, and a consumer marketplace — built for Bali, shipping regionally.",
    status: "Live",
  },
  {
    name: "Stayledger",
    kind: "Villa revenue & channel dashboard",
    copy: "One view of direct, OTA and agent revenue across a villa portfolio, with nightly reconciliation.",
    status: "Beta",
  },
  {
    name: "Concierge OS",
    kind: "Guest messaging & upsell",
    copy: "Pre-arrival journeys, in-stay requests and upsell offers, routed to the right team in seconds.",
    status: "In development",
  },
];

export const processSteps = [
  { no: "01", title: "Discover", copy: "Immersion in the property, the guest and the numbers behind them." },
  { no: "02", title: "Strategy", copy: "Positioning, structure and the commercial case for every decision." },
  { no: "03", title: "Design", copy: "Art direction, motion language and interface systems." },
  { no: "04", title: "Build", copy: "Engineering with performance budgets, not promises." },
  { no: "05", title: "Launch", copy: "Migration, measurement and a calm go-live." },
  { no: "06", title: "Grow", copy: "Iteration cycles tied to revenue, not vanity metrics." },
];

export const stats = [
  { value: 140, suffix: "+", label: "Projects delivered" },
  { value: 9, suffix: "", label: "Years crafting" },
  { value: 80, suffix: "+", label: "Clients partnered" },
  { value: 14, suffix: "", label: "Countries reached" },
];

export const testimonials = [
  {
    quote:
      "They understood our property better than agencies we had worked with for years. The site feels like walking through the resort.",
    name: "Maya Wirawan",
    role: "General Manager, Amankira Retreat",
  },
  {
    quote:
      "Direct bookings nearly doubled in one season. Calm people, precise work, no drama.",
    name: "Daniel Roth",
    role: "Owner, Soori Villas",
  },
  {
    quote:
      "The booking platform runs itself now. That is the highest compliment I can give software.",
    name: "Putu Arsana",
    role: "Founder, Relaxha",
  },
];

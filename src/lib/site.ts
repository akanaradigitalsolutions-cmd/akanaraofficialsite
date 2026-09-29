export const site = {
  name: "AKANARA",
  legal: "CV Akanara Digital Solutions",
  tagline: "Digital craft for brands that deserve to be remembered.",
  email: "hello@akanara.com",
  phone: "+62 857 3760 6345",
  whatsapp: "https://wa.me/6285737606345",
  instagram: "https://instagram.com/akanara", // TODO: confirm handle
  linkedin: "https://linkedin.com/company/akanara", // TODO: confirm page
  address: "Bali, Indonesia",
};

// Web3Forms access key for the contact form (free tier: 250 enquiries / month).
// Get one in ~30 seconds at https://web3forms.com — enter the inbox where you
// want enquiries delivered (e.g. akanaradigitalsolutions@gmail.com) and paste
// the access key they email you here. It is a PUBLIC token, safe to ship in
// client-side code; enquiries are delivered only to that registered inbox.
// While this is empty, the form gracefully falls back to WhatsApp.
export const web3formsAccessKey = ""; // TODO: paste your Web3Forms access key

// Capability marquee (not client names — swap for real client logos/names when ready).
export const clients = [
  "WEB DESIGN",
  "WEB DEVELOPMENT",
  "WEB APPS",
  "E-COMMERCE",
  "SEO · GEO",
  "GOOGLE ADS",
  "BRANDING",
  "MOTION",
];

export const services = [
  {
    no: "01",
    title: "Web Design & Development",
    copy: "Editorial, motion-led websites engineered for speed. Every pixel considered, every millisecond measured.",
    points: ["Art direction", "Modern front-end", "CMS & content tooling"],
  },
  {
    no: "02",
    title: "Web Apps & Custom Software",
    copy: "Dashboards, platforms and booking or commerce systems that hold up under real operational load.",
    points: ["Web apps & SaaS", "Dashboards & portals", "Payments & integrations"],
  },
  {
    no: "03",
    title: "Performance Marketing",
    copy: "Google and Meta campaigns built to convert — less guesswork, more owned, measurable revenue.",
    points: ["Google Ads", "Meta Ads", "GA4 & tracking"],
  },
  {
    no: "04",
    title: "Branding & Creative Direction",
    copy: "Identity systems with restraint: type, tone, texture and a visual language that travels.",
    points: ["Identity systems", "Art & photo direction", "Brand guidelines"],
  },
  {
    no: "05",
    title: "SEO · SEM · GEO",
    copy: "Compounding visibility — technical SEO, paid search, and getting your brand cited by AI search.",
    points: ["Technical SEO", "Local & content", "AI search (GEO)"],
  },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  url: string; // live site — cards link out to this
  summary: string;
  image?: string; // optional real screenshot; falls back to a live thumbnail of `url`
  year?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  accentFrom: string;
  accentTo: string;
};

// Real Akanara projects. Cards link straight to the live sites.
// TODO: confirm/refine each summary + category (and add year/results if you want
// full case-study pages later).
export const projects: Project[] = [
  {
    slug: "relaxha",
    name: "Relaxha",
    category: "Web app · Wellness booking",
    url: "https://relaxha.com",
    summary:
      "A spa & wellness booking platform connecting venues with guests across Bali.",
    accentFrom: "oklch(0.70 0.11 45)",
    accentTo: "oklch(0.34 0.05 35)",
  },
  {
    slug: "natajiwa",
    name: "Natajiwa Village",
    category: "Website · Hospitality",
    url: "https://natajiwa.com",
    summary:
      "A boutique stay in Kerobokan — rooms, restaurant and slow living, moments from Canggu and Seminyak.",
    accentFrom: "oklch(0.66 0.10 60)",
    accentTo: "oklch(0.30 0.03 55)",
  },
  {
    slug: "kintamani-dirtbike",
    name: "Kintamani Dirt Bike Adventure",
    category: "Website · Tours & activities",
    url: "https://kintamanidirtbikeadventure.com",
    summary:
      "A website for a Kintamani dirt-bike adventure tour operator.",
    accentFrom: "oklch(0.72 0.12 40)",
    accentTo: "oklch(0.32 0.04 30)",
  },
  {
    slug: "maguska-tour",
    name: "Maguska Tour",
    category: "Website · Travel & tours",
    url: "https://maguskatour.com",
    summary: "A website for a Bali tour operator.",
    accentFrom: "oklch(0.68 0.10 30)",
    accentTo: "oklch(0.31 0.03 45)",
  },
  {
    slug: "rarama-living",
    name: "Rarama Living Studio",
    category: "Website · Hospitality",
    url: "https://raramalivingstudio.com",
    summary: "A hotel & stay website for Rarama Living Studio, Bali.",
    accentFrom: "oklch(0.74 0.09 55)",
    accentTo: "oklch(0.30 0.02 50)",
  },
  {
    slug: "akalink",
    name: "Akalink",
    category: "Web app",
    url: "https://akalink.id",
    summary: "A custom web application.",
    accentFrom: "oklch(0.64 0.12 35)",
    accentTo: "oklch(0.28 0.03 40)",
  },
];

// Removed placeholder "in-house products" — add real ones here if wanted.
export const products: {
  name: string;
  kind: string;
  copy: string;
  status: string;
}[] = [];

export const processSteps = [
  { no: "01", title: "Discover", copy: "Immersion in your brand, your market and the numbers behind them." },
  { no: "02", title: "Strategy", copy: "Positioning, structure and the commercial case for every decision." },
  { no: "03", title: "Design", copy: "Art direction, motion language and interface systems." },
  { no: "04", title: "Build", copy: "Engineering with performance budgets, not promises." },
  { no: "05", title: "Launch", copy: "Migration, measurement and a calm go-live." },
  { no: "06", title: "Grow", copy: "Iteration cycles tied to revenue, not vanity metrics." },
];

// Placeholder metrics — replace with your real numbers before going live.
export const stats = [
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 25, suffix: "+", label: "Brands partnered" },
  { value: 95, suffix: "+", label: "Avg. Lighthouse score" },
  { value: 24, suffix: "/7", label: "Founder-led support" },
];

// Removed fabricated testimonials — add real client quotes here when you have them.
export const testimonials: { quote: string; name: string; role: string }[] = [];

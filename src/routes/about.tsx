import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Numbers } from "@/components/sections/Numbers";
import { Magnetic } from "@/components/ui/magnetic";
import { site } from "@/lib/site";

const title = "About — AKANARA";
const description =
  "A Bali studio of designers, engineers and operators building digital work for hospitality, wellness and lifestyle brands.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  { t: "Restraint", c: "We remove until only the essential remains — then we perfect it." },
  { t: "Ownership", c: "We measure our work by your revenue, not by our portfolio." },
  { t: "Craft", c: "Typography, motion and performance are not finishing touches." },
  { t: "Calm", c: "Clear scope, clear timelines, no theatre." },
];

const team = [
  { n: "Putu Eka", r: "Founder & Creative Director" },
  { n: "Lena Hartono", r: "Design Lead" },
  { n: "Rizky Pratama", r: "Engineering Lead" },
  { n: "Sarah Klein", r: "Strategy & Growth" },
];

function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[110rem] px-6 pb-24 pt-40 md:px-12 md:pt-56">
        <p className="label-mono">About</p>
        <h1 className="text-display mt-6 max-w-[18ch] text-6xl md:text-8xl">
          A studio on the edge of the Indian Ocean.
        </h1>
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <p className="text-display text-3xl leading-[1.15] md:text-4xl">
            {site.legal} was founded in Bali to give hospitality brands the same standard of
            digital craft that luxury fashion and technology take for granted.
          </p>
          <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              We work with resorts, spas, villa portfolios and wellness operators across
              Southeast Asia and beyond. Our team sits between design and operations — we
              understand occupancy, rate parity and channel mix as fluently as grid systems.
            </p>
            <p>
              The studio stays deliberately small. Every project is led by a senior pair, and
              nothing leaves the studio that we would not put our own name above the door of.
            </p>
          </div>
        </div>
      </section>

      <Numbers />

      <section className="mx-auto max-w-[110rem] px-6 py-24 md:px-12 md:py-32">
        <p className="label-mono">Values</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.t} className="hairline-t pt-6">
              <h2 className="text-display text-4xl">{v.t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{v.c}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-deep py-24">
        <div className="mx-auto max-w-[110rem] px-6 md:px-12">
          <p className="label-mono">Studio</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {team.map((m) => (
              <div key={m.n} className="hairline-t pt-5">
                <h3 className="text-display text-2xl">{m.n}</h3>
                <p className="label-mono mt-2">{m.r}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-md text-sm text-muted-foreground">{site.address}</p>
          <div className="mt-10">
            <Magnetic to="/contact" variant="ghost" cursor="Visit">
              Visit the studio
            </Magnetic>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Magnetic } from "@/components/ui/magnetic";
import { services, processSteps } from "@/lib/site";
import { useReveal } from "@/lib/motion";

const title = "Services — AKANARA";
const description =
  "Web design & development, web apps & software, performance marketing, branding, and SEO · SEM · GEO.";

export const Route = createFileRoute("/services")({
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
  component: ServicesPage,
});

function Row({ s, i }: { s: (typeof services)[number]; i: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      data-shown={shown}
      className="rise grid gap-6 border-b border-border py-14 md:grid-cols-[6rem_1fr_1fr]"
      style={{ transitionDelay: `${i * 0.05}s` }}
    >
      <span className="label-mono text-ember">{s.no}</span>
      <h2 className="text-display text-4xl md:text-5xl">{s.title}</h2>
      <div>
        <p className="text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
        <ul className="mt-6 flex flex-col gap-2">
          {s.points.map((p) => (
            <li key={p} className="label-mono">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[110rem] px-6 pb-24 pt-40 md:px-12 md:pt-56">
        <p className="label-mono">Services</p>
        <h1 className="text-display mt-6 max-w-[16ch] text-5xl md:text-7xl">
          Everything your brand needs online. Nothing it doesn't.
        </h1>

        <div className="mt-20">
          {services.map((s, i) => (
            <Row key={s.no} s={s} i={i} />
          ))}
        </div>
      </section>

      <section className="bg-stone-deep py-24">
        <div className="mx-auto max-w-[110rem] px-6 md:px-12">
          <p className="label-mono">Engagement</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {processSteps.map((s) => (
              <div key={s.no} className="hairline-t pt-5">
                <h3 className="text-display text-3xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Magnetic to="/contact" cursor="Start">
              Start a Project
            </Magnetic>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

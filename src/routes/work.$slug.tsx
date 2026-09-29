import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { projects } from "@/lib/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    const index = projects.indexOf(project);
    const next = projects[(index + 1) % projects.length];
    return { project, next };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Case study — AKANARA" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.project.name} — AKANARA`;
    const d = loaderData.project.summary;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project: p, next } = Route.useLoaderData();

  return (
    <SiteShell>
      <article>
        <header
          className="grain relative flex min-h-[80svh] items-end px-6 pb-16 pt-40 md:px-12"
          style={{ background: `linear-gradient(140deg, ${p.accentFrom}, ${p.accentTo})` }}
        >
          <div className="mx-auto w-full max-w-[110rem]">
            <p className="label-mono text-stone-deep/70">{p.category}</p>
            <h1 className="text-display mt-4 text-[14vw] leading-[0.9] text-stone-deep md:text-[9vw]">
              {p.name}
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-[110rem] px-6 py-24 md:px-12 md:py-32">
          <p className="text-display max-w-[24ch] text-4xl leading-[1.1] md:text-6xl">
            {p.summary}
          </p>

          <div className="mt-24 grid gap-14 md:grid-cols-2">
            <div>
              <p className="label-mono">Challenge</p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {p.challenge}
              </p>
            </div>
            <div>
              <p className="label-mono">Solution</p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {p.solution}
              </p>
            </div>
          </div>

          <div className="mt-24 grid gap-8 md:grid-cols-3">
            {p.results.map((r) => (
              <div key={r} className="hairline-t pt-6">
                <p className="text-display text-3xl md:text-4xl">{r}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="grain aspect-[3/4] rounded-sm border border-border"
                style={{
                  background: `linear-gradient(${140 + i * 40}deg, ${p.accentFrom}, ${p.accentTo})`,
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
        </div>

        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          data-cursor="Next"
          className="group block border-t border-border px-6 py-24 transition-colors hover:bg-stone-deep md:px-12"
        >
          <div className="mx-auto max-w-[110rem]">
            <p className="label-mono">Next project</p>
            <h2 className="text-display mt-4 text-6xl transition-colors group-hover:text-ember md:text-8xl">
              {next.name}
            </h2>
          </div>
        </Link>
      </article>
    </SiteShell>
  );
}

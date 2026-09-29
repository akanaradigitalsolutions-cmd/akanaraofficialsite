import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { projects } from "@/lib/site";
import { useReveal } from "@/lib/motion";

const title = "Work — AKANARA";
const description =
  "Selected work by Akanara — websites and web apps for brands in Bali and beyond.";

export const Route = createFileRoute("/work/")({
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
  component: WorkIndex,
});

function Item({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.2);
  return (
    <div ref={ref} data-shown={shown} className="rise" style={{ transitionDelay: `${i * 0.06}s` }}>
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Visit"
        className="group grid items-center gap-6 border-b border-border py-8 md:grid-cols-[1fr_14rem_8rem]"
      >
        <h2 className="text-display text-4xl transition-colors group-hover:text-ember md:text-6xl">
          {p.name}
        </h2>
        <p className="label-mono">{p.category}</p>
        <span className="label-mono md:text-right">Visit ↗</span>
      </a>
    </div>
  );
}

function WorkIndex() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category.split(" · ")[0])))],
    [],
  );
  const [filter, setFilter] = useState("All");
  const list = projects.filter(
    (p) => filter === "All" || p.category.startsWith(filter),
  );

  return (
    <SiteShell>
      <section className="mx-auto max-w-[110rem] px-6 pb-28 pt-40 md:px-12 md:pt-56">
        <p className="label-mono">Selected work</p>
        <h1 className="text-display mt-6 max-w-[14ch] text-5xl md:text-7xl">
          Work built to be remembered.
        </h1>

        <div className="mt-14 flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-cursor="Filter"
              className="rounded-full border px-5 py-2 label-mono transition-colors duration-500"
              style={{
                borderColor: filter === c ? "var(--ember)" : "var(--border)",
                color: filter === c ? "var(--ember)" : undefined,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-16">
          {list.map((p, i) => (
            <Item key={p.slug} p={p} i={i} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

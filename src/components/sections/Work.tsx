import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/site";
import { useReveal } from "@/lib/motion";

/**
 * Selected work. Each card holds a liquid ripple layer that follows the
 * pointer (CSS radial mask standing in for a WebGL displacement pass — cheap,
 * smooth, and safe on mobile GPUs).
 */
function Card({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.25);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={ref}
      data-shown={shown}
      className="rise"
      style={{ transitionDelay: `${(index % 2) * 0.12}s` }}
    >
      <Link
        to="/work/$slug"
        params={{ slug: p.slug }}
        data-cursor="View"
        className="group block"
      >
        <div
          onMouseMove={onMove}
          className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border"
          style={{
            background: `linear-gradient(140deg, ${p.accentFrom}, ${p.accentTo})`,
          }}
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(28rem 28rem at var(--mx,50%) var(--my,50%), oklch(1 0 0 / 22%), transparent 60%)",
            }}
          />
          <div className="grain absolute inset-0" />
          <span className="text-display absolute bottom-6 left-6 text-[12vw] leading-none text-stone-deep/25 md:text-[7vw]">
            {p.name}
          </span>
        </div>
        <div className="hairline-t mt-4 flex items-baseline justify-between py-3">
          <h3 className="text-display text-2xl transition-colors group-hover:text-ember">
            {p.name}
          </h3>
          <span className="label-mono">{p.year}</span>
        </div>
        <p className="label-mono">{p.category}</p>
      </Link>
    </div>
  );
}

export function Work() {
  return (
    <section className="mx-auto max-w-[110rem] px-6 py-28 md:px-12 md:py-40">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-mono">Selected work</p>
          <h2 className="text-display mt-5 text-4xl md:text-6xl">
            Selected work.
          </h2>
        </div>
        <Link to="/work" data-cursor="All" className="label-mono hover:text-ember">
          All case studies →
        </Link>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {projects.slice(0, 4).map((p, i) => (
          <Card key={p.slug} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

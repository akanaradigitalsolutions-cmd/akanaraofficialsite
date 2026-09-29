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

  // Real screenshot if provided, else a live thumbnail of the site (rendered by
  // the visitor's browser via WordPress mShots — no API key needed).
  const shot =
    p.image ??
    `https://s0.wp.com/mshots/v1/${encodeURIComponent(p.url)}?w=1280&h=800`;

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
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Visit"
        className="group block"
      >
        <div
          onMouseMove={onMove}
          className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border"
          style={{
            background: `linear-gradient(140deg, ${p.accentFrom}, ${p.accentTo})`,
          }}
        >
          <img
            src={shot}
            alt={`${p.name} website`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-deep/55 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(28rem 28rem at var(--mx,50%) var(--my,50%), oklch(1 0 0 / 18%), transparent 60%)",
            }}
          />
          <div className="grain absolute inset-0 opacity-60" />
        </div>
        <div className="hairline-t mt-4 flex items-baseline justify-between py-3">
          <h3 className="text-display text-2xl transition-colors group-hover:text-ember">
            {p.name}
          </h3>
          <span className="label-mono">Visit ↗</span>
        </div>
        <p className="label-mono">{p.category}</p>
      </a>
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
          All work →
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

import { products } from "@/lib/site";
import { useReveal } from "@/lib/motion";

/** Floating device mockups that tilt toward the pointer (3D CSS transform). */
function Tilt({ p, i }: { p: (typeof products)[number]; i: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.2);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget.querySelector<HTMLElement>("[data-plate]");
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const rx = (-(e.clientY - (r.top + r.height / 2)) / r.height) * 14;
    const ry = ((e.clientX - (r.left + r.width / 2)) / r.width) * 14;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget.querySelector<HTMLElement>("[data-plate]");
    if (el) el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      data-shown={shown}
      className="rise"
      style={{ transitionDelay: `${i * 0.1}s` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        data-plate
        data-cursor="Product"
        className="grain relative flex h-full flex-col justify-between rounded-sm border border-border bg-card p-8 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{ boxShadow: "var(--shadow-ember)" }}
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="label-mono text-ember">{p.status}</span>
            <span className="label-mono">0{i + 1}</span>
          </div>
          <h3 className="text-display mt-8 text-4xl">{p.name}</h3>
          <p className="label-mono mt-3">{p.kind}</p>
        </div>
        <p className="mt-10 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
      </div>
    </div>
  );
}

export function Products() {
  return (
    <section className="bg-stone-deep py-28 md:py-40">
      <div className="mx-auto max-w-[110rem] px-6 md:px-12">
        <p className="label-mono">In-house products</p>
        <h2 className="text-display mt-5 max-w-[16ch] text-4xl md:text-6xl">
          We build our own software, too.
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {products.map((p, i) => (
            <Tilt key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

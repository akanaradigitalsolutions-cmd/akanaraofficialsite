import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/site";

/** Vertical timeline whose line draws itself as the section scrolls through. */
export function Process() {
  const wrap = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = r.height + window.innerHeight * 0.6;
      const passed = window.innerHeight * 0.8 - r.top;
      setP(Math.min(Math.max(passed / total, 0), 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="mx-auto max-w-[110rem] px-6 py-28 md:px-12 md:py-40">
      <p className="label-mono">How we work</p>
      <h2 className="text-display mt-5 text-5xl md:text-7xl">Six deliberate steps.</h2>

      <div ref={wrap} className="relative mt-20 pl-10 md:pl-24">
        <div className="absolute left-0 top-0 h-full w-px bg-border md:left-8">
          <div
            className="w-px origin-top bg-ember"
            style={{ height: `${p * 100}%`, transition: "height 0.15s linear" }}
          />
        </div>

        {processSteps.map((s, i) => {
          const active = p * processSteps.length > i - 0.3;
          return (
            <div
              key={s.no}
              className="relative grid gap-4 py-10 transition-opacity duration-700 md:grid-cols-[8rem_1fr] md:py-14"
              style={{ opacity: active ? 1 : 0.28 }}
            >
              <span
                className="absolute -left-10 top-12 h-2 w-2 -translate-x-1/2 rounded-full transition-colors duration-500 md:-left-16"
                style={{
                  background: active ? "var(--ember)" : "var(--border)",
                }}
              />
              <span className="label-mono">{s.no}</span>
              <div>
                <h3 className="text-display text-3xl md:text-5xl">{s.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {s.copy}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

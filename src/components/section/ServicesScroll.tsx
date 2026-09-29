import { useEffect, useRef } from "react";
import { services } from "@/lib/site";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Pinned horizontal slider. The track translates by its overflow width while
 * the section stays pinned. Falls back to native horizontal scroll on touch
 * and with reduced motion.
 */
export function ServicesScroll() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    if (prefersReducedMotion() || window.matchMedia("(max-width: 767px)").matches) return;

    let kill = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const distance = () => tr.scrollWidth - window.innerWidth;
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      kill = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      cancelled = true;
      kill();
    };
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden bg-background py-24 md:py-0">
      <div className="mx-auto max-w-[110rem] px-6 pb-10 md:px-12 md:pt-28">
        <p className="label-mono">What we do</p>
      </div>
      <div
        ref={track}
        className="flex gap-6 overflow-x-auto px-6 pb-6 md:overflow-visible md:px-12"
      >
        {services.map((s) => (
          <article
            key={s.no}
            className="grain group relative flex min-h-[26rem] w-[82vw] shrink-0 flex-col justify-between rounded-sm border border-border bg-card p-8 transition-colors duration-700 hover:border-ember/50 md:w-[34rem] md:p-12"
            data-cursor="Explore"
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: "var(--gradient-vault)" }}
            />
            <div className="relative">
              <span className="label-mono text-ember">{s.no}</span>
              <h3 className="text-display mt-6 text-4xl md:text-5xl">{s.title}</h3>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {s.copy}
              </p>
            </div>
            <ul className="relative mt-10 flex flex-col gap-2">
              {s.points.map((p) => (
                <li key={p} className="hairline-t pt-2 text-sm text-ivory/70">
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

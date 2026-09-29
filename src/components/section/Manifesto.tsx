import { useEffect, useRef, useState } from "react";

const text =
  "We believe restraint is the highest form of luxury. Every project begins with the guest, ends with the numbers, and is held together by craft you can feel before you can name.";

/**
 * Pinned manifesto: the section pins while the statement lights up word by
 * word. GSAP ScrollTrigger drives `progress`; tune the scrub length via END.
 */
const END = "+=160%";

export function Manifesto() {
  const section = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    let kill = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: END,
        pin: true,
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      });
      kill = () => st.kill();
    })();

    return () => {
      cancelled = true;
      kill();
    };
  }, []);

  return (
    <section
      ref={section}
      className="flex min-h-[100svh] items-center bg-stone-deep px-6 md:px-12"
    >
      <div className="mx-auto max-w-[80rem]">
        <p className="label-mono mb-10">Manifesto</p>
        <p className="text-display text-[7vw] leading-[1.05] md:text-[4.2vw]">
          {words.map((w, i) => {
            const lit = progress * words.length > i;
            return (
              <span
                key={i}
                className="transition-[opacity,color] duration-300"
                style={{ opacity: lit ? 1 : 0.2 }}
              >
                {w}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}

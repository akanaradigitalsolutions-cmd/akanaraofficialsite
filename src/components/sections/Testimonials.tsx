import { useEffect, useState } from "react";
import { testimonials } from "@/lib/site";

/** Slow crossfade slider — 7s per quote, manual dots. */
export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-[110rem] px-6 py-28 md:px-12 md:py-40">
      <p className="label-mono">Client words</p>
      <div className="relative mt-10 min-h-[22rem] md:min-h-[24rem]">
        {testimonials.map((t, idx) => (
          <figure
            key={t.name}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
            style={{ opacity: i === idx ? 1 : 0 }}
            aria-hidden={i !== idx}
          >
            <blockquote className="text-display max-w-[24ch] text-3xl leading-[1.15] md:text-6xl">
              “{t.quote}”
            </blockquote>
            <figcaption className="label-mono mt-8">
              {t.name} — {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        {testimonials.map((t, idx) => (
          <button
            key={t.name}
            onClick={() => setI(idx)}
            aria-label={`Show quote ${idx + 1}`}
            className="h-px w-16 transition-colors duration-500"
            style={{ background: i === idx ? "var(--ember)" : "var(--border)" }}
          />
        ))}
      </div>
    </section>
  );
}

import { Obsidian } from "@/components/three/Obsidian";
import { Magnetic } from "@/components/ui/magnetic";
import { useReveal } from "@/lib/motion";

const headline = [
  "We craft digital",
  "experiences for brands",
  "that deserve to be",
  "remembered.",
];

export function Hero() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.05);

  return (
    <section
      ref={ref}
      className="grain vault-glow relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32"
    >
      <Obsidian className="pointer-events-none absolute inset-0 h-full w-full opacity-90" />

      <div className="relative mx-auto w-full max-w-[110rem] px-6 md:px-12">
        <p
          className="label-mono mb-8"
          style={{
            opacity: shown ? 1 : 0,
            transition: "opacity 1.2s var(--ease-lux) 0.2s",
          }}
        >
          Bali, Indonesia — working worldwide
        </p>

        <h1 className="text-display max-w-[20ch] text-[10vw] leading-[0.92] sm:text-[8vw] lg:text-[5.4vw]">
          {headline.map((line, i) => (
            <span key={line} className="reveal-mask">
              <span
                className="block"
                style={{
                  transform: shown ? "translateY(0)" : "translateY(110%)",
                  transition: `transform 1.2s var(--ease-lux) ${0.25 + i * 0.09}s`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p
            className="max-w-sm text-sm leading-relaxed text-muted-foreground"
            style={{
              opacity: shown ? 1 : 0,
              filter: shown ? "blur(0)" : "blur(8px)",
              transition: "all 1.4s var(--ease-lux) 0.7s",
            }}
          >
            A digital studio for hospitality, wellness and lifestyle brands. We design and
            engineer websites, booking systems and SaaS products with the patience of a
            craftsman and the discipline of an operator.
          </p>
          <div
            className="flex flex-wrap gap-3"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(20px)",
              transition: "all 1.2s var(--ease-lux) 0.85s",
            }}
          >
            <Magnetic to="/contact" cursor="Start">
              Start a Project
            </Magnetic>
            <Magnetic to="/work" variant="ghost" cursor="View">
              View Work
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <span className="label-mono">Scroll</span>
      </div>
    </section>
  );
}

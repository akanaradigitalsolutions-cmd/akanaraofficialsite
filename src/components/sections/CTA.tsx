import { Obsidian } from "@/components/three/Obsidian";
import { Magnetic } from "@/components/ui/magnetic";

export function CTA() {
  return (
    <section className="grain vault-glow relative flex min-h-[100svh] items-center overflow-hidden">
      <Obsidian className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
      <div className="relative mx-auto flex w-full max-w-[110rem] flex-col items-start gap-14 px-6 md:flex-row md:items-center md:justify-between md:px-12">
        <h2 className="text-display max-w-[14ch] text-[11vw] leading-[0.95] md:text-[6vw]">
          Let's create something timeless.
        </h2>
        <Magnetic to="/contact" variant="circle" cursor="Talk">
          Talk to us
        </Magnetic>
      </div>
    </section>
  );
}

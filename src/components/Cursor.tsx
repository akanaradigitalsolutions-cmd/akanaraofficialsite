import { useEffect, useRef } from "react";

/**
 * Custom cursor: precise dot + trailing ring. The ring lerps toward the dot
 * (tune FOLLOW) and grows with a label when hovering [data-cursor] elements.
 * Disabled on touch/coarse pointers.
 */
const FOLLOW = 0.16;

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      const hit = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as
        | HTMLElement
        | null;
      const active = Boolean(hit);
      ring.current?.setAttribute("data-active", String(active));
      if (labelRef.current) labelRef.current.textContent = hit?.dataset.cursor ?? "";
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * FOLLOW;
      pos.y += (target.y - pos.y) * FOLLOW;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] hidden md:block">
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-ember"
      />
      <div
        ref={ring}
        data-active="false"
        className="group absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-ivory/35 transition-[height,width,background-color,border-color] duration-500 data-[active=true]:h-20 data-[active=true]:w-20 data-[active=true]:border-ember/70 data-[active=true]:bg-ember/10"
      >
        <span
          ref={labelRef}
          className="label-mono text-[0.55rem] text-ivory opacity-0 transition-opacity duration-300 group-data-[active=true]:opacity-100"
        />
      </div>
    </div>
  );
}

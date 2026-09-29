import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Lenis smooth scrolling, wired into GSAP's ticker so ScrollTrigger stays in
 * sync with the interpolated scroll position. Tune `lerp` for more/less glide.
 */
export function SmoothScroll() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    // Desktop only: smooth-scroll (a per-frame rAF loop) adds main-thread work
    // and jank on mobile, where native scrolling is smoother and cheaper.
    if (prefersReducedMotion() || !window.matchMedia("(min-width: 768px)").matches) return;
    let destroy = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;

      destroy = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        delete (window as unknown as { __lenis?: unknown }).__lenis;
      };
    })();

    return () => {
      cancelled = true;
      destroy();
    };
  }, []);

  // Reset scroll on route change (Lenis keeps its own position).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

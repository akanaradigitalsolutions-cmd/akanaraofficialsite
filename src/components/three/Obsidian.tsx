import { ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

// 3D is lazy + client-only: the Canvas must never render on the server and the
// three.js bundle must not block first paint.
const ObsidianScene = lazy(() => import("./ObsidianScene"));

function Fallback() {
  return (
    <div className="h-full w-full">
      <div className="mx-auto h-[55%] w-[55%] translate-y-1/3 rounded-full bg-ember/15 blur-3xl" />
    </div>
  );
}

/**
 * Gates the WebGL hero for performance without changing the visuals:
 *  - Capability: only capable desktops run it (>=768px, not reduced-motion,
 *    >=4 cores). Phones keep the lightweight gradient fallback.
 *  - Deferral: the scene mounts only when its container nears the viewport AND
 *    the browser is idle. So the Hero's 3D loads just after first paint (out of
 *    the critical load path) and the CTA's 3D loads only when scrolled near —
 *    instead of both initializing at once during load. The animation is
 *    unchanged; only its start time moves.
 */
function Scene() {
  const holder = useRef<HTMLDivElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    setAllowed(wideEnough && !reduced && cores >= 4);
  }, []);

  useEffect(() => {
    if (!allowed || !holder.current) return;
    const el = holder.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const w = window as typeof window & {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        };
        if (w.requestIdleCallback) w.requestIdleCallback(() => setMount(true), { timeout: 1500 });
        else window.setTimeout(() => setMount(true), 300);
      },
      { rootMargin: "200px" }, // start loading a little before it enters view
    );
    io.observe(el);
    return () => io.disconnect();
  }, [allowed]);

  return (
    <div ref={holder} className="h-full w-full">
      {allowed && mount ? (
        <Suspense fallback={<Fallback />}>
          <ObsidianScene />
        </Suspense>
      ) : (
        <Fallback />
      )}
    </div>
  );
}

export function Obsidian({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <ClientOnly fallback={<Fallback />}>
        <Scene />
      </ClientOnly>
    </div>
  );
}

import { ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState } from "react";

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
 * Only run the WebGL hero on capable desktops. Phones, low-core devices and
 * reduced-motion users get the lightweight gradient fallback — WebGL + a
 * per-frame render loop is brutal on throttled mobile CPUs and was the main
 * cause of poor mobile performance (huge Total Blocking Time / Speed Index).
 * Because the three.js bundle is imported only when <ObsidianScene /> renders,
 * gating it here also means phones never download or parse it.
 */
function Scene() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    setAllowed(wideEnough && !reduced && cores >= 4);
  }, []);

  if (!allowed) return <Fallback />;
  return (
    <Suspense fallback={<Fallback />}>
      <ObsidianScene />
    </Suspense>
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

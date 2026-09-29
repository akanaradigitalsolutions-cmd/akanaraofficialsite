import { ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// 3D is lazy + client-only: the Canvas must never render on the server and
// the three.js bundle should not block first paint.
const ObsidianScene = lazy(() => import("./ObsidianScene"));

function Fallback() {
  return (
    <div className="h-full w-full">
      <div className="mx-auto h-[55%] w-[55%] translate-y-1/3 rounded-full bg-ember/15 blur-3xl" />
    </div>
  );
}

export function Obsidian({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <ClientOnly fallback={<Fallback />}>
        <Suspense fallback={<Fallback />}>
          <ObsidianScene />
        </Suspense>
      </ClientOnly>
    </div>
  );
}

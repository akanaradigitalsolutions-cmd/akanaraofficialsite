import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { Preloader } from "./Preloader";
import { SmoothScroll } from "./SmoothScroll";

/** Page transition: a curtain wipes across on every route change. */
function Curtain() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [covered, setCovered] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // Cover instantly, then wipe upward to reveal the new page.
    setCovered(true);
    const id = window.setTimeout(() => setCovered(false), 60);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[130] bg-stone-deep"
      style={{
        clipPath: covered ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        transition: covered ? "none" : "clip-path 900ms cubic-bezier(0.76,0,0.24,1)",
      }}
    />
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Curtain />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

import { useEffect, useState } from "react";

/**
 * Cinematic preloader: 0–100 counter, wordmark revealing letter by letter,
 * then a curtain wipe. Runs once per session.
 */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [wiping, setWiping] = useState(false);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("akanara:intro") === "1") return;
    setDone(false);
    document.body.style.overflow = "hidden";

    let n = 0;
    const id = window.setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 7));
      setCount(n);
      if (n >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setWiping(true), 420);
        window.setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
          sessionStorage.setItem("akanara:intro", "1");
        }, 1600);
      }
    }, 90);

    return () => {
      window.clearInterval(id);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  const letters = "AKANARA".split("");

  return (
    <div
      className="grain fixed inset-0 z-[200] flex flex-col items-center justify-center bg-stone-deep transition-[clip-path] duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ clipPath: wiping ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)" }}
    >
      <div className="flex gap-[0.12em] overflow-hidden">
        {letters.map((l, i) => (
          <span
            key={i}
            className="text-display text-5xl text-ivory sm:text-7xl"
            style={{
              opacity: count > (i + 1) * 12 ? 1 : 0,
              transform: count > (i + 1) * 12 ? "translateY(0)" : "translateY(110%)",
              transition: "all 0.9s var(--ease-lux)",
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="mt-8 flex w-56 items-center gap-4">
        <div className="h-px flex-1 bg-border">
          <div
            className="h-px bg-ember transition-[width] duration-200 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>
        <span className="label-mono tabular-nums">{String(count).padStart(3, "0")}</span>
      </div>
    </div>
  );
}

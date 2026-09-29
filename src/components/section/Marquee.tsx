import { clients } from "@/lib/site";

/** Infinite logo marquee — duplicated track, CSS-driven, pauses on hover. */
export function Marquee() {
  const row = [...clients, ...clients];
  return (
    <section className="border-y border-border py-8">
      <div className="group relative flex overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_42s_linear_infinite] items-center gap-16 pr-16 group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="text-display whitespace-nowrap text-2xl text-ivory/35 transition-colors duration-500 hover:text-ember md:text-3xl"
            >
              {c}
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-[marquee_42s_linear_infinite] items-center gap-16 pr-16 group-hover:[animation-play-state:paused]"
        >
          {row.map((c, i) => (
            <span
              key={`b-${c}-${i}`}
              className="text-display whitespace-nowrap text-2xl text-ivory/35 md:text-3xl"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-100%) } }`}</style>
    </section>
  );
}

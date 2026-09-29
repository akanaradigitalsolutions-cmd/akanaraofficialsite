import { stats } from "@/lib/site";
import { useCountUp } from "@/lib/motion";

function Stat({ value, suffix, label }: (typeof stats)[number]) {
  const { ref, value: n } = useCountUp(value);
  return (
    <div className="hairline-t pt-6">
      <span ref={ref} className="text-display block text-6xl tabular-nums md:text-8xl">
        {n}
        {suffix}
      </span>
      <p className="label-mono mt-4">{label}</p>
    </div>
  );
}

export function Numbers() {
  return (
    <section className="border-y border-border bg-stone-deep py-24">
      <div className="mx-auto grid max-w-[110rem] gap-10 px-6 sm:grid-cols-2 md:grid-cols-4 md:px-12">
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}

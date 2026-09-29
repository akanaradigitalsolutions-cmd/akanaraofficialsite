import { useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

/** Magnetic hover: element eases toward the pointer within its bounds. */
function useMagnet<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

type Props = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "circle";
  cursor?: string;
  className?: string;
};

const base =
  "inline-flex items-center justify-center transition-[background-color,color,border-color,transform] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform";

const styles = {
  solid:
    "rounded-full bg-ember px-8 py-4 label-mono text-primary-foreground hover:bg-ember-soft",
  ghost:
    "rounded-full border border-border px-8 py-4 label-mono text-ivory hover:border-ember hover:text-ember",
  circle:
    "h-40 w-40 rounded-full border border-ember text-center label-mono text-ember hover:bg-ember hover:text-primary-foreground md:h-56 md:w-56",
};

export function Magnetic({
  to,
  href,
  children,
  variant = "solid",
  cursor = "Open",
  className = "",
}: Props) {
  const magnet = useMagnet<HTMLAnchorElement>();
  const cls = `${base} ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} data-cursor={cursor} className={cls} {...magnet}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} data-cursor={cursor} className={cls} {...magnet}>
      {children}
    </a>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="fixed left-0 top-0 z-[110] h-px w-full bg-border">
        <div
          className="h-px origin-left bg-ember"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <nav className="mx-auto flex max-w-[110rem] items-center justify-between px-6 py-6 md:px-12">
          <Link to="/" data-cursor="Home" className="text-display text-xl tracking-[0.3em]">
            {site.name}
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {links.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-cursor="Open"
                className="label-mono text-ivory/70 transition-colors hover:text-ivory"
                activeProps={{ className: "label-mono text-ember" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            data-cursor={open ? "Close" : "Menu"}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex flex-col gap-[6px] p-2 md:hidden"
          >
            <span
              className={`block h-px w-7 bg-ivory transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-7 bg-ivory transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`grain fixed inset-0 z-[99] bg-stone-deep transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mx-auto flex h-full max-w-[110rem] flex-col justify-center px-6 md:px-12">
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              data-cursor="Open"
              className="group hairline-t flex items-baseline justify-between py-4"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.9s var(--ease-lux) ${open ? 0.15 + i * 0.07 : 0}s`,
              }}
            >
              <span className="text-display text-4xl text-ivory transition-colors group-hover:text-ember sm:text-5xl">
                {l.label}
              </span>
              <span className="label-mono">0{i + 1}</span>
            </Link>
          ))}
          <div className="hairline-t mt-10 flex flex-wrap gap-x-10 gap-y-3 pt-6">
            <a href={`mailto:${site.email}`} className="label-mono hover:text-ember">
              {site.email}
            </a>
            <a href={site.whatsapp} className="label-mono hover:text-ember">
              WhatsApp
            </a>
            {site.instagram && (
              <a href={site.instagram} className="label-mono hover:text-ember">
                Instagram
              </a>
            )}
            {site.linkedin && (
              <a href={site.linkedin} className="label-mono hover:text-ember">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

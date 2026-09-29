import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

function BaliClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
    setTime(fmt());
    const id = window.setInterval(() => setTime(fmt()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden border-t border-border bg-stone-deep pt-24">
      <div className="mx-auto max-w-[110rem] px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="label-mono">Studio</p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{site.address}</p>
            <p className="mt-2 text-sm text-muted-foreground">{site.legal}</p>
            <p className="mt-4 label-mono">
              Bali local time · <BaliClock />
            </p>
          </div>
          <div>
            <p className="label-mono">Contact</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href={`mailto:${site.email}`} className="hover:text-ember" data-cursor="Email">
                {site.email}
              </a>
              <a href={site.whatsapp} className="hover:text-ember" data-cursor="Chat">
                WhatsApp {site.phone}
              </a>
            </div>
          </div>
          <div>
            <p className="label-mono">Elsewhere</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              {site.instagram && (
                <a href={site.instagram} className="hover:text-ember">
                  Instagram
                </a>
              )}
              {site.linkedin && (
                <a href={site.linkedin} className="hover:text-ember">
                  LinkedIn
                </a>
              )}
              <Link to="/work" className="hover:text-ember">
                Selected work
              </Link>
            </div>
          </div>
        </div>

        <h2 className="text-display mt-16 select-none text-4xl tracking-[0.3em] text-ivory/85 md:text-5xl">
          AKANARA
        </h2>

        <div className="hairline-t mt-8 flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono">© {new Date().getFullYear()} {site.legal}</p>
          <p className="label-mono">Made in Bali · Working worldwide</p>
        </div>
      </div>
    </footer>
  );
}

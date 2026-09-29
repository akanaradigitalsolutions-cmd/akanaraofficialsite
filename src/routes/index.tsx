import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { ServicesScroll } from "@/components/sections/ServicesScroll";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import { seo } from "@/lib/seo";

const title = "AKANARA — Digital studio in Bali · Websites, apps & growth";
const description =
  "Akanara is a founder-led Bali digital studio building websites, web apps and growth for brands that want to stand out.";

export const Route = createFileRoute("/")({
  head: () => seo({ title, description, path: "/" }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <Manifesto />
      <ServicesScroll />
      <Work />
      <Process />
      {/* <Numbers /> hidden until real stats are ready */}
      <CTA />
    </SiteShell>
  );
}

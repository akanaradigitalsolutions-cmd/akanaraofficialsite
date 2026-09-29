import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { ServicesScroll } from "@/components/sections/ServicesScroll";
import { Work } from "@/components/sections/Work";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { Numbers } from "@/components/sections/Numbers";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

const title = "AKANARA — Digital studio for hospitality & lifestyle brands";
const description =
  "Bali-based digital studio crafting websites, booking engines and SaaS products for hospitality, wellness and lifestyle brands.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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
      <Products />
      <Process />
      <Numbers />
      <Testimonials />
      <CTA />
    </SiteShell>
  );
}

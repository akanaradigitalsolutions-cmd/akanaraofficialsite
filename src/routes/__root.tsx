import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { site, SITE_URL } from "../lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AKANARA — Digital studio in Bali" },
      {
        name: "description",
        content:
          "Founder-led Bali digital studio building websites, web apps and growth.",
      },
      { name: "author", content: "Akanara Digital Solutions" },
      { name: "theme-color", content: "#14110e" },
      { property: "og:title", content: "AKANARA — Digital studio in Bali" },
      {
        property: "og:description",
        content:
          "Founder-led Bali digital studio building websites, web apps and growth.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AKANARA" },
      { property: "og:image", content: `${SITE_URL}/og.png` },
      { property: "og:image:secure_url", content: `${SITE_URL}/og.png` },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "AKANARA — Digital studio in Bali" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og.png` },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const GTM_ID = "GTM-TP9BFG49";

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
        <HeadContent />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function StructuredData() {
  const sameAs = [site.instagram, site.linkedin].filter(Boolean);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: site.name,
        legalName: site.legal,
        url: SITE_URL,
        logo: `${SITE_URL}/apple-touch-icon.png`,
        image: `${SITE_URL}/og.png`,
        email: site.email,
        description: site.description,
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: site.legal,
        url: SITE_URL,
        image: `${SITE_URL}/og.png`,
        email: site.email,
        telephone: "+6285737606345",
        priceRange: "$$",
        description: site.description,
        areaServed: "Worldwide",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bali",
          addressCountry: "ID",
        },
        knowsAbout: [
          "Web design",
          "Web development",
          "Web apps",
          "SEO",
          "Performance marketing",
          "Branding",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        description: site.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <StructuredData />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

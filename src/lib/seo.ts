import { SITE_URL, site } from "./site";

type SeoInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/work" or "/" — used for canonical + og:url. */
  path: string;
  /** Absolute or root-relative image; defaults to the branded OG card. */
  image?: string;
};

/**
 * Builds a consistent set of <head> meta + canonical link for a route.
 * Use in a route's `head()`:  head: () => seo({ title, description, path: "/work" })
 */
export function seo({ title, description, path, image }: SeoInput) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const img = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/og.png`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

import { useEffect } from "react";
import { useLocation } from "wouter";
import { absolute, schemaForRoute, seoForPath, SITE_URL } from "@shared/seo";

/*
Keeps the document head correct as the router moves between pages.

The static HTML that scripts/prerender.ts writes is what crawlers read; this handles the other
case — a visitor who arrives on one page and navigates to another without a reload. Without it
the tab title, the canonical and the structured data would all still describe the entry page.
*/

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

export function useSeo() {
  const [location] = useLocation();

  useEffect(() => {
    const route = seoForPath(location);
    const url = absolute(route.path);
    const image = `${SITE_URL}${route.image}`;

    document.title = route.title;

    setMeta('meta[name="description"]', "name", "description", route.description);
    setMeta('meta[name="robots"]', "name", "robots", route.indexed === false ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    setMeta('meta[property="og:type"]', "property", "og:type", route.type);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:title"]', "property", "og:title", route.title);
    setMeta('meta[property="og:description"]', "property", "og:description", route.description);
    setMeta('meta[property="og:image"]', "property", "og:image", image);
    setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", route.imageAlt);

    setMeta('meta[name="twitter:title"]', "name", "twitter:title", route.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", route.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
    setMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", route.imageAlt);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // One managed JSON-LD block, replaced wholesale rather than appended to.
    const id = "seo-jsonld";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaForRoute(route));
    document.head.appendChild(script);
  }, [location]);
}

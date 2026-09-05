/*
Post-build SEO pass.

The site is a client-rendered SPA: the shipped HTML is a shell and everything else arrives via
JavaScript. Google will render JS on a second pass, but social crawlers — LinkedIn, WhatsApp,
Slack, Facebook, X — will not. They read the raw HTML once and stop. That matters here because
every call to action on the site points at LinkedIn, so a shared case study link would otherwise
preview with the home page's title and image, or with nothing at all.

So for each route we write a real HTML file carrying that route's own head. The body is still the
SPA shell; a crawler gets correct metadata, a visitor gets the app, which then routes normally.

  dist/public/index.html                 → "/"
  dist/public/work/tuzidi/index.html     → "/work/tuzidi"
  dist/public/work/supashopper/index.html

Also emits sitemap.xml from the same route table, so the two can never drift.

Run automatically by `npm run build` (see package.json).
*/

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { absolute, routes, schemaForRoute, SITE_NAME, SITE_URL, type RouteSeo } from "../shared/seo.ts";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(projectRoot, "dist", "public");

const SEO_BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function headFor(route: RouteSeo): string {
  const url = absolute(route.path);
  const image = `${SITE_URL}${route.image}`;
  const robots =
    route.indexed === false
      ? "noindex, follow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return [
    "<!-- seo:start -->",
    `<title>${escape(route.title)}</title>`,
    `<meta name="description" content="${escape(route.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="author" content="${escape(SITE_NAME)}" />`,
    "",
    `<meta property="og:site_name" content="${escape(SITE_NAME)}" />`,
    `<meta property="og:type" content="${route.type}" />`,
    `<meta property="og:locale" content="en_KE" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escape(route.title)}" />`,
    `<meta property="og:description" content="${escape(route.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escape(route.imageAlt)}" />`,
    "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(route.title)}" />`,
    `<meta name="twitter:description" content="${escape(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escape(route.imageAlt)}" />`,
    "",
    `<script type="application/ld+json">${JSON.stringify(schemaForRoute(route))}</script>`,
    "<!-- seo:end -->",
  ].join("\n    ");
}

/*
Asset URLs in the built shell are root-absolute ("/assets/…"), so the same markup works from a
nested directory without rewriting. Verified below rather than assumed.
*/
function assertRootAbsoluteAssets(html: string) {
  const relative = [...html.matchAll(/(?:src|href)="(?!https?:|\/|#|data:|mailto:)([^"]+)"/g)];
  if (relative.length > 0) {
    throw new Error(
      `Built HTML contains relative asset URLs, which break for nested routes: ${relative
        .map((m) => m[1])
        .join(", ")}`,
    );
  }
}

async function main() {
  const shellPath = path.join(outDir, "index.html");
  const shell = await readFile(shellPath, "utf8");

  if (!SEO_BLOCK.test(shell)) {
    throw new Error("No <!-- seo:start --> block in the built HTML; client/index.html has drifted.");
  }
  assertRootAbsoluteAssets(shell);

  for (const route of routes) {
    const html = shell.replace(SEO_BLOCK, headFor(route));
    const target =
      route.path === "/"
        ? shellPath
        : path.join(outDir, route.path.replace(/^\//, ""), "index.html");

    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, html, "utf8");
    console.log(`  ${route.path.padEnd(22)} → ${path.relative(outDir, target)}`);
  }

  const today = new Date().toISOString().slice(0, 10);
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes
      .filter((route) => route.indexed !== false)
      .map((route) =>
        [
          "  <url>",
          `    <loc>${absolute(route.path)}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <priority>${route.path === "/" ? "1.0" : "0.8"}</priority>`,
          "  </url>",
        ].join("\n"),
      ),
    "</urlset>",
  ].join("\n");

  await writeFile(path.join(outDir, "sitemap.xml"), `${sitemap}\n`, "utf8");
  console.log(`  sitemap.xml            → ${routes.filter((r) => r.indexed !== false).length} urls`);
}

main().catch((error) => {
  console.error("prerender failed:", error);
  process.exit(1);
});

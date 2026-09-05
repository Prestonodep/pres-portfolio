/*
Single source of truth for the site's SEO.

Consumed twice: by the app at runtime (useSeo, for client-side navigation) and by
scripts/prerender.ts at build time, which bakes these values into static HTML for each route.
The build-time pass is the one that matters most — social crawlers do not run JavaScript, so a
tag React sets after hydration is invisible to LinkedIn, WhatsApp and Slack.

═══════════════════════════════════════════════════════════════════════════════════════════
SITE_URL must match the domain the site is actually served from. A canonical or og:url
pointing at the wrong host is worse than having none: it tells search engines the real page
lives somewhere else. This default comes from the DreamHost path in .github/workflows/deploy.yml.
═══════════════════════════════════════════════════════════════════════════════════════════
*/
export const SITE_URL = "https://preston.medisesession.co.ke";

export const SITE_NAME = "Preston Odep";
export const AUTHOR = "Preston Odep";
export const LOCALE = "en_KE";
export const LINKEDIN_URL = "https://www.linkedin.com/in/preston-odep/";

/* The lime accent, used for the browser UI tint on mobile. */
export const THEME_COLOR = "#cafF33";

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  /* Absolute path to a 1200x630 share image. */
  image: string;
  imageAlt: string;
  /* Feeds og:type — "profile" for the person, "article" for a case study. */
  type: "website" | "article";
  /* Case studies get a breadcrumb and a CreativeWork entry; the home page does not. */
  breadcrumb?: string;
  /* Left out of the sitemap when false. */
  indexed?: boolean;
};

export const routes: RouteSeo[] = [
  {
    path: "/",
    title: "Preston Odep — Product, Brand & UI/UX Designer in Nairobi",
    description:
      "Multi-disciplinary designer in Nairobi, Kenya. 8+ years across product strategy, UI/UX, brand identity and websites for teams building across Africa.",
    image: "/og/preston-odep.png",
    imageAlt: "Preston Odep — multi-disciplinary designer, Nairobi, Kenya",
    type: "website",
  },
  {
    path: "/work/tuzidi",
    title: "Tuzidi — Ride-Hailing Brand & Product Design | Preston Odep",
    description:
      "Brand identity and product design for Tuzidi, a Nairobi ride-hailing and delivery marketplace: no surge pricing, corridor-based streams, 18 screens.",
    image: "/og/tuzidi.png",
    imageAlt: "Tuzidi — a ride-hailing and delivery marketplace built for Nairobi",
    type: "article",
    breadcrumb: "Tuzidi",
  },
  {
    path: "/work/supashopper",
    title: "SupaShopper — M-PESA for Products | Preston Odep",
    description:
      "Brand, product design and build for SupaShopper: a Kenyan platform turning a supermarket shop into a transferable, price-locked Token redeemable anywhere.",
    image: "/og/supashopper.png",
    imageAlt: "SupaShopper — M-PESA, but for products",
    type: "article",
    breadcrumb: "SupaShopper",
  },
];

export const notFoundSeo: RouteSeo = {
  path: "/404",
  title: "Page not found | Preston Odep",
  description: "That page does not exist. Head back to the portfolio to see the work.",
  image: "/og/preston-odep.png",
  imageAlt: "Preston Odep — multi-disciplinary designer, Nairobi, Kenya",
  type: "website",
  indexed: false,
};

/* The root canonical keeps its trailing slash; nested routes carry none. Whatever is chosen
   here must match what the server actually serves, or canonical and reality disagree. */
export const absolute = (pathname: string) =>
  pathname === "/" ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;

export const seoForPath = (pathname: string): RouteSeo =>
  routes.find((route) => route.path === pathname) ?? notFoundSeo;

/*
Structured data. The Person entry is what a search engine uses to build a knowledge panel for
a name query, which for a personal portfolio is the search that matters most.
*/
export const personSchema = () => ({
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: AUTHOR,
  url: SITE_URL,
  image: `${SITE_URL}/og/preston-odep.png`,
  jobTitle: "Multi-Disciplinary Designer",
  description:
    "Multi-disciplinary designer working across product strategy, UI/UX, brand identity and web design.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [LINKEDIN_URL],
  knowsAbout: [
    "Product Strategy",
    "UI/UX Design",
    "Brand Identity",
    "Design Systems",
    "Art Direction",
    "Web Design",
  ],
});

export const schemaForRoute = (route: RouteSeo) => {
  const graph: Record<string, unknown>[] = [
    personSchema(),
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": route.type === "article" ? "WebPage" : "ProfilePage",
      "@id": `${absolute(route.path)}#webpage`,
      url: absolute(route.path),
      name: route.title,
      description: route.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      primaryImageOfPage: `${SITE_URL}${route.image}`,
    },
  ];

  if (route.breadcrumb) {
    graph.push({
      "@type": "CreativeWork",
      "@id": `${absolute(route.path)}#work`,
      name: route.breadcrumb,
      headline: route.title,
      description: route.description,
      image: `${SITE_URL}${route.image}`,
      creator: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    });
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${absolute(route.path)}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#work` },
        { "@type": "ListItem", position: 3, name: route.breadcrumb },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
};

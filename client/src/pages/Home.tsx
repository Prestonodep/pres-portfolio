/*
Design Philosophy Reminder — Home Page
Editorial Noir with Electric Lime Accents: oversized Playfair Display headlines, Plus Jakarta Sans body copy,
asymmetric editorial composition, restrained acid-lime emphasis, cool slate section breaks, premium motion,
and evidence-led storytelling. Every section should feel art-directed, never generic.

Layout note: from `lg` up this page reads left-to-right. Each <Panel> is one viewport-wide stop on a
horizontal track driven by useHorizontalDeck; below `lg` the identical markup stacks vertically again.
Because a panel is one screen, tall material is split across several panels rather than compressed —
About becomes intro + facts, and Work becomes an index followed by one panel per case study.
*/

import type { MouseEvent, ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  ChevronRight,
  Mail,
  MapPin,
  Moon,
  SunMedium,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useHorizontalDeck } from "@/hooks/useHorizontalDeck";
import { cn } from "@/lib/utils";

type CaseStudy = {
  id: string;
  eyebrow: string;
  title: string;
  role: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  impact: string[];
  liveUrl?: string;
  image: string;
  imageAlt: string;
};

const mailtoHref =
  "mailto:prestonodep@gmail.com?subject=Hey%20Pres,%20landed%20on%20your%20web%20portfolio";

const navLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

const services = [
  {
    number: "01",
    title: "Product Strategy",
    description:
      "I help teams clarify the problem, define opportunity areas, map user journeys, and align product direction before design effort turns into expensive guesswork.",
    tags: ["Roadmapping", "User Journeys", "Design Audits", "Opportunity Mapping"],
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "From flows and wireframes to polished interfaces and developer-ready systems, I design experiences that make complex products feel intuitive, useful, and trustworthy.",
    tags: ["Research", "Wireframes", "Prototypes", "Design Systems"],
  },
  {
    number: "03",
    title: "Logo & Brand Identity",
    description:
      "I build identity systems that give brands a clear voice through marks, type, colour, and usage rules that remain consistent across touchpoints.",
    tags: ["Identity Systems", "Typography", "Guidelines", "Campaign Assets"],
  },
  {
    number: "04",
    title: "Website Design",
    description:
      "I design modern marketing, portfolio, and product websites that combine credibility, responsiveness, and conversion thinking.",
    tags: ["Marketing Sites", "Storytelling", "Responsive Design", "Conversion"],
  },
] as const;

const caseStudies: CaseStudy[] = [
  {
    id: "catalyst",
    eyebrow: "Project 01 · Data-Rich Product Design",
    title: "Catalyst Explorer — Making Complex Governance Data Searchable, Understandable, and Actionable",
    role: "Lead Product Designer",
    category: "Information Architecture · Research UX · Discovery Systems",
    summary:
      "I led product design thinking for a platform experience that helps people navigate Project Catalyst more effectively by turning fragmented public information into a discoverable, structured research product.",
    problem:
      "The underlying ecosystem contains proposals, reports, assessments, profiles, votes, and accountability signals spread across multiple sources. For newcomers and experienced participants alike, the challenge is not lack of data, but difficulty finding meaning inside it.",
    approach:
      "I focused on reducing cognitive overload through navigation systems, layered exploration, search-led discovery, filter clarity, view states, and interfaces that make dense governance information feel explorable rather than intimidating.",
    outcome:
      "Public descriptions of Catalyst Explorer highlight its role in making proposal data, filters, profiles, charts, assessments, and community accountability easier to access and understand. The design opportunity was therefore to create trust through structure, and usability through clarity.",
    impact: ["Deep research journeys", "Search-led exploration", "Clearer accountability visibility"],
    liveUrl: "https://www.catalystexplorer.com/en/",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/catalyst_8635dba2.webp",
    imageAlt: "Catalyst Explorer interface with search and navigation panels",
  },
  {
    id: "cats",
    eyebrow: "Project 02 · Art Direction",
    title: "Cardano Africa Tech Summit — Art Direction for a Continental Builder Ecosystem",
    role: "Art Direction Lead",
    category: "Event Identity · Campaign Design · Experience Communication",
    summary:
      "I led art direction for Cardano Africa Tech Summit, helping shape the visual language for an event that brought together developers, entrepreneurs, community leaders, and ecosystem voices from across Africa.",
    problem:
      "The summit needed a visual system capable of feeling credible to a global technology audience while remaining energetic, regionally grounded, and compelling across event promotion, screens, stage moments, and digital communication.",
    approach:
      "I developed a direction built around contrast, motion, high-energy typography, ecosystem symbolism, and campaign consistency so the event could feel coordinated across touchpoints instead of visually fragmented.",
    outcome:
      "The summit publicly frames itself as a multi-day journey connecting hackathons, onboarding, community, policy, and ecosystem growth in Nairobi. That visibility made cohesive art direction especially important for trust, memorability, and momentum across audiences.",
    impact: ["Multi-day event system", "Builder-focused visual identity", "High-visibility ecosystem storytelling"],
    liveUrl: "https://cats.wada.org/",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/cats_b8c2b757.webp",
    imageAlt: "Cardano Africa Tech Summit event website and hero artwork",
  },
  {
    id: "blockchain-centre",
    eyebrow: "Project 03 · Brand Identity",
    title: "Blockchain Centre Nairobi — Building a Brand for a Web3 Learning and Community Hub",
    role: "Brand Identity Director",
    category: "Brand Strategy · Identity Systems · Community Design",
    summary:
      "I led brand identity thinking for Blockchain Centre Nairobi, a physical and cultural hub where education, events, collaboration, and Web3 community-building converge.",
    problem:
      "The brand needed to welcome beginners without alienating experienced builders, feel credible to partners, work across physical space and digital media, and reflect both openness and ambition.",
    approach:
      "I shaped an identity system designed to feel accessible, future-facing, and community-driven. The system needed enough warmth for an educational environment and enough structure for a serious technology institution.",
    outcome:
      "Blockchain Centre Nairobi publicly presents itself as a hub for blockchain learning, events, collaboration, hackathons, and builder community in Nairobi. The identity therefore had to support place-making as much as communication, helping people understand not only what the centre looks like, but what it stands for.",
    impact: ["Community-first positioning", "Physical + digital brand expression", "Welcoming but credible identity system"],
    liveUrl: "https://www.blockchaincentrenbo.com/",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/blockchain-centre_be718c7a.webp",
    imageAlt: "Blockchain Centre Nairobi interior and brand environment",
  },
  {
    id: "solutech",
    eyebrow: "Project 04 · Product Design",
    title: "Solutech Limited — Designing a Sales Automation Platform Built for African Field Teams",
    role: "Product Designer",
    category: "Product Strategy · Enterprise UX · Sales Enablement",
    summary:
      "I worked as the product designer helping shape a sales automation experience used by teams operating across African markets. The challenge was translating the complexity of field sales, van sales, order workflows, merchandising, and reporting into a system that felt fast, usable, and decision-ready for distributed teams.",
    problem:
      "Sales and distribution operations often involve fragmented visibility, slow reporting loops, and workflow friction between teams in the field and decision-makers in-office. In environments where speed and clarity matter, poor product experience can slow down execution and reduce trust in the data itself.",
    approach:
      "I focused on simplifying operational complexity into clear task flows, modular dashboards, practical information hierarchy, and interfaces that support both action and oversight. The design emphasis was not just beauty, but confidence: helping users know what matters, what to do next, and where performance is trending.",
    outcome:
      "The resulting product direction supports easier field execution, better visibility, and stronger adoption of sales automation workflows in real operating environments. Solutech publicly positions the platform around AI-powered sales and distribution efficiency, enterprise adoption, and cross-country scale, which makes usability and trust central to the product value proposition.",
    impact: ["5,000+ field users", "120+ enterprise customers", "13+ countries served"],
    liveUrl: "https://solutech.co.ke/",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/solutech_e4cfcbc9.webp",
    imageAlt: "Solutech sales automation website and dashboard preview",
  },
  {
    id: "supashoppa",
    eyebrow: "Project 05 · Concept Product",
    title: "SupaShoppa — Turning Retail Shopping Into a Transferable Digital Asset",
    role: "Product Strategist · UX Designer",
    category: "Concept Design · Fintech UX · Retail & Payments",
    summary:
      "SupaShoppa is a mobile-first concept that turns a supermarket purchase into a Token: an itemised, price-locked digital instrument that can be held, sent to another person, or redeemed at any outlet of the partner retailer. In one line, M-PESA for products rather than money.",
    problem:
      "Money sent home for shopping does not reliably become shopping. The payer is rarely the person who needs the goods, cash offers no purpose control while value vouchers offer no product control, and inflation quietly erodes what a transfer buys between the day it is sent and the day it is spent.",
    approach:
      "I designed the concept around one loop — shop, tokenise, send, redeem — and a strict rule that a Token's contents can only shrink, never grow. Around that sit the flows that make it survive real retail: partial redemption with a smart remainder when stock runs out, requests so a recipient can propose the basket, group contribution for chama and harambee funding, and QR at the till alongside USSD for feature phones.",
    outcome:
      "The concept resolves into four designed surfaces — a consumer app, a cashier redemption portal, a retailer HQ portal, and USSD menu scripts — held together by a documented Token lifecycle, expiry into an equivalent Voucher, and a trust-account settlement model. The design targets were operational: a redemption under a minute at a busy till, on low-end Android, in English and Kiswahili.",
    impact: ["Product-denominated tokens", "USSD redemption for feature phones", "Sub-60s redemption at the till"],
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/preston-retail-concept-v2-WYJvAsdqRAWzbwbkaWbAwn.webp",
    imageAlt: "Supermarket aisle used to illustrate the SupaShoppa retail tokenisation concept",
  },
];

const skillBars = [
  { label: "UI / Visual Design", value: 95 },
  { label: "UX Research & Strategy", value: 92 },
  { label: "Design Systems", value: 88 },
  { label: "Prototyping & Testing", value: 90 },
  { label: "Brand Identity Design", value: 85 },
  { label: "Front-End (HTML/CSS/JS)", value: 40 },
] as const;

const toolGroups = [
  { title: "Design & Prototyping", items: ["Figma", "Adobe XD", "Sketch"] },
  { title: "Research & Strategy", items: ["User Interviews", "Usability Testing", "A/B Testing"] },
  { title: "Visual & Brand", items: ["Illustrator", "Photoshop", "After Effects", "Premiere Pro"] },
] as const;

const process = [
  {
    number: "01",
    title: "Discover",
    text: "I begin by understanding the context, the users, and the real problem beneath the brief. Research, references, interviews, and audits help replace assumption with clarity.",
  },
  {
    number: "02",
    title: "Define",
    text: "I translate insights into strategic direction by aligning goals, journey pain points, opportunity areas, and the criteria that will make the work successful.",
  },
  {
    number: "03",
    title: "Design",
    text: "I explore ideas through flows, wireframes, visual systems, prototypes, and feedback loops until the solution feels both compelling and practical.",
  },
  {
    number: "04",
    title: "Deliver",
    text: "I package the work for execution with the right systems, documentation, and implementation support so the final output survives beyond presentation mode.",
  },
] as const;

const tickerItems = [
  "Product Strategy",
  "UI/UX Design",
  "Logo & Brand Identity",
  "Website Design",
  "Design Systems",
  "Prototyping",
  "Research Thinking",
  "Art Direction",
] as const;

const aboutTags = [
  "Product Strategy",
  "UX Research",
  "UI Design",
  "Brand Identity",
  "Website Design",
  "Design Systems",
  "Art Direction",
  "Inclusive Design",
] as const;

const aboutStats = [
  { value: "8+", label: "Years in design" },
  { value: "5", label: "Disciplines practiced" },
  { value: "Africa", label: "Primary market focus" },
] as const;

type PanelProps = {
  id: string;
  nav: string;
  className?: string;
  children: ReactNode;
};

/*
One stop on the deck. `data-panel` is what the controller steps between, `data-nav` tells the
header which link to light up. Vertical padding below lg, fixed-chrome insets above it.
*/
function Panel({ id, nav, className, children }: PanelProps) {
  return (
    <section
      id={id}
      data-panel=""
      data-nav={nav}
      className={cn(
        "relative w-full py-16 lg:flex lg:h-full lg:w-screen lg:shrink-0 lg:snap-start lg:flex-col lg:justify-center lg:overflow-y-auto lg:pt-[var(--deck-top)] lg:pb-[var(--deck-bottom)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { trackRef, scrollToId, activeNav, progress } = useHorizontalDeck();

  const handleJump = (event: MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground lg:h-full lg:min-h-0 lg:overflow-hidden">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(202,255,51,0.12),transparent_22%),radial-gradient(circle_at_12%_16%,rgba(74,95,190,0.12),transparent_24%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.02))] dark:bg-[radial-gradient(circle_at_top_right,rgba(202,255,51,0.13),transparent_22%),radial-gradient(circle_at_12%_16%,rgba(74,95,190,0.16),transparent_24%),linear-gradient(to_bottom,transparent,rgba(255,255,255,0.02))]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl lg:fixed lg:inset-x-0 lg:top-0">
        <div className="container flex items-center justify-between gap-6 py-4">
          <a href="#hero" onClick={(event) => handleJump(event, "hero")} className="group inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary transition-transform duration-300 group-hover:scale-105">
              P
            </span>
            <div>
              <p className="font-display text-lg font-black tracking-tight text-foreground">Preston Odep</p>
              <p className="text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground">
                Multi-disciplinary designer
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => handleJump(event, link.id)}
                aria-current={activeNav === link.id ? "true" : undefined}
                className={cn(
                  "transition-colors hover:text-foreground",
                  activeNav === link.id && "text-foreground",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleTheme?.()}
              aria-label="Toggle colour theme"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="#contact"
              onClick={(event) => handleJump(event, "contact")}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(202,255,51,0.28)]"
            >
              Email Me
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* travel indicator — only meaningful once the deck is horizontal */}
        <div className="absolute inset-x-0 bottom-0 hidden h-[3px] bg-border/50 lg:block">
          <div
            className="h-full bg-primary shadow-[0_0_18px_rgba(202,255,51,0.5)] transition-[width] duration-300 ease-out"
            style={{ width: `${Math.max(progress * 100, 2)}%` }}
          />
        </div>
      </header>

      {/* Smoothing is applied per scroll call in useHorizontalDeck, not via CSS scroll-behavior. */}
      <main
        ref={trackRef}
        className="deck-track relative z-10 lg:flex lg:h-screen lg:snap-x lg:snap-mandatory lg:overflow-x-auto lg:overflow-y-hidden"
      >
        <Panel id="hero" nav="hero">
          <div className="container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-muted-foreground shadow-sm">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(202,255,51,0.8)]" />
                Hi, I&apos;m Preston Odep
              </div>
              <h1 className="hero-title max-w-4xl">
                Multi-Disciplinary
                <span className="block italic text-primary">Designer</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground lg:text-[0.95rem] lg:leading-7">
                I design products, brands, and digital experiences that help ambitious teams across Africa
                communicate clearly, move faster, and earn trust. Over the last 8+ years, I’ve worked across
                product strategy, UI/UX, brand systems, websites, and event design to turn complex ideas
                into experiences people can actually use.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  onClick={(event) => handleJump(event, "work")}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(202,255,51,0.28)]"
                >
                  View My Work
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                >
                  Email Me
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-5 border-l-2 border-primary/30 pl-5 lg:mt-8">
                <div>
                  <p className="font-display text-3xl font-black tracking-tight">8+</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Years experience</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="font-display text-3xl font-black tracking-tight">Nairobi</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Kenya based</p>
                </div>
              </div>

              <p className="mt-8 hidden items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground lg:inline-flex">
                Scroll sideways
                <ArrowRight className="deck-arrow h-4 w-4 text-primary" />
              </p>
            </div>

            <div>
              <div className="relative overflow-hidden rounded-[2rem] border border-[#232733]/70 bg-[linear-gradient(135deg,#243f6f_0%,#1c2740_58%,#12161f_100%)] text-white shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(202,255,51,0.14),transparent_18%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.08),transparent_20%)]" />
                <div className="absolute right-6 top-6 z-10 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
                  Available for select projects
                </div>
                <div className="relative min-h-[28rem] p-6 md:min-h-[38rem] md:p-8 lg:min-h-[clamp(26rem,66vh,34rem)]">
                  <div className="absolute inset-y-0 right-0 w-full md:w-[76%]">
                    <img
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/Presintro_57af09ff.png"
                      alt="Preston Odep portrait for portfolio hero section"
                      className="absolute bottom-0 right-0 h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,22,31,0.84)_0%,rgba(18,22,31,0.62)_33%,rgba(18,22,31,0.18)_60%,rgba(18,22,31,0.04)_100%)]" />
                  <div className="relative flex h-full flex-col justify-end">
                    <div className="max-w-sm rounded-[1.7rem] border border-white/10 bg-black/22 p-6 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-primary">Researcher · Designer · Strategist</p>
                      <h3 className="mt-4 font-display text-4xl font-black tracking-tight text-white lg:text-3xl">
                        Building experiences that turn complexity into clarity.
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/76">
                        I work across product strategy, UI/UX, identity, and websites with a systems-aware approach shaped for real-world adoption.
                      </p>
                    </div>

                    <div className="mt-6 grid gap-4 sm:max-w-xl sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/70">Focus</p>
                        <p className="mt-2 text-sm font-medium leading-6 text-white/88">
                          Product strategy, UI/UX, brand identity, websites, and art direction.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-primary/30 bg-primary/12 p-4 backdrop-blur-sm">
                        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-primary">Based in</p>
                        <p className="mt-2 text-sm font-medium leading-6 text-white/88">
                          Nairobi, Kenya — designing for African users, teams, and ecosystems.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        {/* Lime ticker: a horizontal band when stacked, a vertical rail between deck panels. */}
        <section
          aria-hidden="true"
          className="overflow-hidden border-y border-primary/30 bg-primary py-4 text-primary-foreground lg:hidden"
        >
          <div className="ticker-track flex min-w-max gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-[0.25em]">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-8 px-2">
                {item}
                <span className="text-primary-foreground/50">✦</span>
              </span>
            ))}
          </div>
        </section>

        <div
          aria-hidden="true"
          className="hidden overflow-hidden border-x border-primary/30 bg-primary text-primary-foreground lg:block lg:h-full lg:w-24 lg:shrink-0"
        >
          <div className="ticker-rail whitespace-nowrap py-6 text-center text-sm font-bold uppercase tracking-[0.25em] [writing-mode:vertical-rl]">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-rail-${index}`}>
                {item}
                <span className="mx-8 text-primary-foreground/50">✦</span>
              </span>
            ))}
          </div>
        </div>

        <Panel id="about" nav="about" className="bg-[#1f232e] text-white dark:bg-[#171a23]">
          <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/prescartoon_77b8f724.png"
                  alt="Cartoon illustration of Preston Odep"
                  className="h-[28rem] w-full object-contain object-center lg:h-[clamp(20rem,52vh,26rem)]"
                />
              </div>
              <div className="absolute -bottom-6 right-6 max-w-xs rounded-[1.5rem] border border-primary/30 bg-primary px-5 py-4 text-primary-foreground shadow-[0_20px_50px_rgba(202,255,51,0.22)]">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] opacity-70">Positioning</p>
                <p className="mt-2 text-sm font-semibold leading-6">
                  Designing for African users, complex systems, and brands that need clarity.
                </p>
              </div>
            </div>

            <div>
              <p className="section-label text-white/65">Who I Am</p>
              <h2 className="section-heading mt-4 text-white">
                Senior <span className="italic text-primary">multi-disciplinary</span>
                <br /> designer
              </h2>
              <div className="mt-8 space-y-6 text-[1rem] leading-8 text-[#c9d0de] lg:mt-6 lg:space-y-4 lg:text-[0.95rem] lg:leading-7">
                <p>
                  Hellooo, I’m <strong className="text-white">Preston Odep</strong> — a multi-disciplinary
                  designer based in <strong className="text-white">Nairobi, Kenya</strong>. I build meaningful
                  digital experiences and visual systems that help products, communities, and brands
                  communicate with clarity.
                </p>
                <p>
                  Over the past <strong className="text-white">8+ years</strong>, I’ve collaborated with
                  startups, growing businesses, and ecosystem builders across product design, brand identity,
                  digital strategy, and web experiences. My approach blends research, systems thinking, and
                  strong craft so the final work is not only visually polished, but genuinely useful.
                </p>
                <p>
                  I care deeply about designing for <strong className="text-white">African users</strong>,
                  simplifying complex technology, and building work that can scale across real-world adoption.
                  Outside design, I’m still a major football fan who believes <strong className="text-white">Manchester United</strong>
                  is the best team ever and Messi is the <strong className="text-white">G.O.A.T.</strong>
                </p>
              </div>
            </div>
          </div>
        </Panel>

        <Panel id="about-facts" nav="about" className="bg-[#1f232e] text-white dark:bg-[#171a23]">
          <div className="container">
            <p className="section-label text-white/65">The Short Version</p>
            <h2 className="section-heading mt-4 text-white">
              Range, built on <span className="italic text-primary">practice</span>
            </h2>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-7">
                  <p className="font-display text-[clamp(2.6rem,4vw,4rem)] font-black leading-none text-white">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#c9d0de]">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-xs font-semibold uppercase tracking-[0.26em] text-white/50">
              Disciplines I practice
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {aboutTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-[#dce2ef]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Panel>

        <Panel id="services" nav="services">
          <div className="container">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-label">What I Do</p>
                <h2 className="section-heading mt-4">
                  Strategic services built for <span className="italic text-primary">clarity</span>
                </h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-muted-foreground lg:text-sm lg:leading-7">
                I work across product, brand, and digital touchpoints, but always with the same principle:
                make the experience clearer, more useful, and more believable than it was before.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-8 lg:grid-cols-4">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="group flex flex-col rounded-[2rem] border border-border bg-card p-7 shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1 lg:p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    {service.number}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-black tracking-tight text-card-foreground lg:mt-3 lg:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 flex-1 text-base leading-8 text-muted-foreground lg:mt-3 lg:text-sm lg:leading-6">
                    {service.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5 lg:mt-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Panel>

        <Panel id="work" nav="work" className="bg-[#f4f2ea] text-[#101114] dark:bg-[#0f1116] dark:text-white">
          <div className="container">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-label text-[#54555d] dark:text-white/60">Recent Work</p>
                <h2 className="section-heading mt-4 text-[#101114] dark:text-white">
                  Five selected projects that show range,
                  <span className="italic text-primary"> strategy, and conversion thinking</span>
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-[#50525a] dark:text-white/70 lg:text-sm lg:leading-7">
                This selection balances enterprise UX, data-rich product design, art direction, community
                branding, and concept-driven service innovation. Each story is framed to explain the business
                problem, the design response, and the value created.
              </p>
            </div>

            {/* 3-up keeps the index tidy whether the list runs to five projects or six */}
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-8 lg:grid-cols-3">
              {caseStudies.map((study, index) => (
                <button
                  key={study.id}
                  type="button"
                  onClick={(event) => handleJump(event, `case-${study.id}`)}
                  className="group flex h-full flex-col rounded-[1.5rem] border border-black/10 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 dark:border-white/10 dark:bg-[#171a23]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#666b75] dark:text-white/55">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#666b75] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary dark:text-white/55" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-black leading-tight tracking-tight">
                    {study.title.split(" — ")[0]}
                  </h3>
                  <p className="mt-3 flex-1 text-xs uppercase tracking-[0.16em] text-[#666b75] dark:text-white/50">
                    {study.role}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </Panel>

        {caseStudies.map((study) => (
          <Panel
            key={study.id}
            id={`case-${study.id}`}
            nav="work"
            className="bg-[#f4f2ea] text-[#101114] dark:bg-[#0f1116] dark:text-white"
          >
            <div className="container grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
              <div className="overflow-hidden rounded-[2rem] border border-black/10 shadow-[0_25px_70px_rgba(0,0,0,0.12)] dark:border-white/10">
                <img
                  src={study.image}
                  alt={study.imageAlt}
                  className="h-72 w-full object-cover object-center md:h-96 lg:h-[clamp(22rem,58vh,32rem)]"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{study.eyebrow}</p>
                <h3 className="mt-4 font-display text-[clamp(1.8rem,2.5vw,2.5rem)] font-black leading-[1.03] tracking-tight lg:mt-2">
                  {study.title}
                </h3>

                <div className="mt-5 flex flex-wrap gap-3 text-xs lg:mt-4">
                  <span className="rounded-full border border-black/10 bg-white px-4 py-2 font-semibold uppercase tracking-[0.16em] text-[#4f525a] dark:border-white/10 dark:bg-[#171a23] dark:text-white/70">
                    {study.role}
                  </span>
                  <span className="rounded-full border border-black/10 bg-white px-4 py-2 font-semibold uppercase tracking-[0.16em] text-[#4f525a] dark:border-white/10 dark:bg-[#171a23] dark:text-white/70">
                    {study.category}
                  </span>
                </div>

                <div className="mt-7 grid gap-x-8 gap-y-6 text-[#474a52] dark:text-white/72 sm:grid-cols-2 lg:mt-4 lg:gap-y-4">
                  {(
                    [
                      ["Summary", study.summary],
                      ["Problem", study.problem],
                      ["Approach", study.approach],
                      ["Outcome", study.outcome],
                    ] as const
                  ).map(([label, body]) => (
                    <div key={label}>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{label}</p>
                      <p className="case-copy mt-2.5">{body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3 lg:mt-4">
                  {study.impact.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Live link when the project is public; static badge while it is not */}
                <div className="mt-7 lg:mt-5">
                  {study.liveUrl ? (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${study.title.split(" — ")[0]} live in a new tab`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(202,255,51,0.28)]"
                    >
                      View Live Project
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-[#666b75] dark:border-white/10 dark:bg-[#171a23] dark:text-white/55">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Panel>
        ))}

        <Panel id="skills" nav="skills" className="bg-[#12151d] text-white">
          <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-label text-white/55">Expertise</p>
              <h2 className="section-heading mt-4 text-white">
                Education &amp; <span className="italic text-primary">My Skills</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/68 lg:text-sm lg:leading-7">
                Eight-plus years of craft across fintech, Web3, events, brand systems, and digital product
                design — with enough breadth to move between discovery and delivery without losing strategic
                depth.
              </p>

              <div className="mt-10 space-y-6 lg:mt-8 lg:space-y-4">
                {skillBars.map((skill) => (
                  <div key={skill.label}>
                    <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                      <span className="font-medium text-white/82">{skill.label}</span>
                      <span className="font-semibold text-primary">{skill.value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/8">
                      <div
                        className="h-3 rounded-full bg-primary shadow-[0_0_22px_rgba(202,255,51,0.26)]"
                        style={{ width: `${skill.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {toolGroups.map((group) => (
                <article key={group.title} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">{group.title}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm font-medium text-white/84"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Panel>

        <Panel id="process" nav="skills">
          <div className="container">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-label">How I Work</p>
                <h2 className="section-heading mt-4">
                  My design <span className="italic text-primary">process</span>
                </h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-muted-foreground lg:text-sm lg:leading-7">
                Every strong outcome starts with the right framing. My process is designed to move from
                ambiguity to alignment, then from alignment to execution.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-8 lg:grid-cols-4">
              {process.map((step) => (
                <article
                  key={step.number}
                  className="rounded-[1.8rem] border border-border bg-card p-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-3xl font-black text-primary">{step.number}</span>
                    <div className="rounded-full border border-border bg-muted px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                      Process
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-black tracking-tight text-card-foreground lg:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-muted-foreground lg:text-sm lg:leading-7">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Panel>

        <Panel id="cta" nav="contact" className="border-y border-primary/30 bg-primary text-primary-foreground">
          <div className="container flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
                Available for Projects
              </p>
              <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.8rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.04em]">
                Let’s build something that feels clear, credible, and hard to ignore
              </h2>
            </div>
            <a
              href={mailtoHref}
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#111217] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black lg:self-auto"
            >
              Email Me
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Panel>

        <Panel id="contact" nav="contact">
          <div className="container">
            <p className="section-label">Get In Touch</p>
            <h2 className="section-heading mt-4">
              Contact <span className="italic text-primary">Me</span>
            </h2>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_20px_60px_rgba(0,0,0,0.07)] lg:p-6">
                <p className="text-base leading-8 text-muted-foreground lg:text-sm lg:leading-7">
                  Whether you need a product designer, a brand system, or a sharper digital presence, I’m
                  open to thoughtful projects and meaningful collaborations.
                </p>

                <div className="mt-8 space-y-5 lg:mt-6 lg:space-y-3">
                  <div className="flex items-start gap-4 rounded-[1.25rem] border border-border bg-background p-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
                      <a href={mailtoHref} className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary">
                        Email Me
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-[1.25rem] border border-border bg-background p-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                      <CalendarClock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Availability</p>
                      <p className="mt-2 text-base font-semibold text-foreground">Open to new projects</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-[1.25rem] border border-border bg-background p-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Based In</p>
                      <p className="mt-2 text-base font-semibold text-foreground">Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-border bg-[#12151d] p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] lg:p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-primary">Best for</p>
                <h3 className="mt-4 font-display text-4xl font-black tracking-tight lg:text-3xl">
                  Designers aren’t hired for polish alone.
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 lg:text-sm lg:leading-7">
                  They’re hired because the work helps a product make sense, a brand feel believable, or a
                  digital experience move people closer to action. If that is what you need, let’s talk.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-6">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/55">Ideal engagements</p>
                    <p className="mt-3 text-sm leading-7 text-white/80 lg:leading-6">
                      Product discovery, portfolio refreshes, brand direction, marketing sites, and systems-led UX.
                    </p>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/55">Preferred approach</p>
                    <p className="mt-3 text-sm leading-7 text-white/80 lg:leading-6">
                      Clear goals, collaborative communication, practical timelines, and work that must perform beyond presentation slides.
                    </p>
                  </div>
                </div>

                <a
                  href={mailtoHref}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(202,255,51,0.25)] lg:mt-6"
                >
                  Email Me
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Panel>
      </main>

      <footer className="relative z-40 border-t border-border bg-card/80 backdrop-blur-md lg:fixed lg:inset-x-0 lg:bottom-0">
        <div className="container flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-3">
          <div>
            <p className="font-display text-3xl font-black tracking-tight text-card-foreground lg:text-xl">Preston.</p>
            <p className="mt-2 text-sm text-muted-foreground lg:hidden">Designed with intention in Nairobi, Kenya</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => handleJump(event, link.id)}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.linkedin.com/in/preston-odep/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">© 2026 Preston Odep. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
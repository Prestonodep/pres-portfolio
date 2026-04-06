/*
Design Philosophy Reminder — Home Page
Editorial Noir with Electric Lime Accents: oversized Playfair Display headlines, Plus Jakarta Sans body copy,
asymmetric editorial composition, restrained acid-lime emphasis, cool slate section breaks, premium motion,
and evidence-led storytelling. Every section should feel art-directed, never generic.
*/

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  ChevronRight,
  Mail,
  MapPin,
  Moon,
  SunMedium,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

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
  image: string;
  imageAlt: string;
};

const mailtoHref =
  "mailto:prestonodep@gmail.com?subject=Hey%20Pres,%20landed%20on%20your%20web%20portfolio";

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
    id: "solutech",
    eyebrow: "Project 01 · Product Design",
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
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/solutech_e4cfcbc9.webp",
    imageAlt: "Solutech sales automation website and dashboard preview",
  },
  {
    id: "catalyst",
    eyebrow: "Project 02 · Data-Rich Product Design",
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
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/catalyst_8635dba2.webp",
    imageAlt: "Catalyst Explorer interface with search and navigation panels",
  },
  {
    id: "cats",
    eyebrow: "Project 03 · Art Direction",
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
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/cats_b8c2b757.webp",
    imageAlt: "Cardano Africa Tech Summit event website and hero artwork",
  },
  {
    id: "blockchain-centre",
    eyebrow: "Project 04 · Brand Identity",
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
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/blockchain-centre_be718c7a.webp",
    imageAlt: "Blockchain Centre Nairobi interior and brand environment",
  },
  {
    id: "shelfsense",
    eyebrow: "Project 05 · Concept Product",
    title: "ShelfSense RT — A Real-Time Expiry Intelligence Concept for Modern Retail",
    role: "Product Strategist · UX Designer",
    category: "Concept Design · Retail Operations · Service Innovation",
    summary:
      "ShelfSense RT is a concept solution designed to help supermarkets reduce expiry losses by combining smart shelf monitoring, batch-level tracking, prioritised staff alerts, and actionable inventory workflows.",
    problem:
      "Expiring products often remain unnoticed until markdown windows are missed or waste has already occurred. Store teams may have inventory data, but not always the visibility, timing, or prioritisation needed at shelf level.",
    approach:
      "I designed the concept around a simple operational loop: detect products nearing expiry, prioritise action by urgency and value, guide staff on what to remove, discount, relocate, or replenish, and provide managers with live risk visibility across categories and branches.",
    outcome:
      "The concept combines dashboard oversight, aisle-level task views, smart expiry warnings, and recommendation logic for markdowns, transfers, or stock rotation. It demonstrates how design can reduce waste, protect margin, and make the right operational decision easier to see in time.",
    impact: ["Expiry risk dashboards", "Shelf-level intervention cues", "Waste reduction through earlier action"],
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/preston-retail-concept-v2-WYJvAsdqRAWzbwbkaWbAwn.webp",
    imageAlt: "Supermarket aisle used to illustrate shelf expiry monitoring concept",
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

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState(caseStudies[0].id);

  const selectedCaseStudy = useMemo(
    () => caseStudies.find((study) => study.id === selectedCaseStudyId) ?? caseStudies[0],
    [selectedCaseStudyId],
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(202,255,51,0.12),transparent_22%),radial-gradient(circle_at_12%_16%,rgba(74,95,190,0.12),transparent_24%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.02))] dark:bg-[radial-gradient(circle_at_top_right,rgba(202,255,51,0.13),transparent_22%),radial-gradient(circle_at_12%_16%,rgba(74,95,190,0.16),transparent_24%),linear-gradient(to_bottom,transparent,rgba(255,255,255,0.02))]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-6 py-4">
          <a href="#hero" className="group inline-flex items-center gap-3">
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
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#skills" className="transition-colors hover:text-foreground">Skills</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
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
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(202,255,51,0.28)]"
            >
              Email Me
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="hero" className="container grid gap-12 py-16 lg:min-h-[calc(100vh-88px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(202,255,51,0.8)]" />
              Hi, I&apos;m Preston Odep
            </div>
            <h1 className="max-w-4xl font-display text-[clamp(3.4rem,10vw,7rem)] font-black leading-[0.92] tracking-[-0.05em] text-foreground">
              Multi-Disciplinary
              <span className="block italic text-primary">Designer</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              I design products, brands, and digital experiences that help ambitious teams across Africa
              communicate clearly, move faster, and earn trust. Over the last 8+ years, I’ve worked across
              product strategy, UI/UX, brand systems, websites, and event design to turn complex ideas
              into experiences people can actually use.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
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
            <div className="mt-10 flex flex-wrap items-center gap-5 border-l-2 border-primary/30 pl-5">
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
          </div>

          <div>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#232733]/70 bg-[linear-gradient(135deg,#243f6f_0%,#1c2740_58%,#12161f_100%)] text-white shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(202,255,51,0.14),transparent_18%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.08),transparent_20%)]" />
              <div className="absolute right-6 top-6 z-10 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
                Available for select projects
              </div>
              <div className="relative min-h-[28rem] p-6 md:min-h-[38rem] md:p-8">
                <div className="absolute inset-y-0 right-0 w-full md:w-[76%]">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/preston-hero-editorial-v2-MPSyT2swSQVtdGM5zqtryV.webp"
                    alt="Editorial portrait visual for Preston Odep's portfolio hero section"
                    className="absolute bottom-0 right-0 h-full w-full object-contain object-right-bottom"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,22,31,0.84)_0%,rgba(18,22,31,0.62)_33%,rgba(18,22,31,0.18)_60%,rgba(18,22,31,0.04)_100%)]" />
                <div className="relative flex h-full flex-col justify-end">
                  <div className="max-w-sm rounded-[1.7rem] border border-white/10 bg-black/22 p-6 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-primary">Researcher · Designer · Strategist</p>
                    <h3 className="mt-4 font-display text-4xl font-black tracking-tight text-white">
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
        </section>

        <section className="overflow-hidden border-y border-primary/30 bg-primary py-4 text-primary-foreground">
          <div className="ticker-track flex min-w-max gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-[0.25em]">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-8 px-2">
                {item}
                <span className="text-primary-foreground/50">✦</span>
              </span>
            ))}
          </div>
        </section>

        <section id="about" className="bg-[#1f232e] py-24 text-white dark:bg-[#171a23]">
          <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663521237002/W5aUirNfyCsTHiTombGsh9/preston-profile_ff541e3f.webp"
                  alt="Public speaker profile section featuring Preston Odep"
                  className="h-[28rem] w-full object-cover object-top"
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
              <div className="mt-8 space-y-6 text-[1rem] leading-8 text-[#c9d0de]">
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

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="font-display text-3xl font-black text-white">8+</p>
                  <p className="mt-2 text-sm text-[#c9d0de]">Years in design</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="font-display text-3xl font-black text-white">5</p>
                  <p className="mt-2 text-sm text-[#c9d0de]">Disciplines practiced</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="font-display text-3xl font-black text-white">Africa</p>
                  <p className="mt-2 text-sm text-[#c9d0de]">Primary market focus</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {aboutTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#dce2ef]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="container py-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label">What I Do</p>
              <h2 className="section-heading mt-4">
                Strategic services built for <span className="italic text-primary">clarity</span>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-muted-foreground">
              I work across product, brand, and digital touchpoints, but always with the same principle:
              make the experience clearer, more useful, and more believable than it was before.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-[2rem] border border-border bg-card p-7 shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      {service.number}
                    </p>
                    <h3 className="mt-4 font-display text-3xl font-black tracking-tight text-card-foreground">
                      {service.title}
                    </h3>
                  </div>
                  <div className="rounded-full border border-border bg-muted px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Service
                  </div>
                </div>
                <p className="mt-5 text-base leading-8 text-muted-foreground">{service.description}</p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="bg-[#f4f2ea] py-24 text-[#101114] dark:bg-[#0f1116] dark:text-white">
          <div className="container">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-label text-[#54555d] dark:text-white/60">Recent Work</p>
                <h2 className="section-heading mt-4 text-[#101114] dark:text-white">
                  Five selected projects that show range,
                  <span className="italic text-primary"> strategy, and conversion thinking</span>
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-[#50525a] dark:text-white/70">
                This selection balances enterprise UX, data-rich product design, art direction, community
                branding, and concept-driven service innovation. Each story is framed to explain the business
                problem, the design response, and the value created.
              </p>
            </div>

            <div className="mt-12 grid gap-6 xl:grid-cols-[0.44fr_0.56fr]">
              <div className="space-y-4">
                {caseStudies.map((study, index) => {
                  const active = selectedCaseStudy.id === study.id;
                  return (
                    <button
                      key={study.id}
                      type="button"
                      onClick={() => setSelectedCaseStudyId(study.id)}
                      className={`w-full rounded-[1.75rem] border p-6 text-left transition-all duration-300 ${
                        active
                          ? "border-primary bg-[#101114] text-white shadow-[0_20px_55px_rgba(0,0,0,0.22)] dark:bg-[#171a23]"
                          : "border-black/10 bg-white text-[#111217] hover:-translate-y-0.5 hover:border-primary/40 dark:border-white/10 dark:bg-[#171a23] dark:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className={`text-xs font-semibold uppercase tracking-[0.22em] ${active ? "text-primary" : "text-[#666b75] dark:text-white/55"}`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <ChevronRight className={`h-4 w-4 transition-transform ${active ? "translate-x-0 text-primary" : "text-[#666b75] dark:text-white/55"}`} />
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-black tracking-tight">{study.title}</h3>
                      <p className={`mt-4 text-sm leading-7 ${active ? "text-white/75" : "text-[#4f525a] dark:text-white/70"}`}>
                        {study.summary}
                      </p>
                    </button>
                  );
                })}
              </div>

              <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#171a23]">
                <img
                  src={selectedCaseStudy.image}
                  alt={selectedCaseStudy.imageAlt}
                  className="h-72 w-full object-cover object-center md:h-96"
                />
                <div className="p-7 md:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    {selectedCaseStudy.eyebrow}
                  </p>
                  <h3 className="mt-4 font-display text-4xl font-black tracking-tight text-[#111217] dark:text-white">
                    {selectedCaseStudy.title}
                  </h3>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.4rem] border border-black/10 bg-[#f7f6f2] p-4 dark:border-white/10 dark:bg-[#11141b]">
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#72757e] dark:text-white/55">Role</p>
                      <p className="mt-2 text-sm font-semibold text-[#111217] dark:text-white">{selectedCaseStudy.role}</p>
                    </div>
                    <div className="rounded-[1.4rem] border border-black/10 bg-[#f7f6f2] p-4 dark:border-white/10 dark:bg-[#11141b]">
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#72757e] dark:text-white/55">Category</p>
                      <p className="mt-2 text-sm font-semibold text-[#111217] dark:text-white">{selectedCaseStudy.category}</p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-6 text-base leading-8 text-[#474a52] dark:text-white/72">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Summary</p>
                      <p className="mt-3">{selectedCaseStudy.summary}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Problem</p>
                      <p className="mt-3">{selectedCaseStudy.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Approach</p>
                      <p className="mt-3">{selectedCaseStudy.approach}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Outcome</p>
                      <p className="mt-3">{selectedCaseStudy.outcome}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {selectedCaseStudy.impact.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="skills" className="bg-[#12151d] py-24 text-white">
          <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="section-label text-white/55">Expertise</p>
              <h2 className="section-heading mt-4 text-white">
                Education &amp; <span className="italic text-primary">My Skills</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/68">
                Eight-plus years of craft across fintech, Web3, events, brand systems, and digital product
                design — with enough breadth to move between discovery and delivery without losing strategic
                depth.
              </p>

              <div className="mt-10 space-y-6">
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
        </section>

        <section id="process" className="container py-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label">How I Work</p>
              <h2 className="section-heading mt-4">
                My design <span className="italic text-primary">process</span>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-muted-foreground">
              Every strong outcome starts with the right framing. My process is designed to move from
              ambiguity to alignment, then from alignment to execution.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
                <h3 className="mt-5 font-display text-3xl font-black tracking-tight text-card-foreground">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-primary/30 bg-primary py-20 text-primary-foreground">
          <div className="container flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
                Available for Projects
              </p>
              <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.8rem,7vw,5.3rem)] font-black leading-[0.95] tracking-[-0.04em]">
                Let’s build something that feels clear, credible, and hard to ignore
              </h2>
            </div>
            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111217] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
            >
              Email Me
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section id="contact" className="container py-24">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-heading mt-4">
            Contact <span className="italic text-primary">Me</span>
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
              <p className="text-base leading-8 text-muted-foreground">
                Whether you need a product designer, a brand system, or a sharper digital presence, I’m
                open to thoughtful projects and meaningful collaborations.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4 rounded-[1.25rem] border border-border bg-background p-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/12 text-primary">
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
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/12 text-primary">
                    <CalendarClock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Availability</p>
                    <p className="mt-2 text-base font-semibold text-foreground">Open to new projects</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-[1.25rem] border border-border bg-background p-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/12 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Based In</p>
                    <p className="mt-2 text-base font-semibold text-foreground">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border bg-[#12151d] p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <p className="text-xs uppercase tracking-[0.22em] text-primary">Best for</p>
              <h3 className="mt-4 font-display text-4xl font-black tracking-tight">
                Designers aren’t hired for polish alone.
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                They’re hired because the work helps a product make sense, a brand feel believable, or a
                digital experience move people closer to action. If that is what you need, let’s talk.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/55">Ideal engagements</p>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    Product discovery, portfolio refreshes, brand direction, marketing sites, and systems-led UX.
                  </p>
                </div>
                <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/55">Preferred approach</p>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    Clear goals, collaborative communication, practical timelines, and work that must perform beyond presentation slides.
                  </p>
                </div>
              </div>

              <a
                href={mailtoHref}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(202,255,51,0.25)]"
              >
                Email Me
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/60 backdrop-blur-sm">
        <div className="container flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-3xl font-black tracking-tight text-card-foreground">Preston.</p>
            <p className="mt-2 text-sm text-muted-foreground">Designed with intention in Nairobi, Kenya</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground">
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#skills" className="transition-colors hover:text-foreground">Skills</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
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

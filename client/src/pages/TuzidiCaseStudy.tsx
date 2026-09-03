/*
Design Philosophy Reminder — Tuzidi Case Study
Editorial Noir with Electric Lime Accents, same as the landing page: Playfair Display headlines,
Plus Jakarta Sans body copy, acid-lime emphasis, cool slate section breaks. Tuzidi's own red is
never used as UI colour here — it stays inside the artwork, where it belongs. The page is an
ordinary vertical document; the horizontal deck is the landing page's behaviour, not the site's.
*/

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Moon, SunMedium } from "lucide-react";
import { Link } from "wouter";
import { Wordmark } from "@/components/Wordmark";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const mailtoHref =
  "mailto:prestonodep@gmail.com?subject=Hey%20Pres,%20landed%20on%20your%20web%20portfolio";

const meta = [
  { label: "Role", value: "Brand & Product Designer" },
  { label: "Disciplines", value: "Brand Identity · Product Design · Design Systems" },
  { label: "Market", value: "Nairobi, Kenya" },
] as const;

const systemStats = [
  { value: "18", label: "Screens" },
  { value: "19", label: "Components" },
  { value: "116", label: "Button variants" },
  { value: "15", label: "Brand documents" },
] as const;

const productScreens = [
  { src: "screen-dashboard", alt: "Tuzidi dashboard", offset: false },
  { src: "screen-ride-bands", alt: "Choosing a price band", offset: true },
  { src: "screen-tracking-late", alt: "Trip tracking", offset: false },
] as const;

const loyaltyScreens = [
  { src: "screen-tracking-complete", alt: "Trip complete", offset: false },
  { src: "screen-points", alt: "Points dashboard", offset: true },
  { src: "screen-history", alt: "Trip history", offset: false },
  { src: "screen-profile", alt: "Passenger profile", offset: true },
] as const;

const systemScreens = [
  { src: "screen-auth", alt: "Authentication", offset: false },
  { src: "screen-package-details", alt: "Package details", offset: true },
  { src: "screen-settings", alt: "Settings, light", offset: false },
  { src: "screen-settings-dark", alt: "Settings, dark", offset: true },
] as const;

const img = (name: string) => `/tuzidi/images/${name}.webp`;

/*
A silent looping film. The hero autoplays; the rest carry `inView`, which keeps them at
preload="none" until a quarter of them is on screen, then pauses them again on the way out.
Anyone who asked for less motion holds on the poster frame throughout.
*/
function Film({
  name,
  label,
  className,
  inView = false,
}: {
  name: string;
  label: string;
  className?: string;
  inView?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    if (!inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <video
      ref={ref}
      className={className}
      poster={`/tuzidi/video/${name}-poster.webp`}
      aria-label={label}
      muted
      loop
      playsInline
      autoPlay={!inView}
      preload={inView ? "none" : "metadata"}
    >
      <source src={`/tuzidi/video/${name}.webm`} type="video/webm" />
      <source src={`/tuzidi/video/${name}.mp4`} type="video/mp4" />
    </video>
  );
}

function Phone({ src, alt, offset }: { src: string; alt: string; offset?: boolean }) {
  return (
    <img
      src={img(src)}
      alt={alt}
      loading="lazy"
      className={cn("rise phone w-full", offset && "md:mt-16")}
    />
  );
}

export default function TuzidiCaseStudy() {
  const { theme, toggleTheme } = useTheme();

  // Every .rise element fades up once, staggered in fours so a grid arrives as a wave.
  // Nothing is hidden until we know we can reveal it again — see .rise-ready in index.css.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("rise-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    document.querySelectorAll<HTMLElement>(".rise").forEach((element, index) => {
      element.style.transitionDelay = `${(index % 4) * 70}ms`;

      // Whatever is already on screen at mount is shown straight away. Waiting on the
      // observer's first callback for above-the-fold content risks a blank first paint
      // wherever those callbacks are throttled.
      const box = element.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) element.classList.add("in");
      else observer.observe(element);
    });

    return () => {
      observer.disconnect();
      root.classList.remove("rise-ready");
    };
  }, []);

  // Arriving from the landing deck leaves the previous scroll position behind.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Analytics reports by page title, so this needs its own rather than inheriting the home
  // one. Child effects run before the parent's, so the title is set before the page view fires.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Tuzidi — Case Study · Preston Odep";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-6 py-4">
          <Link href="/" aria-label="Preston Odep — back to the portfolio" className="group inline-flex items-center">
            <Wordmark className="h-9 transition-transform duration-300 group-hover:scale-[1.03]" />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/#work"
              className="hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Work
            </Link>
            <button
              type="button"
              onClick={() => toggleTheme?.()}
              aria-label="Toggle colour theme"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(202,255,51,0.28)]"
            >
              Email Me
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero film — the mark animated as a neon sign. No type over it. */}
        <section className="w-full bg-[#111827]">
          <Film name="logo-neon" label="The Tuzidi logo, animated as a neon sign" className="aspect-video w-full object-cover" />
        </section>

        <section className="container py-20 md:py-28">
          <p className="section-label">Project 01 · Brand Identity &amp; Product Design</p>
          <h1 className="section-heading mt-6 max-w-[22ch]">
            Say hello to the new way of <span className="italic text-primary">moving around Nairobi</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-9 text-muted-foreground">
            Nairobi moves on corridors. Tuzidi is a ride-hailing and delivery marketplace that moves with it.
          </p>

          <dl className="mt-14 grid gap-5 border-t border-border pt-10 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  {item.label}
                </dt>
                <dd className="mt-3 text-base font-semibold leading-7 text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Identity */}
        <section className="container pb-24 md:pb-32">
          <p className="section-label">The Identity</p>

          <div className="mt-10 flex flex-col gap-5">
            <Film
              name="logo-making"
              label="The Tuzidi mark being constructed from its grid"
              className="rise aspect-video w-full rounded-[2rem] border border-border bg-white object-cover"
              inView
            />

            <figure className="rise rounded-[2rem] border border-border bg-white px-8 py-20 md:py-28">
              <img
                src="/tuzidi/images/Tuzidi-Logo-Full.png"
                alt="The Tuzidi logo — the four-bar mark beside the wordmark"
                loading="lazy"
                className="mx-auto w-full max-w-3xl"
              />
            </figure>

            <p className="rise mx-auto max-w-2xl px-2 py-10 text-center text-lg leading-9 text-muted-foreground">
              Four bars, staggered thirty degrees off vertical. Movement held mid-stride, never a single
              arrow, because Tuzidi is many riders on one corridor.
            </p>

            <Film
              name="pattern"
              label="The Tuzidi pattern, built from the mark's diagonal"
              className="rise aspect-video w-full rounded-[2rem] border border-border object-cover"
              inView
            />

            <div className="grid gap-5 md:grid-cols-2">
              <img
                src={img("photo-01-handover")}
                alt="A boda rider and a passenger, each holding a phone running Tuzidi"
                loading="lazy"
                className="rise aspect-[3/2] w-full rounded-[2rem] object-cover"
              />
              <img
                src={img("photo-02-courier")}
                alt="A Tuzidi courier with the branded delivery bag, hailing down a street"
                loading="lazy"
                className="rise aspect-[3/2] w-full rounded-[2rem] object-cover"
              />
            </div>
          </div>
        </section>

        {/* Pricing statement */}
        <section className="container pb-24 md:pb-32">
          <h2 className="rise section-heading max-w-[18ch]">
            No surge. <span className="italic text-primary">Ever.</span>
          </h2>
          <p className="rise mt-8 max-w-xl text-lg leading-9 text-muted-foreground">
            Three published prices. You trade time for money on a scale you can see before you tap.
          </p>
        </section>

        <figure className="rise">
          <img
            src="/tuzidi/images/streams.webp"
            alt=""
            loading="lazy"
            className="h-[38vh] w-full object-cover md:h-[52vh]"
          />
        </figure>

        {/* Product */}
        <section className="container py-24 md:py-32">
          <p className="section-label">The Product</p>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-14">
            {productScreens.map((screen) => (
              <Phone key={screen.src} {...screen} />
            ))}
          </div>
        </section>

        {/* Streams statement over photography */}
        <section className="relative overflow-hidden">
          <img
            src={img("tuzidi-delivery")}
            alt=""
            loading="lazy"
            className="h-[70vh] w-full object-cover md:h-[86vh]"
          />
          <div className="absolute inset-0 flex items-center bg-[linear-gradient(90deg,rgba(17,24,39,0.78)_0%,rgba(17,24,39,0.35)_55%,transparent_100%)]">
            <div className="container">
              <p className="rise max-w-[14ch] font-display text-[clamp(2.6rem,6vw,5.2rem)] font-black leading-[0.94] tracking-[-0.035em] text-white">
                Join a stream already moving.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-24 md:py-32">
          <div className="grid gap-14 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5 md:self-center">
              <p className="rise max-w-prose text-lg leading-9 text-muted-foreground">
                Riders are already travelling Nairobi&apos;s corridors. Instead of hailing one to come to
                you, you attach to a stream that is going your way — and see how much supply is on it
                before you commit.
              </p>
            </div>
            <div className="md:col-span-7">
              <img
                src={img("screen-ride-streams")}
                alt="Active streams with live rider counts"
                loading="lazy"
                className="rise phone mx-auto w-full max-w-[340px]"
              />
            </div>
          </div>
        </section>

        <section className="container pb-24 md:pb-32">
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <figure className="rise overflow-hidden rounded-[2rem]">
              <img src={img("tuzidi-rider")} alt="" loading="lazy" className="w-full object-cover" />
            </figure>
            <div className="flex items-end">
              <img
                src={img("screen-package-pricing")}
                alt="Package pricing breakdown"
                loading="lazy"
                className="rise phone mx-auto w-full max-w-[340px]"
              />
            </div>
          </div>
        </section>

        {/* Loyalty */}
        <section className="bg-[#12151d] py-24 text-white md:py-32">
          <div className="container">
            <h2 className="rise max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4.6rem)] font-black leading-[0.96] tracking-[-0.035em] text-white">
              Earned <span className="italic text-primary">face to face.</span>
            </h2>
            <p className="rise mt-8 max-w-xl text-lg leading-9 text-white/65">
              A point is minted when the passenger scans the driver&apos;s code at the end of the trip.
              Both people are there. Nothing is credited silently.
            </p>

            <div className="mt-20 grid gap-10 sm:grid-cols-2 md:mt-28 md:grid-cols-4 md:gap-8">
              {loyaltyScreens.map((screen) => (
                <Phone key={screen.src} {...screen} />
              ))}
            </div>
          </div>
        </section>

        {/* Driver side */}
        <section className="container py-24 md:py-32">
          <p className="section-label">The Other Side</p>

          <div className="mt-14 grid gap-14 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-8 md:gap-12">
                <Phone src="screen-driver-dashboard" alt="Driver dashboard" />
                <Phone src="screen-driver-earnings" alt="Driver earnings and cash-out" offset />
              </div>
            </div>
            <div className="flex items-center md:col-span-5">
              <p className="rise max-w-prose text-lg leading-9 text-muted-foreground">
                One app, both sides of the market. A five-star rating mints a point worth four shillings.
                Cash out to M-Pesa at three hundred and sixty.
              </p>
            </div>
          </div>
        </section>

        {/* Design system */}
        <section className="bg-card py-24 md:py-32">
          <div className="container">
            <p className="section-label">The Design System</p>

            <div className="mt-14 grid gap-y-14 border-t border-border pt-14 md:grid-cols-4 md:gap-8">
              {systemStats.map((stat) => (
                <div key={stat.label} className="rise">
                  <p className="font-display text-[clamp(2.8rem,5vw,3.6rem)] font-black leading-none tracking-tight text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-24 grid gap-10 sm:grid-cols-2 md:mt-28 md:grid-cols-4 md:gap-8">
              {systemScreens.map((screen) => (
                <Phone key={screen.src} {...screen} />
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="relative overflow-hidden">
          <img
            src={img("tuzidi-nairobi")}
            alt=""
            loading="lazy"
            className="h-[60vh] w-full object-cover md:h-[80vh]"
          />
          <div className="absolute inset-0 grid place-items-center bg-black/35">
            <p className="rise px-6 text-center font-display text-[clamp(2.6rem,7vw,6rem)] font-black leading-none tracking-[-0.035em] text-white">
              Made for Nairobi.
            </p>
          </div>
        </section>

        <section className="container py-20 md:py-28">
          <div className="flex flex-col gap-8 border-t border-border pt-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label">Keep Looking</p>
              <Link
                href="/#work"
                className="mt-5 inline-flex items-center gap-3 font-display text-[clamp(2.4rem,5vw,4rem)] font-black leading-none tracking-[-0.04em] text-foreground transition-colors hover:text-primary"
              >
                Back to all work
                <ArrowUpRight className="h-8 w-8 text-primary" />
              </Link>
            </div>
            <a
              href={mailtoHref}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(202,255,51,0.28)] md:self-auto"
            >
              Email Me
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/60 backdrop-blur-sm">
        <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <Wordmark className="h-8" />
            <p className="mt-2 text-sm text-muted-foreground">Designed with intention in Nairobi, Kenya</p>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Preston Odep. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

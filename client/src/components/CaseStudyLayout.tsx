import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Moon, SunMedium } from "lucide-react";
import { Link } from "wouter";
import { Wordmark } from "@/components/Wordmark";
import { useTheme } from "@/contexts/ThemeContext";
import { chatCtaLabel, linkedInHref } from "@/lib/links";

/*
Shared chrome for the long-form case study pages — header, footer, and the page ground.

It exists so the wordmark, the theme toggle and the contact CTA are defined once. When those
last changed, the two copies had already drifted apart; one definition is what stops that.
*/
export function CaseStudyLayout({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-6 py-4">
          <Link
            href="/"
            aria-label="Preston Odep — back to the portfolio"
            className="group inline-flex items-center"
          >
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
              href={linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(202,255,51,0.28)]"
            >
              {chatCtaLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main>{children}</main>

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

/*
The closing block every case study ends on: back to the index, and a way to make contact.
*/
export function CaseStudyOutro() {
  return (
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
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(202,255,51,0.28)] md:self-auto"
        >
          {chatCtaLabel}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

/*
Design Philosophy Reminder — SupaShopper Case Study
Editorial Noir with Electric Lime Accents, same as the rest of the site: Playfair Display
headlines, Plus Jakarta Sans body, lime for emphasis, cool slate breaks, and a working light
and dark theme. SupaShopper's magenta never becomes UI colour here — it appears inside the
artwork, and once as documentation in the colour ramp, where showing the real hex is the point.
*/

import type { ReactNode } from "react";
import { CaseStudyLayout, CaseStudyOutro } from "@/components/CaseStudyLayout";
import { useCaseStudyPage } from "@/hooks/useCaseStudyPage";
import { cn } from "@/lib/utils";

const img = (name: string) => `/supashopper/${name}.webp`;

const meta = [
  { label: "Role", value: "Founder · Product design · Build" },
  { label: "Scope", value: "Brand, product design, front-end, API" },
  { label: "Market", value: "Kenya — supermarket retail" },
  { label: "Status", value: "Working prototype" },
] as const;

const loop = [
  { step: "Shop", note: "Pay once" },
  { step: "Token", note: "Price locked" },
  { step: "Send", note: "By phone number" },
  { step: "Redeem", note: "At any branch" },
] as const;

const tokenAnatomy = [
  { term: "Locked price", detail: "Kes 162 each, held for eight months" },
  { term: "Itemised", detail: "Goods, not a balance" },
  { term: "Expiry", detail: "Becomes a Voucher, never nothing" },
  { term: "One retailer", detail: "Any branch of it" },
] as const;

/*
The brand ramp, documented rather than applied. These are SupaShopper's own values and the
only place on the page where its magenta is used as colour rather than appearing in artwork.
*/
const brandRamp = [
  { token: "50", hex: "#fff0f5" },
  { token: "100", hex: "#ffe0ea" },
  { token: "200", hex: "#ffbdd2" },
  { token: "300", hex: "#ff8fb3" },
  { token: "400", hex: "#ff427e" },
  { token: "500", hex: "#fa0050" },
  { token: "600", hex: "#d60044" },
  { token: "700", hex: "#ad0037" },
  { token: "800", hex: "#8a002c" },
  { token: "900", hex: "#6b0022" },
] as const;

const shopScreens = [
  { src: "m-home", alt: "Mobile homepage with the store selector and scrolling category pills" },
  { src: "m-product", alt: "Product page for Rina Vegetable Cooking Oil 5L" },
  { src: "m-basket", alt: "Basket showing three lines and a running total" },
  { src: "m-checkout", alt: "Checkout: order review with M-PESA, voucher and card options" },
] as const;

const numbers = [
  { value: "19", label: "screens, two surfaces" },
  { value: "164", label: "products across two retailers" },
  { value: "8mo", label: "price locked from purchase" },
  { value: "0", label: "POS integrations required" },
] as const;

/* A phone bezel around a raw screenshot. The shots are 780×1688 with no chrome of their own. */
function Device({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[2rem] bg-[#0e0f14] p-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.06),0_24px_60px_-18px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <img src={img(src)} alt={alt} width={780} height={1688} loading="lazy" className="w-full rounded-[1.7rem]" />
    </div>
  );
}

/* A browser frame for the desktop captures, so a page screenshot reads as a page. */
function Browser({
  src,
  alt,
  width,
  height,
  className,
  children,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[1rem] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05),0_30px_70px_-24px_rgba(0,0,0,0.32)]", className)}>
      <div className="flex items-center gap-1.5 bg-[#e9e8e6] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#c9c7c4]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#c9c7c4]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#c9c7c4]" />
      </div>
      <img src={img(src)} alt={alt} width={width} height={height} loading="lazy" className="w-full" />
      {children}
    </div>
  );
}

export default function SupaShopperCaseStudy() {
  useCaseStudyPage();

  return (
    <CaseStudyLayout>
      {/* Key art carries the wordmark and the line already, so nothing is set over it. */}
      <section className="w-full bg-[#12141d]">
        <img
          src={img("supashopper-jacket-banner")}
          alt="A figure in head-to-toe SupaShopper magenta against a magenta ground, arms outstretched, the wordmark across the back of the jacket, beside the line: M-PESA, but for products."
          width={2000}
          height={1125}
          /* The hero is this page's largest contentful paint — fetch it ahead of the rest. */
          fetchPriority="high"
          decoding="async"
          className="w-full"
        />
      </section>

      <section className="container py-20 md:py-28">
        <p className="section-label">Project 06 · Brand &amp; Product</p>
        <h1 className="section-heading mt-6 max-w-[20ch]">
          Money sent home doesn’t always become food.{" "}
          <span className="italic text-primary">SupaShopper sends the shopping instead.</span>
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <p className="text-lg leading-9 text-muted-foreground">
            Millions of Kenyans support family from Nairobi, from upcountry, from abroad. Once cash
            lands, the sender has no say in what it becomes — and no way to know.
          </p>
          <p className="text-lg leading-9 text-muted-foreground">
            So we stopped sending money. A shopper buys a basket, pays once, and receives a{" "}
            <strong className="font-semibold text-foreground">Token</strong>: a claim on those exact
            goods, at that day’s price, collectable at any branch for eight months.
          </p>
        </div>

        <dl className="mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* The brand on people. Both frames carry their own mark, so neither is captioned over. */}
      <section className="container pb-24 md:pb-32">
        <div className="flex flex-col gap-5">
          <img
            src={img("supashopper-youth")}
            alt="A young man in a magenta shirt smiling at his phone, with two SupaShopper panels beside him: an active Token worth Kes 660, and a Send Token screen."
            width={2000}
            height={1125}
            loading="lazy"
            className="rise w-full rounded-[2rem] object-cover"
          />
          <img
            src={img("supashopper-college-jackets-old")}
            alt="Two older adults in SupaShopper varsity jackets, a Supa patch at the shoulder and SupaShopper chainstitched across the back."
            width={2560}
            height={1440}
            loading="lazy"
            className="rise w-full rounded-[2rem] object-cover"
          />
        </div>
      </section>

      {/* The object */}
      <section className="bg-[#12151d] py-24 text-white md:py-32">
        <div className="container grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">The object</p>
            <h2 className="rise mt-6 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-black leading-[0.98] tracking-[-0.035em] text-white">
              A claim on goods, <span className="italic text-primary">not on money.</span>
            </h2>
            <p className="rise mt-8 max-w-md text-lg leading-9 text-white/60">
              Product-denominated. Transferable by phone number. And its contents can only ever
              shrink — never grow. That single rule is what makes it a claim rather than a shopping
              list.
            </p>
          </div>

          <div className="rise lg:col-span-4">
            <Device src="m-token" alt="A SupaShopper Token: code SS-7K3M-9QX2, value Kes 2,374, expiring in eight months, with six items to collect." className="mx-auto max-w-[20rem]" />
          </div>

          <dl className="rise space-y-7 text-sm leading-relaxed text-white/55 lg:col-span-3">
            {tokenAnatomy.map((item) => (
              <div key={item.term}>
                <dt className="font-semibold text-white">{item.term}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The loop */}
      <section className="container py-24 md:py-32">
        <h2 className="rise section-heading max-w-[14ch]">
          Four steps. <span className="italic text-primary">That’s the whole product.</span>
        </h2>

        <ol className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {loop.map((item, index) => (
            <li key={item.step} className="rise">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-primary/30 bg-primary/10 font-display text-xl font-black text-primary">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-6 font-display text-2xl font-black tracking-tight text-foreground">
                {item.step}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
            </li>
          ))}
        </ol>

        <p className="rise mt-16 border-t border-border pt-8 text-lg leading-9 text-muted-foreground">
          No delivery. No address. No smartphone needed on the far end.
        </p>
      </section>

      {/* Identity */}
      <section className="bg-card py-24 md:py-32">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="section-label">Identity</p>
              <h2 className="rise section-heading mt-6 max-w-[12ch]">
                One colour, <span className="italic text-primary">held.</span>
              </h2>
            </div>
            <p className="rise text-lg leading-9 text-muted-foreground">
              A vivid rose at full saturation. The ramp holds the hue and moves only lightness, so
              every tint stays recognisably the same colour instead of drifting toward purple.
            </p>
          </div>

          <div className="rise mt-14 grid grid-cols-5 overflow-hidden rounded-[1.5rem] lg:grid-cols-10">
            {brandRamp.map((swatch) => (
              <div key={swatch.token} className="relative aspect-square" style={{ backgroundColor: swatch.hex }}>
                {swatch.token === "500" && (
                  <span className="absolute inset-x-0 bottom-0 p-2 text-[10px] font-semibold tracking-wide text-white">
                    500
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="rise mt-6 flex flex-wrap gap-x-10 gap-y-2 text-sm text-muted-foreground">
            <span>
              <span className="font-mono text-foreground">#fa0050</span> &nbsp;brand-500 — the one everyone remembers
            </span>
            <span>
              <span className="font-mono text-foreground">#d60044</span> &nbsp;brand-600 — small white type sits here
            </span>
          </div>

          <div className="rise mt-16 border-t border-border pt-12">
            <p className="max-w-3xl text-lg leading-9 text-muted-foreground">
              White on <span className="font-mono text-foreground">#fa0050</span> measures 4.05:1 — under
              the 4.5:1 AA needs for normal text. The brand colour was not negotiable, so the fix went
              on the text side: the smallest white labels sit on{" "}
              <span className="font-mono text-foreground">#d60044</span> at 5.33:1. That is the whole
              reason a second red exists.
            </p>
          </div>

          <div className="mt-16 grid gap-10 border-t border-border pt-12 lg:grid-cols-3">
            <div className="rise">
              <h3 className="font-display text-2xl font-black tracking-tight text-foreground">Two faces</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Two weights only. Every extra weight is another file over 3G.
              </p>
            </div>
            <div className="rise">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Display</p>
              <p className="mt-3 font-display text-5xl font-black tracking-tight text-foreground">Poppins</p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Geometric, with the single-storey <em>a</em> of the logotype. Wordmark and headlines.
              </p>
            </div>
            <div className="rise">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
                Text &amp; numerals
              </p>
              <p className="mt-3 text-5xl font-bold tracking-tight text-foreground">Inter</p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Drawn for small sizes on screens. The whole job is prices read on a cheap Android in
                daylight.
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-5">
            {/* Intrinsic sizes are declared so the browser reserves the box before the file
                arrives — without them each of these shifts the page as it loads. */}
            {[
              { src: "supashopper-jacket", w: 2560, h: 1440, alt: "A figure in a magenta shell jacket and bucket hat against a magenta ground, the SupaShopper logotype across the back." },
              { src: "supahat", w: 2560, h: 1440, alt: "A trucker cap with a white crown, magenta mesh back and magenta brim, carrying the Supa disc mark." },
              { src: "billboard", w: 2304, h: 1536, alt: "A SupaShopper billboard above a Nairobi dual carriageway, showing the Token and Send Token screens." },
              { src: "supashopper-college-jackets-youth", w: 2560, h: 1440, alt: "Two young adults in SupaShopper varsity jackets — magenta wool body, white leather sleeves." },
            ].map((shot) => (
              <img
                key={shot.src}
                src={img(shot.src)}
                alt={shot.alt}
                width={shot.w}
                height={shot.h}
                loading="lazy"
                className="rise w-full rounded-[2rem] object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* The shop */}
      <section className="container py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="section-label">Surface One</p>
            <h2 className="rise section-heading mt-6 max-w-[10ch]">
              The <span className="italic text-primary">shop.</span>
            </h2>
          </div>
          <p className="rise text-lg leading-9 text-muted-foreground">
            Two retailers, two catalogues, 164 products. Switching store swaps everything — and asks
            before it empties your basket, because a Token only redeems where it was bought.
          </p>
        </div>

        <div className="rise mt-16">
          <Browser
            src="d-home"
            width={2880}
            height={2200}
            alt="SupaShopper desktop homepage: magenta header, category pills, a promotional carousel and a Most Popular product rail."
          />
        </div>

        <div className="mt-10 grid grid-cols-2 items-start gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-10">
          {shopScreens.map((screen) => (
            <Device key={screen.src} src={screen.src} alt={screen.alt} className="rise" />
          ))}
        </div>
      </section>

      {/* Send */}
      <section className="bg-card py-24 md:py-32">
        <div className="container grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="rise lg:col-span-4">
            <Device src="m-send" alt="Send Token screen: recipient phone number entry before SMS verification." className="max-w-[19rem]" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="section-label">The Reason It Exists</p>
            <h2 className="rise section-heading mt-6 max-w-[13ch]">
              Send the shopping, <span className="italic text-primary">not the cash.</span>
            </h2>
            <p className="rise mt-8 max-w-xl text-lg leading-9 text-muted-foreground">
              A phone number is the whole address. Ownership moves completely — the sender can no
              longer redeem it — and the eight-month clock keeps running from the day it was bought,
              not the day it was sent.
            </p>
          </div>
        </div>
      </section>

      {/* Redeem */}
      <section className="bg-[#12151d] py-24 text-white md:py-32">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Surface two</p>
              <h2 className="rise mt-6 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-black leading-[0.98] tracking-[-0.035em] text-white">
                Two screens. <span className="italic text-primary">Neither can finish alone.</span>
              </h2>
            </div>
            <p className="rise text-lg leading-9 text-white/60">
              The cashier confirms what the branch can supply. The holder confirms they accept it,
              with a PIN on their own phone. A stolen phone isn’t enough — and neither is a dishonest
              till.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="rise lg:col-span-3">
              <Device src="m-redeem" alt="The holder's redeem screen: a QR code, a fallback six-digit code, and a three-minute countdown." />
              <p className="mt-5 text-sm text-white/50">The holder, in the queue.</p>
            </div>

            {/*
            The till is a 1440px surface and its item list is the whole point. Below lg it keeps a
            usable width and scrolls sideways rather than collapsing into unreadable grey lines.
            min-w-0 stops that wide child from widening the grid track itself.
            */}
            <div className="rise min-w-0 lg:col-span-8 lg:col-start-5">
              <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:overflow-visible lg:px-0">
                <div className="min-w-[44rem] lg:min-w-0">
                  <Browser
                    src="d-outlet-scanned"
                    width={2880}
                    height={1800}
                    alt="The till terminal showing a Token itemised, with quantity steppers and a total of Kes 2,374."
                  />
                </div>
              </div>
              <p className="mt-5 text-sm text-white/50">
                The till, one second later. Short an item? Tick it down — it stays on the Token.
                <span className="text-white/35 lg:hidden"> Swipe to see it all.</span>
              </p>
            </div>
          </div>

          <p className="rise mt-20 max-w-3xl border-t border-white/15 pt-10 text-lg leading-9 text-white/55">
            A supermarket barcode scanner is a keyboard. It types the code and presses Enter — so
            scanning and typing run down the same code path, and the fallback isn’t a degraded mode.
            It’s the same road.
          </p>
        </div>
      </section>

      {/* The far end */}
      <section className="container py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="section-label">Designed For The Far End</p>
            <h2 className="rise section-heading mt-6 max-w-[12ch]">
              No sign-in <span className="italic text-primary">required.</span>
            </h2>
            <p className="rise mt-8 max-w-xl text-lg leading-9 text-muted-foreground">
              The people most likely to need to check a Token are the least able to log in — a
              grandmother handed a code by SMS, a cashier double-checking. Paste the code, see the
              goods. It shows contents and status, never who owns it, and nothing on it can spend.
            </p>

            <div className="rise mt-14 border-t border-border pt-10">
              <h3 className="font-display text-2xl font-black tracking-tight text-foreground">
                Five languages
              </h3>
              <p className="mt-4 max-w-xl text-lg leading-9 text-muted-foreground">
                English and Kiswahili are complete. Dholuo, Gĩkũyũ and Kĩkamba are registered and
                deliberately untranslated — a confidently wrong word on a button that spends money is
                worse than an English one a reader can tell is foreign.
              </p>
              <p className="mt-8 font-display text-2xl font-black leading-relaxed text-foreground">
                English · Kiswahili ·{" "}
                <span className="text-muted-foreground">Dholuo · Gĩkũyũ · Kĩkamba</span>
              </p>
            </div>
          </div>

          <div className="rise lg:col-span-5 lg:col-start-8">
            <Device src="m-track" alt="The public Token tracker on a phone: one field to paste a Token code, no account needed." className="mx-auto max-w-[21rem] lg:mx-0" />
            <p className="mx-auto mt-5 max-w-[21rem] text-sm text-muted-foreground lg:mx-0">
              Paste a code. See the goods. No account.
            </p>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-card py-20 md:py-28">
        <div className="container">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {numbers.map((item) => (
              <div key={item.label} className="rise">
                <dt className="font-display text-[clamp(2.6rem,5vw,4rem)] font-black leading-none tracking-tight text-primary">
                  {item.value}
                </dt>
                <dd className="mt-3 text-sm text-muted-foreground">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="w-full">
        <img
          src={img("footer")}
          alt="Shop. Token. Send. Redeem. — set beside the SupaShopper storefront on a phone."
          width={1920}
          height={1080}
          loading="lazy"
          className="w-full"
        />
      </section>

      {/* Honest about what is and is not real — the prototype says so on every screen too. */}
      <section className="bg-[#12151d] py-12 text-white">
        <div className="container grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/45">Built with</p>
            <p className="mt-2 font-medium">Next.js · TypeScript · Tailwind</p>
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/45">Also delivered</p>
            <p className="mt-2 font-medium">Catalogue API · Retailer pitch documents</p>
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/45">Note</p>
            <p className="mt-2 font-medium text-white/70">
              A working prototype. Payments, auth and SMS are simulated.
            </p>
          </div>
        </div>
      </section>

      <CaseStudyOutro />
    </CaseStudyLayout>
  );
}

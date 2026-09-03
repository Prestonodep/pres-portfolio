import { cn } from "@/lib/utils";

/*
The Preston wordmark.

"Pres" is spring green in both variants; "Ton" is white in the supplied artwork, which would
vanish against the light theme's off-white ground. The -on-light file carries the same mark with
"Ton" in the light-theme foreground ink instead.

Swapped in CSS rather than off the theme value, so the right one paints on first frame with no
flash while the theme resolves. Exactly one is ever displayed, so both can carry the same alt.
*/
export function Wordmark({ className }: { className?: string }) {
  // shrink-0 + max-w-none + object-contain keep the 3.21:1 mark from being stretched or
  // squeezed by whatever lays it out — as a flex item it would otherwise stretch to the
  // container's cross-axis size and distort.
  const shared = "w-auto max-w-none shrink-0 self-start object-contain select-none";

  return (
    <>
      <img
        src="/brand/preston-logo-on-light.png"
        alt="Preston Odep"
        width={1366}
        height={425}
        className={cn(shared, "dark:hidden", className)}
      />
      <img
        src="/brand/preston-logo.png"
        alt="Preston Odep"
        width={1366}
        height={425}
        className={cn(shared, "hidden dark:block", className)}
      />
    </>
  );
}

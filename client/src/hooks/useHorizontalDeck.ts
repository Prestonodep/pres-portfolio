import { useCallback, useEffect, useRef, useState } from "react";

/*
Horizontal deck controller.

From `lg` up the page becomes a left-to-right track of viewport-wide panels: the wheel,
trackpad, and arrow keys step one panel at a time and CSS scroll-snap holds the landing.
Below `lg` none of this engages and the same markup falls back to ordinary vertical stacking.

Panels opt in with `data-panel`; decorative fillers (the lime ticker rail) deliberately omit it
so they are passed through mid-transition instead of becoming a stop.
*/

const DECK_MEDIA = "(min-width: 1024px)";
const STEP_LOCK_MS = 620;
const MIN_WHEEL_DELTA = 6;

export function useHorizontalDeck() {
  const trackRef = useRef<HTMLDivElement>(null);
  const lockedUntil = useRef(0);
  const [isDeck, setIsDeck] = useState(false);
  const [activeNav, setActiveNav] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const query = window.matchMedia(DECK_MEDIA);
    const apply = () => setIsDeck(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const getPanels = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [] as HTMLElement[];
    return Array.from(track.querySelectorAll<HTMLElement>("[data-panel]"));
  }, []);

  // offsetLeft is unreliable here (panels sit inside positioned ancestors), so measure
  // each panel against the track's own box instead.
  const offsetWithin = useCallback((track: HTMLElement, panel: HTMLElement) => {
    return panel.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
  }, []);

  const getCurrentIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const panels = getPanels();
    let closest = 0;
    let smallest = Number.POSITIVE_INFINITY;
    panels.forEach((panel, index) => {
      const distance = Math.abs(offsetWithin(track, panel) - track.scrollLeft);
      if (distance < smallest) {
        smallest = distance;
        closest = index;
      }
    });
    return closest;
  }, [getPanels, offsetWithin]);

  // Smoothing lives here rather than in CSS so reduced-motion users get an instant jump.
  const scrollTrackTo = useCallback((track: HTMLElement, left: number) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const panels = getPanels();
      if (!track || panels.length === 0) return;
      const target = panels[Math.max(0, Math.min(panels.length - 1, index))];
      scrollTrackTo(track, offsetWithin(track, target));
    },
    [getPanels, offsetWithin, scrollTrackTo],
  );

  const scrollToId = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;
      const track = trackRef.current;
      if (!track || !window.matchMedia(DECK_MEDIA).matches) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const index = getPanels().indexOf(element);
      if (index >= 0) {
        goToIndex(index);
      } else {
        scrollTrackTo(track, offsetWithin(track, element));
      }
    },
    [getPanels, goToIndex, offsetWithin, scrollTrackTo],
  );

  // Wheel and trackpad: vertical intent drives horizontal travel.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isDeck) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // pinch-zoom
      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (delta === 0) return;

      // A panel too tall for the viewport keeps its own vertical scroll until it bottoms out.
      const panel = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-panel]");
      if (panel && panel.scrollHeight - panel.clientHeight > 4) {
        const atTop = panel.scrollTop <= 0;
        const atBottom = panel.scrollTop >= panel.scrollHeight - panel.clientHeight - 1;
        if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) return;
      }

      event.preventDefault();
      if (Math.abs(delta) < MIN_WHEEL_DELTA) return;

      const now = performance.now();
      if (now < lockedUntil.current) return;
      lockedUntil.current = now + STEP_LOCK_MS;
      goToIndex(getCurrentIndex() + (delta > 0 ? 1 : -1));
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, [isDeck, goToIndex, getCurrentIndex]);

  useEffect(() => {
    if (!isDeck) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          event.preventDefault();
          goToIndex(getCurrentIndex() + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          goToIndex(getCurrentIndex() - 1);
          break;
        case "Home":
          event.preventDefault();
          goToIndex(0);
          break;
        case "End":
          event.preventDefault();
          goToIndex(getPanels().length - 1);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDeck, goToIndex, getCurrentIndex, getPanels]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isDeck) return;

    const onScroll = () => {
      const travel = track.scrollWidth - track.clientWidth;
      setProgress(travel > 0 ? Math.min(1, Math.max(0, track.scrollLeft / travel)) : 0);
      const nav = getPanels()[getCurrentIndex()]?.dataset.nav;
      if (nav) setActiveNav(nav);
    };

    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDeck, getPanels, getCurrentIndex]);

  // Honour a deep link such as /#work once the track has been laid out.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToId(hash), 120);
    return () => window.clearTimeout(timer);
  }, [scrollToId]);

  return { trackRef, scrollToId, goToIndex, activeNav, progress, isDeck };
}

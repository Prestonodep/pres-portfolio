import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

/*
GA4 page views for a client-side router.

The gtag snippet in index.html reports a page view when the document loads, and nothing after
that: routing here never reloads the document, so a move from / to /work/tuzidi sends no beacon
and the case study records no traffic. This reports each subsequent route change explicitly.

Note: if "page changes based on browser history events" is ever switched on under Enhanced
Measurement in the GA property, it would report those same navigations and views would double.
Leave that setting off, or remove this hook.
*/

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function usePageViews() {
  const [location] = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // The initial load is already counted by gtag('config', ...).
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.gtag?.("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
}

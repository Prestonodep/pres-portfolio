import { useEffect } from "react";

/*
Shared page behaviour for the long-form case studies: reset the scroll position on arrival and
run the progressive reveal.

The document title is deliberately not set here. useSeo owns the whole head — title, canonical,
Open Graph and structured data — from the route table in shared/seo.ts, so there is one owner
and the values cannot disagree.
*/
export function useCaseStudyPage() {
  // Arriving from the landing deck otherwise keeps the previous scroll position.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
}

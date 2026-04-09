/*
ScrollIndicator Component
Morphs from a scroll-down button to a bold green spiral line that follows scroll position.
Uses the primary green accent color (oklch(0.92 0.19 118)) from the design system.
*/

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / documentHeight, 1);

      setScrollProgress(progress);

      // Hide when near top, show when scrolling
      setIsVisible(scrolled > windowHeight * 0.3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate spiral path based on scroll progress
  const generateSpiralPath = (progress: number): string => {
    if (progress < 0.08) {
      // Button state - small circle
      return "M 0 0 C 0 0 0 0 0 0";
    }

    const maxHeight = window.innerHeight * 10; // Spiral extends across viewport
    const spiralHeight = maxHeight * progress;
    const turns = progress * 5; // Number of spiral turns
    const points: [number, number][] = [];

    // Generate spiral points with smoother curve
    for (let i = 0; i <= 120; i++) {
      const t = i / 120;
      const currentTurns = turns * t;
      const angle = currentTurns * Math.PI * 2;
      
      // Smooth expansion with easing
      const easeProgress = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const radius = 8 + easeProgress * 50; // Spiral expands outward
      const y = t * spiralHeight;

      const x = Math.cos(angle) * radius;
      points.push([x, y]);
    }

    // Convert points to SVG path using quadratic curves for smoothness
    if (points.length === 0) return "";
    let path = `M ${points[0][0]} ${points[0][1]}`;
    
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currPoint = points[i];
      const nextPoint = points[i + 1];
      
      if (nextPoint) {
        // Use quadratic Bezier for smooth curves
        const cpx = (currPoint[0] + nextPoint[0]) / 2;
        const cpy = (currPoint[1] + nextPoint[1]) / 2;
        path += ` Q ${currPoint[0]} ${currPoint[1]} ${cpx} ${cpy}`;
      } else {
        path += ` L ${currPoint[0]} ${currPoint[1]}`;
      }
    }
    
    return path;
  };

  const spiralPath = generateSpiralPath(scrollProgress);

  return (
    <div
      ref={containerRef}
      className="fixed left-1/2 top-0 z-40 -translate-x-1/2 pointer-events-none"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* SVG Spiral */}
      <svg
        ref={svgRef}
        width="150"
        height={Math.max(window.innerHeight * 10, 500)}
        viewBox={`-75 0 150 ${Math.max(window.innerHeight * 10, 500)}`}
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          filter: "drop-shadow(0 0 0px rgba(0,0,0,0))",
        }}
        preserveAspectRatio="none"
      >
        {/* Spiral line - bold and prominent */}
        <path
          d={spiralPath}
          stroke="oklch(0.92 0.19 118)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={scrollProgress > 0.08 ? 1 : 0}
          style={{
            transition: "opacity 0.3s ease-out",
            filter: "drop-shadow(0 0 2px rgba(202, 255, 51, 0.3))",
          }}
        />
      </svg>

      {/* Scroll Button (visible when near top) */}
      <button
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }}
        className="pointer-events-auto relative left-1/2 top-[clamp(1rem,8vh,3rem)] -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        style={{
          opacity: scrollProgress < 0.08 ? 1 : 0,
          transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: scrollProgress < 0.08 ? "auto" : "none",
        }}
        aria-label="Scroll down"
      >
        <ChevronDown className="w-5 h-5 text-primary animate-bounce" />
      </button>
    </div>
  );
}

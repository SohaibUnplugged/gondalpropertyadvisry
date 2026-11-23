"use client";

import { useEffect } from "react";

export function PageMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.revealed = "true";
          observer.unobserve(element);
          if (preference.matches) continue;
          const animation = element.animate(
            [
              {
                opacity: 0,
                transform: "translateY(32px)",
                filter: "blur(3px)",
              },
              { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
            ],
            {
              duration: 800,
              delay: Number(element.dataset.delay || 0),
              easing: "cubic-bezier(.2,.65,.25,1)",
              fill: "backwards",
            },
          );
          animations.add(animation);
          // Cancellation on unmount/reduced motion also releases the animation.
          animation.finished.then(
            () => animations.delete(animation),
            () => animations.delete(animation),
          );
        }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (preference.matches)
        animations.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stop);
    };
  }, []);
  return null;
}

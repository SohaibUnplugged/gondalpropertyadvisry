"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ServiceStack({ children }: { children: ReactNode }) {
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const preference = window.matchMedia("(min-width: 901px)");
    const rows = [...element.querySelectorAll<HTMLElement>(".service-row")];
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!preference.matches) {
          delete element.dataset.stack;
          return;
        }
        const available = document.documentElement.clientHeight;
        const heights = rows.map((row) => row.getBoundingClientRect().height);
        // Tall cards scroll fully into view before pinning; no content is trapped below the fold.
        rows.forEach((row, index) =>
          row.style.setProperty(
            "--stack-top",
            `${Math.min(100, available - heights[index] - 24)}px`,
          ),
        );
        element.dataset.stack = "enabled";
      });
    };
    const observer = new ResizeObserver(measure);
    rows.forEach((row) => observer.observe(row));
    window.addEventListener("resize", measure, { passive: true });
    preference.addEventListener("change", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", measure);
      delete element.dataset.stack;
      rows.forEach((row) => row.style.removeProperty("--stack-top"));
    };
  }, []);
  return (
    <div className="service-list" ref={list}>
      {children}
    </div>
  );
}

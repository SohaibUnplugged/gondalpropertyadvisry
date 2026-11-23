"use client";

import { useEffect } from "react";
import { SmoothScroll } from "./smooth-scroll";

const ease = "cubic-bezier(.16,1,.3,1)";

export function PageMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const elements = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ];
    const play = (
      element: Element,
      frames: Keyframe[],
      duration: number,
      delay = 0,
    ) => {
      const animation = element.animate(frames, {
        duration,
        delay,
        easing: ease,
        fill: "backwards",
      });
      animations.add(animation);
      const release = () => animations.delete(animation);
      animation.finished.then(release, release);
    };
    const reveal = (element: HTMLElement) => {
      element.dataset.revealed = "true";
      element.dataset.motion = "revealed";
      if (preference.matches) return;
      const siblings = [...(element.parentElement?.children ?? [])].filter(
        (sibling) => sibling.hasAttribute("data-reveal"),
      );
      const stagger = element.dataset.delay
        ? Number(element.dataset.delay)
        : Math.max(0, siblings.indexOf(element)) * 90;
      const image = element.matches(
        ".service-photo,.focus-photo,.about-photo-card,.cta-panel",
      );
      const start: Keyframe = {
        opacity: 0,
        transform: `translate3d(0,${image ? 44 : 34}px,0)`,
      };
      const end: Keyframe = { opacity: 1, transform: "translate3d(0,0,0)" };
      if (image) {
        start.clipPath = "inset(0 0 16% 0 round 6px)";
        end.clipPath = "inset(0 0 0 0 round 6px)";
      }
      play(element, [start, end], image ? 1250 : 1050, Math.min(stagger, 270));
      if (element.matches(".service-copy")) {
        element.querySelectorAll("li").forEach((item, index) =>
          play(
            item,
            [
              { opacity: 0, transform: "translateY(14px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            750,
            160 + index * 55,
          ),
        );
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          reveal(entry.target as HTMLElement);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    elements.forEach((element) => {
      // Only conceal offscreen content after JS is ready; server HTML stays readable.
      if (
        !preference.matches &&
        element.getBoundingClientRect().top > window.innerHeight
      )
        element.dataset.motion = "pending";
      observer.observe(element);
    });
    const stop = () => {
      if (!preference.matches) return;
      animations.forEach((animation) => animation.cancel());
      elements.forEach((element) => {
        if (element.dataset.motion === "pending")
          element.dataset.motion = "revealed";
      });
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      elements.forEach((element) => {
        delete element.dataset.motion;
      });
      preference.removeEventListener("change", stop);
    };
  }, []);
  return (
    <>
      <SmoothScroll />
      <div className="scroll-progress" aria-hidden="true" />
    </>
  );
}

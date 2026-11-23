"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    let instance: Lenis | null = null;
    let generation = 0;
    let restoreTarget: (() => void) | undefined;

    const configure = async () => {
      const current = ++generation;
      instance?.destroy();
      instance = null;
      if (!finePointer.matches) return;
      let lenisModule: typeof import("lenis");
      try {
        lenisModule = await import("lenis");
      } catch (error) {
        console.error(
          "Smooth scrolling could not load; native scrolling remains available.",
          error,
        );
        return;
      }
      if (current !== generation) return;
      instance = new lenisModule.default({
        autoRaf: true,
        autoToggle: true,
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        // This site's motion is always enabled, as explicitly requested by the owner.
        respectReducedMotion: false,
      });
    };

    const navigate = (event: MouseEvent) => {
      if (
        !instance ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download"))
        return;
      const url = new URL(link.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;
      let id: string;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      if (location.hash !== url.hash)
        history.pushState(history.state, "", url.hash);
      instance.scrollTo(target, {
        onComplete: () => {
          restoreTarget?.();
          const previous = target.getAttribute("tabindex");
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          const restore = () => {
            if (previous === null) target.removeAttribute("tabindex");
            else target.setAttribute("tabindex", previous);
            target.removeEventListener("blur", restore);
            restoreTarget = undefined;
          };
          restoreTarget = restore;
          target.addEventListener("blur", restore, { once: true });
        },
      });
    };

    const cancelNavigation = () =>
      instance?.scrollTo(window.scrollY, { immediate: true });
    void configure();
    finePointer.addEventListener("change", configure);
    document.addEventListener("click", navigate);
    window.addEventListener("popstate", cancelNavigation);
    return () => {
      ++generation;
      instance?.destroy();
      restoreTarget?.();
      finePointer.removeEventListener("change", configure);
      document.removeEventListener("click", navigate);
      window.removeEventListener("popstate", cancelNavigation);
    };
  }, []);
  return null;
}

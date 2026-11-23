"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { perspectives } from "@/lib/site";

export function PerspectiveSlider() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const current = perspectives[active];
  const move = (direction: number) =>
    setActive(
      (index) =>
        (index + direction + perspectives.length) % perspectives.length,
    );
  return (
    <div
      className="perspective-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Property perspectives"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      <div
        className="perspective-card"
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = touchStart.current - event.changedTouches[0].clientX;
          if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        <div className="perspective-photo">
          {perspectives.map((perspective, index) => (
            <div
              className={`portrait-layer ${active === index ? "is-active" : ""}`}
              aria-hidden={active !== index}
              key={perspective.image}
            >
              <Image
                src={perspective.image}
                alt={`${perspective.label}: supplied housing society interior photograph`}
                fill
                sizes="(max-width: 700px) 100vw, 35vw"
              />
            </div>
          ))}
        </div>
        <div
          className="perspective-copy"
          key={active}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="perspective-focus">
            <span>A clear starting point</span>
            <strong>{current.focus}</strong>
          </div>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
          <div className="perspective-person">
            <strong>{current.label}</strong>
            <span>Gondal Property Advisory</span>
          </div>
        </div>
      </div>
      <div className="slider-controls">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous perspective"
        >
          Previous
        </button>
        <div className="slider-dots">
          {perspectives.map((item, index) => (
            <button
              type="button"
              key={item.label}
              aria-label={`Show perspective ${index + 1}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next perspective"
        >
          Next
        </button>
      </div>
    </div>
  );
}

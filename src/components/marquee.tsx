"use client";

import { useState } from "react";
import { Icon } from "./icon";

const topics = [
  "Residential",
  "Commercial",
  "Land & plots",
  "Investment",
  "Personal advisory",
];
export function Marquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      className="marquee-section"
      aria-label="Property advisory focus areas"
    >
      <div className="marquee-heading">
        <h2>Personal guidance for the property decisions ahead</h2>
        <button
          type="button"
          className="marquee-pause"
          aria-label={
            paused ? "Play scrolling topics" : "Pause scrolling topics"
          }
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className="marquee-window">
        <div className={`marquee-track ${paused ? "is-paused" : ""}`}>
          {[0, 1, 2].map((copy) => (
            <div
              className="marquee-group"
              key={copy}
              aria-hidden={copy > 0 || undefined}
            >
              {topics.map((topic, index) => (
                <span key={topic}>
                  <Icon name={index % 2 ? "building" : "home"} />
                  {topic}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

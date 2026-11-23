"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { guides, site } from "@/lib/site";
import { HoverText } from "./action-link";

export function Insights() {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const guide = guides[active];
  return (
    <>
      <div className="insights-grid">
        {guides.map((item, index) => (
          <button
            type="button"
            className="insight-card"
            key={item.title}
            data-reveal
            data-delay={index * 80}
            onClick={() => {
              setActive(index);
              dialog.current?.showModal();
            }}
          >
            <div className="insight-photo">
              <Image
                src={item.image}
                alt="Illustrative professional considering their next decision"
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
              />
            </div>
            <span>{item.category}</span>
            <h3>
              <HoverText>{item.title}</HoverText>
            </h3>
            <span className="insight-read">Read the perspective</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        data-lenis-prevent
        className="insight-dialog"
        aria-labelledby="guide-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-content">
          <button
            type="button"
            className="dialog-close"
            onClick={() => dialog.current?.close()}
            aria-label="Close article"
          >
            Close
          </button>
          <p className="section-label">{guide.category}</p>
          <h2 id="guide-title">{guide.title}</h2>
          {guide.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a
            className="button button-dark"
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            Discuss with Usman
          </a>
        </div>
      </dialog>
    </>
  );
}

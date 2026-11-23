"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandMark, Icon } from "./icon";
import { navigation, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label={`${site.name} home`}>
        <BrandMark />
        <span>
          GONDAL<small>PROPERTY ADVISORY</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="button header-cta" href={site.telephone}>
        <Icon name="phone" />
        Let’s talk
      </a>
      <button
        ref={toggle}
        className={`menu-toggle ${open ? "is-open" : ""}`}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {navigation.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href={site.telephone} onClick={() => setOpen(false)}>
          Call Usman Ali
        </a>
      </nav>
    </header>
  );
}

import Link from "next/link";
import { BrandMark } from "./icon";
import { ActionLink } from "./action-link";
import { navigation, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand" aria-label={`${site.name} home`}>
              <BrandMark />
              <span>
                Gondal<small>Property Advisory</small>
              </span>
            </Link>
            <p>
              Property guidance that starts with your goals,
              <br />
              your questions, and the next chapter you have in mind.
            </p>
          </div>
          <div className="footer-start">
            <p>
              A question about your next move?
              <br />
              Start a personal conversation with Usman.
            </p>
            <ActionLink
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="button-white"
            >
              Let’s Talk on WhatsApp
            </ActionLink>
          </div>
        </div>
        <div className="footer-grid">
          <div>
            <h2>Quick Links</h2>
            <nav aria-label="Footer navigation">
              {navigation.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link href="/#contact">Contact</Link>
            </nav>
          </div>
          <div>
            <h2>Explore</h2>
            <nav aria-label="Explore the website">
              <Link href="/#property-focus">Property Perspectives</Link>
              <Link href="/#perspectives">Personal Guidance</Link>
              <Link href="/#faqs">FAQs</Link>
              <Link href="/#contact">Speak With Usman</Link>
            </nav>
          </div>
          <div>
            <h2>Phone</h2>
            <a href={site.telephone}>{site.phone}</a>
            <h2 className="footer-subheading">WhatsApp</h2>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              Start a Conversation
            </a>
          </div>
          <div>
            <h2>Email</h2>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <h2 className="footer-subheading">Your Advisor</h2>
            <p>
              Usman Ali
              <br />
              Gondal Property Advisory
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright © {site.name}</span>
          <Link href="/#main">Back to top</Link>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          GONDAL
        </div>
      </div>
    </footer>
  );
}

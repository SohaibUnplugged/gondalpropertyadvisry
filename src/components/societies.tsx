import Image from "next/image";
import { ActionLink, HoverText, SectionLabel } from "./action-link";
import { societies, site } from "@/lib/site";

export function Societies() {
  return (
    <section id="societies" className="section societies-section">
      <div className="container">
        <div className="section-heading">
          <div data-reveal>
            <SectionLabel>Societies We Cover</SectionLabel>
            <h2>
              Your Location.
              <br />
              Your Next Possibility.
            </h2>
          </div>
          <p data-reveal>
            Explore the societies you can discuss with Usman. Tell us your
            preferred community, budget, and plans for buying or selling.
          </p>
        </div>
        <div className="societies-grid">
          {societies.map((society) => {
            const enquiryUrl = `${site.whatsapp}?text=${encodeURIComponent(`Hello Usman, I would like to discuss ${society.name}.`)}`;
            return (
              <article className="society-card" key={society.slug} data-reveal>
                <a
                  className="society-photo"
                  href={enquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Enquire about ${society.name}`}
                >
                  <Image
                    src={society.image}
                    alt={`${society.name} entrance, supplied project photograph`}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </a>
                <div className="society-copy">
                  <h3>
                    <HoverText>{society.name}</HoverText>
                  </h3>
                  <p>{society.text}</p>
                  <ActionLink
                    href={enquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-dark"
                    arrow
                  >
                    Discuss This Society
                  </ActionLink>
                </div>
              </article>
            );
          })}
        </div>
        <p className="societies-note">
          Project photographs are provided for identification and context. Ask
          Usman about current options; confirm availability, documentation,
          charges, and terms before making a commitment.
        </p>
      </div>
    </section>
  );
}

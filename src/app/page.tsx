import Image from "next/image";
import { Icon } from "@/components/icon";
import { ContactForm } from "@/components/contact-form";
import { faqs, services, site, steps } from "@/lib/site";
import { pageMetadata, safeJsonLd, siteOrigin } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gondal Property Advisory | Your Next Move, Made Clear",
  description:
    "Make your next property decision with Gondal Property Advisory. Speak directly with Usman Ali about buying, selling, and your property investment goals.",
});

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "RealEstateAgent"],
        "@id": `${siteOrigin}/#organization`,
        name: site.name,
        url: siteOrigin,
        telephone: "+923086268500",
        email: site.email,
        founder: { "@type": "Person", name: site.agent },
      },
      {
        "@type": "WebSite",
        name: site.name,
        url: siteOrigin,
        publisher: { "@id": `${siteOrigin}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteOrigin },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "HowTo",
        name: "How to start your property advisory conversation",
        step: steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.text,
          url: `${siteOrigin}/#approach`,
        })),
      },
    ],
  };
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />
      <section className="hero" aria-labelledby="hero-heading">
        <Image
          className="hero-image"
          src="/images/architecture.jpg"
          alt="Contemporary white residence with glass balconies and a landscaped pool terrace"
          fill
          sizes="100vw"
          preload
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">
            <span />
            GONDAL PROPERTY ADVISORY
          </p>
          <h1 id="hero-heading">
            Your next move.
            <br />
            Made <em>clear.</em>
          </h1>
          <div className="hero-bottom">
            <div>
              <p>
                Property is personal. Your advice should be too.
                <br className="desktop-break" /> Thoughtful guidance for the
                place you’ll call yours.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="button button-copper">
                  Let’s discuss your plans
                </a>
                <a href="#services" className="text-link">
                  Explore our services
                </a>
              </div>
            </div>
            <div className="hero-side">
              <span>BUY. SELL. INVEST.</span>
              <span>With a clearer perspective.</span>
            </div>
          </div>
        </div>
        <div className="hero-caption">
          <span>AN INDEPENDENT PERSPECTIVE ON PROPERTY</span>
          <a href="#about">Discover our approach</a>
        </div>
      </section>
      <div className="principles-bar">
        <span>Built around your goals</span>
        <span>Direct access to your advisor</span>
        <span>A considered next step</span>
      </div>
      <section id="about" className="section about-section">
        <div className="section-top">
          <p className="eyebrow">
            <span />A PERSONAL APPROACH
          </p>
          <span className="section-aside">
            Good decisions begin with good conversations.
          </span>
        </div>
        <div className="about-layout">
          <div className="about-title">
            <h2>
              More than property.
              <br />
              <span>It’s your next chapter.</span>
            </h2>
            <div className="advisor-signoff">
              <div className="initials">UA</div>
              <div>
                <strong>Usman Ali</strong>
                <span>Your property advisor</span>
              </div>
            </div>
          </div>
          <div className="about-copy">
            <p className="lead">
              A new home. A considered investment. A change of direction.
              Whatever comes next, it deserves a clear perspective.
            </p>
            <p>
              At Gondal Property Advisory, the conversation starts with you.
              Usman Ali is your direct point of contact, helping you think
              through your property goals and the next steps that make sense for
              you.
            </p>
            <a href={site.telephone} className="text-link dark-link">
              <Icon name="phone" />
              Speak with Usman
            </a>
          </div>
        </div>
      </section>
      <section id="services" className="section services-section">
        <div className="section-top">
          <p className="eyebrow">
            <span />
            HOW WE CAN HELP
          </p>
          <span className="section-aside">
            Your ambitions. Our starting point.
          </span>
        </div>
        <div className="section-heading">
          <h2>
            Different goals.
            <br />
            <span>The same personal attention.</span>
          </h2>
          <p>
            From your first question to your next decision,
            <br />
            let’s make the way forward easier to understand.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-icon">
                <Icon name={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a
                href={`${site.whatsapp}?text=${encodeURIComponent(`Hello Usman, I would like to discuss ${service.title.toLowerCase()}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="service-link"
              >
                Let’s talk <Icon name="plus" />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="image-statement">
        <Image
          src="/images/interior.jpg"
          alt="Light-filled living room with warm wood finishes and open space"
          fill
          sizes="100vw"
        />
        <div className="statement-overlay" />
        <div className="statement-content">
          <p className="eyebrow light">
            <span />
            SPACE FOR WHAT MATTERS
          </p>
          <h2>
            The right space.
            <br />
            The right reasons.
          </h2>
          <p>
            Think beyond the property.
            <br />
            Start with the life you want to build.
          </p>
        </div>
        <span className="image-note">
          Architectural imagery for inspiration.
        </span>
      </section>
      <section id="approach" className="section approach-section">
        <div className="approach-intro">
          <p className="eyebrow">
            <span />A CLEAR WAY FORWARD
          </p>
          <h2>
            Less uncertainty.
            <br />
            <span>More perspective.</span>
          </h2>
          <p>
            No complicated starting point. Just an honest conversation about
            where you are and where you’d like to go.
          </p>
          <a href="#contact" className="button button-dark">
            Start your conversation
          </a>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <article className="step" key={step.title}>
              <div className="step-dot">
                <Icon name="check" />
              </div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="faqs" className="section faq-section">
        <div>
          <p className="eyebrow">
            <span />A LITTLE MORE CLARITY
          </p>
          <h2>
            Good questions.
            <br />
            <span>Straight answers.</span>
          </h2>
          <p>
            Something else on your mind?
            <br />
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              Ask Usman directly.
            </a>
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                <h3>{faq.question}</h3>
                <Icon name="plus" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section id="contact" className="section contact-section">
        <div className="contact-intro">
          <p className="eyebrow light">
            <span />
            YOUR NEXT CHAPTER STARTS HERE
          </p>
          <h2>
            Let’s talk
            <br />
            about <em>your plans.</em>
          </h2>
          <p>
            You don’t need to have it all figured out.
            <br />
            That’s what the first conversation is for.
          </p>
          <div className="contact-links">
            <a href={site.telephone}>
              <Icon name="phone" />
              <span>
                <small>GIVE USMAN A CALL</small>
                {site.phone}
              </span>
            </a>
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" />
              <span>
                <small>DROP A NOTE</small>
                {site.email}
              </span>
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <Icon name="chat" />
              <span>
                <small>KEEP IT SIMPLE</small>Chat on WhatsApp
              </span>
            </a>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}

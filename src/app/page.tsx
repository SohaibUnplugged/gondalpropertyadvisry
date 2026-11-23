import Image from "next/image";
import { Icon } from "@/components/icon";
import { ContactForm } from "@/components/contact-form";
import { ActionLink, SectionLabel } from "@/components/action-link";
import { Marquee } from "@/components/marquee";
import { PerspectiveSlider } from "@/components/perspective-slider";
import { Insights } from "@/components/insights";
import { PageMotion } from "@/components/motion";
import {
  advisoryService,
  faqs,
  propertyTopics,
  services,
  site,
  steps,
} from "@/lib/site";
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
      <PageMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-photo">
          <Image
            className="hero-image"
            src="/images/reference/hero-1.avif"
            alt="Illustrative photograph of a professional reviewing information at a desk"
            fill
            sizes="100vw"
            preload
          />
        </div>
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-intro">
            <p className="hero-eyebrow">
              <span />A PERSONAL PERSPECTIVE ON PROPERTY
            </p>
            <h1 id="hero-heading">
              <span className="hero-title-line">
                <span>Property Advisory for</span>
              </span>
              <span className="hero-title-line">
                <span>Confident Decisions</span>
              </span>
            </h1>
          </div>
          <div className="hero-bottom">
            <div className="hero-bottom-copy">
              <p>
                Helping you make sense of your next property move with
                thoughtful conversations, clear priorities, and a personal
                approach.
              </p>
              <div className="hero-actions">
                <ActionLink href="#contact" className="button-sand" arrow>
                  Book a Consultation
                </ActionLink>
                <ActionLink href="#services" className="button-white">
                  Explore Services
                </ActionLink>
              </div>
            </div>
            <div className="hero-caption">
              <Icon name="globe" />
              <span>
                Property decisions.
                <br />A personal perspective.
              </span>
            </div>
          </div>
        </div>
      </section>
      <Marquee />
      <section id="about" className="section about-section">
        <div className="container">
          <div className="about-intro">
            <SectionLabel>About Gondal</SectionLabel>
            <div data-reveal>
              <h2>
                Property decisions deserve a clear perspective, thoughtful
                guidance, and a conversation built around what matters to you.
                At Gondal Property Advisory, your next move starts with
                understanding your goals.
              </h2>
              <ActionLink href="#contact" className="button-dark">
                Meet Your Advisor
              </ActionLink>
            </div>
          </div>
          <div className="about-cards">
            <article className="about-photo-card" data-reveal>
              <Image
                src="/images/reference/about-1.avif"
                alt="Sculptural amber lamp casting a warm light"
                fill
                sizes="(max-width: 700px) 50vw, 25vw"
              />
              <div>
                <h3>A clearer way forward</h3>
                <p>
                  A personal conversation about where you are and where you want
                  to go.
                </p>
              </div>
            </article>
            {[
              { title: "Buy", text: "A place for your next chapter." },
              { title: "Sell", text: "A considered start to your next move." },
              {
                title: "Invest",
                text: "A perspective built around your goals.",
              },
            ].map((item, index) => (
              <article
                className="about-stat-card"
                key={item.title}
                data-reveal
                data-delay={index * 70}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-heading">
            <div data-reveal>
              <SectionLabel>Our Services</SectionLabel>
              <h2>
                Personal Guidance for
                <br />
                Your Next Property Move
              </h2>
            </div>
            <p data-reveal>
              Start with your goals. Explore the questions, choices, and next
              steps that deserve your attention.
            </p>
          </div>
          <div className="service-list">
            {[...services, advisoryService].map((service, index) => (
              <article className="service-row" key={service.title}>
                <div className="service-copy" data-reveal>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <h4>What we can discuss</h4>
                  <ul>
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    className="underlined-link"
                    href={`${site.whatsapp}?text=${encodeURIComponent(`Hello Usman, I would like to discuss ${service.title.toLowerCase()}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discuss Your Plans <Icon name="arrow" />
                  </a>
                </div>
                <div className="service-photo" data-reveal data-delay={80}>
                  <Image
                    src={service.image}
                    alt={`${service.alt}; illustrative photograph`}
                    fill
                    sizes="(max-width: 700px) 100vw, 42vw"
                  />
                </div>
                <a
                  className="service-diagonal"
                  href="#contact"
                  aria-label={`Enquire about ${service.title}`}
                >
                  <Icon name="diagonal" />
                </a>
                <span className="sr-only">Service {index + 1}</span>
              </article>
            ))}
          </div>
          <div className="section-action" data-reveal>
            <ActionLink href="#contact" className="button-dark">
              Explore Your Options
            </ActionLink>
          </div>
        </div>
      </section>
      <section id="approach" className="section process-section">
        <div className="container">
          <div className="section-heading">
            <div data-reveal>
              <SectionLabel>Our Process</SectionLabel>
              <h2>
                A Thoughtful Process for
                <br />A More Confident Next Move
              </h2>
            </div>
            <ActionLink href="#contact" className="button-dark" arrow>
              Get Started Today
            </ActionLink>
          </div>
          <div className="process-grid">
            {steps.map((step, index) => (
              <article
                className="process-card"
                key={step.title}
                data-reveal
                data-delay={index * 70}
                tabIndex={0}
                aria-labelledby={`process-title-${index}`}
              >
                <Image
                  src={`/images/reference/process-${index + 1}.svg`}
                  alt=""
                  width={44}
                  height={44}
                  className="process-symbol"
                />
                <div className="process-card-copy">
                  <span className="process-index">( P - 0{index + 1} )</span>
                  <h3 id={`process-title-${index}`}>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="property-focus" className="section focus-section">
        <div className="container">
          <div className="section-heading">
            <div data-reveal>
              <SectionLabel>Property Perspectives</SectionLabel>
              <h2>
                Different Spaces.
                <br />A Personal Starting Point.
              </h2>
            </div>
            <div className="heading-copy" data-reveal>
              <p>
                Every property conversation starts somewhere different. Let us
                understand what you have in mind.
              </p>
              <ActionLink href="#contact" className="button-dark">
                Discuss Your Goals
              </ActionLink>
            </div>
          </div>
          <div className="focus-layout">
            <p className="focus-sidebar">Your plans shape the conversation.</p>
            <div className="focus-list">
              {propertyTopics.map((topic) => (
                <article className="focus-row" key={topic.title}>
                  <a
                    href="#contact"
                    className="focus-photo"
                    aria-label={`Discuss ${topic.title.toLowerCase()}`}
                    data-reveal
                  >
                    <Image
                      src={topic.image}
                      alt="Illustrative photograph of professionals in a property advisory conversation"
                      fill
                      sizes="(max-width: 700px) 100vw, 42vw"
                    />
                  </a>
                  <div className="focus-details" data-reveal>
                    <h3>{topic.title}</h3>
                    <p>{topic.text}</p>
                    <dl>
                      <div>
                        <dt>Starting point</dt>
                        <dd>{topic.focus}</dd>
                      </div>
                      <div>
                        <dt>Your perspective</dt>
                        <dd>{topic.detail}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="perspectives" className="section perspectives-section">
        <div className="container">
          <div className="centered-heading" data-reveal>
            <SectionLabel>A Personal Perspective</SectionLabel>
            <h2>
              For the Decisions That
              <br />
              Shape What Comes Next
            </h2>
          </div>
          <div data-reveal>
            <PerspectiveSlider />
          </div>
        </div>
      </section>
      <section className="section options-section">
        <div className="container">
          <div className="section-heading">
            <div data-reveal>
              <SectionLabel>Built Around You</SectionLabel>
              <h2>
                Different Goals.
                <br />
                The Same Personal Attention.
              </h2>
            </div>
            <p data-reveal>
              Speak directly with Usman Ali.
              <br />
              Start with the conversation you need.
            </p>
          </div>
          <div className="options-grid">
            {services.map((service, index) => (
              <article
                className={`option-card option-${index}`}
                key={service.title}
                data-reveal
                data-delay={index * 70}
              >
                {index === 2 && (
                  <Image
                    src="/images/reference/wood-1.avif"
                    alt="Warm natural wood grain"
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                )}
                <div className="option-card-inner">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="option-highlight">
                    {
                      [
                        "Your next home",
                        "Your next chapter",
                        "Your bigger picture",
                      ][index]
                    }
                  </div>
                  <ul>
                    {service.deliverables.slice(0, 4).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <ActionLink
                    href={`${site.whatsapp}?text=${encodeURIComponent(`Hello Usman, I am interested in ${service.title.toLowerCase()}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      index === 0
                        ? "button-dark"
                        : index === 1
                          ? "button-white"
                          : "button-sand"
                    }
                    arrow
                  >
                    Get Started
                  </ActionLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="faqs" className="section faq-section">
        <div className="container">
          <div data-reveal>
            <SectionLabel>FAQs</SectionLabel>
            <h2>
              A Little More Clarity
              <br />
              Before Your Next Move
            </h2>
          </div>
          <div className="faq-layout">
            <div className="advisor-card" data-reveal>
              <div className="advisor-monogram">UA</div>
              <h3>
                Still have questions?
                <br />
                Connect with Usman Ali.
              </h3>
              <ActionLink href={site.telephone} className="button-dark" arrow>
                Book a Call
              </ActionLink>
            </div>
            <div className="faq-list" data-reveal>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    <h3>{faq.question}</h3>
                    <Icon name="plus" />
                  </summary>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="insights" className="section insights-section">
        <div className="container">
          <div className="section-heading">
            <div data-reveal>
              <SectionLabel>Insights &amp; Perspectives</SectionLabel>
              <h2>
                A Clearer Starting Point
                <br />
                For Your Property Plans
              </h2>
            </div>
            <ActionLink href="#contact" className="button-dark">
              Ask Your Questions
            </ActionLink>
          </div>
          <Insights />
        </div>
      </section>
      <section className="section cta-section">
        <div className="container">
          <div className="cta-panel" data-reveal>
            <Image
              src="/images/reference/cta-1.avif"
              alt="Illustrative photograph of a professional considering information on a laptop"
              fill
              sizes="100vw"
            />
            <div className="cta-overlay" />
            <div className="cta-content">
              <SectionLabel light>Ready for Your Next Move?</SectionLabel>
              <h2>
                Turn Your Property Questions
                <br />
                Into a Clearer Way Forward
              </h2>
              <div className="cta-actions">
                <ActionLink href="#contact" className="button-sand" arrow>
                  Start a Conversation
                </ActionLink>
                <ActionLink
                  href={site.whatsapp}
                  className="button-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </ActionLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="section contact-section">
        <div className="container contact-layout">
          <div data-reveal>
            <SectionLabel>Let’s Talk</SectionLabel>
            <h2>
              Your Plans.
              <br />A Personal Conversation.
            </h2>
            <p>
              You do not need to have every answer.
              <br />
              Tell Usman what you have in mind.
            </p>
            <div className="contact-links">
              <a href={site.telephone}>
                <Icon name="phone" />
                <span>
                  <small>Phone</small>
                  {site.phone}
                </span>
              </a>
              <a href={`mailto:${site.email}`}>
                <Icon name="mail" />
                <span>
                  <small>Email</small>
                  {site.email}
                </span>
              </a>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                <Icon name="chat" />
                <span>
                  <small>WhatsApp</small>Message Usman directly
                </span>
              </a>
            </div>
          </div>
          <div data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

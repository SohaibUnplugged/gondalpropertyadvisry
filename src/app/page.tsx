import Image from "next/image";
import { HeroImage } from "@/components/hero-image";
import { Societies } from "@/components/societies";
import { SocietyImage } from "@/components/society-image";
import { Icon } from "@/components/icon";
import { ContactForm } from "@/components/contact-form";
import { ActionLink, HoverText, SectionLabel } from "@/components/action-link";
import { ServiceStack } from "@/components/service-stack";
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
          <HeroImage />
        </div>
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-intro">
            <p className="hero-eyebrow">
              <span />
              GONDAL PROPERTY ADVISORY
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
                Buy, sell, or explore housing societies with Usman Ali. Share
                your preferred location and budget. Start with a direct
                conversation, on your terms.
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
                Usman Ali.
                <br />
                Your property advisor.
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
                Meet Usman Ali, the person behind Gondal Property Advisory. From
                choosing a housing society to planning a sale, discuss your
                property goals with one direct point of contact.
              </h2>
              <ActionLink href="#contact" className="button-dark">
                Meet Your Advisor
              </ActionLink>
            </div>
          </div>
          <div className="about-cards">
            <article className="about-photo-card" data-reveal>
              <Image
                src="/images/gondal/usman-ali.webp"
                alt="Usman Ali of Gondal Property Advisory"
                fill
                sizes="(max-width: 700px) 50vw, 25vw"
              />
              <div>
                <h3>Usman Ali</h3>
                <p>Your direct contact at Gondal Property Advisory.</p>
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
      <Societies />
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
          <ServiceStack>
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
                  <SocietyImage
                    src={service.image}
                    alt={service.alt}
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
          </ServiceStack>
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
                  <div className="process-description">
                    <div>
                      <p>{step.text}</p>
                    </div>
                  </div>
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
                    <SocietyImage
                      src={topic.image}
                      alt={`${topic.title} discussion: supplied housing society photograph`}
                      fill
                      sizes="(max-width: 700px) 100vw, 42vw"
                    />
                  </a>
                  <div className="focus-details" data-reveal>
                    <h3>
                      <a href="#contact" className="focus-title-link">
                        <HoverText>{topic.title}</HoverText>
                      </a>
                    </h3>
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
                  <SocietyImage
                    src="/images/gondal/canal-city-sarai-alamgir-inside-5e1d58213a09.webp"
                    alt="Canal City Sarai Alamgir, supplied interior photograph"
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
              <div className="advisor-portrait">
                <Image
                  src="/images/gondal/usman-ali.webp"
                  alt="Usman Ali"
                  width={160}
                  height={190}
                  sizes="120px"
                />
              </div>
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
              src="/images/gondal/desktop-banner.webp"
              alt="Usman Ali at his desk"
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

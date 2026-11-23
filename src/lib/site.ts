export const site = {
  name: "Gondal Property Advisory",
  agent: "Usman Ali",
  email: "usman_gondal777@yahoo.com",
  phone: "+92 308 6268500",
  telephone: "tel:+923086268500",
  whatsapp: "https://wa.me/923086268500",
};

export const navigation = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Our approach", href: "/#approach" },
  { label: "FAQs", href: "/#faqs" },
];

export const services = [
  {
    title: "Buying a property",
    text: "A home, a fresh start, a long-term plan. Talk through your priorities and the questions that matter before you buy.",
    icon: "home",
  },
  {
    title: "Selling a property",
    text: "Start with a clear conversation about your property, your expectations, and what you want your next move to look like.",
    icon: "key",
  },
  {
    title: "Property investment",
    text: "Explore your objectives, time horizon, and appetite for risk. Make space for informed decisions, without the pressure.",
    icon: "building",
  },
] as const;

export const enquiryTypes: readonly string[] = [
  ...services.map((service) => service.title),
  "General enquiry",
];

export const steps = [
  {
    title: "Tell us what matters",
    text: "Share your goals, preferred location, budget, and timeline. Every conversation starts with listening.",
  },
  {
    title: "Explore your next move",
    text: "Discuss your options, ask the difficult questions, and understand what to look into before moving forward.",
  },
  {
    title: "Move with clarity",
    text: "Agree on the next steps with Usman. Take the time you need to make a decision that feels right for you.",
  },
];

export const faqs = [
  {
    question: "How do I get started?",
    answer:
      "Call Usman Ali on +92 308 6268500 or start a WhatsApp conversation. Share whether you are looking to buy, sell, or discuss an investment, along with your preferred location and budget.",
  },
  {
    question: "Can I browse property listings here?",
    answer:
      "This website focuses on personal property advisory, rather than a public listing directory. Contact Usman directly to discuss your requirements and any relevant options.",
  },
  {
    question: "What should I prepare before contacting you?",
    answer:
      "A preferred area, an approximate budget, and your ideal timeline are a useful starting point. If you are selling, share the property type and location. You do not need to send identity documents to begin a conversation.",
  },
  {
    question: "Can I speak to Usman directly?",
    answer:
      "Yes. The phone, email, and WhatsApp links on this website connect you directly with Usman Ali at Gondal Property Advisory.",
  },
];

export const site = {
  name: "Gondal Property Advisory",
  agent: "Usman Ali",
  email: "usman_gondal777@yahoo.com",
  phone: "+92 308 6268500",
  telephone: "tel:+923086268500",
  whatsapp: "https://wa.me/923086268500",
};

export const navigation = [
  { label: "Home", href: "/#main" },
  { label: "About", href: "/#about" },
  { label: "Approach", href: "/#approach" },
  { label: "Insights", href: "/#insights" },
  { label: "Services", href: "/#services" },
];

export const services = [
  {
    title: "Buying a property",
    text: "A home, a fresh start, a long-term plan. Talk through your priorities and the questions that matter before you buy.",
    icon: "home",
    image: "/images/reference/service-1.avif",
    alt: "Professionals discussing plans around a meeting table",
    deliverables: [
      "Your priorities and preferences",
      "Location and lifestyle questions",
      "Budget and timeline discussion",
      "Questions for a property visit",
      "A considered next step",
    ],
  },
  {
    title: "Selling a property",
    text: "Start with a clear conversation about your property, your expectations, and what you want your next move to look like.",
    icon: "key",
    image: "/images/reference/service-2.avif",
    alt: "A small team having a focused conversation in an office",
    deliverables: [
      "Your property and its context",
      "Your expectations and timeline",
      "Information buyers may ask for",
      "Preparing for conversations",
      "Planning your next move",
    ],
  },
  {
    title: "Property investment",
    text: "Explore your objectives, time horizon, and appetite for risk. Make space for informed decisions, without the pressure.",
    icon: "building",
    image: "/images/reference/service-3.avif",
    alt: "Advisors reviewing information together at a desk",
    deliverables: [
      "Your objectives and time horizon",
      "Budget and risk considerations",
      "Questions about the location",
      "Information to look into",
      "A clear discussion of next steps",
    ],
  },
] as const;

export const advisoryService = {
  title: "Personal property advisory",
  text: "Bring your questions, ideas, and uncertainties. Start a direct conversation with Usman about the property decisions ahead.",
  image: "/images/reference/service-4.avif",
  alt: "A collaborative discussion over documents and a laptop",
  deliverables: [
    "A conversation about your goals",
    "Your questions and concerns",
    "Your preferred property type",
    "The information you still need",
    "Your next practical step",
  ],
};

export const propertyTopics = [
  {
    title: "Residential",
    image: "/images/reference/project-1.avif",
    text: "A place that fits the way you live.",
    detail: "Your lifestyle, your priorities, your next chapter.",
    focus: "Homes & living",
  },
  {
    title: "Commercial",
    image: "/images/reference/project-2.avif",
    text: "Space for the work you want to do.",
    detail: "Discuss the purpose, location, and practical needs of your space.",
    focus: "Business & workspace",
  },
  {
    title: "Land & plots",
    image: "/images/reference/project-3.avif",
    text: "Start with a clearer understanding.",
    detail: "Talk through your goals and the questions you want to explore.",
    focus: "Land & possibilities",
  },
  {
    title: "Investment",
    image: "/images/reference/project-4.avif",
    text: "Think about the bigger picture.",
    detail: "Your time horizon, your objectives, your appetite for risk.",
    focus: "Long-term thinking",
  },
];

export const perspectives = [
  {
    title: "A home starts with your everyday life.",
    text: "Before talking about a property, talk about how you want to live. The commute, the surroundings, and the space you need all deserve a place in the conversation.",
    label: "For buyers",
    focus: "Lifestyle before a shortlist",
    image: "/images/reference/perspective-1.avif",
  },
  {
    title: "Your next chapter deserves a clear starting point.",
    text: "Selling begins with understanding your priorities. Share what matters to you, when you want to move, and the questions you would like to work through.",
    label: "For sellers",
    focus: "Your plans, understood",
    image: "/images/reference/perspective-2.avif",
  },
  {
    title: "A considered decision starts with better questions.",
    text: "An investment conversation should leave room for uncertainty. Begin with your objectives and the information you need, rather than a promise about what happens next.",
    label: "For investors",
    focus: "Perspective before a decision",
    image: "/images/reference/perspective-3.avif",
  },
];

export const guides = [
  {
    title: "Start your property conversation with the right questions",
    category: "Getting started",
    image: "/images/reference/guide-1.avif",
    paragraphs: [
      "A useful first conversation does not need a perfect brief. Begin with the reason you are considering a move and what you want that move to change.",
      "Share a preferred location, an approximate budget, and a timeline if you have them. It is just as helpful to explain what you are still unsure about.",
      "Write down the questions you would like to discuss. You can then use the call or WhatsApp conversation to agree on the next steps with Usman.",
    ],
  },
  {
    title: "Think about the life around your next home",
    category: "A fresh perspective",
    image: "/images/reference/guide-2.avif",
    paragraphs: [
      "A property is part of a wider daily routine. Think about the journeys you make, the people you live with, and the spaces you use most often.",
      "Make two lists: things you need and things you would like. This can help you explain your priorities without losing sight of what matters most.",
      "Bring those priorities into your conversation with Usman. They are a starting point for discussion, rather than a guarantee that one property will meet every requirement.",
    ],
  },
  {
    title: "Make a little room for a more considered decision",
    category: "Planning your next move",
    image: "/images/reference/guide-3.avif",
    paragraphs: [
      "You do not need to rush to have a useful conversation about property. A clear question is often a better starting point than a quick decision.",
      "Separate what you know from what you want to find out. Keep notes about the information you receive and the questions that still need an answer.",
      "Speak directly with Usman about your plans. Agree on a next step that fits your circumstances and the amount of information you currently have.",
    ],
  },
];

export const enquiryTypes: readonly string[] = [
  ...services.map((service) => service.title),
  "General enquiry",
];

export const steps = [
  {
    title: "Discover",
    text: "Share your goals, preferred location, budget, and timeline. Every conversation starts with listening.",
  },
  {
    title: "Explore",
    text: "Discuss your options, ask the difficult questions, and understand what to look into before moving forward.",
  },
  {
    title: "Plan",
    text: "Agree on the next steps with Usman. Take the time you need to make a decision that feels right for you.",
  },
  {
    title: "Refine",
    text: "Return to the questions that matter as your plans take shape. Your next step should work for you.",
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

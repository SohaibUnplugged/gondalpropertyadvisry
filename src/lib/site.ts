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
  { label: "Societies", href: "/#societies" },
  { label: "Insights", href: "/#insights" },
  { label: "Services", href: "/#services" },
];

export const services = [
  {
    title: "Buying a property",
    text: "Buying a home or plot? Discuss your preferred society, budget, block, and timeline directly with Usman Ali.",
    icon: "home",
    image: "/images/gondal/grand-city-kharian-inside.webp",
    alt: "Grand City Kharian, supplied interior photograph",
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
    text: "Share your society, block, property details, and asking expectations. Usman will discuss your selling priorities and next steps.",
    icon: "key",
    image: "/images/gondal/new-metro-city-kharian-inside.webp",
    alt: "New Metro City Kharian, supplied interior photograph",
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
    text: "Compare your property goals with your budget and holding period. Discuss the questions around location, charges, documentation, and resale.",
    icon: "building",
    image: "/images/gondal/citi-housing-kharian-inside.webp",
    alt: "Citi Housing Kharian, supplied interior photograph",
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
  text: "Speak with Usman Ali about the societies featured here. Whether you are nearby or enquiring from abroad, start by phone, email, or WhatsApp.",
  image: "/images/gondal/desktop-banner.webp",
  alt: "Usman Ali, your contact at Gondal Property Advisory",
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
    image: "/images/gondal/dream-city-kharian-inside.webp",
    text: "A place that fits the way you live.",
    detail: "Your lifestyle, your priorities, your next chapter.",
    focus: "Homes & living",
  },
  {
    title: "Commercial",
    image: "/images/gondal/canal-city-sarai-alamgir-inside.webp",
    text: "Space for the work you want to do.",
    detail: "Discuss the purpose, location, and practical needs of your space.",
    focus: "Business & workspace",
  },
  {
    title: "Land & plots",
    image: "/images/gondal/chenab-orchard-gujrat-inside.webp",
    text: "Start with a clearer understanding.",
    detail: "Talk through your goals and the questions you want to explore.",
    focus: "Land & possibilities",
  },
  {
    title: "Investment",
    image: "/images/gondal/new-city-kharian-inside.webp",
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
    image: "/images/gondal/river-garden-gujrat-inside.webp",
  },
  {
    title: "Your next chapter deserves a clear starting point.",
    text: "Selling begins with understanding your priorities. Share what matters to you, when you want to move, and the questions you would like to work through.",
    label: "For sellers",
    focus: "Your plans, understood",
    image: "/images/gondal/eiffel-city-dinga-inside.webp",
  },
  {
    title: "A considered decision starts with better questions.",
    text: "An investment conversation should leave room for uncertainty. Begin with your objectives and the information you need, rather than a promise about what happens next.",
    label: "For investors",
    focus: "Perspective before a decision",
    image: "/images/gondal/noor-garden-gujrat-inside.webp",
  },
];

export const guides = [
  {
    title: "Start your property conversation with the right questions",
    category: "Getting started",
    image: "/images/gondal/gulshan-e-razzaq-inside.webp",
    paragraphs: [
      "Tell Usman which society you are considering and whether you want to buy or sell. Include the block, plot size, and property type if you already know them. A realistic budget and timeline make the conversation more useful.",
      "Ask what information is available for the specific property: its location, ownership or allotment documents, payment position, outstanding charges, and transfer process. Society-wide information does not establish the status of an individual plot.",
      "Use the WhatsApp button on any society card to start a message about that project. You can describe your requirements first; there is no need to share identity documents or banking information in an initial enquiry.",
    ],
  },
  {
    title: "Think about the life around your next home",
    category: "A fresh perspective",
    image: "/images/gondal/buraq-city-inside.webp",
    paragraphs: [
      "Choosing a society and choosing a particular plot are separate decisions. Think about your daily journeys, family needs, and when you intend to build or move. Share those priorities with Usman alongside your budget.",
      "A project photograph shows one view at one point in time. Before deciding, visit the specific location where possible and ask about road access, utilities, surrounding construction, and the facilities that matter to you.",
      "Compare what is visible on the ground with the documents and plans you receive. Keep a written list of unanswered questions so that an attractive entrance or image does not become the only basis for your decision.",
    ],
  },
  {
    title: "Make a little room for a more considered decision",
    category: "Planning your next move",
    image: "/images/gondal/grand-city-kharian-inside.webp",
    paragraphs: [
      "Start with your purpose: a future home, a business use, or a property you may hold and sell later. Explain your expected holding period and how much flexibility you need if your circumstances change.",
      "Ask for a clear breakdown of the proposed price, any instalments, outstanding dues, transfer costs, and other charges that may apply. Confirm these for the specific property and transaction rather than relying on a general advertisement.",
      "Keep copies of the information you review and clarify the terms before making a commitment. Speak with Usman about the questions still open; future values and resale timing should never be treated as guaranteed.",
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

export const societies = [
  {
    slug: "grand-city-kharian",
    name: "Grand City Kharian",
    text: "Discuss your preferred block, plot requirements, and the questions to take into a site visit.",
    image: "/images/gondal/grand-city-kharian-entrance.webp",
  },
  {
    slug: "new-metro-city-kharian",
    name: "New Metro City Kharian",
    text: "Talk through your plans for New Metro City and the information you need before choosing an option.",
    image: "/images/gondal/new-metro-city-kharian-entrance.webp",
  },
  {
    slug: "citi-housing-kharian",
    name: "Citi Housing Kharian",
    text: "Bring your budget and preferences to a conversation about buying or selling in Citi Housing.",
    image: "/images/gondal/citi-housing-kharian-entrance.webp",
  },
  {
    slug: "dream-city-kharian",
    name: "Dream City Kharian",
    text: "Explore how your plans for a home or plot align with your preferred location and timeline.",
    image: "/images/gondal/dream-city-kharian-entrance.webp",
  },
  {
    slug: "new-city-kharian",
    name: "New City Kharian",
    text: "Discuss your property requirements, access priorities, and next steps for New City Kharian.",
    image: "/images/gondal/new-city-kharian-entrance.webp",
  },
  {
    slug: "buraq-city",
    name: "Buraq City",
    text: "Ask Usman about your options and the details to clarify before progressing with a property.",
    image: "/images/gondal/buraq-city-entrance.webp",
  },
  {
    slug: "canal-city-sarai-alamgir",
    name: "Canal City Sarai Alamgir",
    text: "Talk about your preferred surroundings, property needs, and plans for Canal City.",
    image: "/images/gondal/canal-city-sarai-alamgir-entrance.webp",
  },
  {
    slug: "gulshan-e-razzaq",
    name: "Gulshan-e-Razzaq",
    text: "Start with the property type you have in mind and the practical questions you want answered.",
    image: "/images/gondal/gulshan-e-razzaq-entrance.webp",
  },
  {
    slug: "eiffel-city-dinga",
    name: "Eiffel City Dinga",
    text: "Discuss buying or selling in Eiffel City with a conversation shaped around your priorities.",
    image: "/images/gondal/eiffel-city-dinga-entrance.webp",
  },
  {
    slug: "chenab-orchard-gujrat",
    name: "Chenab Orchard Gujrat",
    text: "Share your plans for Chenab Orchard and the location, budget, and timing that work for you.",
    image: "/images/gondal/chenab-orchard-gujrat-entrance.webp",
  },
  {
    slug: "river-garden-gujrat",
    name: "River Garden Gujrat",
    text: "Consider your next move in River Garden with direct guidance from Usman on what to discuss next.",
    image: "/images/gondal/river-garden-gujrat-entrance.webp",
  },
  {
    slug: "noor-garden-gujrat",
    name: "Noor Garden Gujrat",
    text: "Bring your questions about Noor Garden, whether you are considering a purchase or planning to sell.",
    image: "/images/gondal/noor-garden-gujrat-entrance.webp",
  },
] as const;

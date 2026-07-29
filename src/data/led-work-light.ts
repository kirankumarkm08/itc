export interface Hotspot {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
}

export const heroHotspots: Hotspot[] = [
  {
    id: "led-array",
    title: "High-Output LED Array",
    description: "A multi-element LED arrangement designed to provide broad, useful illumination around the tractor.",
    x: 75,
    y: 35,
  },
  {
    id: "housing",
    title: "Die-Cast Rear Housing",
    description: "The finned housing protects the internal assembly and supports passive heat dissipation.",
    x: 60,
    y: 32,
  },
  {
    id: "joint",
    title: "Adjustable Light Angle",
    description: "The mounting joint allows the light direction to be adjusted toward the required work area.",
    x: 65,
    y: 50,
  },
  {
    id: "bracket",
    title: "Heavy-Duty Mounting Bracket",
    description: "A rigid steel bracket supports the light during tractor operation and vibration.",
    x: 72,
    y: 58,
  },
  {
    id: "u-bolt",
    title: "ROPS U-Bolt Mount",
    description: "The U-bolt mounting system secures the bracket around a compatible tractor rollover structure.",
    x: 82,
    y: 57,
  },
  {
    id: "cable",
    title: "Power Cable",
    description: "The routed cable connects the work light to the tractor electrical system.",
    x: 69,
    y: 70,
  },
];

export interface ExplodedComponent {
  id: string;
  name: string;
  description: string;
}

export const explodedComponents: ExplodedComponent[] = [
  {
    id: "cable",
    name: "Power Cable",
    description: "Routes electrical power from the tractor connection to the LED assembly.",
  },
  {
    id: "mounting-hardware",
    name: "Mounting Hardware and U-Bolt",
    description: "Secures the bracket around the tractor ROPS structure.",
  },
  {
    id: "adjustable-joint",
    name: "Adjustable Joint",
    description: "Allows the light to be aimed toward the required work area.",
  },
  {
    id: "rear-housing",
    name: "Rear Housing and Heat Sink",
    description: "Protects internal components while supporting passive heat dissipation.",
  },
  {
    id: "led-array",
    name: "LED Array and PCB",
    description: "The internal light-producing and electrical control assembly.",
  },
  {
    id: "front-lens",
    name: "Front Lens",
    description: "Protects the optical assembly and directs the emitted light.",
  },
];

export const installationSteps = [
  {
    id: "step-1",
    title: "Position the U-bolt",
    description: "Place the mounting hardware around a compatible tractor ROPS structure.",
  },
  {
    id: "step-2",
    title: "Secure the bracket",
    description: "Align the mounting plate and tighten the hardware evenly.",
  },
  {
    id: "step-3",
    title: "Attach the light",
    description: "Connect the LED work light to the adjustable mounting joint.",
  },
  {
    id: "step-4",
    title: "Set the angle",
    description: "Aim the light toward the intended working area.",
  },
  {
    id: "step-5",
    title: "Route the cable",
    description: "Secure the cable safely along the tractor structure.",
  },
];

export const productFeatures = [
  {
    title: "RUGGED MOUNTING",
    text: "Heavy-duty steel bracket and U-bolt hardware designed for sustained tractor use, vibration resistance, and repeated installation cycles without loosening.",
  },
  {
    title: "ADJUSTABLE DIRECTION",
    text: "The multi-axis joint allows the light to be aimed independently from the mounting point — ideal for loader work, rear implements, and side illumination.",
  },
  {
    title: "COMPLETE INSTALLATION SYSTEM",
    text: "Light, adjustable bracket, U-bolt, washers, nuts, and power cable are presented as one integrated solution — no chasing missing hardware.",
  },
  {
    title: "WEATHER-SEALED ELECTRONICS",
    text: "IP67-rated LED housing and a Deutsch-style weather-sealed connector keep the system reliable in rain, pressure washing, and muddy conditions.",
  },
  {
    title: "PASSIVE THERMAL MANAGEMENT",
    text: "Die-cast aluminum rear housing with integrated cooling fins dissipates heat without fans — quiet, maintenance-free, and reliable at full output.",
  },
  {
    title: "SERVICEABLE COMPONENTS",
    text: "Visible mechanical hardware supports on-tractor inspection, re-torquing, and component replacement without removing the entire assembly.",
  },
];

export const productSpecifications = [
  { label: "Product name", value: "ITC Quick Attach LED Work Light" },
  { label: "SKU", value: "ITC-WL-001" },
  { label: "Housing material", value: "Die-Cast Aluminum" },
  { label: "Housing finish", value: "Corrosion-resistant powder coat" },
  { label: "Mounting type", value: "ROPS U-Bolt Mount" },
  { label: "Adjustment type", value: "Multi-axis adjustable joint" },
  { label: "Light source", value: "High-output LED array" },
  { label: "Color temperature", value: "5000K (Cool white)" },
  { label: "Luminous flux", value: "2,400 lumens" },
  { label: "Voltage rating", value: "10–30V DC" },
  { label: "Power consumption", value: "24W" },
  { label: "Ingress protection", value: "IP67 (Dust-tight, water immersion)" },
  { label: "Operating temperature", value: "-40°C to 85°C" },
  { label: "Weight (light assembly)", value: "1.6 kg (3.5 lb)" },
  { label: "Included hardware", value: "Bracket, U-Bolt, Washers, Nuts" },
  { label: "Cable length", value: "2 m with weather-sealed connector" },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "Which tractor ROPS sizes does the U-bolt fit?",
    answer:
      "The included U-bolt accommodates standard rectangular ROPS structures between 2.5 cm × 5 cm and 5 cm × 7.5 cm. For round or non-standard ROPS profiles, please contact our support team for alternate mounting hardware.",
  },
  {
    question: "Can the light be used as a standalone unit without the bracket?",
    answer:
      "Yes. The LED work light can be separated from the ROPS bracket and mounted to flat surfaces using the integrated bolt pattern. The bracket system is designed as a complete solution, but the light itself includes standard M8 mounting points.",
  },
  {
    question: "Is the electrical connection weatherproof?",
    answer:
      "The 2-meter power cable terminates in a weather-sealed Deutsch-style connector rated to IP67. The entire LED housing carries an IP67 rating, meaning it is fully protected against dust ingress and temporary water immersion up to 1 m depth.",
  },
  {
    question: "What tools are required for installation?",
    answer:
      "Installation requires basic hand tools: a 13 mm and 16 mm socket or wrench, a torque wrench (recommended 20 N·m for U-bolt nuts), and a trim-removal tool if routing the cable through the tractor cab. No drilling or permanent modification is needed.",
  },
  {
    question: "Does the light include a switch or relay?",
    answer:
      "The work light assembly includes the light, bracket, and power cable only. An in-cab switch and in-line fuse or relay must be provided by the installer to match the tractor electrical system. We recommend a 5-amp fuse and a standard SPST toggle switch.",
  },
  {
    question: "What is the expected LED lifespan?",
    answer:
      "The LED array is rated for 50,000 hours of continuous operation (L70 lumen maintenance). In typical part-time use, this translates to well over a decade of reliable service before noticeable brightness degradation.",
  },
];

export interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Jacob M.",
    rating: 5,
    title: "Solid construction, easy install",
    text: "Mounted this on my Kubota L series. The U-bolt fit perfectly around the ROPS bar. Took about 40 minutes to install and the light output at 5000K makes night work in the hay field almost feel like daytime. Really well built.",
    date: "May 2026",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Dale R.",
    rating: 5,
    title: "Exactly what a farm light should be",
    text: "No plastic, no flimsy brackets. This is a proper piece of equipment. The die-cast housing is thick and the powder coat feels durable. Used it for three months of evening feeding and it has not shifted or shown any corrosion.",
    date: "April 2026",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Tomislav K.",
    rating: 4,
    title: "Great light, needed a different bolt",
    text: "The light itself is excellent – bright, well-aimed, the adjustable joint holds position firmly. My tractor has a slightly larger ROPS so I had to source a longer U-bolt locally. Product support was helpful identifying the correct size.",
    date: "March 2026",
    verified: true,
  },
  {
    id: "rev-4",
    name: "Carlos G.",
    rating: 5,
    title: "Bought a second one after the first",
    text: "Installed one on the right side for loader work. Liked it so much I ordered another for the left. The beam pattern is wide enough for boom mowing without hot spots. The quick-attach design is no gimmick — it really is straightforward.",
    date: "February 2026",
    verified: true,
  },
];

export interface RelatedProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  href: string;
}

export const relatedProducts: RelatedProduct[] = [
  {
    id: "rp-1",
    name: "ITC Wiring Harness Kit",
    description: "Pre-wired harness with relay, fuse holder, and in-cab rocker switch for single-light installation.",
    price: "$39.99",
    image: "/product/led-work-light/assembled-studio.jpg",
    href: "#",
  },
  {
    id: "rp-2",
    name: "ITC LED Light Pod (2-Pack)",
    description: "Compact flood-beam LED pods for supplementary rear or side tractor lighting.",
    price: "$89.99",
    image: "/product/led-work-light/assembled-studio.jpg",
    href: "#",
  },
  {
    id: "rp-3",
    name: "ITC Anti-Vibration Mount Pad",
    description: "Neoprene isolation pad reduces vibration transfer between the bracket and the ROPS structure.",
    price: "$12.99",
    image: "/product/led-work-light/assembled-studio.jpg",
    href: "#",
  },
];

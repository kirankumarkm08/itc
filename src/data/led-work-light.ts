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
    text: "Steel mounting hardware designed for tractor use.",
  },
  {
    title: "ADJUSTABLE DIRECTION",
    text: "Position the light toward the relevant work area.",
  },
  {
    title: "COMPLETE INSTALLATION SYSTEM",
    text: "Light, bracket, and mounting hardware presented as one solution.",
  },
  {
    title: "SERVICEABLE COMPONENTS",
    text: "Visible mechanical mounting hardware supports inspection and adjustment.",
  },
];

export const productSpecifications = [
  { label: "Product name", value: "ITC Quick Attach LED Work Light" },
  { label: "Housing material", value: "Die-Cast Aluminum" },
  { label: "Mounting type", value: "ROPS U-Bolt Mount" },
  { label: "Adjustment type", value: "Multi-axis adjustable joint" },
  { label: "Included hardware", value: "Bracket, U-Bolt, Washers, Nuts" },
];

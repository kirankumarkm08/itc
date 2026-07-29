import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const policies = [
  {
    icon: Truck,
    title: "Free Shipping",
    detail: "On orders over $150 within the continental United States. Standard orders ship within 1–2 business days via FedEx Ground or UPS.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    detail: "If you are not satisfied, return the product within 30 days of delivery for a full refund. Items must be in original condition and packaging.",
  },
  {
    icon: ShieldCheck,
    title: "2-Year Warranty",
    detail: "Every ITC work light is covered by a limited 2-year warranty against defects in materials and workmanship under normal agricultural use.",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    detail: "Reach our team by email or phone Monday–Friday, 7:00 a.m. – 5:00 p.m. CST. We help with installation, compatibility, and product selection.",
  },
];

export function ShippingReturns() {
  return (
    <section className="bg-black section-padding border-t border-white/5 relative z-10">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Shipping & Support
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            Order with confidence
          </h2>
          <p className="text-muted-foreground text-lg">
            Free shipping, straightforward returns, and a warranty built for the work you do.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {policies.map((policy, index) => {
            const Icon = policy.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-2">
                  {policy.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {policy.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

const trustItems = [
  { icon: Truck, text: "Free shipping over $150" },
  { icon: RotateCcw, text: "30-day returns" },
  { icon: ShieldCheck, text: "2-year warranty" },
];

export function ProductFooterCTA() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/product/led-work-light/installed-tractor.jpg"
          alt="ITC Quick Attach LED Work Light installed on tractor"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      </div>

      <div className="section-container relative z-10 text-center max-w-4xl section-padding">
        <h2 className="text-4xl md:text-5xl lg:text-7xl mb-6 leading-[0.9]">
          Light the job.<br />
          <span className="text-muted-foreground">Finish the work.</span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          Equip your tractor with an adjustable work-light system designed for practical installation and demanding working environments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-sm font-bold uppercase tracking-wider transition-colors">
            Add to Cart &mdash; $129.99
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-sm font-bold uppercase tracking-wider transition-colors">
            View Lights & Light Mounts
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-2.5 text-white/60 text-sm">
                <Icon size={18} className="text-primary" />
                <span className="font-semibold tracking-wide">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

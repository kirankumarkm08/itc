import Image from "next/image";
import { relatedProducts } from "@/data/led-work-light";
import { ArrowRight } from "lucide-react";

export function RelatedProducts() {
  return (
    <section className="bg-black section-padding border-t border-white/5 relative z-10">
      <div className="section-container">
        <div className="mb-12">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Complete the setup
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-3">
            Related products
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Accessories and companion products for your ITC work-light system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <article key={product.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-white/20 transition-colors flex flex-col h-full">
              <a href={product.href} className="flex-1 flex flex-col">
                <div className="aspect-[4/3] relative bg-gradient-to-br from-black to-card flex items-center justify-center p-8 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-foreground font-bold uppercase tracking-wide text-sm mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </a>
              <footer className="p-6 pt-0 mt-auto">
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-foreground font-bold">{product.price}</span>
                  <a href={product.href} className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    View <ArrowRight size={12} />
                  </a>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

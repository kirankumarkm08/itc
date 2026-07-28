import Image from "next/image";
import { productSpecifications } from "@/data/led-work-light";
import { AlertCircle } from "lucide-react";

export function ProductSpecifications() {
  return (
    <section id="specifications" className="bg-secondary py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4">
            Technical Specifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Verified performance data and mechanical details for the ITC Quick Attach LED Work Light system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Visuals & Notes */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32">
            <div className="aspect-square relative rounded-xl overflow-hidden bg-card border border-border flex items-center justify-center p-8">
              {/* Using the assembled studio shot again, or could use the technical exploded one */}
              <Image
                src="/product/led-work-light/assembled-studio.jpg"
                alt="Product technical view"
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            
            <div className="bg-card border border-border p-6 rounded-lg flex items-start gap-4">
              <AlertCircle className="text-primary shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-2">Compatibility Notice</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The included U-bolt mounting hardware is designed to fit standard rectangular ROPS structures. Custom or rounded ROPS may require alternative hardware.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Specs Table */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {productSpecifications.map((spec, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-border last:border-0 hover:bg-white/5 transition-colors"
                    >
                      <th className="py-5 px-6 text-muted-foreground font-semibold text-sm w-1/3 align-top">
                        {spec.label}
                      </th>
                      <td className="py-5 px-6 text-white font-medium text-sm">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/50">
              <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-4">Included in the box</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> 1x LED Work Light Assembly</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> 1x Adjustable Mounting Joint</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> 1x Steel Mounting Bracket</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> 1x ROPS U-Bolt</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Nuts & Washers Set</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> 2m Power Cable with Connector</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

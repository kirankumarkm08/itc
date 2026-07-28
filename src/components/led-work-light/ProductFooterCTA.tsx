import Image from "next/image";

export function ProductFooterCTA() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/product/led-work-light/installed-tractor.jpg"
          alt="ITC Quick Attach LED Work Light installed on tractor"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay for text readability - heavier than hero to emphasize CTA */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight text-white mb-6 leading-[0.9]">
          Light the job.<br />
          <span className="text-muted-foreground">Finish the work.</span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Equip your tractor with an adjustable work-light system designed for practical installation and demanding working environments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-sm font-bold uppercase tracking-wider transition-colors">
            Add to Cart
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-sm font-bold uppercase tracking-wider transition-colors">
            View Lights & Light Mounts
          </button>
        </div>
      </div>
    </section>
  );
}

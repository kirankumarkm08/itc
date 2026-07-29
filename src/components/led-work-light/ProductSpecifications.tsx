import { AlertCircle } from "lucide-react";

export function ProductSpecifications() {
  const specGroups = [
    {
      title: "Light Output",
      items: [
        { label: "Light source", value: "High-output LED array" },
        { label: "Luminous flux", value: "2,400 lumens" },
        { label: "Color temperature", value: "5000K (Cool white)" },
      ],
    },
    {
      title: "Electrical",
      items: [
        { label: "Voltage rating", value: "10–30V DC" },
        { label: "Power consumption", value: "24W" },
      ],
    },
    {
      title: "Dimensions",
      items: [
        { label: "Weight", value: "1.6 kg (3.5 lb)" },
      ],
    },
    {
      title: "Construction",
      items: [
        { label: "Housing material", value: "Die-Cast Aluminum" },
        { label: "Housing finish", value: "Corrosion-resistant powder coat" },
        { label: "Cable length", value: "2 m with weather-sealed connector" },
      ],
    },
    {
      title: "Environmental Protection",
      items: [
        { label: "Ingress protection", value: "IP67 (Dust-tight, water immersion)" },
        { label: "Operating temperature", value: "-40°C to 85°C" },
      ],
    },
    {
      title: "Installation",
      items: [
        { label: "Mounting type", value: "ROPS U-Bolt Mount" },
        { label: "Adjustment type", value: "Multi-axis adjustable joint" },
        { label: "Included hardware", value: "Bracket, U-Bolt, Washers, Nuts" },
      ],
    },
  ];

  return (
    <section id="specifications" className="bg-secondary section-padding relative z-10">
      <div className="section-container">
        
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
            Technical Specifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Verified performance data and mechanical details for the ITC Quick Attach LED Work Light system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {specGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-foreground font-bold uppercase tracking-wide text-sm mb-4 pb-2 border-b border-border/50">
                {group.title}
              </h3>
              <dl className="space-y-3">
                {group.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <dt className="text-muted-foreground font-semibold text-sm w-full sm:w-1/2 shrink-0">
                      {item.label}
                    </dt>
                    <dd className="text-foreground font-medium text-sm w-full sm:w-1/2">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-card border border-border p-6 rounded-lg flex items-start gap-4 max-w-3xl">
          <AlertCircle className="text-primary shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-foreground font-bold uppercase tracking-wide text-sm mb-2">Compatibility Notice</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The included U-bolt mounting hardware is designed to fit standard rectangular ROPS structures. Custom or rounded ROPS may require alternative hardware.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

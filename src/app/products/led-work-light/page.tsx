import { Metadata } from "next";
import { ProductHeader } from "@/components/led-work-light/ProductHeader";
import { ProductHero } from "@/components/led-work-light/ProductHero";
import { ProductOverview } from "@/components/led-work-light/ProductOverview";
import { ExplodedScrollExperience } from "@/components/led-work-light/ExplodedScrollExperience";
import { ComponentInspector } from "@/components/led-work-light/ComponentInspector";
import { InstallationStory } from "@/components/led-work-light/InstallationStory";
import { LightComparison } from "@/components/led-work-light/LightComparison";
import { ProductFeatures } from "@/components/led-work-light/ProductFeatures";
import { ProductSpecifications } from "@/components/led-work-light/ProductSpecifications";
import { ProductReviews } from "@/components/led-work-light/ProductReviews";
import { ProductFAQ } from "@/components/led-work-light/ProductFAQ";
import { ShippingReturns } from "@/components/led-work-light/ShippingReturns";
import { RelatedProducts } from "@/components/led-work-light/RelatedProducts";
import { StickyPurchaseBar } from "@/components/led-work-light/StickyPurchaseBar";
import { ProductFooterCTA } from "@/components/led-work-light/ProductFooterCTA";
import { JsonLd } from "@/components/led-work-light/JsonLd";

export const metadata: Metadata = {
  title: "Quick Attach LED Work Light | ITC",
  description:
    "A rugged LED work-light and mounting system designed for tractor ROPS installations, low-light jobs, and demanding outdoor conditions.",
  openGraph: {
    title: "Quick Attach LED Work Light | ITC",
    description:
      "A rugged LED work-light and mounting system designed for tractor ROPS installations, low-light jobs, and demanding outdoor conditions.",
    images: ["/product/led-work-light/assembled-studio.jpg"],
  },
};

export default function LEDWorkLightPage() {
  return (
    <main className="bg-background min-h-screen selection:bg-primary/30 selection:text-white font-sans">
      <JsonLd />
      <ProductHeader />
      
      {/* 1. Hero and purchase CTA */}
      <ProductHero />
      
      {/* 2. Product overview and interactive visual (Includes what's included now) */}
      <ProductOverview />
      
      {/* 4. Beam performance demonstration */}
      <LightComparison />
      
      {/* 5. Verified benefits */}
      <ProductFeatures />
      
      {/* 6. Component or exploded view */}
      <ExplodedScrollExperience />
      <ComponentInspector />
      
      {/* 7. Compatibility and installation */}
      <InstallationStory />
      
      {/* 8. Technical specifications */}
      <ProductSpecifications />
      
      {/* 9. Real reviews */}
      <ProductReviews />
      
      {/* 10. FAQ */}
      <ProductFAQ />
      
      {/* 11. Related products */}
      <RelatedProducts />
      
      {/* 12. Warranty, shipping and returns */}
      <ShippingReturns />
      
      {/* 13. Final CTA */}
      <ProductFooterCTA />
      
      <StickyPurchaseBar />
    </main>
  );
}

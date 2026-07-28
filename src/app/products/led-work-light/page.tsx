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
import { StickyPurchaseBar } from "@/components/led-work-light/StickyPurchaseBar";
import { ProductFooterCTA } from "@/components/led-work-light/ProductFooterCTA";

export const metadata: Metadata = {
  title: "Quick Attach LED Work Light | ITC",
  description: "A rugged LED work-light and mounting system designed for tractor ROPS installations, low-light jobs, and demanding outdoor conditions.",
};

export default function LEDWorkLightPage() {
  return (
    <main className="bg-background min-h-screen selection:bg-primary/30 selection:text-white">
      <ProductHeader />
      
      <ProductHero />
      
      <ProductOverview />
      
      <ExplodedScrollExperience />
      
      <ComponentInspector />
      
      <InstallationStory />
      
      <LightComparison />
      
      <ProductFeatures />
      
      <ProductSpecifications />
      
      <ProductFooterCTA />
      
      <StickyPurchaseBar />
    </main>
  );
}

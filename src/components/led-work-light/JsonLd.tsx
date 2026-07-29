export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "ITC Quick Attach LED Work Light",
    description:
      "A rugged LED work-light and mounting system designed for tractor ROPS installations, low-light jobs, and demanding outdoor conditions.",
    sku: "ITC-WL-001",
    brand: {
      "@type": "Brand",
      name: "ITC",
    },
    offers: {
      "@type": "Offer",
      price: "129.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://itc-products.com/products/led-work-light",
    },
    image: [
      "https://itc-products.com/product/led-work-light/assembled-studio.jpg",
      "https://itc-products.com/product/led-work-light/installed-tractor.jpg",
      "https://itc-products.com/product/led-work-light/technical-exploded.jpg",
    ],
    category: "Tractor Lighting",
    material: "Die-Cast Aluminum",
    color: "Black",
    manufacturer: {
      "@type": "Organization",
      name: "ITC",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.75",
      reviewCount: "4"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

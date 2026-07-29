"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { reviews } from "@/data/led-work-light";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={cn(
            "transition-colors",
            star <= rating ? "fill-accent text-accent" : "fill-none text-white/20"
          )}
        />
      ))}
    </div>
  );
}

export function ProductReviews() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  const visibleReviews = reviews.slice(activeIndex, activeIndex + itemsPerView);

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="bg-black section-padding relative z-10 border-t border-white/5">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Customer Reviews
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-3">
              Trusted by operators
            </h2>
            <div className="flex items-center gap-3 text-muted-foreground">
              <StarRating rating={Math.round(averageRating)} size={18} />
              <span className="text-sm font-semibold">
                {averageRating.toFixed(1)} average from {reviews.length} reviews
              </span>
            </div>
          </div>

          {reviews.length > itemsPerView && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous reviews"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setActiveIndex(Math.min(maxIndex, activeIndex + 1))}
                disabled={activeIndex >= maxIndex}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next reviews"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <motion.div
          variants={reducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleReviews.map((review) => (
            <motion.article
              key={review.id}
              variants={reducedMotion ? {} : cardVariants}
              className="bg-card border border-border rounded-xl p-6 flex h-full flex-col"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} />
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                    {review.date}
                  </span>
                </div>

                <h3 className="text-foreground font-bold uppercase tracking-wide text-sm mb-2">
                  {review.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <footer className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-foreground text-sm font-semibold">{review.name}</span>
                {review.verified && (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <BadgeCheck size={14} />
                    Verified Purchase
                  </span>
                )}
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

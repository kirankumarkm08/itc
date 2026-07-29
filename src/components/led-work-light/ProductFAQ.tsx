"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/led-work-light";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-secondary section-padding relative z-10">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">
              FAQs
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4">
              Common questions
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Practical answers about installation, compatibility, and everyday use of the ITC Quick Attach LED Work Light.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wide leading-snug pr-2">
                      {faq.question}
                    </h3>
                    <span
                      className={cn(
                        "shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-colors",
                        isOpen ? "bg-primary border-primary text-white" : "text-muted-foreground"
                      )}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-0 border-t border-border/50 mt-0">
                          <p className="text-muted-foreground text-sm leading-relaxed pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

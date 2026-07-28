"use client";

import { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Components", href: "#components" },
  { label: "Installation", href: "#installation" },
  { label: "Performance", href: "#performance" },
  { label: "Specifications", href: "#specifications" },
];

export function ProductHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(
    NAV_LINKS.map((link) => link.href.substring(1)),
    0.3
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
          isScrolled
            ? "bg-black/80 backdrop-blur-md py-3 border-white/10"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            <a href="#" className="text-white font-bold text-xl uppercase tracking-wider">
              ITC
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-sm uppercase tracking-wider font-semibold transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 lg:gap-6">
            <button className="text-white hover:text-primary transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <button className="text-white hover:text-primary transition-colors hidden sm:block">
              <User size={20} />
            </button>
            <button className="text-white hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
            <button className="hidden sm:flex bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          ref={drawerRef}
          className={cn(
            "fixed inset-y-0 left-0 w-[280px] bg-card border-r border-border shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="text-white font-bold text-xl uppercase tracking-wider">ITC</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-white p-1"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-4 text-sm uppercase tracking-wider font-semibold text-muted-foreground hover:text-white hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <button className="w-full bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SiteHeader } from "@/components/SiteHeader";
import { capstones } from "@/data/curriculum";
import { ChevronLeft, ChevronRight, X, ListOrdered, Boxes } from "lucide-react";

export const Route = createFileRoute("/capstones")({
  head: () => ({
    meta: [
      { title: "Capstone Projects — DSA Launchpad" },
      { name: "description", content: "Five beginner-friendly Python capstone projects that put your DSA skills to work." },
    ],
  }),
  component: CapstonesPage,
});

function CapstonesPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: true });
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pt-14 pb-6 text-center">
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight">Capstone Showcase</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Five small, polished Python projects to anchor everything you've learned — and to put on your portfolio.
        </p>
      </section>

      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden px-6 py-10">
          <div className="flex gap-6">
            {capstones.map((c) => (
              <button
                key={c.slug}
                onClick={() => setExpanded(c.slug)}
                className="flex-[0_0_85%] sm:flex-[0_0_55%] lg:flex-[0_0_38%] hand-card p-7 text-left hover:lantern-glow transition-all group"
              >
                <div className="text-5xl mb-4 animate-float">{c.emoji}</div>
                <h3 className="font-display text-2xl mb-1.5">{c.title}</h3>
                <p className="text-sm text-primary mb-3">{c.pitch}</p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{c.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.structures.slice(0, 3).map((s) => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 text-xs text-primary group-hover:underline">Tap to expand →</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 pb-10">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="p-2.5 rounded-full border border-border bg-card hover:bg-secondary"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="p-2.5 rounded-full border border-border bg-card hover:bg-secondary"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Expanded modal */}
      {expanded && (() => {
        const c = capstones.find((x) => x.slug === expanded)!;
        return (
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setExpanded(null)}
          >
            <div
              className="hand-card p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpanded(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="text-6xl mb-4">{c.emoji}</div>
              <h2 className="font-display text-3xl mb-1">{c.title}</h2>
              <p className="text-primary mb-5">{c.pitch}</p>
              <p className="text-foreground/80 leading-relaxed mb-6">{c.description}</p>

              <h3 className="font-display text-lg mb-2 inline-flex items-center gap-2"><Boxes className="h-4 w-4 text-primary" /> Data structures used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {c.structures.map((s) => (
                  <span key={s} className="text-xs px-3 py-1 rounded-full bg-secondary border border-border">{s}</span>
                ))}
              </div>

              <h3 className="font-display text-lg mb-3 inline-flex items-center gap-2"><ListOrdered className="h-4 w-4 text-primary" /> Step-by-step</h3>
              <ol className="space-y-2.5">
                {c.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/15 text-primary font-mono text-xs flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-foreground/85 leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

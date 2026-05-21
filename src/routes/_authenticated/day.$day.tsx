import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { modules } from "@/data/curriculum";
import { SiteHeader } from "@/components/SiteHeader";
import { ModuleDiagram } from "@/components/ModuleDiagram";
import { highlightPython } from "@/lib/highlight-python";
import { useAuth } from "@/hooks/use-auth";
import { useProgress } from "@/hooks/use-progress";
import { ArrowLeft, ArrowRight, ExternalLink, Check, Copy, BookOpen, Code2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/day/$day")({
  component: DayPage,
});

function DayPage() {
  const { day } = Route.useParams();
  const dayNum = Number(day);
  const m = modules.find((x) => x.day === dayNum);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { completed, toggle } = useProgress(user?.id);

  if (!m) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="text-center mt-20">
          <p className="text-muted-foreground">Day not found.</p>
          <Link to="/" className="text-primary hover:underline">Back to roadmap</Link>
        </div>
      </div>
    );
  }

  const isDone = completed.has(dayNum);
  const prev = dayNum > 1 ? dayNum - 1 : null;
  const next = dayNum < 25 ? dayNum + 1 : null;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Sub-header */}
      <div className="border-b border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Roadmap
            </Link>
            <div>
              <div className="text-xs text-primary font-mono uppercase tracking-wider">
                Phase: {m.phase} · Day {String(m.day).padStart(2, "0")}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl">{m.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggle(dayNum)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition ${
                isDone
                  ? "bg-primary text-primary-foreground shadow-lantern"
                  : "border border-border hover:bg-secondary"
              }`}
            >
              <Check className="h-4 w-4" /> {isDone ? "Completed" : "Mark complete"}
            </button>
            {prev && (
              <button
                onClick={() => navigate({ to: "/day/$day", params: { day: String(prev) } })}
                className="p-2 rounded-xl border border-border hover:bg-secondary"
                aria-label="Previous day"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            {next && (
              <button
                onClick={() => navigate({ to: "/day/$day", params: { day: String(next) } })}
                className="p-2 rounded-xl border border-border hover:bg-secondary"
                aria-label="Next day"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Split layout */}
      <div className="mx-auto max-w-7xl px-6 py-8 grid lg:grid-cols-2 gap-6">
        {/* Left — Theory + diagram */}
        <section className="space-y-5">
          <div className="hand-card p-7">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary mb-3">
              <BookOpen className="h-3.5 w-3.5" /> Theory
            </div>
            <p className="font-display text-xl text-foreground/90 mb-4">{m.tagline}</p>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{m.theory}</p>
          </div>
          <ModuleDiagram module={m} />
        </section>

        {/* Right — Code + Practice */}
        <section className="space-y-5">
          <CodePanel code={m.code} />
          <div className="hand-card p-7">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent mb-3">
              🌸 Practice Arena
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Solidify the idea with a curated, beginner-friendly LeetCode problem:
            </p>
            <a
              href={m.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl p-5 bg-gradient-lantern text-primary-foreground shadow-lantern hover:opacity-95 transition group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs opacity-80 font-mono">LeetCode #{m.leetcode.id}</div>
                  <div className="font-display text-xl mt-1">{m.leetcode.title}</div>
                </div>
                <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Tip: try it without peeking at the solution. Sketch your idea on paper first.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function CodePanel({ code }: { code: string }) {
  const [tab, setTab] = useState<"code" | "explained">("code");
  const highlighted = useMemo(() => highlightPython(code), [code]);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="hand-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-destructive/70" />
          <span className="h-3 w-3 rounded-full bg-primary/70" />
          <span className="h-3 w-3 rounded-full bg-[var(--moss)]/70" />
          <span className="ml-3 text-xs text-muted-foreground font-mono inline-flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5" /> main.py
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setTab("code")}
            className={`px-2.5 py-1 rounded-md transition ${tab === "code" ? "bg-background" : "text-muted-foreground hover:text-foreground"}`}
          >
            Code
          </button>
          <button onClick={copy} className="ml-2 p-1.5 rounded-md hover:bg-background" aria-label="Copy">
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <pre className="p-5 text-[13px] leading-relaxed overflow-x-auto font-mono">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}

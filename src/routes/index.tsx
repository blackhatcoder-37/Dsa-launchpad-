import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { modules, phases } from "@/data/curriculum";
import { useAuth } from "@/hooks/use-auth";
import { useProgress } from "@/hooks/use-progress";
import { Check, Lock, Sparkles, ArrowRight, BookOpen, Flame, Trophy, Clock } from "lucide-react";
import { SkeletonGrid, SkeletonButton } from "@/components/LoadingSkeletons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DSA Launchpad — 25-Day Roadmap" },
      { name: "description", content: "Click any of 25 cozy days to begin learning Data Structures & Algorithms in Python." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { user, loading } = useAuth();
  const { completed } = useProgress(user?.id);
  const total = modules.length;
  const done = completed.size;
  const pct = Math.round((done / total) * 100);
  const streak = calculateStreak(completed);

  if (loading) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
            <SkeletonButton /> 
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <SkeletonGrid count={5} />
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero with gradient background */}
      <section className="relative overflow-hidden bg-gradient-dusk">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 border border-border text-xs text-muted-foreground mb-6 backdrop-blur-sm hover:bg-secondary/80 transition">
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span>A 25-day cozy path · Python · Beginner-friendly</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl leading-tight tracking-tight">
            Learn algorithms
            <br />
            <span className="bg-gradient-lantern bg-clip-text text-transparent">the way a friend would.</span>
          </h1>

          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Twenty-five hand-drawn modules walk you from a single byte of RAM all the way to graphs, heaps, and a portfolio of real Python projects. Bring tea. ☕
          </p>

          {!loading && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
              {user ? (
                <Link
                  to="/day/$day"
                  params={{ day: String(Math.min(done + 1, 25)) }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-lantern text-primary-foreground px-6 py-3.5 font-medium shadow-lantern hover:opacity-95 transition group"
                >
                  Continue Day {Math.min(done + 1, 25)} 
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-lantern text-primary-foreground px-6 py-3.5 font-medium shadow-lantern hover:opacity-95 transition group"
                >
                  Begin the journey
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              <Link
                to="/capstones"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 hover:bg-secondary transition group"
              >
                <Trophy className="h-4 w-4" /> 
                <span>See the capstones</span>
              </Link>
            </div>
          )}

          {/* Progress display */}
          {user && (
            <div className="mt-12 max-w-2xl mx-auto space-y-4">
              <div className="hand-card p-6 backdrop-blur-sm bg-card/50">
                <div className="grid grid-cols-3 gap-4">
                  <StatItem icon={<Check className="h-5 w-5" />} label="Completed" value={`${done}/25`} color="text-primary" />
                  <StatItem icon={<Flame className="h-5 w-5" />} label="Streak" value={`${streak} days`} color="text-accent" />
                  <StatItem icon={<Clock className="h-5 w-5" />} label="Progress" value={`${pct}%`} color="text-sky" />
                </div>

                <div className="mt-5 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-mono">Your journey</span>
                    <span className="font-mono font-medium">{done} / {total}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full bg-gradient-lantern transition-all duration-700 ease-out" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {done === 0 && "Ready to dive in! Start Day 1."}
                    {done > 0 && done < 5 && `Great start! You're building momentum.`}
                    {done >= 5 && done < 10 && `Wonderful! Halfway through Phase 1.`}
                    {done >= 10 && done < 15 && `Excellent progress! You're conquering recursion.`}
                    {done >= 15 && done < 20 && `Amazing! Trees and graphs are within reach.`}
                    {done >= 20 && done < 25 && `Nearly there! The final sprint awaits.`}
                    {done === 25 && `🎉 Congratulations on completing the full 25-day journey!`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Roadmap */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl mb-3">The 25-Day Roadmap</h2>
          <p className="text-muted-foreground">Click on any day to unlock and explore that module</p>
        </div>

        {phases.map((phase, pIdx) => (
          <div key={phase.name} className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/40 border border-border">
                <span className="font-display text-sm font-medium text-primary">Phase {pIdx + 1}</span>
              </div>
              <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              <span className="text-sm text-muted-foreground font-medium">{phase.name}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {phase.days.map((dayNum) => {
                const m = modules.find((x) => x.day === dayNum)!;
                const isDone = completed.has(dayNum);
                const isCurrent = dayNum === Math.min(done + 1, 25);

                return (
                  <Link
                    key={dayNum}
                    to={user ? "/day/$day" : "/login"}
                    params={user ? { day: String(dayNum) } : {}}
                    search={!user ? { redirect: `/day/${dayNum}` } as any : undefined}
                    className={`
                      relative group rounded-2xl p-4 transition-all duration-300 overflow-hidden
                      ${isDone
                        ? "hand-card bg-primary/5 border border-primary/30 shadow-lantern hover:shadow-lantern hover:scale-105"
                        : isCurrent
                        ? "hand-card bg-gradient-lantern text-primary-foreground shadow-lg hover:shadow-lg hover:scale-105"
                        : !user
                        ? "hand-card opacity-60 cursor-not-allowed border border-border"
                        : "hand-card hover:bg-secondary hover:scale-105 border border-border"
                      }
                    `}
                  >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className={`text-xs font-mono uppercase tracking-wider mb-1 ${isDone ? "text-primary" : isCurrent ? "text-primary-foreground" : "text-muted-foreground"}`}>
                            Day {String(dayNum).padStart(2, "0")}
                          </div>
                          <h3 className={`font-display text-sm leading-tight line-clamp-2`}>
                            {m.title}
                          </h3>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          {isDone && <Check className="h-5 w-5 text-primary flex-shrink-0" />}
                          {!isDone && !user && <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                          {!isDone && user && isCurrent && (
                            <div className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
                          )}
                        </div>
                      </div>

                      <p className={`text-[11px] leading-tight ${isDone ? "text-muted-foreground" : isCurrent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {m.tagline}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Call to action for unauthenticated users */}
      {!user && (
        <section className="mx-auto max-w-2xl px-6 pb-24">
          <div className="hand-card p-10 text-center bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl mb-3">Ready to begin?</h2>
            <p className="text-muted-foreground mb-6">
              Join 25 fellow students on this 25-day journey through Data Structures & Algorithms.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-lantern text-primary-foreground px-8 py-3 font-medium shadow-lantern hover:opacity-95 transition"
            >
              Create your account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function StatItem({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/40 ${color} mb-2`}>
        {icon}
      </div>
      <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">{label}</div>
      <div className="font-display text-lg mt-1">{value}</div>
    </div>
  );
}

function calculateStreak(completed: Set<number>): number {
  if (completed.size === 0) return 0;
  let streak = 0;
  for (let i = 1; i <= 25; i++) {
    if (completed.has(i)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Sprout, LogOut, Shield } from "lucide-react";

export function SiteHeader() {
  const { user, isAdmin } = useAuth();
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-md bg-background/70">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-lantern shadow-lantern">
            <Sprout className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-xl">DSA Launchpad</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          <NavLink to="/" active={pathname === "/"}>Roadmap</NavLink>
          <NavLink to="/capstones" active={pathname.startsWith("/capstones")}>Capstones</NavLink>
          {isAdmin && (
            <NavLink to="/admin" active={pathname.startsWith("/admin")}>
              <Shield className="inline h-3.5 w-3.5 mr-1" />Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:inline text-xs text-muted-foreground">
                {user.email}
              </span>
              <button
                onClick={() => supabase.auth.signOut()}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm border border-border hover:bg-secondary transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-xl px-4 py-1.5 text-sm bg-primary text-primary-foreground hover:opacity-90 transition shadow-lantern"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-xl transition-colors ${
        active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      }`}
    >
      {children}
    </Link>
  );
}

import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useUserInfo } from "@/hooks/use-user-info";
import { Sprout, LogOut, Shield } from "lucide-react";

export function SiteHeader() {
  const { userInfo, clearUserInfo } = useUserInfo();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const handleLogout = () => {
    clearUserInfo();
    navigate({ to: "/login" });
  };

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
          <NavLink to="/" active={pathname === "/"}>
            Roadmap
          </NavLink>
          <NavLink to="/capstones" active={pathname.startsWith("/capstones")}>
            Capstones
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {userInfo ? (
            <>
              <span className="hidden sm:inline text-xs text-muted-foreground">
                {userInfo.email}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm border border-border hover:bg-secondary transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" /> Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-xl px-4 py-1.5 text-sm bg-primary text-primary-foreground hover:opacity-90 transition shadow-lantern"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-xl transition-colors ${
        active
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      }`}
    >
      {children}
    </Link>
  );
}

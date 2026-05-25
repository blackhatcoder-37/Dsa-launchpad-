import { createFileRoute, useNavigate, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useUserInfo } from "@/hooks/use-user-info";
import { Mail, Loader2, Sparkles, Sprout, User } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Get Started — DSA Launchpad" },
      {
        name: "description",
        content: "Start your 25-day Python algorithms journey with DSA Launchpad.",
      },
    ],
  }),
  component: LoginPage,
});

type SearchParams = {
  redirect?: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const { userInfo, loading, saveUserInfo } = useUserInfo();
  const search = useSearch({ from: "/login" }) as SearchParams;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && userInfo) {
      navigate({ to: search?.redirect ? (search.redirect as string) : "/" });
    }
  }, [userInfo, loading, navigate, search]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);

    try {
      if (!name.trim()) {
        toast.error("Please enter your name");
        setBusy(false);
        return;
      }

      if (!email.trim()) {
        toast.error("Please enter your email");
        setBusy(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email");
        setBusy(false);
        return;
      }

      const saved = saveUserInfo({ name: name.trim(), email: email.trim() });
      if (saved) {
        toast.success("Welcome! 🎉");
        setTimeout(() => {
          navigate({ to: search?.redirect ? (search.redirect as string) : "/" });
        }, 300);
      } else {
        toast.error("Failed to save user info. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-dusk">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-dusk">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-lantern shadow-lantern">
            <Sprout className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-2xl">DSA Launchpad</span>
        </Link>

        <div className="hand-card p-8">
          <h1 className="font-display text-2xl text-center mb-1">Begin your journey</h1>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Twenty-five days of cozy Python algorithms.
          </p>

          <form onSubmit={submit} className="space-y-3">
            <label className="block">
              <span className="sr-only">Full Name</span>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sarah Ahmed"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
            </label>

            <label className="block">
              <span className="sr-only">Email</span>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium shadow-lantern hover:opacity-95 disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

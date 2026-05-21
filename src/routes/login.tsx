import { createFileRoute, useNavigate, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { mockAuth } from "@/integrations/mock-auth";
import { useAuth } from "@/hooks/use-auth";
import { Mail, Lock, Loader2, ArrowRight, Sparkles, Eye, EyeOff, Sprout } from "lucide-react";
import { toast } from "sonner";

const MOCK_AUTH_ENABLED = import.meta.env.VITE_MOCK_AUTH === "true";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — DSA Launchpad" },
      { name: "description", content: "Sign in to DSA Launchpad to track your 25-day Python algorithms journey." },
    ],
  }),
  component: LoginPage,
});

type SearchParams = {
  redirect?: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const search = useSearch({ from: "/login" }) as SearchParams;
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: search?.redirect ? search.redirect as string : "/" });
    }
  }, [user, loading, navigate, search]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        if (!fullName.trim()) {
          toast.error("Please enter your name");
          setBusy(false);
          return;
        }

        if (MOCK_AUTH_ENABLED) {
          // Mock signup
          const result = await mockAuth.signUp(email, password, fullName);
          if (result.error) throw result.error;
          toast.success("Account created! 🎉");
          setTimeout(() => navigate({ to: search?.redirect ? search.redirect as string : "/" }), 500);
        } else {
          // Real Supabase signup
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: window.location.origin,
              data: { full_name: fullName },
            },
          });
          if (error) throw error;
          setEmailSent(true);
          toast.success("Account created! Check your email to confirm.");
          setTimeout(() => setMode("signin"), 2000);
        }
      } else {
        if (MOCK_AUTH_ENABLED) {
          // Mock signin
          const result = await mockAuth.signIn(email, password);
          if (result.error) throw result.error;
          toast.success("Welcome back! 🎌");
          navigate({ to: search?.redirect ? search.redirect as string : "/" });
        } else {
          // Real Supabase signin
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          toast.success("Welcome back! 🎌");
          navigate({ to: search?.redirect ? search.redirect as string : "/" });
        }
      }
    } catch (err) {
      const message = (err as Error).message;
      if (message.includes("Invalid login")) toast.error("Email or password incorrect");
      else if (message.includes("Email not confirmed")) toast.error("Please confirm your email first");
      else toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    try {
      if (MOCK_AUTH_ENABLED) {
        // Mock Google OAuth
        const result = await mockAuth.signInWithOAuth("google", {
          redirect_uri: window.location.origin,
        });
        if (result.error) {
          toast.error(result.error.message);
        }
        // The mock auth handles the redirect automatically
      } else {
        // Real Lovable OAuth
        const result = await lovable.auth.signInWithOAuth("google", {
          redirect_uri: window.location.origin,
        });
        if (result.error) {
          toast.error(result.error.message);
        }
      }
    } finally {
      setBusy(false);
    }
  };

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
          <h1 className="font-display text-2xl text-center mb-1">
            {mode === "signin" ? "Welcome back" : "Begin the journey"}
          </h1>
          <p className="text-center text-sm text-muted-foreground mb-6">
            {mode === "signin" ? "Pick up where you left off." : "Twenty-five days of cozy Python algorithms."}
          </p>

          <button
            onClick={google}
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/40 px-4 py-2.5 text-sm hover:bg-secondary disabled:opacity-50 mb-4"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground">or with email</span></div>
          </div>

          <form onSubmit={submit} className="space-y-3">
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

            {mode === "signup" && (
              <label className="block">
                <span className="sr-only">Full Name</span>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sarah Ahmed"
                    className="w-full px-3 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  />
                </div>
              </label>
            )}

            <label className="block">
              <span className="sr-only">Password</span>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
            </label>
            <button
              type="submit"
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium shadow-lantern hover:opacity-95 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-primary hover:underline"
            >
              {mode === "signin" ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.4 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.8 0 19.5-8.7 19.5-19.5 0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.4 29 4.5 24 4.5 16.3 4.5 9.7 8.8 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.9 12.9-5l-6-5c-1.9 1.3-4.3 2-6.9 2-5.3 0-9.7-3.1-11.3-7.5l-6.6 5.1C9.6 39.1 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.3 5.9l6 5C40.3 35.9 43.5 30.4 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

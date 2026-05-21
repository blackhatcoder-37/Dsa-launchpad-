import { Zap, AlertCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Enhanced Error Boundary Component
export function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-dusk">
      <div className="hand-card p-10 max-w-md text-center">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-destructive/10 text-destructive mb-6">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h1 className="font-display text-2xl mb-3">Something went wrong</h1>
        <p className="text-sm text-muted-foreground mb-6">{error.message}</p>
        <div className="flex gap-2">
          <button
            onClick={retry}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90"
          >
            <Zap className="h-4 w-4" /> Try again
          </button>
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2.5 text-sm hover:bg-secondary"
          >
            Home
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Error ID: <code className="font-mono text-[10px] bg-secondary/40 px-1.5 py-0.5 rounded">
            {Math.random().toString(36).substr(2, 9)}
          </code>
        </p>
      </div>
    </div>
  );
}

// Loading Spinner Component
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-secondary animate-spin" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-transparent border-t-primary animate-spin" style={{ animationDirection: "reverse", animationDuration: "2s" }} />
      </div>
    </div>
  );
}

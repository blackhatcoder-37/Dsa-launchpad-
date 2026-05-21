import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Shield, Users, CheckCircle2, Clock, TrendingUp, Download, Search, Filter, Mail, Calendar, Activity, BarChart3, ArrowDown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin Analytics — DSA Launchpad" }] }),
  component: AdminPage,
});

type Row = {
  id: string;
  email: string;
  full_name: string | null;
  last_login_at: string | null;
  created_at: string;
  completed_days: number[];
};

type SortKey = "email" | "progress" | "lastLogin" | "createdAt";
type FilterPhase = "all" | "1-5" | "6-10" | "11-15" | "16-20" | "21-25";

function AdminPage() {
  const { isAdmin, loading, user } = useAuth();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("progress");
  const [filterPhase, setFilterPhase] = useState<FilterPhase>("all");
  const [loading_data, setLoadingData] = useState(true);

  const isAuthorizedAdmin = isAdmin || user?.email === "vyshnavirbnambiar@gmail.com";

  useEffect(() => {
    if (!isAuthorizedAdmin) return;
    (async () => {
      setLoadingData(true);
      const [profilesRes, progressRes] = await Promise.all([
        supabase.from("profiles").select("id,email,full_name,last_login_at,created_at"),
        supabase.from("module_progress").select("user_id,day"),
      ]);
      if (profilesRes.error) { setErr(profilesRes.error.message); setLoadingData(false); return; }
      if (progressRes.error) { setErr(progressRes.error.message); setLoadingData(false); return; }

      const byUser = new Map<string, number[]>();
      for (const p of progressRes.data ?? []) {
        const arr = byUser.get(p.user_id) ?? [];
        arr.push(p.day);
        byUser.set(p.user_id, arr);
      }
      const combined: Row[] = (profilesRes.data ?? []).map((p) => ({
        ...p,
        completed_days: (byUser.get(p.id) ?? []).sort((a, b) => a - b),
      }));
      combined.sort((a, b) => b.completed_days.length - a.completed_days.length);
      setRows(combined);
      setLoadingData(false);
    })();
  }, [isAuthorizedAdmin]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    return rows
      .filter((r) => {
        const search = searchTerm.toLowerCase();
        return r.email.toLowerCase().includes(search) || (r.full_name?.toLowerCase() ?? "").includes(search);
      })
      .filter((r) => {
        if (filterPhase === "all") return true;
        const [min, max] = filterPhase.split("-").map(Number);
        const completed = r.completed_days.length;
        return completed >= min && completed <= max;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "progress":
            return b.completed_days.length - a.completed_days.length;
          case "lastLogin":
            if (!a.last_login_at) return 1;
            if (!b.last_login_at) return -1;
            return new Date(b.last_login_at).getTime() - new Date(a.last_login_at).getTime();
          case "createdAt":
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          case "email":
            return a.email.localeCompare(b.email);
          default:
            return 0;
        }
      });
  }, [rows, searchTerm, sortBy, filterPhase]);

  const stats = useMemo(() => {
    if (!rows) return { total: 0, avgProgress: 0, activeWeek: 0, completed: 0 };
    const total = rows.length;
    const avgProgress = total > 0 ? Math.round((rows.reduce((s, r) => s + r.completed_days.length, 0) / (total * 25)) * 100) : 0;
    const activeWeek = rows.filter((r) => r.last_login_at && Date.now() - +new Date(r.last_login_at) < 7 * 86400000).length;
    const completed = rows.filter((r) => r.completed_days.length === 25).length;
    return { total, avgProgress, activeWeek, completed };
  }, [rows]);

  if (loading) {
    return <AdminShell isLoading={true} />;
  }

  if (!isAuthorizedAdmin) {
    return (
      <div className="w-full min-h-screen bg-parchment flex flex-col items-center justify-center p-4">
        <SiteHeader />
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-red-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-800 sm:text-5xl">Access Denied</h1>
          <p className="mt-6 text-base leading-7 text-stone-600">You do not have permission to view this page.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/" className="rounded-md bg-lantern-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lantern-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern-600">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const exportData = () => {
    if (!rows) return;
    const headers = ["Email", "Full Name", "Completed Days", "Progress %", "Last Login", "Joined"];
    const data = rows.map((r) => [
      r.email,
      r.full_name || "-",
      r.completed_days.join(",") || "0",
      Math.round((r.completed_days.length / 25) * 100),
      r.last_login_at ? new Date(r.last_login_at).toLocaleString() : "Never",
      new Date(r.created_at).toLocaleString(),
    ]);
    const csv = [headers, ...data].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dsa-launchpad-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  const emailList = filtered.map((r) => r.email).join("; ");
  const copyEmails = () => {
    navigator.clipboard.writeText(emailList);
    toast.success(`Copied ${filtered.length} emails`);
  };

  if (loading) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="max-w-md mx-auto mt-24 text-center hand-card p-10">
          <Shield className="mx-auto h-10 w-10 text-primary mb-4" />
          <h1 className="font-display text-2xl mb-2">Admin only</h1>
          <p className="text-sm text-muted-foreground mb-5">
            You need the admin role to view cohort analytics.
          </p>
          <Link to="/" className="text-primary hover:underline text-sm">Back to roadmap</Link>
          <p className="mt-6 text-xs text-muted-foreground">
            To grant admin: open the backend, find your user in the <code>user_roles</code> table, and insert a row with role=<code>admin</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-5 w-5 text-primary" />
              <h1 className="font-display text-3xl">Cohort Analytics</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Live tracking of 25 students' algorithmic journey.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportData}
              className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm hover:bg-secondary/80"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button
              onClick={copyEmails}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm hover:bg-secondary"
            >
              <Mail className="h-4 w-4" /> Copy Emails
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users className="h-4 w-4" />} label="Total Students" value={stats.total} />
          <StatCard icon={<BarChart3 className="h-4 w-4" />} label="Avg Progress" value={`${stats.avgProgress}%`} />
          <StatCard icon={<Activity className="h-4 w-4" />} label="Active This Week" value={stats.activeWeek} />
          <StatCard icon={<CheckCircle2 className="h-4 w-4" />} label="Fully Completed" value={stats.completed} />
        </div>

        {/* Filters and Search */}
        <div className="hand-card p-5 mb-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "1-5", "6-10", "11-15", "16-20", "21-25"] as FilterPhase[]).map((phase) => (
                <button
                  key={phase}
                  onClick={() => setFilterPhase(phase)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filterPhase === phase
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {phase === "all" ? "All Phases" : `Days ${phase}`}
                </button>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="text-xs bg-secondary border border-border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="progress">Progress (High to Low)</option>
                <option value="lastLogin">Last Login (Recent)</option>
                <option value="createdAt">Joined (Recent)</option>
                <option value="email">Email (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {err && <div className="text-destructive text-sm mb-4 hand-card p-4">Error: {err}</div>}

        {loading_data && <div className="text-center text-muted-foreground">Loading student data...</div>}

        {!loading_data && filtered.length === 0 && (
          <div className="text-center text-muted-foreground hand-card p-8">No students found</div>
        )}

        {/* Student Table */}
        {!loading_data && filtered.length > 0 && (
          <div className="hand-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-left border-b border-border">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Student</th>
                    <th className="px-4 py-3 font-semibold">Progress</th>
                    <th className="px-4 py-3 font-semibold">Completed Days</th>
                    <th className="px-4 py-3 font-semibold">Last Login</th>
                    <th className="px-4 py-3 font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-secondary/20 transition">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium">{r.full_name || "—"}</div>
                          <div className="text-xs text-muted-foreground">{r.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden max-w-xs">
                            <div
                              className="h-full bg-gradient-lantern transition-all"
                              style={{ width: `${(r.completed_days.length / 25) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono whitespace-nowrap">{Math.round((r.completed_days.length / 25) * 100)}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs bg-secondary/40 px-2 py-1 rounded">
                          {r.completed_days.length}/25
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {r.last_login_at ? (
                          <time dateTime={r.last_login_at} className="text-muted-foreground">
                            {formatDate(r.last_login_at)}
                          </time>
                        ) : (
                          <span className="text-destructive">Never</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        <time dateTime={r.created_at}>{formatDate(r.created_at)}</time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="mt-6 text-xs text-muted-foreground text-center">
          Showing {filtered.length} of {rows?.length ?? 0} students · Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="hand-card p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">{label}</div>
          <div className="font-display text-2xl">{value}</div>
        </div>
        <div className="text-primary/30">{icon}</div>
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86400000);

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return date.toLocaleDateString();
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Upload,
  Play,
  ArrowUpRight,
  Music2,
  Users,
  Wallet,
  Radio,
  BadgeCheck,
} from "lucide-react";
import {
  currentArtist,
  dashboardStats,
  royaltyHistory,
  releases,
  topTerritories,
  topPlatforms,
  messages,
} from "@/data/mock";
import { fmtCompact, fmtMoney, fmtNum, fmtRelative } from "@/lib/format";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${currentArtist.stageName.split(" ")[0]} 👋`}
        description="Here's what's happening across your career this week."
        actions={
          <>
            <Button asChild variant="outline"><Link to="/app/releases"><Play className="mr-2 h-4 w-4" /> View releases</Link></Button>
            <Button asChild className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95">
              <Link to="/app/distribution"><Upload className="mr-2 h-4 w-4" /> New release</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Users} label="Monthly listeners" value={fmtCompact(dashboardStats.monthlyListeners)} delta="+11.2%" />
        <Stat icon={Radio} label="Streams (MTD)" value={fmtCompact(dashboardStats.streamsThisMonth)} delta="+18.4%" />
        <Stat icon={Wallet} label="Royalties (MTD)" value={fmtMoney(dashboardStats.royaltiesMTD)} delta="+9.1%" />
        <Stat icon={Music2} label="Active releases" value={String(dashboardStats.activeReleases)} delta={`${dashboardStats.pendingReleases} in review`} deltaNeutral />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Royalty trend</h3>
              <p className="text-xs text-muted-foreground">Last 6 months · all sources (USD)</p>
            </div>
            <Badge variant="secondary" className="text-primary">+64% YoY</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={royaltyHistory} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="stream" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.15 68)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.82 0.15 68)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="month" stroke="oklch(0.68 0.02 260)" fontSize={12} />
                <YAxis stroke="oklch(0.68 0.02 260)" fontSize={12} tickFormatter={(v: number) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ background: "oklch(0.19 0.015 265)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="streaming" stroke="oklch(0.82 0.15 68)" strokeWidth={2} fill="url(#stream)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-6">
          <h3 className="font-display text-lg font-semibold">Top platforms</h3>
          <p className="text-xs text-muted-foreground">Share of streams</p>
          <div className="mt-4 space-y-4">
            {topPlatforms.map((p) => (
              <div key={p.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className="text-muted-foreground">{p.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full gradient-brand" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Recent releases</h3>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/releases">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          <div className="space-y-3">
            {releases.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center gap-4 rounded-lg border border-border/60 bg-background/40 p-3">
                <img src={r.coverUrl} alt="" className="h-14 w-14 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium">{r.title}</p>
                    {r.status === "live" && <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {r.type} · {r.tracks} track{r.tracks > 1 ? "s" : ""} · {r.primaryGenre}
                  </p>
                </div>
                <div className="text-right">
                  <StatusBadge status={r.status} />
                  <p className="mt-1 text-xs text-muted-foreground">{fmtCompact(r.streams)} streams</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-6">
          <h3 className="font-display text-lg font-semibold">Top territories</h3>
          <div className="mt-4 space-y-3">
            {topTerritories.map((t) => (
              <div key={t.country} className="flex items-center justify-between text-sm">
                <span>{t.country}</span>
                <span className="text-muted-foreground">{fmtNum(t.streams)}</span>
              </div>
            ))}
          </div>
          <hr className="my-6 border-border/60" />
          <h3 className="font-display text-sm font-semibold">Recent messages</h3>
          <div className="mt-3 space-y-3">
            {messages.slice(0, 2).map((m) => (
              <Link key={m.id} to="/app/messages" className="flex gap-3 rounded-lg p-2 -mx-2 hover:bg-muted/50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={m.avatarUrl} />
                  <AvatarFallback>{m.from.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.from}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.subject}</p>
                </div>
                <span className="text-xs text-muted-foreground">{fmtRelative(m.sentAt)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  delta,
  deltaNeutral,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta: string;
  deltaNeutral?: boolean;
}) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
      <p className={`mt-1 text-xs ${deltaNeutral ? "text-muted-foreground" : "text-primary"}`}>{delta}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    live: { label: "Live", cls: "bg-success/15 text-success border-success/30" },
    "in-review": { label: "In review", cls: "bg-warning/15 text-warning border-warning/30" },
    draft: { label: "Draft", cls: "bg-muted text-muted-foreground border-border" },
    approved: { label: "Approved", cls: "bg-primary/15 text-primary border-primary/30" },
    rejected: { label: "Rejected", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  };
  const m = map[status] ?? { label: status, cls: "bg-muted text-muted-foreground border-border" };
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${m.cls}`}>{m.label}</span>;
}

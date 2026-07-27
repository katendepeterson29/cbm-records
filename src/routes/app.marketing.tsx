import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { StatusPill } from "@/components/portal/common";
import { Button } from "@/components/ui/button";
import { campaigns, assets } from "@/data/mock";
import { fmtCompact, fmtDate, fmtMoney } from "@/lib/format";
import { Plus, Megaphone, ImageIcon, Download } from "lucide-react";

export const Route = createFileRoute("/app/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing — CBM Records" },
      { name: "description", content: "Plan launches, brief creators and coordinate campaigns." },
      { property: "og:title", content: "Marketing — CBM Records" },
      { property: "og:description", content: "Plan launches, brief creators and coordinate campaigns." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MarketingPage,
});

function MarketingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Marketing hub"
        description="Active campaigns, creative assets and creator collaborations."
        actions={<Button className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95"><Plus className="mr-2 h-4 w-4" /> New campaign</Button>}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {campaigns.map((c) => {
          const pct = Math.round((c.spent / c.budget) * 100);
          return (
            <div key={c.id} className="surface-card p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/30">
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-display font-semibold">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.channel} · {fmtDate(c.startsAt)} → {fmtDate(c.endsAt)}</p>
                  </div>
                </div>
                <StatusPill tone={c.status === "live" ? "success" : c.status === "planned" ? "warning" : "muted"}>{c.status}</StatusPill>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <Metric label="Impressions" value={fmtCompact(c.impressions)} />
                <Metric label="Clicks" value={fmtCompact(c.clicks)} />
                <Metric label="CTR" value={`${((c.clicks / c.impressions) * 100).toFixed(1)}%`} />
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-muted-foreground">Budget</span>
                  <span>{fmtMoney(c.spent)} / {fmtMoney(c.budget)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full gradient-brand" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="surface-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Creative assets</h3>
            <p className="text-xs text-muted-foreground">Cover art, press photos and EPKs</p>
          </div>
          <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" /> Upload</Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((a) => (
            <div key={a.id} className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-md bg-muted">
                {a.url.startsWith("http") ? <img src={a.url} alt="" className="h-full w-full object-cover" /> : <ImageIcon className="h-5 w-5 text-muted-foreground" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.kind} · {a.size}</p>
              </div>
              <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-semibold">{value}</p>
    </div>
  );
}

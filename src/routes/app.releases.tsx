import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { StatusPill } from "@/components/portal/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { releases } from "@/data/mock";
import { fmtCompact, fmtDate } from "@/lib/format";
import { Upload, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/releases")({
  head: () => ({
    meta: [
      { title: "Releases — CBM Records" },
      { name: "description", content: "Manage your releases and delivery status." },
      { property: "og:title", content: "Releases — CBM Records" },
      { property: "og:description", content: "Manage your releases and delivery status." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReleasesPage,
});

function ReleasesPage() {
  const [q, setQ] = useState("");
  const list = releases.filter((r) => r.title.toLowerCase().includes(q.toLowerCase()));
  const toneFor = (s: string): "success" | "warning" | "muted" | "primary" | "destructive" =>
    s === "live" ? "success" : s === "in-review" ? "warning" : s === "approved" ? "primary" : s === "rejected" ? "destructive" : "muted";
  return (
    <div className="space-y-8">
      <PageHeader
        title="Releases"
        description="All your singles, EPs and albums — live, pending and in draft."
        actions={
          <Button asChild className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95">
            <Link to="/app/distribution"><Upload className="mr-2 h-4 w-4" /> New release</Link>
          </Button>
        }
      />
      <div className="flex items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search releases…" className="pl-8" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <div key={r.id} className="group surface-card overflow-hidden transition-all hover:border-primary/40 hover:shadow-elegant">
            <div className="relative aspect-square overflow-hidden">
              <img src={r.coverUrl} alt={r.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute left-3 top-3">
                <StatusPill tone={toneFor(r.status)}>{r.status.replace("-", " ")}</StatusPill>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-display font-semibold">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.type} · {r.primaryGenre}</p>
                </div>
                <p className="shrink-0 text-xs text-muted-foreground">{fmtDate(r.releaseDate)}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{r.tracks} track{r.tracks > 1 ? "s" : ""}</span>
                <span>{fmtCompact(r.streams)} streams</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

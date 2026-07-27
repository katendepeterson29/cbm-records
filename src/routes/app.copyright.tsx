import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { StatusPill } from "@/components/portal/common";
import { Button } from "@/components/ui/button";
import { copyrightWorks } from "@/data/mock";
import { fmtDate } from "@/lib/format";
import { ShieldCheck, Plus, FileText } from "lucide-react";

export const Route = createFileRoute("/app/copyright")({
  head: () => ({
    meta: [
      { title: "Copyright vault — CBM Records" },
      { name: "description", content: "Register works, manage splits and defend your rights." },
      { property: "og:title", content: "Copyright vault — CBM Records" },
      { property: "og:description", content: "Register works, manage splits and defend your rights." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CopyrightPage,
});

function CopyrightPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Copyright vault"
        description="Registered works, split sheets and ownership records."
        actions={
          <Button className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95">
            <Plus className="mr-2 h-4 w-4" /> Register work
          </Button>
        }
      />

      <div className="grid gap-4">
        {copyrightWorks.map((w) => (
          <div key={w.id} className="surface-card p-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold">{w.title}</p>
                  <p className="text-xs text-muted-foreground">{w.type} · Registered {fmtDate(w.registered)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill tone={w.status === "registered" ? "success" : w.status === "pending" ? "warning" : "destructive"}>{w.status}</StatusPill>
                <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4" /> Certificate</Button>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Splits</p>
              <div className="space-y-2">
                {w.splits.map((s) => (
                  <div key={s.name} className="grid grid-cols-[1fr_auto_120px] items-center gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.role}</p>
                    </div>
                    <div className="w-40 sm:w-56">
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full gradient-brand" style={{ width: `${s.pct}%` }} />
                      </div>
                    </div>
                    <span className="text-right font-mono">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

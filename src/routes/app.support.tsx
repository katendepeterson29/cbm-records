import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { StatusPill } from "@/components/portal/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supportTickets } from "@/data/mock";
import { fmtDate } from "@/lib/format";
import { Plus, LifeBuoy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/support")({
  head: () => ({
    meta: [
      { title: "Support — CBM Records" },
      { name: "description", content: "Get help from CBM's support team." },
      { property: "og:title", content: "Support — CBM Records" },
      { property: "og:description", content: "Get help from CBM's support team." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-8">
      <PageHeader
        title="Support center"
        description="Open tickets, past requests and quick answers."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95"><Plus className="mr-2 h-4 w-4" /> New ticket</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create a support ticket</DialogTitle></DialogHeader>
              <form onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Ticket submitted", { description: "We'll respond within 24 hours." }); }} className="space-y-4">
                <div className="space-y-1.5"><Label>Subject</Label><Input required placeholder="Short summary" /></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Category</Label>
                    <Select defaultValue="Distribution">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["Distribution","Payments","Copyright","Account","Other"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Priority</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["low","normal","high"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5"><Label>Details</Label><Textarea required rows={5} placeholder="Give us the context…" /></div>
                <DialogFooter><Button type="submit" className="gradient-brand text-primary-foreground hover:opacity-95">Submit</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <FaqCard title="Distribution" copy="Delivery, takedowns, edits and store issues." />
        <FaqCard title="Payments" copy="Payouts, currencies, banking and thresholds." />
        <FaqCard title="Rights" copy="Splits, disputes, licensing and publishing." />
      </div>

      <div className="surface-card overflow-hidden">
        <div className="border-b border-border/60 p-6">
          <h3 className="font-display text-lg font-semibold">Your tickets</h3>
        </div>
        <ul className="divide-y divide-border/40">
          {supportTickets.map((t) => (
            <li key={t.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
              <div className="min-w-0">
                <p className="truncate font-medium">{t.subject}</p>
                <p className="text-xs text-muted-foreground">{t.category} · Updated {fmtDate(t.updatedAt)}</p>
              </div>
              <StatusPill tone={t.status === "resolved" ? "success" : t.status === "in-progress" ? "primary" : "warning"}>{t.status.replace("-", " ")}</StatusPill>
              <StatusPill tone={t.priority === "high" ? "destructive" : t.priority === "normal" ? "muted" : "muted"}>{t.priority}</StatusPill>
              <Button variant="ghost" size="sm">View</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FaqCard({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="surface-card p-6">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
        <LifeBuoy className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
      <Button variant="link" className="mt-2 px-0 text-primary">Browse articles →</Button>
    </div>
  );
}

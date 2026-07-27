import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { StatusPill } from "@/components/portal/common";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { royaltyHistory, payouts } from "@/data/mock";
import { fmtDate, fmtMoney } from "@/lib/format";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, Wallet } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/royalties")({
  head: () => ({
    meta: [
      { title: "Royalties — CBM Records" },
      { name: "description", content: "Track your earnings and payouts across every source." },
      { property: "og:title", content: "Royalties — CBM Records" },
      { property: "og:description", content: "Track your earnings and payouts across every source." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RoyaltiesPage,
});

function RoyaltiesPage() {
  const balance = 7361.5;
  return (
    <div className="space-y-8">
      <PageHeader
        title="Royalties"
        description="Statements, earnings and payouts — updated monthly."
        actions={
          <Button className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95" onClick={() => toast.success("Payout requested", { description: "Processing within 3 business days." })}>
            <Wallet className="mr-2 h-4 w-4" /> Request payout
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Available balance" value={fmtMoney(balance)} accent />
        <StatCard label="Lifetime earnings" value={fmtMoney(52_840)} />
        <StatCard label="Next statement" value="Aug 5, 2026" muted />
      </div>

      <div className="surface-card p-6">
        <h3 className="font-display text-lg font-semibold">Earnings breakdown</h3>
        <p className="text-xs text-muted-foreground">Streaming vs downloads vs publishing (USD)</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={royaltyHistory} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
              <XAxis dataKey="month" stroke="oklch(0.68 0.02 260)" fontSize={12} />
              <YAxis stroke="oklch(0.68 0.02 260)" fontSize={12} tickFormatter={(v: number) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ background: "oklch(0.19 0.015 265)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="streaming" stackId="a" fill="oklch(0.82 0.15 68)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="downloads" stackId="a" fill="oklch(0.72 0.18 22)" />
              <Bar dataKey="publishing" stackId="a" fill="oklch(0.7 0.16 200)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <div>
            <h3 className="font-display text-lg font-semibold">Payouts</h3>
            <p className="text-xs text-muted-foreground">History of your withdrawal requests</p>
          </div>
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payouts.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">{p.id.toUpperCase()}</TableCell>
                <TableCell>{fmtDate(p.requestedAt)}</TableCell>
                <TableCell>{p.method}</TableCell>
                <TableCell className="font-medium">{fmtMoney(p.amount, p.currency)}</TableCell>
                <TableCell>
                  <StatusPill tone={p.status === "paid" ? "success" : p.status === "processing" ? "primary" : p.status === "failed" ? "destructive" : "warning"}>{p.status}</StatusPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent, muted }: { label: string; value: string; accent?: boolean; muted?: boolean }) {
  return (
    <div className={`surface-card p-6 ${accent ? "ring-1 ring-primary/40 shadow-glow" : ""}`}>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-2 font-display text-3xl font-semibold ${accent ? "text-gradient-brand" : muted ? "text-muted-foreground" : ""}`}>{value}</p>
    </div>
  );
}

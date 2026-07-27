import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CBM Records" },
      { name: "description", content: "Account, security, notification and payout settings." },
      { property: "og:title", content: "Settings — CBM Records" },
      { property: "og:description", content: "Account, security, notification and payout settings." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Preferences, security and payout methods." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Account" desc="Basic account information.">
          <Row label="Language">
            <Select defaultValue="en"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="sw">Kiswahili</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row label="Timezone">
            <Select defaultValue="wat"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="wat">WAT (UTC+1)</SelectItem>
                <SelectItem value="cat">CAT (UTC+2)</SelectItem>
                <SelectItem value="gmt">GMT</SelectItem>
              </SelectContent>
            </Select>
          </Row>
        </Section>

        <Section title="Security" desc="Passwords and two-factor authentication.">
          <div className="space-y-1.5"><Label>Current password</Label><Input type="password" placeholder="••••••••" /></div>
          <div className="space-y-1.5"><Label>New password</Label><Input type="password" /></div>
          <Row label="Two-factor auth (2FA)"><Switch defaultChecked /></Row>
        </Section>

        <Section title="Notifications" desc="Choose what lands in your inbox.">
          <Row label="Release status updates"><Switch defaultChecked /></Row>
          <Row label="Royalty statements"><Switch defaultChecked /></Row>
          <Row label="Marketing recommendations"><Switch /></Row>
          <Row label="Weekly performance digest"><Switch defaultChecked /></Row>
        </Section>

        <Section title="Payout" desc="Where should we send your royalties?">
          <Row label="Method">
            <Select defaultValue="bank"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank transfer</SelectItem>
                <SelectItem value="flutter">Flutterwave</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <div className="space-y-1.5"><Label>Account name</Label><Input defaultValue="Kolawole Adeyemi" /></div>
          <div className="space-y-1.5"><Label>Account number</Label><Input defaultValue="0221 **** 4411" /></div>
        </Section>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => toast.success("Settings saved")} className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95">
          Save changes
        </Button>
      </div>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="surface-card p-6 space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      {children}
    </div>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-border/60 bg-background/40 px-3 py-2.5">
      <Label className="mb-0">{label}</Label>
      {children}
    </div>
  );
}

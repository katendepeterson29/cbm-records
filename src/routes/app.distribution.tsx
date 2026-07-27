import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/portal/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight, CloudUpload, Loader2, Music2, ImageIcon, ListChecks, Store, Rocket } from "lucide-react";

export const Route = createFileRoute("/app/distribution")({
  head: () => ({
    meta: [
      { title: "New release — CBM Records" },
      { name: "description", content: "Upload and distribute your next release to 150+ stores." },
      { property: "og:title", content: "New release — CBM Records" },
      { property: "og:description", content: "Upload and distribute your next release to 150+ stores." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DistributionWizard,
});

const steps = [
  { id: 0, title: "Details", icon: Music2 },
  { id: 1, title: "Artwork", icon: ImageIcon },
  { id: 2, title: "Tracks", icon: ListChecks },
  { id: 3, title: "Stores", icon: Store },
  { id: 4, title: "Review", icon: Rocket },
];

const STORES = ["Spotify", "Apple Music", "Boomplay", "Audiomack", "YouTube Music", "Tidal", "Deezer", "Amazon Music"];

function DistributionWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    type: "Single",
    genre: "Afrobeats",
    releaseDate: "",
    language: "English",
    explicit: false,
    coverPreview: "",
    tracks: [{ title: "", explicit: false, isrc: "" }],
    stores: new Set<string>(STORES),
    upc: "",
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success("Release submitted for review", { description: "You'll get an update within 48 hours." });
    navigate({ to: "/app/releases" });
  };

  return (
    <div className="space-y-8">
      <PageHeader title="New release" description="Deliver your music to 150+ stores worldwide." />

      <div className="surface-card p-6">
        <StepBar step={step} />
        <div className="mt-8">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Release title">
                <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Midnight in Lagos" />
              </Field>
              <Field label="Release type">
                <Select value={form.type} onValueChange={(v) => set("type", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Single", "EP", "Album"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Primary genre">
                <Select value={form.genre} onValueChange={(v) => set("genre", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Afrobeats", "Amapiano", "Afro-Fusion", "Highlife", "Hip-Hop", "R&B"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Release date">
                <Input type="date" value={form.releaseDate} onChange={(e) => set("releaseDate", e.target.value)} />
              </Field>
              <Field label="Language">
                <Input value={form.language} onChange={(e) => set("language", e.target.value)} />
              </Field>
              <Field label="Content advisory">
                <label className="flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm">
                  <Checkbox checked={form.explicit} onCheckedChange={(v) => set("explicit", Boolean(v))} />
                  <span>Contains explicit lyrics</span>
                </label>
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-6 sm:grid-cols-[280px_1fr] items-start">
              <div className="aspect-square rounded-lg border-2 border-dashed border-border bg-background/50 grid place-items-center overflow-hidden">
                {form.coverPreview ? (
                  <img src={form.coverPreview} alt="cover" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <CloudUpload className="mx-auto mb-2 h-8 w-8" />
                    <p className="text-sm">3000×3000 · PNG/JPG</p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Upload square artwork, min. 3000×3000, sRGB, under 20MB.</p>
                <Button
                  variant="outline"
                  onClick={() => set("coverPreview", `https://picsum.photos/seed/${form.title || "cover"}/800/800`)}
                >
                  <CloudUpload className="mr-2 h-4 w-4" /> Simulate upload
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {form.tracks.map((t, i) => (
                <div key={i} className="grid gap-3 rounded-lg border border-border/60 bg-background/40 p-4 sm:grid-cols-[1fr_1fr_auto]">
                  <Field label={`Track ${i + 1} title`}>
                    <Input value={t.title} onChange={(e) => {
                      const nx = [...form.tracks]; nx[i] = { ...t, title: e.target.value }; set("tracks", nx);
                    }} />
                  </Field>
                  <Field label="ISRC (optional)">
                    <Input value={t.isrc} onChange={(e) => {
                      const nx = [...form.tracks]; nx[i] = { ...t, isrc: e.target.value }; set("tracks", nx);
                    }} placeholder="Auto-assigned if empty" />
                  </Field>
                  <div className="flex items-end gap-2">
                    <label className="flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm">
                      <Checkbox checked={t.explicit} onCheckedChange={(v) => { const nx = [...form.tracks]; nx[i] = { ...t, explicit: Boolean(v) }; set("tracks", nx); }} />
                      Explicit
                    </label>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={() => set("tracks", [...form.tracks, { title: "", explicit: false, isrc: "" }])}>
                + Add track
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-2 sm:grid-cols-2">
              {STORES.map((s) => {
                const on = form.stores.has(s);
                return (
                  <label key={s} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${on ? "border-primary/60 bg-primary/5" : "border-border/60 bg-background/40 hover:border-border"}`}>
                    <Checkbox checked={on} onCheckedChange={(v) => {
                      const nx = new Set(form.stores); if (v) nx.add(s); else nx.delete(s); set("stores", nx);
                    }} />
                    <span className="font-medium">{s}</span>
                  </label>
                );
              })}
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <ReviewRow k="Title" v={form.title || "—"} />
              <ReviewRow k="Type" v={form.type} />
              <ReviewRow k="Genre" v={form.genre} />
              <ReviewRow k="Release date" v={form.releaseDate || "—"} />
              <ReviewRow k="Language" v={form.language} />
              <ReviewRow k="Explicit" v={form.explicit ? "Yes" : "No"} />
              <ReviewRow k="Tracks" v={String(form.tracks.length)} />
              <ReviewRow k="Stores" v={`${form.stores.size} selected`} />
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} className="gradient-brand text-primary-foreground hover:opacity-95">
              Continue <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={submit} disabled={submitting} className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95">
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Rocket className="mr-2 h-4 w-4" />}
              Submit for review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
function ReviewRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border/60 bg-background/40 px-4 py-3">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{k}</span>
      <span className="text-sm font-medium">{v}</span>
    </div>
  );
}

function StepBar({ step }: { step: number }) {
  const pct = (step / (steps.length - 1)) * 100;
  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div className={`grid h-9 w-9 place-items-center rounded-full border transition-all ${active ? "gradient-brand text-primary-foreground border-transparent shadow-glow" : done ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground"}`}>
                {done ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
              </div>
              <span className={`text-xs ${active ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</span>
            </div>
          );
        })}
      </div>
      <Progress value={pct} className="mt-4 h-1" />
    </div>
  );
}

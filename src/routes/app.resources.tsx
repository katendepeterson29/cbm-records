import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal/PageHeader";
import { Button } from "@/components/ui/button";
import { resources } from "@/data/mock";
import { BookOpen, PlayCircle, FileText, Layers } from "lucide-react";

export const Route = createFileRoute("/app/resources")({
  head: () => ({
    meta: [
      { title: "Resources — CBM Records" },
      { name: "description", content: "Guides, playbooks and templates to help you grow." },
      { property: "og:title", content: "Resources — CBM Records" },
      { property: "og:description", content: "Guides, playbooks and templates to help you grow." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResourcesPage,
});

const iconFor: Record<string, React.ComponentType<{ className?: string }>> = {
  Guide: BookOpen,
  Video: PlayCircle,
  Template: FileText,
  Playbook: Layers,
};

function ResourcesPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Resource center" description="Everything you need to level up as an artist." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => {
          const Icon = iconFor[r.kind] ?? BookOpen;
          return (
            <div key={r.id} className="group surface-card p-6 transition-all hover:border-primary/40">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{r.kind} · {r.minutes} min</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{r.title}</h3>
              <Button variant="link" className="mt-3 px-0 text-primary">Open →</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

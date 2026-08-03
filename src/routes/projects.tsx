import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, ListMusic, Megaphone, Newspaper, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandNavigation } from "@/components/landing/BrandOverview";

const STATUS_STYLES: Record<string, string> = {
  Released: "border-border/60 bg-background/70 text-muted-foreground",
  "Campaign Active": "border-primary/50 bg-primary/15 text-primary",
  "Coming Soon": "border-accent/50 bg-accent-15 text-accent-foreground",
};

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | CBM Records" },
      {
        name: "description",
        content:
          "Explore CBM Records' portfolio of artist development, distribution, marketing and brand partnership projects.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  const [category, setCategory] = useState<string>(PROJECT_CATEGORIES[0]);

  const projects = useMemo(
    () =>
      category === "All Projects"
        ? PROJECTS
        : PROJECTS.filter((project) => project.categories.includes(category as any)),
    [category],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BrandNavigation />
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-400">FEATURED PROJECTS</p>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            The work that defines CBM.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            A portfolio of artist development, distribution campaigns, publishing administration, and brand collaborations across Africa and beyond.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Projects portfolio</p>
            <h2 className="mt-3 text-3xl font-semibold">Real campaigns, real outcomes, real creative leadership.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition",
                  category === option
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/70 bg-background/80 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="overflow-hidden rounded-[2rem] border border-border/60 bg-white shadow-sm">
              <div className="relative h-72 overflow-hidden">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute left-6 bottom-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-200">{project.category ?? project.categories[0]}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-200">
                    {project.artist} · {project.releaseDate}
                  </p>
                </div>
              </div>
              <div className="space-y-5 p-8">
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span key={service} className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs text-muted-foreground">
                      {service}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{project.summary}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {project.highlights.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-3xl border border-border/70 bg-background/80 p-4">
                      <Icon className="h-4 w-4 text-primary" />
                      <p className="mt-3 font-semibold">{value}</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="sm" className="bg-black text-white hover:bg-slate-900">
                    <Link to="/contact">Work with CBM</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="border-border text-foreground hover:border-primary hover:text-primary">
                    View project
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

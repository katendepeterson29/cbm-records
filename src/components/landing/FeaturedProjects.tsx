import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Globe2,
  ListMusic,
  Megaphone,
  Newspaper,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Highlight = { icon: typeof Globe2; label: string; value: string };

type Project = {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  genre: string;
  country: string;
  status: "Released" | "Campaign Active" | "Coming Soon";
  categories: string[];
  image: string;
  services: string[];
  summary: string;
  highlights: Highlight[];
};

const CATEGORIES = [
  "All Projects",
  "Artist Development",
  "Music Distribution",
  "Marketing Campaigns",
  "Publishing",
  "Brand Partnerships",
  "Events",
] as const;

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Lagos Nights",
    artist: "Ayo Bankole",
    releaseDate: "March 2025",
    genre: "Afrobeats",
    country: "Nigeria",
    status: "Released",
    categories: ["Music Distribution", "Marketing Campaigns"],
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    services: ["Music Distribution", "Marketing Campaign", "Playlist Pitching", "PR & Media"],
    summary:
      "CBM Records managed the end-to-end release campaign for Ayo's debut album, coordinating digital distribution across 42 stores and executing a six-week social rollout. Editorial pitching secured flagship Afrobeats placements in three markets.",
    highlights: [
      { icon: Globe2, label: "Markets activated", value: "18" },
      { icon: ListMusic, label: "Editorial placements", value: "27" },
      { icon: Users, label: "Audience growth", value: "+312%" },
    ],
  },
  {
    id: "p2",
    title: "Sankofa Sessions",
    artist: "Nana Adjoa",
    releaseDate: "August 2025",
    genre: "Highlife / Soul",
    country: "Ghana",
    status: "Campaign Active",
    categories: ["Artist Development", "Events", "Marketing Campaigns"],
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    services: ["Artist Management", "Brand Strategy", "Digital Advertising", "PR & Media"],
    summary:
      "A live-session series repositioning Nana Adjoa as a premium touring act. CBM built the creative direction, produced four filmed sessions in Accra, and ran a paid media campaign that carried the series into European festival programming.",
    highlights: [
      { icon: Megaphone, label: "Campaign reach", value: "9.4M" },
      { icon: Newspaper, label: "Press features", value: "31" },
      { icon: BarChart3, label: "Tour support", value: "12 dates" },
    ],
  },
  {
    id: "p3",
    title: "Blue Gold",
    artist: "Kito Mensah",
    releaseDate: "January 2026",
    genre: "Alté / R&B",
    country: "Kenya",
    status: "Coming Soon",
    categories: ["Publishing", "Music Distribution"],
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    services: ["Publishing Administration", "Copyright Registration", "Music Distribution"],
    summary:
      "CBM handles publishing administration and global copyright registration for Kito's forthcoming project, clearing seven co-writer splits ahead of release and structuring the sync catalogue for film and advertising licensing.",
    highlights: [
      { icon: Globe2, label: "Territories cleared", value: "64" },
      { icon: ListMusic, label: "Sync submissions", value: "22" },
      { icon: Users, label: "Co-writers managed", value: "7" },
    ],
  },
  {
    id: "p4",
    title: "Motherland Motion",
    artist: "Zola Dube",
    releaseDate: "November 2025",
    genre: "Amapiano",
    country: "South Africa",
    status: "Campaign Active",
    categories: ["Brand Partnerships", "Marketing Campaigns"],
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
    services: ["Brand Strategy", "Digital Advertising", "Marketing Campaign", "PR & Media"],
    summary:
      "A brand partnership pairing Zola with a pan-African sportswear label. CBM negotiated the deal, produced the campaign film, and aligned the single release with retail activations in Johannesburg, Nairobi and Lagos.",
    highlights: [
      { icon: Sparkles, label: "Brand partnerships", value: "3" },
      { icon: Megaphone, label: "Campaign reach", value: "14.2M" },
      { icon: Globe2, label: "Markets activated", value: "9" },
    ],
  },
  {
    id: "p5",
    title: "Harmattan",
    artist: "Selam Tesfaye",
    releaseDate: "June 2025",
    genre: "Ethio-Jazz",
    country: "Ethiopia",
    status: "Released",
    categories: ["Artist Development", "Publishing"],
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    services: ["Artist Management", "Publishing Administration", "Playlist Pitching"],
    summary:
      "CBM took Selam from independent releases to a fully administered catalogue, rebuilding her metadata, recovering unclaimed royalties, and positioning the album with jazz and world-music editorial curators worldwide.",
    highlights: [
      { icon: BarChart3, label: "Royalties recovered", value: "$48K" },
      { icon: ListMusic, label: "Editorial placements", value: "19" },
      { icon: Users, label: "Audience growth", value: "+186%" },
    ],
  },
  {
    id: "p6",
    title: "CBM Live: Accra",
    artist: "CBM Roster",
    releaseDate: "December 2025",
    genre: "Multi-genre",
    country: "Ghana",
    status: "Campaign Active",
    categories: ["Events", "Brand Partnerships"],
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
    services: ["Brand Strategy", "PR & Media", "Digital Advertising", "Artist Management"],
    summary:
      "A flagship showcase built to introduce six CBM artists to industry buyers. The company handled production, sponsorship sales, press accreditation and the post-event content programme distributed across artist channels.",
    highlights: [
      { icon: Users, label: "Attendance", value: "6,400" },
      { icon: Newspaper, label: "Press coverage", value: "44 outlets" },
      { icon: Sparkles, label: "Sponsors secured", value: "5" },
    ],
  },
];

const STATUS_STYLES: Record<Project["status"], string> = {
  Released: "border-border/60 bg-background/70 text-muted-foreground",
  "Campaign Active": "border-primary/50 bg-primary/15 text-primary",
  "Coming Soon": "border-accent/50 bg-accent/15 text-accent-foreground",
};

export function FeaturedProjects() {
  const [category, setCategory] = useState<string>("All Projects");
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const projects = useMemo(
    () =>
      category === "All Projects"
        ? PROJECTS
        : PROJECTS.filter((p) => p.categories.includes(category)),
    [category],
  );

  const scrollBy = (direction: 1 | -1) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.85, 640), behavior: "smooth" });
  };

  return (
    <section id="projects" className="border-b border-border/60 bg-background/80 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 lg:flex lg:justify-between">
          <div className="min-w-0 max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-primary">Portfolio</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Featured Projects
            </h2>
            <p className="mt-4 text-muted-foreground">
              Explore some of the campaigns, releases, and artist success stories that showcase how
              CBM Records transforms creative talent into impactful brands.
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 lg:flex">
            <Button variant="outline" size="icon" aria-label="Previous projects" onClick={() => scrollBy(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next projects" onClick={() => scrollBy(1)}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                category === item
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/70 bg-background/80 text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {projects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.015 }}
                className="group relative w-[86vw] shrink-0 snap-start overflow-hidden rounded-[1.25rem] border border-border/60 bg-card/70 shadow-sm backdrop-blur-sm transition-shadow duration-500 hover:border-primary/40 hover:shadow-glow sm:w-[520px] lg:w-[560px]"
              >
                <div className="relative h-64 overflow-hidden sm:h-72">
                  <img
                    src={project.image}
                    alt={`${project.title} by ${project.artist}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute left-5 top-5">
                    <Badge className={cn("text-xs", STATUS_STYLES[project.status])}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute inset-x-5 bottom-5">
                    <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.artist} · {project.genre} · {project.releaseDate}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, index) => (
                      <motion.span
                        key={service}
                        initial={false}
                        whileHover={{ y: -2 }}
                        style={{ transitionDelay: `${index * 40}ms` }}
                        className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:text-foreground"
                      >
                        {service}
                      </motion.span>
                    ))}
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>

                  <div className="mt-6 grid max-h-0 grid-cols-3 gap-3 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100 sm:max-h-40 sm:opacity-100">
                    {project.highlights.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="rounded-2xl bg-background/70 p-3">
                        <Icon className="h-4 w-4 text-primary" />
                        <p className="mt-2 font-semibold">{value}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                    <Button
                      size="sm"
                      className="flex-1 gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
                    >
                      View project
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View artist
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex gap-2 lg:hidden">
          <Button variant="outline" size="icon" aria-label="Previous projects" onClick={() => scrollBy(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Next projects" onClick={() => scrollBy(1)}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

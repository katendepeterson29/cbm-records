import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Eye, User, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Category = "New Releases" | "Trending" | "Coming Soon" | "Recently Distributed" | "Editor's Picks";

type Status = "Live" | "Pre-save" | "Scheduled" | "Distributed";

interface FeaturedRelease {
  id: string;
  title: string;
  artist: string;
  genre: string;
  releaseDate: string;
  platforms: string[];
  status: Status;
  cover: string;
  categories: Category[];
}

const CATEGORIES: Category[] = [
  "New Releases",
  "Trending",
  "Coming Soon",
  "Recently Distributed",
  "Editor's Picks",
];

const COVERS = [
  "photo-1493225457124-a3eb161ffa5f",
  "photo-1470225620780-dba8ba36b745",
  "photo-1511671782779-c97d3d27a1d4",
  "photo-1519681393784-d120267933ba",
  "photo-1508700115892-45ecd05ae2ad",
  "photo-1516280440614-37939bbacd81",
  "photo-1459749411175-04bf5292ceea",
  "photo-1487215078519-e21cc028cb29",
  "photo-1514320291840-2e0a9bf2a9ae",
  "photo-1465225314224-587cd83d322b",
  "photo-1483412033650-1015ddeb83d1",
  "photo-1526478806334-5fd488fcaabc",
  "photo-1506157786151-b8491531f063",
  "photo-1471478331149-c72f17e33c73",
  "photo-1499415479124-43c32433a620",
  "photo-1445375011782-2384686778a0",
];

const GENRES = ["Afrobeats", "Amapiano", "Afro-Fusion", "Highlife", "Hip-Hop", "R&B", "Alté", "Afro-Soul"];
const ARTISTS = [
  "Kola Sunshine", "Ada Nova", "Zaza Blaze", "Tunde Cole", "Ify Aria", "Miles Okafor",
  "Nia Sekoni", "Rema Junior", "Sade Iyaba", "Baba Yao", "Kemi Wave", "Prince Osei",
  "Lola D", "T-Rock", "Yemi Sol", "Chidi Beats",
];
const TITLES = [
  "Midnight in Lagos", "Golden Hour", "Sunset Rituals", "Palm Wine Dreams", "Neon Sabbath",
  "Harmattan", "Owo & Ope", "Kiss of Rain", "River Songs", "Nightbird", "Jollof Nights",
  "Ojuelegba Blue", "Sahara Bloom", "Kingdom Come", "Lucid", "Afterglow",
];
const PLATFORM_POOL = ["Spotify", "Apple Music", "Boomplay", "Audiomack", "YouTube Music", "Tidal", "Deezer"];

function pick<T>(arr: T[], i: number) { return arr[i % arr.length]; }

const releases: FeaturedRelease[] = Array.from({ length: 16 }).map((_, i) => {
  const cats: Category[] = [];
  if (i < 6) cats.push("New Releases");
  if (i % 3 === 0) cats.push("Trending");
  if (i >= 10) cats.push("Coming Soon");
  if (i % 4 === 1) cats.push("Recently Distributed");
  if (i % 5 === 0) cats.push("Editor's Picks");
  if (cats.length === 0) cats.push("New Releases");

  const isComing = cats.includes("Coming Soon");
  const date = new Date();
  date.setDate(date.getDate() + (isComing ? 14 + i : -i * 4));

  return {
    id: `rel-${i}`,
    title: pick(TITLES, i),
    artist: pick(ARTISTS, i),
    genre: pick(GENRES, i * 3),
    releaseDate: date.toISOString().slice(0, 10),
    platforms: PLATFORM_POOL.slice(0, 3 + (i % 4)),
    status: isComing ? (i % 2 ? "Pre-save" : "Scheduled") : cats.includes("Recently Distributed") ? "Distributed" : "Live",
    cover: `https://images.unsplash.com/${pick(COVERS, i)}?w=600&h=600&fit=crop`,
    categories: cats,
  };
});

const STATUS_STYLE: Record<Status, string> = {
  Live: "bg-primary/15 text-primary border-primary/30",
  "Pre-save": "bg-accent/15 text-accent border-accent/30",
  Scheduled: "bg-muted text-muted-foreground border-border",
  Distributed: "bg-secondary text-secondary-foreground border-border",
};

export function FeaturedReleases() {
  const [category, setCategory] = useState<Category>("New Releases");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => releases.filter((r) => r.categories.includes(category)),
    [category],
  );

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Featured releases</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Fresh from the CBM catalog
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Browse what's new, what's climbing, and what's about to drop — curated across every corner of the roster.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => scroll(-1)} className="border-border/80" aria-label="Scroll left">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll(1)} className="border-border/80" aria-label="Scroll right">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-primary/40 text-foreground"
                  : "border-border/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="feat-pill"
                  className="absolute inset-0 -z-0 rounded-full gradient-brand opacity-20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{c}</span>
            </button>
          );
        })}
      </div>

      <div
        ref={scrollerRef}
        className="mt-8 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((r, i) => (
            <motion.article
              key={r.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, delay: i * 0.02 }}
              className="group relative w-[260px] flex-shrink-0 snap-start"
            >
              <div className="surface-card overflow-hidden transition-all group-hover:border-primary/40 group-hover:shadow-elegant">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={r.cover}
                    alt={`${r.title} cover art`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="absolute left-3 top-3">
                    <Badge variant="outline" className={`border ${STATUS_STYLE[r.status]}`}>{r.status}</Badge>
                  </div>

                  <div className="absolute inset-x-3 bottom-3 flex translate-y-2 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Button size="sm" className="w-full gradient-brand text-primary-foreground shadow-glow hover:opacity-95">
                      <Play className="mr-1.5 h-3.5 w-3.5" /> Preview
                    </Button>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="flex-1 backdrop-blur">
                        <Eye className="mr-1.5 h-3.5 w-3.5" /> Details
                      </Button>
                      <Button size="sm" variant="secondary" className="flex-1 backdrop-blur">
                        <User className="mr-1.5 h-3.5 w-3.5" /> Artist
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="truncate font-display text-base font-semibold">{r.title}</h3>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">{r.artist}</p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Music2 className="h-3.5 w-3.5 text-primary" />
                    <span>{r.genre}</span>
                    <span className="text-border">•</span>
                    <span>{new Date(r.releaseDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {r.platforms.slice(0, 3).map((p) => (
                      <span key={p} className="rounded-md border border-border/70 bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {p}
                      </span>
                    ))}
                    {r.platforms.length > 3 && (
                      <span className="rounded-md border border-border/70 bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        +{r.platforms.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

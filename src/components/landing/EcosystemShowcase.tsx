import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, MapPin, Search, ArrowRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ecosystem,
  ecosystemCountries,
  ecosystemGenres,
  type EcosystemProfile,
} from "@/data/ecosystem";
import { cn } from "@/lib/utils";

const TABS = ["All", "Artists", "Distributors", "Managers", "Record Labels"] as const;
type Tab = (typeof TABS)[number];

const TAB_TO_CATEGORY: Record<Tab, string> = {
  All: "All",
  Artists: "Artist",
  Distributors: "Distributor",
  Managers: "Manager",
  "Record Labels": "Record Label",
};

type SortKey = "alpha" | "popularity" | "newest";

export function EcosystemShowcase() {
  const [tab, setTab] = useState<Tab>("All");
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string>("all");
  const [genre, setGenre] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("popularity");

  const filtered = useMemo(() => {
    const category = TAB_TO_CATEGORY[tab];
    let list = ecosystem.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (country !== "all" && p.country !== country) return false;
      if (genre !== "all" && p.genre !== genre) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.bio.toLowerCase().includes(q) &&
          !(p.genre ?? "").toLowerCase().includes(q) &&
          !(p.specialty ?? "").toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });

    if (sort === "alpha") list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "popularity") list = list.slice().sort((a, b) => b.popularity - a.popularity);
    else if (sort === "newest")
      list = list.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

    return list;
  }, [tab, query, country, genre, sort]);

  return (
    <section id="ecosystem" className="relative border-y border-border/60 bg-background/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-primary">
            Built for the entire music industry
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            One platform. <span className="text-gradient-brand">Every music professional.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether you're creating music, managing talent, distributing releases, or running a
            label, CBM Records provides the tools to manage your business from a single platform.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {TABS.map((t) => {
            const active = t === tab;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="ecosystem-tab-pill"
                    className="absolute inset-0 -z-10 rounded-full gradient-brand shadow-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, bio, genre…"
              className="h-9 w-64 pl-8"
            />
          </div>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="h-9 w-40">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              <SelectItem value="all">All countries</SelectItem>
              {ecosystemCountries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="h-9 w-40">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              <SelectItem value="all">All genres</SelectItem>
              {ecosystemGenres.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="h-9 w-44">
              <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Sort: Popularity</SelectItem>
              <SelectItem value="alpha">Sort: A → Z</SelectItem>
              <SelectItem value="newest">Sort: Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Showing <span className="text-foreground">{filtered.length}</span> profiles
        </p>

        {/* Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProfileCard key={p.id} profile={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-border/60 bg-card/40 p-10 text-center text-sm text-muted-foreground">
            No profiles match your filters. Try broadening your search.
          </div>
        )}
      </div>
    </section>
  );
}

function ProfileCard({ profile }: { profile: EcosystemProfile }) {
  const isSquareLogo = profile.category === "Distributor" || profile.category === "Record Label";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.04 }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm backdrop-blur-xl transition-shadow hover:shadow-elegant"
    >
      {/* gradient border on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(140deg, var(--primary), transparent 45%, var(--accent))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      <div className="relative flex items-start gap-3">
        <div className="relative">
          <img
            src={profile.imageUrl}
            alt={profile.name}
            loading="lazy"
            className={cn(
              "h-16 w-16 object-cover ring-1 ring-border/60",
              isSquareLogo ? "rounded-xl" : "rounded-full",
            )}
          />
          {profile.verified && (
            <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-background ring-1 ring-border/60 transition-shadow group-hover:shadow-glow">
              <BadgeCheck className="h-4 w-4 text-primary" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-base font-semibold">{profile.name}</h3>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {profile.genre ?? profile.specialty ?? profile.region ?? profile.category}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {profile.country}
          </p>
        </div>
      </div>

      <p className="relative mt-3 line-clamp-3 text-sm text-muted-foreground">{profile.bio}</p>

      {/* Hover reveal */}
      <div className="relative mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100">
        <ul className="space-y-1 text-xs text-muted-foreground">
          {profile.meta.map((m) => (
            <li key={m} className="truncate">
              • {m}
            </li>
          ))}
        </ul>
        <Button
          size="sm"
          variant="outline"
          className="mt-3 h-8 w-full border-border/80 bg-background/40 text-xs"
        >
          View profile <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      {/* Footer stats */}
      <div className="relative mt-4 grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
        {profile.stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-sm font-semibold">{s.value}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

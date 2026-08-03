import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
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
  ArrowRight,
  Award,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Music2,
  Play,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  User,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ARTISTS, ARTIST_COUNTRIES, ARTIST_GENRES } from "@/data/artists";
import { BrandNavigation, BrandOverview } from "@/components/landing/BrandOverview";
import epikanoCarouselImage from "../../../assets/carousel/epikano.jpg.jpeg";
import jjCarouselImage from "../../../assets/carousel/jj.jpg.jpeg";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const FEATURED_ARTIST_BACKGROUNDS = [epikanoCarouselImage, jjCarouselImage];

function formatListeners(value: number) {
  return value >= 1000 ? `${Math.round(value / 1000)}K` : String(value);
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function daysUntil(date: string) {
  const diff = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

const RELEASE_TITLES = [
  "Midnight in Lagos",
  "Golden Hour",
  "Sunset Rituals",
  "Palm Wine Dreams",
  "Neon Sabbath",
];

type ReleaseItem = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  coverUrl: string;
  releaseDate: string;
  type: string;
  tracks: number;
  duration: string;
  platforms: string[];
  status: string;
  listeners: number;
};

function pick<T>(arr: T[], i: number) { return arr[i % arr.length]; }

const RELEASES: ReleaseItem[] = Array.from({ length: 72 }).map((_, index) => {
  const artist = pick(ARTISTS, index * 2);
  const releaseDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * (index * 2 - 14));
  const isFuture = index % 10 === 0 || index % 9 === 0;
  if (isFuture) {
    releaseDate.setDate(releaseDate.getDate() + 28 + index);
  }

  return {
    id: `release-${index + 1}`,
    title: pick(RELEASE_TITLES, index * 3),
    artist: artist.name,
    genre: artist.genre,
    coverUrl: `https://images.unsplash.com/seed/release-${index + 1}?w=600&h=600&fit=crop`,
    releaseDate: releaseDate.toISOString().slice(0, 10),
    type: index % 7 === 0 ? "Album" : index % 4 === 0 ? "EP" : "Single",
    tracks: 1 + (index % 6),
    duration: `${2 + (index % 4)}:${index % 2 === 0 ? "48" : "12"}`,
    platforms: ["Spotify", "Apple Music", "Audiomack", "YouTube Music"].slice(0, 2 + (index % 3)),
    status: isFuture ? (index % 2 === 0 ? "Pre-save" : "Coming Soon") : "Live",
    listeners: 25_000 + index * 18_000,
  };
});


export function ArtistDiscovery() {
  const [activeHero, setActiveHero] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [artistCarouselApi, setArtistCarouselApi] = useState<CarouselApi | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const heroTimer = useRef<number | null>(null);

  const featuredArtists = ARTISTS.slice(0, 5);

  const filteredArtists = useMemo(() => {
    return ARTISTS.filter((artist) => {
      if (selectedLetter !== "All" && artist.name.charAt(0).toUpperCase() !== selectedLetter) {
        return false;
      }
      if (selectedGenre !== "All" && artist.genre !== selectedGenre) {
        return false;
      }
      if (selectedCountry !== "All" && artist.country !== selectedCountry) {
        return false;
      }
      if (verifiedOnly && !artist.verified) {
        return false;
      }
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        return [artist.name, artist.genre, artist.country, artist.bio].some((value) =>
          value.toLowerCase().includes(q),
        );
      }
      return true;
    });
  }, [search, selectedGenre, selectedCountry, verifiedOnly, selectedLetter]);

  const lettersWithArtists = useMemo(() => {
    return new Set(filteredArtists.map((artist) => artist.name.charAt(0).toUpperCase()));
  }, [filteredArtists]);


  const trendingArtists = useMemo(() => {
    return ARTISTS.slice(0, 8);
  }, []);

  const upcomingReleases = useMemo(() => {
    return RELEASES.filter((release) => release.status !== "Live").slice(0, 8);
  }, []);

  const recentAdds = useMemo(() => {
    return ARTISTS.slice(0, 6);
  }, []);

  useEffect(() => {
    if (heroTimer.current) {
      window.clearInterval(heroTimer.current);
    }
    heroTimer.current = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % featuredArtists.length);
    }, 7000);
    return () => {
      if (heroTimer.current) {
        window.clearInterval(heroTimer.current);
      }
    };
  }, [featuredArtists.length]);

  useEffect(() => {
    if (!artistCarouselApi) return;

    const updateActive = () => setActiveSlide(artistCarouselApi.selectedScrollSnap());
    updateActive();
    artistCarouselApi.on("select", updateActive);
    return () => {
      artistCarouselApi.off("select", updateActive);
    };
  }, [artistCarouselApi]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const letterButtons = ["All", ...ALPHABET];

  return (
    <main id="top" className="bg-background text-foreground">
      <BrandNavigation />
      {/* <div className="relative overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_top_left,_rgba(255,240,170,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(255,120,90,0.12),_transparent_30%),var(--background)] py-24">
        
      </div> */}
      
      <section className="mx-auto max-w-7xl px-6 lg:grid lg:items-center lg:gap-16">
        <div className="mt-32 lg:mt-0">
          <div
            className="relative isolate min-h-[560px] overflow-hidden rounded-[2rem] border border-border/60 bg-card/60 bg-cover bg-center shadow-elegant"
            style={{
              backgroundImage: `url(${FEATURED_ARTIST_BACKGROUNDS[activeHero % FEATURED_ARTIST_BACKGROUNDS.length]})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/15" />
            <div className="absolute inset-0 bg-background/15" />
            <div className="relative z-10 flex min-h-[560px] flex-col items-center justify-end px-8 pb-10 pt-24 text-center sm:px-14">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Featured artist</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {featuredArtists[activeHero].name}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/80">
                {featuredArtists[activeHero].bio}
              </p>
              <a
                href="#artists"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:text-primary-glow"
              >
                View artist
                <ArrowRight className="h-4 w-4" />
              </a>
              
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={`Show next featured artist after ${featuredArtists[activeHero].name}`}
              onClick={() => setActiveHero((current) => (current + 1) % featuredArtists.length)}
              className="absolute bottom-8 right-8 z-10 rounded-full border-foreground/30 bg-background/40 text-foreground backdrop-blur-sm hover:bg-background/70"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>



    <section
          aria-labelledby="artist-discovery-heading"
          className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16"
        >
          <div className="max-w-2xl">
            <Badge className="mb-6 border border-primary/30 bg-primary/10 text-primary">
              CBM Records
            </Badge>
            <h1
              id="artist-discovery-heading"
              className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              We build careers that move <span className="text-gradient-brand">African music</span> forward.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A full-service music company for artists, labels and brand partners with a vision
              for what comes next.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
                size="lg"
              >
                Work with us
              </Button>
              <Button variant="outline" size="lg" className="border-border/80 bg-background/40">
                Explore our artists
              </Button>
            </div>

          </div>
        </section>
      
      <div className="theme-light">
        <BrandOverview />
      </div>

      <section id="artists" className="border-b border-border/60 bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Top bar: search + nav */}
          <div className="flex flex-col gap-6 border-b border-border/60 pb-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="w-full max-w-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Type to search
              </p>
              <div className="mt-2 flex items-center gap-3 border-b border-foreground/70 pb-2">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder=""
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <ArrowRight className="h-4 w-4 text-foreground" />
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.25em]">
              {["All", "Distribution", "Management", "Personalities", "Publishing"].map((item) => {
                const active =
                  (item === "All" && selectedGenre === "All" && !verifiedOnly) ||
                  selectedGenre === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSelectedGenre("All");
                      setVerifiedOnly(false);
                    }}
                    className={cn(
                      "relative pb-1 transition-colors",
                      active
                        ? "text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* A-Z single-line row */}
          <div className="mt-8 overflow-x-auto">
            <div className="flex min-w-max items-center gap-x-4 sm:gap-x-6 md:justify-between md:min-w-0">
              {letterButtons.map((letter) => {
                const active = letter === selectedLetter;
                const available = letter === "All" || lettersWithArtists.has(letter);
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => setSelectedLetter(letter)}
                    disabled={!available}
                    className={cn(
                      "text-xs font-semibold uppercase tracking-[0.2em] transition-colors",
                      active
                        ? "text-foreground"
                        : available
                          ? "text-muted-foreground hover:text-foreground"
                          : "cursor-not-allowed text-muted-foreground/40",
                    )}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA + clear */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              className="bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-background transition hover:bg-foreground/90"
            >
              Sign up &amp; join CBM Records distribution
            </button>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedGenre("All");
                setSelectedCountry("All");
                setSelectedLetter("All");
                setVerifiedOnly(false);
              }}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          </div>

          {/* Artist grid */}
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {filteredArtists.map((artist) => (
              <motion.article
                key={artist.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="group flex flex-col"
              >
                <Link
                  to={`/artists/${artist.slug}`}
                  className="relative aspect-[4/5] w-full overflow-hidden bg-muted"
                >
                  <img
                    src={artist.heroImage}
                    alt={artist.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="mt-4">
                  <div className="h-px w-8 bg-foreground/80" />
                  <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.15em] text-foreground">
                    {artist.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{artist.country}</p>
                  <Link
                    to={`/artists/${artist.slug}`}
                    className="mt-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/80 transition hover:text-foreground"
                  >
                    Learn more
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredArtists.length === 0 && (
            <div className="mt-10 border border-border/60 p-10 text-center text-sm text-muted-foreground">
              No artists match your filters. Try clearing the active letter or search.
            </div>
          )}
        </div>
      </section>

      <div className="theme-light">
        <BrandOverview />
      </div>

      <section className="theme-light border-b border-border/60 bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">Trending artists</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Artists climbing fastest this week.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Popularity metrics, weekly growth and top songs highlight the current roster stars.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {trendingArtists.map((artist) => (
                  <div
                    key={artist.id}
                    className="rounded-[2rem] border border-border/60 bg-card/70 p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={artist.portrait}
                        alt={artist.name}
                        className="h-16 w-16 rounded-3xl object-cover"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{artist.name}</h3>
                          <Badge className="border-border/60 bg-background/80 text-xs text-foreground">
                            Trending
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{artist.genre}</p>
                      </div>
                    </div>
                    <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span>{artist.weeklyGrowth}% growth</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-primary" />
                        <span>{formatListeners(artist.monthlyListeners)} monthly listeners</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Music2 className="h-4 w-4 text-primary" />
                        <span>Top track: {artist.mostStreamed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/60 bg-card/70 p-8 shadow-elegant">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    CBM spotlight
                  </p>
                  <p className="mt-2 text-2xl font-semibold">Weekly editorial pick</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                Every week we highlight one roster artist with standout growth, strong fan
                engagement, and a release ready for discovery.
              </p>
              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl border border-border/70 bg-background/80 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Featured artist
                  </p>
                  <p className="mt-3 text-lg font-semibold">{trendingArtists[0].name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {trendingArtists[0].genre} · {trendingArtists[0].country}
                  </p>
                </div>
                <div className="rounded-3xl border border-border/70 bg-background/80 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Most streamed song
                  </p>
                  <p className="mt-3 text-lg font-semibold">{trendingArtists[0].mostStreamed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background/80 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">Upcoming releases</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                What’s next on the roster.
              </h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" /> Countdown, pre-save and arrival dates.
            </div>
          </div>

          <div className="mt-10 grid gap-5 xl:grid-cols-4">
            {upcomingReleases.map((release) => (
              <div
                key={release.id}
                className="rounded-[2rem] border border-border/60 bg-card/70 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {release.type}
                    </p>
                    <h3 className="mt-2 font-semibold">{release.title}</h3>
                  </div>
                  <Badge className="border-border/60 bg-primary/10 text-primary">
                    {mounted ? `${daysUntil(release.releaseDate)}d` : "—"}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{release.artist}</p>
                <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  <div className="rounded-3xl bg-background/80 p-3">
                    {formatDate(release.releaseDate)}
                  </div>
                  <div className="rounded-3xl bg-background/80 p-3">{release.genre}</div>
                </div>
                <Button
                  size="sm"
                  className="mt-5 w-full gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
                >
                  Pre-save
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-light bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">
                Recently added artists
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Fresh roster additions.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Meet the newest artists joining CBM Records and their breakthrough songs.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {recentAdds.map((artist) => (
                  <div
                    key={artist.id}
                    className="rounded-[2rem] border border-border/60 bg-card/70 p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={artist.portrait}
                        alt={artist.name}
                        className="h-16 w-16 rounded-3xl object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{artist.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Joined {formatDate(artist.joinedAt)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground line-clamp-3">
                      {artist.bio}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <Badge className="border-border/60 bg-background/80 text-foreground">New</Badge>
                      <span className="rounded-full border border-border/70 bg-background/80 px-3 py-1">
                        {artist.latestRelease}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/60 bg-card/70 p-8 shadow-elegant">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Artist preview</p>
              <h3 className="mt-3 text-2xl font-semibold">Artist profile preview</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Clicking an artist reveals their profile with hero image, discography, latest
                releases, popular songs, gallery and achievements.
              </p>
              <div className="mt-8 grid gap-4 rounded-[1.75rem] border border-border/70 bg-background/80 p-5">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold">Hero banner</span>
                </div>
                <div className="flex items-center gap-3">
                  <Music2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold">Latest releases carousel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold">Achievements & milestones</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold">Related artist recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

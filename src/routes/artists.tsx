import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Search, Users } from "lucide-react";
import { BrandNavigation } from "@/components/landing/BrandOverview";
import bannerArtists from "/assets/banners/banner2.jpeg";
import { ARTISTS, ARTIST_GENRES, ARTIST_COUNTRIES } from "@/data/artists";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/artists")({
  head: () => ({
    meta: [
      { title: "Artists | CBM Records" },
      {
        name: "description",
        content: "Discover CBM Records artists, profiles, releases and stories.",
      },
    ],
  }),
  component: Artists,
});

function Artists() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");

  const filteredArtists = useMemo(() => {
    return ARTISTS.filter((artist) => {
      if (selectedGenre !== "All" && artist.genre !== selectedGenre) return false;
      if (selectedCountry !== "All" && artist.country !== selectedCountry) return false;
      const query = search.trim().toLowerCase();
      if (!query) return true;
      return [artist.name, artist.genre, artist.country, artist.shortBio, artist.bio]
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [search, selectedGenre, selectedCountry]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BrandNavigation />

      <section className="relative overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerArtists})` }}
        />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
            <p className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl">OUR ARTISTS</p>            
          </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_0.8fr] lg:items-start">
          <div className="space-y-4">
            <div className="rounded-3xl border border-border/60 bg-card p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary text-black">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Roster filters</p>
                  <p className="mt-2 text-sm text-foreground/80">
                    Search by name, genre, country, and discover the artists already on the roster.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-border/60 bg-card p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Genre</p>
                <select
                  value={selectedGenre}
                  onChange={(event) => setSelectedGenre(event.target.value)}
                  className="mt-3 w-full rounded-3xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground outline-none"
                >
                  {ARTIST_GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rounded-3xl border border-border/60 bg-card p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Country</p>
                <select
                  value={selectedCountry}
                  onChange={(event) => setSelectedCountry(event.target.value)}
                  className="mt-3 w-full rounded-3xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground outline-none"
                >
                  {ARTIST_COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rounded-3xl border border-border/60 bg-card p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Search</p>
                <div className="mt-3 flex items-center gap-3 rounded-3xl border border-border/60 bg-background px-4 py-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search artists"
                    className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/60 bg-card/80 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Artist highlights</p>
            <h2 className="mt-4 text-3xl font-semibold">A premium roster of emerging and established artists.</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Each artist profile is built to showcase their identity, music direction, and the services CBM provides behind the scenes.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArtists.map((artist) => (
            <motion.article
              key={artist.slug}
              layout
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-[2rem] border border-border/60 bg-black text-white shadow-lg transition-shadow hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={artist.profileImage}
                  alt={artist.name}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {artist.verified ? (
                  <span className="absolute left-4 top-4 rounded-full bg-teal-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-black">
                    Verified
                  </span>
                ) : null}
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{artist.name}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-teal-400">
                      {artist.genre}
                    </p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {artist.country}
                  </p>
                </div>
                <p className="text-sm leading-7 text-muted-foreground transition-colors group-hover:text-white/90">
                  {artist.shortBio}
                </p>
                <Link
                  to="/artists/$slug" params={{ slug: artist.slug }}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-400 transition hover:text-white"
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}

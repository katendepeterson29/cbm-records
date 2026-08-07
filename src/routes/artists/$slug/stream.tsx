import type { ComponentType } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Apple, Music, ListMusic } from "lucide-react";
import { BrandNavigation } from "@/components/landing/BrandOverview";
import { getArtistBySlug } from "@/data/artists";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PLATFORM_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Spotify: Music,
  "Apple Music": Apple,
  Tidal: ListMusic,
  "YouTube Music": ListMusic,
  Deezer: Music,
};

export const Route = createFileRoute("/artists/$slug/stream")({
  validateSearch: () => ({}),
  head: ({ params }: { params: { slug: string } }) => {
    const artist = getArtistBySlug(params.slug);
    return {
      meta: [
        { title: artist ? `${artist.name} | Stream` : "Stream | CBM Records" },
        {
          name: "description",
          content: artist
            ? `Open ${artist.name}'s streaming platforms from CBM Records.`
            : "Open music streaming page for an artist.",
        },
      ],
    };
  },
  component: ArtistStreamPage,
});

function ArtistStreamPage() {
  const params = Route.useParams();
  const artist = getArtistBySlug(params.slug);

  if (!artist) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <BrandNavigation />
        <div className="mx-auto max-w-3xl px-6 py-40 text-center">
          <h1 className="text-4xl font-semibold">Artist not found</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            We couldn’t find that artist. Please return to the artist directory.
          </p>
          <Link to="/artists" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to artists
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BrandNavigation />
      <section className="relative overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${artist.heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_0.6fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Stream the artist</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
                {artist.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
                Choose a streaming platform to open {artist.name}'s official artist page and keep the music playing.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-primary px-3 py-1 text-xs text-black">{artist.genre}</Badge>
                <Badge className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                  {artist.country}
                </Badge>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Release preview</p>
              <div className="mt-5 rounded-3xl bg-black/60 p-5 text-sm leading-7 text-slate-200">
                {artist.releases.length > 0 ? (
                  <>
                    <p className="font-semibold">Latest release</p>
                    <p className="mt-3 text-lg font-semibold">{artist.releases[0].title}</p>
                    <p className="mt-2 text-muted-foreground">{artist.releases[0].type} • {artist.releases[0].year}</p>
                  </>
                ) : (
                  <p className="text-muted-foreground">No releases available yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 xl:grid-cols-[0.65fr_0.35fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border/60 bg-card/80 p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Streaming platforms</p>
              <h2 className="mt-4 text-3xl font-semibold">Open {artist.name} on your favorite services.</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                This page is designed to keep the listener inside the CBM experience while giving direct access to each platform.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {artist.streamingLinks?.map((link) => {
                  const Icon = PLATFORM_ICONS[link.platform] ?? ArrowRight;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-background/80 px-5 py-4 text-sm font-semibold text-foreground transition hover:border-teal-400 hover:bg-white/5"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        {link.platform}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/60 bg-card/80 p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Why stream here?</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>• Keep the experience consistent with the CBM Records visual style.</li>
                <li>• Choose the platform you already use without leaving our site first.</li>
                <li>• Access official artist profiles on Spotify, Apple Music, Tidal, and more.</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-border/60 bg-black/80 p-8 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Artist quick actions</p>
              <div className="mt-6 space-y-4">
                <Link
                  to="/artists/$slug"
                  params={{ slug: artist.slug }}
                  className="block rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Back to artist page
                </Link>
                <Link
                  to="/artists"
                  className="block rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explore other artists
                </Link>
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Not ready to stream?</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                You can still browse the artist profile and learn more about their latest releases, services, and gallery before jumping to a streaming platform.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

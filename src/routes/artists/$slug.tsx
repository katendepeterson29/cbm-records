import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, MapPin, Play, Sparkles, Users } from "lucide-react";
import { useMemo } from "react";
import { BrandNavigation } from "@/components/landing/BrandOverview";
import { getArtistBySlug, getRelatedArtists } from "@/data/artists";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/artists/$slug")({
  validateSearch: () => ({}),
  head: ({ params }: { params: { slug: string } }) => {
    const artist = getArtistBySlug(params.slug);
    return {
      meta: [
        { title: artist ? `${artist.name} | CBM Records` : "Artist | CBM Records" },
        {
          name: "description",
          content: artist
            ? `Learn more about ${artist.name}, their releases, and how CBM Records supports their work.`
            : "Artist profile for CBM Records.",
        },
      ],
    };
  },
  component: ArtistProfile,
});

function ArtistProfile() {
  const params = Route.useParams();
  const artist = useMemo(() => getArtistBySlug(params.slug), [params.slug]);
  const related = useMemo(() => getRelatedArtists(params.slug), [params.slug]);

  if (!artist) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <BrandNavigation />
        <div className="mx-auto max-w-3xl px-6 py-40 text-center">
          <h1 className="text-4xl font-semibold">Artist not found</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            We couldn’t find that artist. Please return to the artist directory.
          </p>
          <Link to="/artists" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-400">
            <ArrowRight className="h-4 w-4 rotate-180" />
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
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${artist.heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-teal-300">Artist profile</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
              {artist.name}
            </h1>
            <p className="mt-4 text-sm uppercase tracking-[0.35em] text-muted-foreground">
              {artist.genre} · {artist.country}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {artist.verified ? (
                <Badge className="rounded-full bg-teal-500 px-3 py-1 text-black">Verified</Badge>
              ) : null}
              <Link
                to="/artists"
                className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-400 transition hover:text-white"
              >
                Back to artists
              </Link>
            </div>
            <p className="mt-10 max-w-3xl text-lg leading-8 text-slate-200">
              {artist.bio}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {artist.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-teal-500 hover:text-black"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <div className="space-y-16">
            <section>
              <p className="text-xs uppercase tracking-[0.35em] text-primary">ABOUT THE ARTIST</p>
              <h2 className="mt-4 text-3xl font-semibold">Artist story</h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">{artist.bio}</p>
            </section>

            <section>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-primary">NEW RELEASES</p>
                  <h2 className="mt-4 text-3xl font-semibold">Latest releases</h2>
                </div>
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {artist.releases.map((release) => (
                  <article key={release.id} className="overflow-hidden rounded-[2rem] border border-border/60 bg-black text-white">
                    <img src={release.coverUrl} alt={release.title} className="h-72 w-full object-cover" />
                    <div className="space-y-4 p-6">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs uppercase tracking-[0.35em] text-teal-300">{release.type}</p>
                        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{release.year}</p>
                      </div>
                      <h3 className="text-2xl font-semibold">{release.title}</h3>
                      <p className="text-sm text-muted-foreground">{artist.name}</p>
                      <p className="text-sm leading-7 text-slate-300">{release.description}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button asChild size="sm" className="bg-teal-500 text-black hover:bg-teal-400">
                          <Link to="/projects">View project</Link>
                        </Button>
                        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{release.format}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-primary">DISCOGRAPHY</p>
                  <h2 className="mt-4 text-3xl font-semibold">Body of work</h2>
                </div>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  <span>Albums</span>
                  <span>·</span>
                  <span>EPs</span>
                  <span>·</span>
                  <span>Singles</span>
                </div>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {[...artist.albums, ...artist.eps, ...artist.singles].map((item) => (
                  <div key={item.id} className="rounded-[2rem] border border-border/60 bg-white p-6">
                    <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
                      <img src={item.coverUrl} alt={item.title} className="h-28 w-28 rounded-3xl object-cover" />
                      <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-primary">{item.type}</p>
                        <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                        <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">{item.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {artist.projects.length > 0 ? (
              <section>
                <p className="text-xs uppercase tracking-[0.35em] text-primary">FEATURED PROJECT</p>
                <h2 className="mt-4 text-3xl font-semibold">Campaign work with CBM</h2>
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  {artist.projects.map((project) => (
                    <article key={project.id} className="rounded-[2rem] border border-border/60 bg-card p-6">
                      <img src={project.image} alt={project.title} className="h-56 w-full rounded-3xl object-cover" />
                      <div className="mt-6 space-y-4">
                        <h3 className="text-2xl font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.summary}</p>
                        <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                          {project.services.map((service) => (
                            <span key={service} className="rounded-full border border-border/60 bg-background px-3 py-2">
                              {service}
                            </span>
                          ))}
                        </div>
                        <Button asChild size="sm" className="bg-black text-white hover:bg-slate-900">
                          <Link to={`/projects`}>View Project</Link>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {artist.services.length > 0 ? (
              <section>
                <p className="text-xs uppercase tracking-[0.35em] text-primary">SUPPORTED BY CBM</p>
                <h2 className="mt-4 text-3xl font-semibold">Services for the artist</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {artist.services.map((service) => (
                    <div key={service} className="rounded-3xl border border-border/60 bg-card/80 p-5">
                      <p className="text-sm font-semibold">{service}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {artist.gallery.length > 0 ? (
              <section>
                <p className="text-xs uppercase tracking-[0.35em] text-primary">ARTIST GALLERY</p>
                <h2 className="mt-4 text-3xl font-semibold">From the artist</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {artist.gallery.map((item) => (
                    <button
                      key={item.alt}
                      type="button"
                      className="group overflow-hidden rounded-[2rem] bg-black"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            <section>
              <p className="text-xs uppercase tracking-[0.35em] text-primary">MEET MORE OF OUR ARTISTS</p>
              <h2 className="mt-4 text-3xl font-semibold">Related roster artists</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((relatedArtist) => (
                  <Link
                    key={relatedArtist.slug}
                    to="/artists/$slug" params={{ slug: relatedArtist.slug }}
                    className="overflow-hidden rounded-[2rem] border border-border/60 bg-white text-black transition hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <img src={relatedArtist.profileImage} alt={relatedArtist.name} className="h-56 w-full object-cover" />
                    <div className="space-y-3 p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl font-semibold">{relatedArtist.name}</h3>
                        {relatedArtist.verified ? (
                          <Badge className="rounded-full bg-teal-500 px-3 py-1 text-black">Verified</Badge>
                        ) : null}
                      </div>
                      <p className="text-sm uppercase tracking-[0.2em] text-teal-400">
                        {relatedArtist.genre}
                      </p>
                      <p className="text-sm text-muted-foreground">{relatedArtist.country}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-border/60 bg-black p-10 text-white">
              <p className="text-xs uppercase tracking-[0.35em] text-teal-300">DISCOVER WHAT'S NEXT</p>
              <h2 className="mt-4 text-3xl font-semibold">Explore more artists and CBM opportunities.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Learn more about the roster, the campaigns behind each artist, and how CBM helps creative careers grow.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-teal-500 text-black hover:bg-teal-400">
                  <Link to="/artists">Explore Artists</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:border-teal-400 hover:text-teal-400">
                  <Link to="/contact">Work with CBM</Link>
                </Button>
              </div>
            </section>
          </div>

          <aside className="space-y-8 rounded-[2rem] border border-border/60 bg-card/80 p-6">
            <div className="rounded-[2rem] bg-white p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Profile overview</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Genre</p>
                  <p className="mt-2 text-base font-semibold">{artist.genre}</p>
                </div>
                <div className="rounded-3xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Country</p>
                  <p className="mt-2 text-base font-semibold">{artist.country}</p>
                </div>
                <div className="rounded-3xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Releases</p>
                  <p className="mt-2 text-base font-semibold">{artist.releases.length}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-border/60 bg-black p-6 text-white">
              <p className="text-xs uppercase tracking-[0.35em] text-teal-300">Artist note</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Artist profiles are editorial and designed to showcase identity, releases, projects and the support provided by CBM Records.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

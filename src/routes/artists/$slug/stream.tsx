import type { ComponentType, SVGProps } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BrandNavigation } from "@/components/landing/BrandOverview";
import { getArtistBySlug } from "@/data/artists";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const SpotifyIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const AppleMusicIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208A8.96 8.96 0 00.08 5.08c-.013.157-.018.316-.024.473V18.45c.006.157.01.315.024.472.04.517.077.997.207 1.465.498 1.803 1.62 3.055 3.407 3.6.535.16 1.09.228 1.65.28.27.026.543.042.815.05h12.028c.19-.006.38-.02.57-.04.52-.045 1.044-.1 1.547-.254 1.758-.506 2.88-1.618 3.418-3.37.166-.535.24-1.088.284-1.647.02-.252.026-.506.028-.758V6.123zm-6.16 9.023c-.06.296-.175.57-.41.77-.43.373-.93.453-1.449.206-.511-.242-.791-.72-.795-1.283-.004-.52.273-.903.728-1.16.294-.167.617-.245.947-.314.106-.023.214-.044.32-.068.27-.065.428-.233.435-.508.007-.28-.1-.52-.363-.64-.255-.115-.513-.11-.769.014-.198.097-.326.265-.393.48-.063.204-.208.3-.41.304-.194.004-.387.005-.58 0-.195-.005-.31-.12-.305-.315.016-.473.212-.856.567-1.146.437-.356.943-.5 1.494-.498.374.001.73.08 1.07.236.76.352 1.12 1.005 1.04 1.815-.025.254-.095.495-.215.72a.8.8 0 01-.24.273c-.084.055-.168.112-.254.167l-.113.074c-.26.172-.516.347-.725.575a.853.853 0 00-.226.473c-.007.06-.01.12-.012.18-.006.273.12.414.4.426.146.006.294.006.44 0 .146-.006.256-.04.33-.183.026-.05.054-.097.082-.145.095-.165.195-.328.31-.485.1-.134.212-.26.335-.374zm-4.31 1.34c-.42.12-.843.198-1.273.203-.55.007-1.082-.068-1.578-.306-.49-.235-.846-.603-.998-1.13-.155-.54-.095-1.07.133-1.576.296-.664.785-1.126 1.426-1.444.488-.243.993-.37 1.516-.38.516-.01 1.016.1 1.484.32.558.263.937.69 1.095 1.29.18.68.08 1.34-.303 1.945-.376.597-.91.957-1.502 1.078zm-.576-1.08c.32.004.626-.073.91-.22.415-.216.694-.548.793-1.01a1.416 1.416 0 00-.283-1.217c-.297-.36-.683-.535-1.148-.523-.41.011-.776.156-1.082.43-.427.38-.582.874-.465 1.423.118.55.464.916 1.002 1.08a1.77 1.77 0 00.273.037zM18.93 8.88c-.432.01-.864-.005-1.297 0-.148.002-.27-.03-.35-.16a.515.515 0 00-.142-.158c-.23-.17-.49-.227-.773-.224-.54.008-.945.33-.97.822-.02.41.252.73.722.847.3.076.607.125.91.192.297.066.592.14.873.256.66.27 1.022.788 1.033 1.506.012.753-.31 1.317-.952 1.688-.6.35-1.25.443-1.918.376-.677-.068-1.278-.322-1.69-.89-.218-.3-.32-.643-.307-1.013.01-.27.13-.39.404-.394.2-.004.4-.005.6-.003.218.003.34.12.356.34.02.24.11.442.29.594.273.228.596.3.94.275.42-.028.768-.186.94-.572.167-.374.044-.76-.3-.954-.296-.168-.627-.25-.943-.346-.38-.113-.764-.22-1.117-.405-.588-.31-.91-.79-.925-1.45-.014-.69.26-1.254.816-1.672.56-.42 1.197-.554 1.875-.53.51.017 1 .14 1.43.433.457.308.714.742.73 1.29.004.147-.065.24-.207.27a14.1 14.1 0 01-.37.044zm-10.67 4.625c-.33.004-.66.01-.99 0-.21-.007-.342-.13-.343-.337-.005-1.228-.003-2.456-.002-3.684 0-.14.074-.243.21-.28a5.263 5.263 0 011.55-.18c.483.015.943.11 1.357.366.504.31.762.78.78 1.363.016.53-.17.99-.555 1.363-.3.285-.66.457-1.05.56-.37.097-.747.128-1.126.13H8.26v.7zm-.003-1.57c.37-.01.73-.03 1.07-.165.42-.17.66-.48.67-.94.01-.49-.23-.81-.67-.97a2.38 2.38 0 00-.81-.12c-.086.002-.17.006-.254.014-.05.005-.09.04-.09.09v2.07c0 .017.004.03.013.038.01.008.024.012.04.012l.03-.03z" />
  </svg>
);

const TidalIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004 4.004-4.004 4.004 4.004 4.004-4.004zM8.008 16.004l4.004-4.004 4.004 4.004 4.004-4.004-4.004-4.004-4.004 4.004-4.004-4.004-4.004 4.004z" />
  </svg>
);

const YouTubeMusicIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
  </svg>
);

const DeezerIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.944 17.023h2.22v1.5h-2.22zm-3.89.171h2.22v1.328h-2.22zm-3.89-.171h2.22v1.5h-2.22zm-3.89.171H9.5v1.328H7.274zM3.388 17.023h2.22v1.5h-2.22zM18.944 14.19h2.22v1.5h-2.22zm-3.89-.17h2.22v1.327h-2.22zm-3.89.17h2.22v1.5h-2.22zm7.78-2.662h2.22v1.5h-2.22zm-3.89.17h2.22v1.328h-2.22zm-3.89-.17h2.22v1.5h-2.22zM18.944 8.86h2.22v1.5h-2.22zm-3.89-.17h2.22v1.328h-2.22zm-3.89.17h2.22v1.5h-2.22zM18.944 6.028h2.22v1.5h-2.22zm-3.89-.17h2.22v1.328h-2.22z" />
  </svg>
);

const BoomplayIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 16.5l-9-4.5 9-4.5v9z" />
  </svg>
);

const TikTokIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.65a8.28 8.28 0 004.85 1.56V6.76a4.85 4.85 0 01-1.08-.07z" />
  </svg>
);

const AmazonMusicIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705a.659.659 0 01-.75.074c-1.052-.873-1.24-1.279-1.818-2.112-1.737 1.77-2.966 2.299-5.221 2.299-2.667 0-4.741-1.645-4.741-4.941 0-2.573 1.394-4.328 3.382-5.183 1.724-.756 4.133-.891 5.975-1.099v-.41c0-.753.06-1.642-.384-2.294-.384-.579-1.128-.82-1.783-.82-1.212 0-2.293.622-2.557 1.913-.054.285-.261.567-.548.581l-3.064-.333c-.259-.056-.548-.266-.472-.66.705-3.716 4.06-4.835 7.066-4.835 1.537 0 3.547.41 4.758 1.575 1.537 1.437 1.39 3.352 1.39 5.438v4.923c0 1.481.613 2.13 1.192 2.929.204.285.249.626-.01.838-.647.539-1.794 1.538-2.425 2.098l-.009-.008zM21.895 19.483c-3.873 2.869-9.491 4.393-14.332 4.393-6.782 0-12.889-2.508-17.498-6.688-.363-.328-.039-.776.396-.521 4.981 2.898 11.14 4.641 17.499 4.641 4.291 0 9.012-.891 13.354-2.739.656-.279 1.205.431.581.914z" />
  </svg>
);

export const PLATFORM_ICONS: Record<string, ComponentType<IconProps>> = {
  Spotify: SpotifyIcon,
  "Apple Music": AppleMusicIcon,
  Tidal: TidalIcon,
  YouTube: YouTubeMusicIcon,
  "YouTube Music": YouTubeMusicIcon,
  Deezer: DeezerIcon,
  Boomplay: BoomplayIcon,
  TikTok: TikTokIcon,
  "Amazon Music": AmazonMusicIcon,
};

export const PLATFORM_COLORS: Record<string, string> = {
  Spotify: "#1DB954",
  "Apple Music": "#FC3C44",
  Tidal: "#00FFFF",
  YouTube: "#FF0000",
  "YouTube Music": "#FF0000",
  Deezer: "#EF5466",
  Boomplay: "#FF6000",
  TikTok: "#010101",
  "Amazon Music": "#00A8E1",
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
                  const brandColor = PLATFORM_COLORS[link.platform] ?? "#6EE7B7";
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-background/80 px-5 py-4 text-sm font-semibold text-foreground transition hover:border-teal-400 hover:bg-white/5"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5 shrink-0" style={{ color: brandColor }} />
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

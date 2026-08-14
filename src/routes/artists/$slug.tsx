import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { getArtistBySlug } from "@/data/artists";
import { Instagram, Youtube, Music2, Headphones, PlaySquare, Facebook, Link2, ArrowLeft } from "lucide-react";
import { PLATFORM_ICONS, PLATFORM_COLORS } from "./$slug/stream";

export const Route = createFileRoute("/artists/$slug")({
  validateSearch: () => ({}),
  head: ({ params }: { params: { slug: string } }) => {
    const artist = getArtistBySlug(params.slug);
    return {
      meta: [
        { title: artist ? `${artist.name} | Links` : "Artist Links" },
        {
          name: "description",
          content: artist ? `Links and releases from ${artist.name}` : "Artist profile links.",
        },
      ],
    };
  },
  component: ArtistLinks,
});

function ArtistLinks() {
  const params = Route.useParams();
  const artist = useMemo(() => getArtistBySlug(params.slug), [params.slug]);

  if (!artist) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-white">
        Artist not found.
      </div>
    );
  }

  // Find some icons for social/streaming
  const getPlatformIcon = (platform: string) => {
    const key = Object.keys(PLATFORM_ICONS).find(
      (k) => k.toLowerCase() === platform.toLowerCase()
    );
    if (key) {
      const Icon = PLATFORM_ICONS[key];
      return <Icon className="h-5 w-5 shrink-0" />;
    }

    const p = platform.toLowerCase();
    if (p.includes("instagram")) return <Instagram className="h-5 w-5 shrink-0" />;
    if (p.includes("facebook")) return <Facebook className="h-5 w-5 shrink-0" />;
    return <Link2 className="h-5 w-5 shrink-0" />;
  };

  const youtubeLink = useMemo(() => {
    return artist.streamingLinks?.find(l => l.platform.toLowerCase() === "youtube" || l.platform.toLowerCase() === "youtube music")?.url 
      || artist.socialLinks?.find(l => l.platform.toLowerCase() === "youtube")?.url;
  }, [artist]);

  return (
    <main className="min-h-screen bg-[#1c1c1c] text-white py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-md w-full space-y-8">
        
        {/* Back Button */}
        <div className="flex justify-start">
          <Link
            to="/artists"
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Roster
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/20">
            <img 
              src={artist.profileImage} 
              alt={artist.name} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{artist.name}</h1>
            <p className="text-sm text-zinc-400 mt-1">Welcome</p>
          </div>
        </div>

        {/* Links Section */}
        {youtubeLink && (
          <div className="space-y-4">
            <a 
              href={youtubeLink}
              target="_blank"
              rel="noreferrer"
              className="relative block aspect-video overflow-hidden rounded-xl bg-black transition hover:scale-[1.02] group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src={artist.heroImage} 
                alt="Video Thumbnail" 
                className="h-full w-full object-cover opacity-70"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
                <div className="text-center w-full absolute top-4 left-4 flex items-center gap-2">
                  <img src={artist.profileImage} className="w-8 h-8 rounded-full" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-white leading-tight">{artist.name} - Official Music Video</p>
                  </div>
                </div>
                <div className="h-12 w-16 bg-red-600 rounded-xl flex items-center justify-center text-white cursor-pointer group-hover:bg-red-700 transition">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
              <div className="absolute bottom-2 right-4 z-20">
                <span className="text-xs font-semibold">Watch on YouTube</span>
              </div>
            </a>
          </div>
        )}

        {/* Streaming Platforms */}
        <div className="space-y-3">
          {artist.streamingLinks?.map((link) => {
            const isSpotify = link.platform.toLowerCase().includes("spotify");
            
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-3 rounded-xl p-4 transition hover:scale-[1.02] ${
                  isSpotify ? "bg-[#1db954] text-white hover:bg-[#1ed760]" : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                {getPlatformIcon(link.platform)}
                <span className="font-semibold">{isSpotify ? "Follow me on Spotify" : link.platform}</span>
              </a>
            );
          })}
        </div>

        {/* Social Icons Bottom */}
        <div className="flex items-center justify-center gap-4 pt-6">
          {artist.socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white hover:text-black"
            >
              {getPlatformIcon(social.platform)}
              <span className="sr-only">{social.platform}</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-zinc-500 pt-8 pb-4">
          <p>By using this service you agree to our <a href="#" className="font-bold text-zinc-300">Privacy Policy</a> and <a href="#" className="font-bold text-zinc-300">Terms Of Use</a>.</p>
          <p className="mt-1"><a href="#" className="font-bold text-zinc-300">Manage</a> your permissions.</p>
          <p className="mt-1">Report a Problem</p>
        </div>
      </div>
    </main>
  );
}

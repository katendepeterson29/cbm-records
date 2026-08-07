import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getArtistBySlug } from "@/data/artists";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Youtube, Music2, Headphones, PlaySquare } from "lucide-react";

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
  const [email, setEmail] = useState("");

  if (!artist) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-white">
        Artist not found.
      </div>
    );
  }

  // Find some icons for social/streaming
  const getPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("spotify")) return <Headphones className="h-5 w-5" />;
    if (p.includes("apple")) return <Music2 className="h-5 w-5" />;
    if (p.includes("instagram")) return <Instagram className="h-5 w-5" />;
    if (p.includes("youtube")) return <Youtube className="h-5 w-5" />;
    return <PlaySquare className="h-5 w-5" />;
  };

  return (
    <main className="min-h-screen bg-[#1c1c1c] text-white py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-md w-full space-y-8">
        
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
        <div className="space-y-4">
          {artist.releases.map((release) => (
            <a 
              key={release.id}
              href="#"
              className="flex items-center gap-4 rounded-xl bg-white p-2 text-black transition hover:scale-[1.02] hover:bg-zinc-100"
            >
              <img 
                src={release.coverUrl} 
                alt={release.title}
                className="h-12 w-12 rounded-lg object-cover"
              />
              <span className="font-semibold text-sm">
                {artist.name} - {release.title} {release.type === "EP" ? "EP" : ""}
              </span>
            </a>
          ))}

          {/* Dummy Video Embeds (to match screenshot style) */}
          <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
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
              <div className="h-12 w-16 bg-red-600 rounded-xl flex items-center justify-center text-white cursor-pointer hover:bg-red-700 transition">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
            </div>
            <div className="absolute bottom-2 right-4 z-20">
              <span className="text-xs font-semibold">Watch on YouTube</span>
            </div>
          </div>
        </div>

        {/* Email Subscription */}
        <form 
          onSubmit={(e) => { e.preventDefault(); setEmail(""); alert("Subscribed!"); }} 
          className="flex flex-col sm:flex-row gap-2"
        >
          <Input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black placeholder:text-zinc-500 rounded-xl border-0 h-12 px-4 focus-visible:ring-2 focus-visible:ring-teal-500 flex-1"
            required
          />
          <Button 
            type="submit" 
            className="h-12 rounded-xl bg-[#2ea4d8] text-white hover:bg-[#2890bd] px-6 font-semibold shrink-0"
          >
            Subscribe
          </Button>
        </form>

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

import epikanoPhoto from "../../assets/artist/IMG_1004.JPG.jpeg";
import juiceJayPhoto from "../../assets/artist/logo1.jpeg";
import galleryPhoto from "../../assets/artist/IMG_1011.JPG.jpeg";

export type ArtistRelease = {
  id: string;
  title: string;
  coverUrl: string;
  releaseDate: string;
  type: "Single" | "EP" | "Album";
  description: string;
  format: string;
  year: string;
};

export type ArtistProject = {
  id: string;
  slug: string;
  title: string;
  services: string[];
  image: string;
  summary: string;
};

export type ArtistSocialLink = {
  platform: string;
  url: string;
};

export type ArtistGalleryItem = {
  src: string;
  alt: string;
};

export type ArtistProfile = {
  id: string;
  slug: string;
  name: string;
  profileImage: string;
  heroImage: string;
  genre: string;
  country: string;
  bio: string;
  shortBio: string;
  verified: boolean;
  socialLinks: ArtistSocialLink[];
  releases: ArtistRelease[];
  albums: ArtistRelease[];
  eps: ArtistRelease[];
  singles: ArtistRelease[];
  projects: ArtistProject[];
  services: string[];
  gallery: ArtistGalleryItem[];
  relatedArtists: string[];
};

export const ARTISTS: ArtistProfile[] = [
  {
    id: "artist-epikano",
    slug: "epikano",
    name: "Epikano.",
    profileImage: epikanoPhoto,
    heroImage: epikanoPhoto,
    genre: "Afro Soul",
    country: "Uganda",
    bio:
      "Epikano is a cinematic Afro Soul artist from Uganda, building premium music through textured production and evocative storytelling.",
    shortBio: "Cinematic Afro Soul artist from Uganda.",
    verified: true,
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/epikano" },
      { platform: "TikTok", url: "https://tiktok.com/@epikano" },
      { platform: "Spotify", url: "https://spotify.com/artist/epikano" },
    ],
    releases: [
      {
        id: "r-epikano-1",
        title: "Midnight in Lagos",
        coverUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
        releaseDate: "2025",
        type: "Single",
        description:
          "A single built around rich storytelling and warm vocal textures, supported with marketing from CBM Records.",
        format: "Digital Single",
        year: "2025",
      },
      {
        id: "r-epikano-2",
        title: "Sunset Rituals",
        coverUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        releaseDate: "2024",
        type: "EP",
        description:
          "A short-form project that blends soulful vocals with cinematic arrangements for regional audiences.",
        format: "EP",
        year: "2024",
      },
    ],
    albums: [],
    eps: [
      {
        id: "r-epikano-2",
        title: "Sunset Rituals",
        coverUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        releaseDate: "2024",
        type: "EP",
        description:
          "A short-form project that blends soulful vocals with cinematic arrangements for regional audiences.",
        format: "EP",
        year: "2024",
      },
    ],
    singles: [
      {
        id: "r-epikano-1",
        title: "Midnight in Lagos",
        coverUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
        releaseDate: "2025",
        type: "Single",
        description:
          "A single built around rich storytelling and warm vocal textures, supported with marketing from CBM Records.",
        format: "Digital Single",
        year: "2025",
      },
    ],
    projects: [],
    services: ["Music Distribution", "Marketing Campaign"],
    gallery: [
      { src: epikanoPhoto, alt: "Epikano portrait" },
      {
        src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80",
        alt: "Artist performance imagery",
      },
      {
        src: galleryPhoto,
        alt: "Creative campaign photography",
      },
    ],
    relatedArtists: ["juice-jay", "nana-adjoa"],
  },
  {
    id: "artist-juice-jay",
    slug: "juice-jay",
    name: "Juice Jay",
    profileImage: juiceJayPhoto,
    heroImage: juiceJayPhoto,
    genre: "R&B",
    country: "Uganda",
    bio:
      "Juice Jay is an R&B artist with a refined, intimate sound that connects modern production with emotional storytelling.",
    shortBio: "R&B artist from Uganda with a refined sonic signature.",
    verified: false,
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/juicejay" },
      { platform: "TikTok", url: "https://tiktok.com/@juicejay" },
      { platform: "Spotify", url: "https://spotify.com/artist/juicejay" },
    ],
    releases: [
      {
        id: "r-juice-jay-1",
        title: "Golden Hour",
        coverUrl:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
        releaseDate: "2025",
        type: "Single",
        description:
          "A polished R&B single built for artist discovery, with supporting distribution and editorial placement work.",
        format: "Digital Single",
        year: "2025",
      },
      {
        id: "r-juice-jay-2",
        title: "Night Thread",
        coverUrl:
          "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=900&q=80",
        releaseDate: "2024",
        type: "Single",
        description:
          "A lush, late-night R&B track that introduces Juice Jay's signature blend of warmth and mood.",
        format: "Digital Single",
        year: "2024",
      },
    ],
    albums: [],
    eps: [],
    singles: [
      {
        id: "r-juice-jay-1",
        title: "Golden Hour",
        coverUrl:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
        releaseDate: "2025",
        type: "Single",
        description:
          "A polished R&B single built for artist discovery, with supporting distribution and editorial placement work.",
        format: "Digital Single",
        year: "2025",
      },
      {
        id: "r-juice-jay-2",
        title: "Night Thread",
        coverUrl:
          "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=900&q=80",
        releaseDate: "2024",
        type: "Single",
        description:
          "A lush, late-night R&B track that introduces Juice Jay's signature blend of warmth and mood.",
        format: "Digital Single",
        year: "2024",
      },
    ],
    projects: [],
    services: ["Artist Management", "Brand Strategy"],
    gallery: [
      { src: juiceJayPhoto, alt: "Juice Jay portrait" },
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
        alt: "Studio portrait" },
      {
        src: galleryPhoto,
        alt: "Behind the scenes creative imagery",
      },
    ],
    relatedArtists: ["epikano", "nana-adjoa"],
  },
  
  
];

export const ARTIST_GENRES = ["All", ...new Set(ARTISTS.map((artist) => artist.genre))];
export const ARTIST_COUNTRIES = ["All", ...new Set(ARTISTS.map((artist) => artist.country))];

export function getArtistBySlug(slug: string) {
  return ARTISTS.find((artist) => artist.slug === slug);
}

export function getRelatedArtists(slug: string) {
  const artist = getArtistBySlug(slug);
  if (!artist) return [];
  return ARTISTS.filter((candidate) => artist.relatedArtists.includes(candidate.slug));
}

export function getAllArtistReleases() {
  return ARTISTS.flatMap((artist) =>
    artist.releases.map((release) => ({ ...release, artist: artist.name, artistSlug: artist.slug })),
  );
}

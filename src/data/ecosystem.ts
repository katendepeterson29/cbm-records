// Mocked ecosystem data for the homepage showcase.
import { artistImages } from "@/data/artist-images";
export type EcosystemCategory = "Artist" | "Distributor" | "Manager" | "Record Label";

export interface EcosystemProfile {
  id: string;
  category: EcosystemCategory;
  name: string;
  imageUrl: string;
  country: string;
  genre?: string;
  specialty?: string;
  region?: string;
  headquarters?: string;
  verified: boolean;
  bio: string;
  createdAt: string; // for "newest" sort
  popularity: number; // for popularity sort
  stats: { label: string; value: string }[];
  meta: string[]; // extra details revealed on hover (platforms, artists managed, etc.)
}

const avatar = (i: number) => artistImages[Math.abs(i) % artistImages.length];
const logo = (seed: string) => `https://picsum.photos/seed/${seed}/400/400`;

// ---------- Artists (20) ----------
const artistSeed: Array<Omit<EcosystemProfile, "id" | "category" | "verified" | "createdAt" | "popularity" | "stats" | "meta"> & { listeners: string; releases: number; verified: boolean; popularity: number; createdAt: string }> = [
  { name: " Epikano.", country: "Uganda", genre: "Afro Soul", imageUrl: avatar(47), bio: "Epikano, born Peter Claver Magala Nsereko, is a Ugandan singer, songwriter, and music producer who began his professional music journey in 2022. A versatile artist delivering fresh Afrobeat, dancehall, smooth vocals, and timeless melodies to a global.", listeners: "142K", releases: 6, verified: true, popularity: 92, createdAt: "2025-11-02" },
  { name: " Juice.", country: "Uganda", genre: "Afro Soul", imageUrl: avatar(49), bio: "Juice Jay is a Ugandan RnB and Band musician from East Africa", listeners: "142K", releases: 6, verified: true, popularity: 92, createdAt: "2025-11-02" },

];

const artists: EcosystemProfile[] = artistSeed.map((a, i) => ({
  id: `art_${i + 1}`,
  category: "Artist",
  name: a.name,
  imageUrl: a.imageUrl,
  country: a.country,
  genre: a.genre,
  verified: a.verified,
  bio: a.bio,
  createdAt: a.createdAt,
  popularity: a.popularity,
  stats: [
    { label: "Monthly listeners", value: a.listeners },
    { label: "Releases", value: String(a.releases) },
  ],
  meta: [a.genre!, `Active releases · ${a.releases}`],
}));

// ---------- Distributors (10) ----------
const distributorSeed = [
  { name: "EastWave Distribution", region: "East Africa", country: "Kenya", releases: "8,400", labels: 120, verified: true, popularity: 88, createdAt: "2025-05-11", platforms: ["Spotify", "Apple Music", "Boomplay", "Audiomack"], bio: "Helping African artists distribute music globally while managing metadata and release delivery." },
  
];

const distributors: EcosystemProfile[] = distributorSeed.map((d, i) => ({
  id: `dst_${i + 1}`,
  category: "Distributor",
  name: d.name,
  imageUrl: logo(`distro-${i}-${d.name}`),
  country: d.country,
  region: d.region,
  verified: d.verified,
  bio: d.bio,
  createdAt: d.createdAt,
  popularity: d.popularity,
  stats: [
    { label: "Releases", value: d.releases },
    { label: "Labels", value: String(d.labels) },
  ],
  meta: [`Region · ${d.region}`, `Platforms · ${d.platforms.join(", ")}`],
}));

// ---------- Managers (15) ----------
const managerSeed = [
  { name: "James Okello", country: "Uganda", specialty: "Artist Development", roster: 12, years: 9, verified: true, popularity: 88, createdAt: "2025-06-12", bio: "Specialises in artist development, release planning, branding, and touring across East Africa." },
];

const managers: EcosystemProfile[] = managerSeed.map((m, i) => ({
  id: `mgr_${i + 1}`,
  category: "Manager",
  name: m.name,
  imageUrl: avatar(70 + i),
  country: m.country,
  specialty: m.specialty,
  verified: m.verified,
  bio: m.bio,
  createdAt: m.createdAt,
  popularity: m.popularity,
  stats: [
    { label: "Artists", value: String(m.roster) },
    { label: "Success rate", value: `${80 + (i % 15)}%` },
  ],
  meta: [`Specialty · ${m.specialty}`, `Experience · ${m.years} yrs`],
}));

// ---------- Record Labels (12) ----------
const labelSeed = [
  { name: "CBM Records", headquarters: "Lagos, Nigeria", genre: "Afrobeats · Afro-Fusion", artists: 46, releases: 320, verified: true, popularity: 96, createdAt: "2025-01-15", bio: "Independent Record Label supporting emerging and established artists with distribution, publishing, marketing, and career management." },
];

const labels: EcosystemProfile[] = labelSeed.map((l, i) => ({
  id: `lbl_${i + 1}`,
  category: "Record Label",
  name: l.name,
  imageUrl: logo(`label-${i}-${l.name}`),
  country: l.headquarters.split(",").pop()!.trim(),
  headquarters: l.headquarters,
  genre: l.genre,
  verified: l.verified,
  bio: l.bio,
  createdAt: l.createdAt,
  popularity: l.popularity,
  stats: [
    { label: "Artists", value: String(l.artists) },
    { label: "Releases", value: String(l.releases) },
  ],
  meta: [`HQ · ${l.headquarters}`, `Genres · ${l.genre}`],
}));

export const ecosystem: EcosystemProfile[] = [
  ...artists,
  ...distributors,
  ...managers,
  ...labels,
];

export const ecosystemCategories: Array<"All" | EcosystemCategory> = [
  "All",
  "Artists" as unknown as EcosystemCategory,
  "Distributors" as unknown as EcosystemCategory,
  "Managers" as unknown as EcosystemCategory,
  "Record Labels" as unknown as EcosystemCategory,
];

export const categoryToSingular: Record<string, EcosystemCategory | "All"> = {
  All: "All",
  Artists: "Artist",
  Distributors: "Distributor",
  Managers: "Manager",
  "Record Labels": "Record Label",
};

export const ecosystemCountries = Array.from(new Set(ecosystem.map((p) => p.country))).sort();
export const ecosystemGenres = Array.from(
  new Set(ecosystem.map((p) => p.genre).filter((g): g is string => Boolean(g))),
).sort();

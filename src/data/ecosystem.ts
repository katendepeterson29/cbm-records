// Mocked ecosystem data for the homepage showcase.
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

const avatar = (i: number) => `https://i.pravatar.cc/400?img=${i}`;
const logo = (seed: string) => `https://picsum.photos/seed/${seed}/400/400`;

// ---------- Artists (20) ----------
const artistSeed: Array<Omit<EcosystemProfile, "id" | "category" | "verified" | "createdAt" | "popularity" | "stats" | "meta"> & { listeners: string; releases: number; verified: boolean; popularity: number; createdAt: string }> = [
  { name: "Amina K.", country: "Uganda", genre: "Afro Soul", imageUrl: avatar(47), bio: "Independent singer-songwriter building a growing audience across East Africa with soulful contemporary music.", listeners: "142K", releases: 6, verified: true, popularity: 92, createdAt: "2025-11-02" },
  { name: "Kola Sunshine", country: "Nigeria", genre: "Afrobeats", imageUrl: avatar(12), bio: "Lagos-born hitmaker blending Afrobeats with global pop sensibilities. CBM roster since 2023.", listeners: "482K", releases: 12, verified: true, popularity: 98, createdAt: "2026-05-12" },
  { name: "Thabo Mokoena", country: "South Africa", genre: "Amapiano", imageUrl: avatar(33), bio: "Producer-artist from Johannesburg shaping the next wave of Amapiano log-drum grooves.", listeners: "318K", releases: 9, verified: true, popularity: 90, createdAt: "2025-08-18" },
  { name: "Ayaan Osei", country: "Ghana", genre: "Highlife", imageUrl: avatar(59), bio: "Accra highlife revivalist stitching classic guitar lines to modern R&B production.", listeners: "76K", releases: 4, verified: false, popularity: 71, createdAt: "2026-01-22" },
  { name: "Zainab Bello", country: "Nigeria", genre: "Afro-Fusion", imageUrl: avatar(24), bio: "Genre-fluid vocalist mixing Afro-Fusion, alté and jazz influences on every release.", listeners: "212K", releases: 7, verified: true, popularity: 84, createdAt: "2025-09-04" },
  { name: "DJ Nyota", country: "Kenya", genre: "Afro House", imageUrl: avatar(15), bio: "Nairobi selector and producer pushing Kenyan Afro House to European festival stages.", listeners: "168K", releases: 11, verified: true, popularity: 82, createdAt: "2025-07-11" },
  { name: "Nia Ade", country: "Nigeria", genre: "R&B", imageUrl: avatar(45), bio: "Silky R&B songwriter with a growing catalogue of sync placements across streaming.", listeners: "94K", releases: 5, verified: false, popularity: 68, createdAt: "2026-03-19" },
  { name: "Bongani Zulu", country: "South Africa", genre: "Gqom", imageUrl: avatar(52), bio: "Durban gqom pioneer breaking hard-hitting club records into international rotation.", listeners: "256K", releases: 14, verified: true, popularity: 87, createdAt: "2025-06-01" },
  { name: "Chidera Obi", country: "Nigeria", genre: "Alté", imageUrl: avatar(65), bio: "Alté singer known for cinematic music videos and a distinct visual identity.", listeners: "138K", releases: 6, verified: false, popularity: 74, createdAt: "2026-02-14" },
  { name: "Selam T.", country: "Ethiopia", genre: "Ethio-Jazz", imageUrl: avatar(41), bio: "Addis-based bandleader carrying Mulatu Astatke's Ethio-jazz lineage into new grooves.", listeners: "58K", releases: 3, verified: false, popularity: 63, createdAt: "2026-04-06" },
  { name: "Kwame Boateng", country: "Ghana", genre: "Afrobeats", imageUrl: avatar(11), bio: "Kumasi-raised MC delivering high-energy Afrobeats with Twi and English wordplay.", listeners: "184K", releases: 8, verified: true, popularity: 79, createdAt: "2025-10-27" },
  { name: "Fatoumata Diarra", country: "Mali", genre: "Desert Blues", imageUrl: avatar(9), bio: "Bamako-born vocalist reimagining desert blues traditions with electronic textures.", listeners: "44K", releases: 4, verified: false, popularity: 61, createdAt: "2026-05-30" },
  { name: "Junior Kabaka", country: "DR Congo", genre: "Congolese Rumba", imageUrl: avatar(62), bio: "Kinshasa guitarist keeping rumba alive through slick, groove-first productions.", listeners: "72K", releases: 6, verified: false, popularity: 66, createdAt: "2025-12-08" },
  { name: "Aisha Rahim", country: "Tanzania", genre: "Bongo Flava", imageUrl: avatar(48), bio: "Dar es Salaam songstress topping Bongo Flava charts with radio-ready love songs.", listeners: "228K", releases: 9, verified: true, popularity: 85, createdAt: "2025-07-24" },
  { name: "Lerato Mabaso", country: "South Africa", genre: "Afro-Pop", imageUrl: avatar(20), bio: "Cape Town Afro-pop vocalist frequently featured on SA editorial playlists.", listeners: "156K", releases: 7, verified: true, popularity: 76, createdAt: "2025-09-18" },
  { name: "Yaw Mensah", country: "Ghana", genre: "Hiplife", imageUrl: avatar(3), bio: "Tema hiplife rapper bridging hip-hop cadences with highlife melodies.", listeners: "102K", releases: 5, verified: false, popularity: 69, createdAt: "2026-02-01" },
  { name: "Miriam Njoku", country: "Nigeria", genre: "Gospel", imageUrl: avatar(36), bio: "Abuja gospel worship leader with a growing pan-African congregation online.", listeners: "88K", releases: 4, verified: true, popularity: 72, createdAt: "2025-11-25" },
  { name: "Rashid Juma", country: "Kenya", genre: "Genge", imageUrl: avatar(14), bio: "Nairobi genge rapper streetwise storytelling meets slick trap production.", listeners: "134K", releases: 6, verified: false, popularity: 70, createdAt: "2026-01-05" },
  { name: "Sade Coker", country: "Nigeria", genre: "Neo-Soul", imageUrl: avatar(44), bio: "Lagos neo-soul artist crafting warm, live-instrument-forward records.", listeners: "62K", releases: 3, verified: false, popularity: 64, createdAt: "2026-04-22" },
  { name: "Emeka Okafor", country: "Nigeria", genre: "Afro Drill", imageUrl: avatar(7), bio: "Onitsha rapper leading the Afro drill wave with UK-influenced production.", listeners: "196K", releases: 8, verified: true, popularity: 81, createdAt: "2025-08-30" },
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
  { name: "Naija Sound Networks", region: "West Africa", country: "Nigeria", releases: "14,200", labels: 210, verified: true, popularity: 94, createdAt: "2025-03-22", platforms: ["Spotify", "Apple Music", "Boomplay", "Audiomack", "YouTube Music"], bio: "Lagos-based aggregator serving West African independents with 24/7 support." },
  { name: "Cape Signal Distro", region: "Southern Africa", country: "South Africa", releases: "6,150", labels: 84, verified: true, popularity: 82, createdAt: "2025-06-04", platforms: ["Spotify", "Apple Music", "Deezer", "Tidal"], bio: "Cape Town distributor specialising in Amapiano, Afro House, and gqom." },
  { name: "Sahel Music Group", region: "North Africa", country: "Morocco", releases: "3,900", labels: 46, verified: false, popularity: 68, createdAt: "2025-10-14", platforms: ["Spotify", "Anghami", "Apple Music"], bio: "Casablanca aggregator connecting North African catalogues to MENA and Europe." },
  { name: "Kampala Wave", region: "East Africa", country: "Uganda", releases: "2,100", labels: 38, verified: false, popularity: 61, createdAt: "2026-01-09", platforms: ["Spotify", "Boomplay", "YouTube Music"], bio: "Boutique East African distributor focused on emerging singer-songwriters." },
  { name: "Accra Sound Lab", region: "West Africa", country: "Ghana", releases: "5,800", labels: 72, verified: true, popularity: 79, createdAt: "2025-08-17", platforms: ["Spotify", "Apple Music", "Audiomack"], bio: "Accra distributor with strong highlife, hiplife and gospel catalogues." },
  { name: "Kigali Beats Distro", region: "East Africa", country: "Rwanda", releases: "1,650", labels: 24, verified: false, popularity: 55, createdAt: "2026-02-27", platforms: ["Spotify", "Boomplay"], bio: "Independent Rwandan distributor onboarding the next Kigali generation." },
  { name: "Jozi Global Music", region: "Southern Africa", country: "South Africa", releases: "9,300", labels: 140, verified: true, popularity: 86, createdAt: "2025-04-30", platforms: ["Spotify", "Apple Music", "Tidal", "Deezer", "Boomplay"], bio: "Johannesburg-based distributor with a robust rights and analytics stack." },
  { name: "Dakar Distribution Co.", region: "West Africa", country: "Senegal", releases: "2,750", labels: 41, verified: false, popularity: 64, createdAt: "2026-03-15", platforms: ["Spotify", "Apple Music", "Deezer"], bio: "Francophone-first distributor connecting Senegalese acts to European markets." },
  { name: "Horn Media Distro", region: "East Africa", country: "Ethiopia", releases: "1,120", labels: 18, verified: false, popularity: 52, createdAt: "2026-04-11", platforms: ["Spotify", "Apple Music", "YouTube Music"], bio: "Addis Ababa distributor investing in Ethio-jazz and diaspora artists." },
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
  { name: "Ada Nwosu", country: "Nigeria", specialty: "Release Strategy", roster: 8, years: 11, verified: true, popularity: 92, createdAt: "2025-04-08", bio: "Lagos-based release strategist with a proven playbook for Afrobeats rollouts." },
  { name: "Lindiwe Dube", country: "South Africa", specialty: "Tour Management", roster: 6, years: 7, verified: true, popularity: 79, createdAt: "2025-09-20", bio: "Books and routes tours across SADC and European festival circuits." },
  { name: "Kojo Asante", country: "Ghana", specialty: "Branding & Partnerships", roster: 9, years: 8, verified: false, popularity: 74, createdAt: "2025-11-14", bio: "Accra manager building brand deals and sync placements for hiplife acts." },
  { name: "Fatima Diallo", country: "Senegal", specialty: "Francophone Markets", roster: 7, years: 6, verified: false, popularity: 68, createdAt: "2026-01-19", bio: "Champions Francophone acts across France, Belgium and Canada." },
  { name: "Peter Wanjiru", country: "Kenya", specialty: "Digital Strategy", roster: 14, years: 10, verified: true, popularity: 85, createdAt: "2025-05-27", bio: "Nairobi digital-first manager who builds fandoms on TikTok and YouTube Shorts." },
  { name: "Nomvula Sithole", country: "South Africa", specialty: "Amapiano Rollouts", roster: 5, years: 4, verified: false, popularity: 65, createdAt: "2026-02-08", bio: "Amapiano specialist running club-to-streaming campaigns end-to-end." },
  { name: "Kunle Bakare", country: "Nigeria", specialty: "A&R", roster: 10, years: 12, verified: true, popularity: 90, createdAt: "2025-03-30", bio: "Veteran A&R signing and shaping the next wave of Nigerian pop stars." },
  { name: "Grace Mwangi", country: "Kenya", specialty: "Publishing", roster: 11, years: 9, verified: true, popularity: 81, createdAt: "2025-07-16", bio: "Publishing-focused manager unlocking sync and neighbouring rights income." },
  { name: "Idris Sanni", country: "Nigeria", specialty: "Hip-Hop", roster: 6, years: 5, verified: false, popularity: 63, createdAt: "2026-03-24", bio: "Manages Nigerian rap acts with a track record of viral collaborations." },
  { name: "Chantal Uwase", country: "Rwanda", specialty: "Live Events", roster: 4, years: 3, verified: false, popularity: 57, createdAt: "2026-05-06", bio: "Kigali live events manager building homegrown festival lineups." },
  { name: "Sam Owusu", country: "Ghana", specialty: "Gospel & Worship", roster: 8, years: 7, verified: true, popularity: 71, createdAt: "2025-10-02", bio: "Coordinates worship-led artists across church, conference and streaming ecosystems." },
  { name: "Zanele Khumalo", country: "South Africa", specialty: "Women in Music", roster: 9, years: 8, verified: true, popularity: 77, createdAt: "2025-08-11", bio: "Advocacy-driven manager platforming women producers and vocalists." },
  { name: "Omar Farouk", country: "Egypt", specialty: "MENA Crossover", roster: 6, years: 6, verified: false, popularity: 66, createdAt: "2026-04-03", bio: "Cairo manager bridging Afrobeats and Arab pop for MENA airplay." },
  { name: "Rita Adeoye", country: "Nigeria", specialty: "Alté & Indie", roster: 7, years: 5, verified: false, popularity: 69, createdAt: "2026-01-28", bio: "Alté-focused manager known for taste-making curation and press strategy." },
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
  { name: "Mzansi Beats Music", headquarters: "Johannesburg, South Africa", genre: "Amapiano · House", artists: 32, releases: 240, verified: true, popularity: 90, createdAt: "2025-02-19", bio: "Amapiano-first label exporting Mzansi dance culture to global stages." },
  { name: "Highlife House", headquarters: "Accra, Ghana", genre: "Highlife · Hiplife", artists: 24, releases: 180, verified: true, popularity: 82, createdAt: "2025-03-08", bio: "Guardians of the highlife tradition partnering with next-gen Ghanaian talent." },
  { name: "Nile Sound Records", headquarters: "Cairo, Egypt", genre: "Afropop · MENA", artists: 18, releases: 120, verified: false, popularity: 71, createdAt: "2025-04-25", bio: "Cairo label bridging African rhythms with MENA-friendly songwriting." },
  { name: "Savanna Music Group", headquarters: "Nairobi, Kenya", genre: "Afropop · Bongo", artists: 28, releases: 210, verified: true, popularity: 84, createdAt: "2025-05-30", bio: "East African label with a full-service A&R, marketing and touring team." },
  { name: "Kalahari Sounds", headquarters: "Windhoek, Namibia", genre: "Afro House", artists: 12, releases: 60, verified: false, popularity: 58, createdAt: "2025-11-11", bio: "Boutique Southern African label incubating Afro House producers." },
  { name: "Griot Records", headquarters: "Bamako, Mali", genre: "Desert Blues · World", artists: 15, releases: 95, verified: false, popularity: 66, createdAt: "2025-08-20", bio: "Preserving West African griot traditions with modern production values." },
  { name: "Alté Society", headquarters: "Lagos, Nigeria", genre: "Alté · R&B", artists: 20, releases: 140, verified: true, popularity: 78, createdAt: "2025-07-04", bio: "Community-owned label spotlighting Nigeria's alté and left-of-centre R&B." },
  { name: "Serengeti Records", headquarters: "Dar es Salaam, Tanzania", genre: "Bongo Flava", artists: 22, releases: 170, verified: true, popularity: 80, createdAt: "2025-09-13", bio: "Bongo Flava powerhouse with radio and TV rotations across East Africa." },
  { name: "Baobab Music", headquarters: "Dakar, Senegal", genre: "Afrobeats · Mbalax", artists: 16, releases: 100, verified: false, popularity: 64, createdAt: "2025-12-22", bio: "Francophone label investing in Mbalax and Afrobeats hybrid records." },
  { name: "Kilimanjaro Sounds", headquarters: "Kampala, Uganda", genre: "Afro Soul · Gospel", artists: 14, releases: 80, verified: false, popularity: 60, createdAt: "2026-02-18", bio: "Kampala-based label building an Afro Soul roster with gospel roots." },
  { name: "Motherland Music Co.", headquarters: "London, UK", genre: "Afro-Diaspora", artists: 26, releases: 190, verified: true, popularity: 87, createdAt: "2025-06-27", bio: "Diaspora label connecting UK-based African artists to home markets." },
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

// Mocked demo data for the CBM Records artist portal.
// UI-only phase: no real APIs. All workflows read from these datasets.
import { artistImages } from "@/data/artist-images";

export type Genre = "Afrobeats" | "Amapiano" | "Highlife" | "Afro-Fusion" | "Hip-Hop" | "R&B";

export interface Artist {
  id: string;
  stageName: string;
  legalName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  genres: Genre[];
  bio: string;
  avatarUrl: string;
  verified: boolean;
  monthlyListeners: number;
  followers: number;
  joinedAt: string;
  kycStatus: "pending" | "verified" | "rejected";
}

export interface Release {
  id: string;
  title: string;
  type: "Single" | "EP" | "Album";
  status: "draft" | "in-review" | "approved" | "live" | "rejected";
  coverUrl: string;
  releaseDate: string;
  tracks: number;
  streams: number;
  primaryGenre: Genre;
  stores: string[];
  isrc: string;
  upc: string;
}

export interface RoyaltyPoint {
  month: string;
  streaming: number;
  downloads: number;
  publishing: number;
}

export interface Payout {
  id: string;
  amount: number;
  currency: "USD" | "NGN" | "EUR";
  method: "Bank" | "PayPal" | "Flutterwave";
  status: "pending" | "processing" | "paid" | "failed";
  requestedAt: string;
  paidAt?: string;
}

export interface Campaign {
  id: string;
  title: string;
  channel: "Instagram" | "TikTok" | "YouTube" | "Spotify" | "Radio";
  status: "planned" | "live" | "completed";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  startsAt: string;
  endsAt: string;
}

export interface Message {
  id: string;
  from: string;
  role: "Artist Manager" | "Marketing" | "Support" | "Finance";
  avatarUrl: string;
  subject: string;
  preview: string;
  unread: boolean;
  sentAt: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: "Distribution" | "Payments" | "Copyright" | "Account" | "Other";
  status: "open" | "in-progress" | "resolved";
  priority: "low" | "normal" | "high";
  updatedAt: string;
}

export interface Asset {
  id: string;
  name: string;
  kind: "Cover" | "Press Photo" | "Logo" | "EPK";
  url: string;
  size: string;
  uploadedAt: string;
}

export interface CopyrightWork {
  id: string;
  title: string;
  type: "Composition" | "Master" | "Lyrics";
  registered: string;
  splits: { name: string; role: string; pct: number }[];
  status: "registered" | "pending" | "disputed";
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  kind: "release" | "royalty" | "message" | "system";
  read: boolean;
  createdAt: string;
}

export const currentArtist: Artist = {
  id: "art_001",
  stageName: "Kola Sunshine",
  legalName: "Kolawole Adeyemi",
  email: "kola@cbmrecords.africa",
  phone: "+234 802 000 4411",
  country: "Nigeria",
  city: "Lagos",
  genres: ["Afrobeats", "Afro-Fusion"],
  bio: "Lagos-born singer-songwriter blending Afrobeats with global pop sensibilities. Signed to CBM Records in 2023.",
  avatarUrl: artistImages[0],
  verified: true,
  monthlyListeners: 482_310,
  followers: 128_940,
  joinedAt: "2023-05-14",
  kycStatus: "verified",
};

const cover = (seed: string) => `https://picsum.photos/seed/${seed}/600/600`;

export const releases: Release[] = [
  {
    id: "rel_001",
    title: "Midnight in Lagos",
    type: "Single",
    status: "live",
    coverUrl: cover("midnight-lagos"),
    releaseDate: "2026-05-12",
    tracks: 1,
    streams: 2_310_450,
    primaryGenre: "Afrobeats",
    stores: ["Spotify", "Apple Music", "Audiomack", "Boomplay", "YouTube Music"],
    isrc: "NGCBM2600001",
    upc: "196589112345",
  },
  {
    id: "rel_002",
    title: "Sunshine Season EP",
    type: "EP",
    status: "live",
    coverUrl: cover("sunshine-ep"),
    releaseDate: "2025-11-03",
    tracks: 5,
    streams: 5_142_900,
    primaryGenre: "Afro-Fusion",
    stores: ["Spotify", "Apple Music", "Tidal", "Deezer", "Boomplay"],
    isrc: "NGCBM2500042",
    upc: "196589112888",
  },
  {
    id: "rel_003",
    title: "Ghosts in Alagbado",
    type: "Single",
    status: "in-review",
    coverUrl: cover("ghosts-alagbado"),
    releaseDate: "2026-08-20",
    tracks: 1,
    streams: 0,
    primaryGenre: "Afrobeats",
    stores: ["Spotify", "Apple Music"],
    isrc: "NGCBM2600018",
    upc: "196589113001",
  },
  {
    id: "rel_004",
    title: "Amapiano Nights",
    type: "Single",
    status: "draft",
    coverUrl: cover("amapiano-nights"),
    releaseDate: "2026-09-15",
    tracks: 1,
    streams: 0,
    primaryGenre: "Amapiano",
    stores: [],
    isrc: "—",
    upc: "—",
  },
];

export const royaltyHistory: RoyaltyPoint[] = [
  { month: "Feb", streaming: 4820, downloads: 340, publishing: 210 },
  { month: "Mar", streaming: 5610, downloads: 380, publishing: 240 },
  { month: "Apr", streaming: 7120, downloads: 410, publishing: 260 },
  { month: "May", streaming: 9840, downloads: 520, publishing: 310 },
  { month: "Jun", streaming: 11_240, downloads: 480, publishing: 340 },
  { month: "Jul", streaming: 13_910, downloads: 610, publishing: 380 },
];

export const payouts: Payout[] = [
  { id: "po_001", amount: 4820.55, currency: "USD", method: "Bank", status: "paid", requestedAt: "2026-06-01", paidAt: "2026-06-04" },
  { id: "po_002", amount: 6120.0, currency: "USD", method: "Flutterwave", status: "processing", requestedAt: "2026-07-15" },
  { id: "po_003", amount: 1240.75, currency: "USD", method: "PayPal", status: "pending", requestedAt: "2026-07-20" },
];

export const campaigns: Campaign[] = [
  { id: "cmp_001", title: "Midnight in Lagos — TikTok launch", channel: "TikTok", status: "live", budget: 5000, spent: 3120, impressions: 812_400, clicks: 24_120, startsAt: "2026-05-10", endsAt: "2026-08-10" },
  { id: "cmp_002", title: "Spotify editorial push", channel: "Spotify", status: "live", budget: 3000, spent: 1800, impressions: 210_500, clicks: 9_400, startsAt: "2026-06-01", endsAt: "2026-09-01" },
  { id: "cmp_003", title: "Sunshine Season IG reels", channel: "Instagram", status: "completed", budget: 2500, spent: 2500, impressions: 640_000, clicks: 18_900, startsAt: "2025-11-01", endsAt: "2026-01-31" },
];

export const messages: Message[] = [
  { id: "msg_001", from: "Ada Nwosu", role: "Artist Manager", avatarUrl: "https://i.pravatar.cc/100?img=47", subject: "Q3 roadmap review", preview: "Hey Kola — sending over the Q3 rollout deck. Can we sync Thursday to lock the...", unread: true, sentAt: "2026-07-25T09:12:00Z" },
  { id: "msg_002", from: "Tobi Marketing", role: "Marketing", avatarUrl: "https://i.pravatar.cc/100?img=12", subject: "TikTok creator brief approved", preview: "The creator brief for Midnight in Lagos is locked. Kicking off Monday with 12...", unread: true, sentAt: "2026-07-24T17:40:00Z" },
  { id: "msg_003", from: "CBM Support", role: "Support", avatarUrl: "https://i.pravatar.cc/100?img=68", subject: "Payout PO-002 update", preview: "Your payout is processing with our banking partner. Expect settlement within 3...", unread: false, sentAt: "2026-07-22T11:05:00Z" },
];

export const supportTickets: SupportTicket[] = [
  { id: "tkt_001", subject: "ISRC missing on Boomplay listing", category: "Distribution", status: "in-progress", priority: "high", updatedAt: "2026-07-24" },
  { id: "tkt_002", subject: "Update bank account for payouts", category: "Payments", status: "open", priority: "normal", updatedAt: "2026-07-21" },
  { id: "tkt_003", subject: "Cover art re-upload for Ghosts", category: "Distribution", status: "resolved", priority: "low", updatedAt: "2026-07-15" },
];

export const assets: Asset[] = [
  { id: "ast_001", name: "Midnight in Lagos — cover 3000x3000.png", kind: "Cover", url: cover("midnight-lagos"), size: "4.2 MB", uploadedAt: "2026-04-30" },
  { id: "ast_002", name: "Kola Sunshine — press photo (studio).jpg", kind: "Press Photo", url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", size: "6.1 MB", uploadedAt: "2026-03-12" },
  { id: "ast_003", name: "CBM x Kola — EPK 2026.pdf", kind: "EPK", url: "#", size: "2.8 MB", uploadedAt: "2026-02-22" },
];

export const copyrightWorks: CopyrightWork[] = [
  { id: "cpr_001", title: "Midnight in Lagos", type: "Composition", registered: "2026-04-18", status: "registered", splits: [ { name: "Kola Sunshine", role: "Writer", pct: 60 }, { name: "T. Okon", role: "Co-writer", pct: 25 }, { name: "CBM Publishing", role: "Publisher", pct: 15 } ] },
  { id: "cpr_002", title: "Sunshine Season — Master", type: "Master", registered: "2025-10-28", status: "registered", splits: [ { name: "CBM Records", role: "Label", pct: 50 }, { name: "Kola Sunshine", role: "Artist", pct: 50 } ] },
  { id: "cpr_003", title: "Ghosts in Alagbado", type: "Composition", registered: "2026-07-10", status: "pending", splits: [ { name: "Kola Sunshine", role: "Writer", pct: 100 } ] },
];

export const notifications: Notification[] = [
  { id: "ntf_001", title: "Ghosts in Alagbado moved to In Review", body: "Your release is being reviewed by the distribution team. ETA 48 hours.", kind: "release", read: false, createdAt: "2026-07-25T08:00:00Z" },
  { id: "ntf_002", title: "Royalty statement ready", body: "June 2026 statement is available. $6,120 accrued.", kind: "royalty", read: false, createdAt: "2026-07-24T16:20:00Z" },
  { id: "ntf_003", title: "New message from Ada Nwosu", body: "Q3 roadmap review — Thursday sync request.", kind: "message", read: true, createdAt: "2026-07-25T09:12:00Z" },
];

export const dashboardStats = {
  monthlyListeners: currentArtist.monthlyListeners,
  streamsThisMonth: 1_824_300,
  royaltiesMTD: 6_120,
  activeReleases: releases.filter((r) => r.status === "live").length,
  pendingReleases: releases.filter((r) => r.status === "in-review").length,
  followersDelta: 4_820,
};

export const topTerritories = [
  { country: "Nigeria", streams: 812_400 },
  { country: "Ghana", streams: 214_100 },
  { country: "United Kingdom", streams: 168_900 },
  { country: "United States", streams: 152_300 },
  { country: "South Africa", streams: 121_500 },
];

export const topPlatforms = [
  { name: "Spotify", pct: 44 },
  { name: "Apple Music", pct: 22 },
  { name: "Audiomack", pct: 14 },
  { name: "Boomplay", pct: 12 },
  { name: "YouTube Music", pct: 8 },
];

export const resources = [
  { id: "res_001", title: "Release checklist: from master to live", kind: "Guide", minutes: 6 },
  { id: "res_002", title: "Understanding your royalty statement", kind: "Guide", minutes: 8 },
  { id: "res_003", title: "Copyright basics for African artists", kind: "Video", minutes: 12 },
  { id: "res_004", title: "Marketing playbook: TikTok launch", kind: "Playbook", minutes: 10 },
  { id: "res_005", title: "Press kit template (EPK)", kind: "Template", minutes: 3 },
];

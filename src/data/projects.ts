import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Globe2,
  ListMusic,
  Megaphone,
  Newspaper,
  Sparkles,
  Users,
} from "lucide-react";

export const PROJECT_CATEGORIES = [
  "All Projects",
  "Artist Development",
  "Music Distribution",
  "Marketing Campaigns",
  "Publishing",
  "Brand Partnerships",
  "Events",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

type Highlight = { icon: typeof Globe2; label: string; value: string };

export type Project = {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  genre: string;
  country: string;
  status: "Released" | "Campaign Active" | "Coming Soon";
  categories: ProjectCategory[];
  image: string;
  services: string[];
  summary: string;
  highlights: Highlight[];
};

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Lagos Nights",
    artist: "Ayo Bankole",
    releaseDate: "March 2025",
    genre: "Afrobeats",
    country: "Nigeria",
    status: "Released",
    categories: ["Music Distribution", "Marketing Campaigns"],
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    services: ["Music Distribution", "Marketing Campaign", "Playlist Pitching", "PR & Media"],
    summary:
      "CBM Records managed the end-to-end release campaign for Ayo's debut album, coordinating digital distribution across 42 stores and executing a six-week social rollout.",
    highlights: [
      { icon: Globe2, label: "Markets activated", value: "18" },
      { icon: ListMusic, label: "Editorial placements", value: "27" },
      { icon: Users, label: "Audience growth", value: "+312%" },
    ],
  },
  {
    id: "p2",
    title: "Sankofa Sessions",
    artist: "Nana Adjoa",
    releaseDate: "August 2025",
    genre: "Highlife / Soul",
    country: "Ghana",
    status: "Campaign Active",
    categories: ["Artist Development", "Events", "Marketing Campaigns"],
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    services: ["Artist Management", "Brand Strategy", "Digital Advertising", "PR & Media"],
    summary:
      "A live-session series repositioning Nana Adjoa as a premium touring act. CBM built the creative direction, produced four filmed sessions in Accra, and ran a paid media campaign that carried the series into European festival programming.",
    highlights: [
      { icon: Megaphone, label: "Campaign reach", value: "9.4M" },
      { icon: Newspaper, label: "Press features", value: "31" },
      { icon: BarChart3, label: "Tour support", value: "12 dates" },
    ],
  },
  {
    id: "p3",
    title: "Blue Gold",
    artist: "Kito Mensah",
    releaseDate: "January 2026",
    genre: "Alté / R&B",
    country: "Kenya",
    status: "Coming Soon",
    categories: ["Publishing", "Music Distribution"],
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    services: ["Publishing Administration", "Copyright Registration", "Music Distribution"],
    summary:
      "CBM handles publishing administration and global copyright registration for Kito's forthcoming project, clearing seven co-writer splits ahead of release and structuring the sync catalogue for film and advertising licensing.",
    highlights: [
      { icon: Globe2, label: "Territories cleared", value: "64" },
      { icon: ListMusic, label: "Sync submissions", value: "22" },
      { icon: Users, label: "Co-writers managed", value: "7" },
    ],
  },
  {
    id: "p4",
    title: "Motherland Motion",
    artist: "Zola Dube",
    releaseDate: "November 2025",
    genre: "Amapiano",
    country: "South Africa",
    status: "Campaign Active",
    categories: ["Brand Partnerships", "Marketing Campaigns"],
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
    services: ["Brand Strategy", "Digital Advertising", "Marketing Campaign", "PR & Media"],
    summary:
      "A brand partnership pairing Zola with a pan-African sportswear label. CBM negotiated the deal, produced the campaign film, and aligned the single release with retail activations in Johannesburg, Nairobi and Lagos.",
    highlights: [
      { icon: Sparkles, label: "Brand partnerships", value: "3" },
      { icon: Megaphone, label: "Campaign reach", value: "14.2M" },
      { icon: Globe2, label: "Markets activated", value: "9" },
    ],
  },
  {
    id: "p5",
    title: "Harmattan",
    artist: "Selam Tesfaye",
    releaseDate: "June 2025",
    genre: "Ethio-Jazz",
    country: "Ethiopia",
    status: "Released",
    categories: ["Artist Development", "Publishing"],
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    services: ["Artist Management", "Publishing Administration", "Playlist Pitching"],
    summary:
      "CBM took Selam from independent releases to a fully administered catalogue, rebuilding her metadata, recovering unclaimed royalties, and positioning the album with jazz and world-music editorial curators worldwide.",
    highlights: [
      { icon: BarChart3, label: "Royalties recovered", value: "$48K" },
      { icon: ListMusic, label: "Editorial placements", value: "19" },
      { icon: Users, label: "Audience growth", value: "+186%" },
    ],
  },
  {
    id: "p6",
    title: "CBM Live: Accra",
    artist: "CBM Roster",
    releaseDate: "December 2025",
    genre: "Multi-genre",
    country: "Ghana",
    status: "Campaign Active",
    categories: ["Events", "Brand Partnerships"],
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
    services: ["Brand Strategy", "PR & Media", "Digital Advertising", "Artist Management"],
    summary:
      "A flagship showcase built to introduce six CBM artists to industry buyers. The company handled production, sponsorship sales, press accreditation and the post-event content programme distributed across artist channels.",
    highlights: [
      { icon: Users, label: "Attendance", value: "6,400" },
      { icon: Newspaper, label: "Press coverage", value: "44 outlets" },
      { icon: Sparkles, label: "Sponsors secured", value: "5" },
    ],
  },
];

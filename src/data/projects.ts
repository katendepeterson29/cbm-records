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
    title: "CBM Showcase",
    artist: "Epikano",
    releaseDate: "March 2025",
    genre: "Afrobeats",
    country: "Uganda",
    status: "Released",
    categories: ["Music Distribution", "Marketing Campaigns"],
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    services: ["Music Distribution", "Marketing Campaign", "Playlist Pitching", "PR & Media"],
    summary:
      "CBM Records managed the end-to-end release campaign for Epikano's debut album, coordinating digital distribution across all major streaming platforms and executing a six-week social rollout.",
    highlights: [
      { icon: Globe2, label: "Markets activated", value: "12" },
      { icon: ListMusic, label: "Editorial placements", value: "21" },
      { icon: Users, label: "Audience growth", value: "10%" },
    ],
  },
];

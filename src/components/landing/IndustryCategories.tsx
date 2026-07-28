import { motion } from "framer-motion";
import {
  Mic2,
  Briefcase,
  Sliders,
  Truck,
  Building2,
  BookOpen,
  Megaphone,
  CalendarRange,
  Headphones,
  PenLine,
  BadgeCheck,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Category = {
  key: string;
  label: string;
  icon: LucideIcon;
  description: string;
  stats: { value: string; label: string }[];
  profile: {
    name: string;
    role: string;
    location: string;
    imageUrl: string;
    verified?: boolean;
    highlight: string;
  };
  accent: string; // tailwind gradient class fragment
};

const categories: Category[] = [
  {
    key: "artists",
    label: "Artists",
    icon: Mic2,
    description: "Release music, own your rights, and grow a global audience from one workspace.",
    stats: [
      { value: "240+", label: "On roster" },
      { value: "18M", label: "Streams / mo" },
    ],
    profile: {
      name: "Kola Sunshine",
      role: "Afrobeats artist",
      location: "Lagos, Nigeria",
      imageUrl:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop",
      verified: true,
      highlight: "482K monthly listeners · 3× editorial features",
    },
    accent: "from-primary/30 to-accent/10",
  },
  {
    key: "managers",
    label: "Managers",
    icon: Briefcase,
    description: "Oversee rosters, coordinate releases, and keep every stakeholder aligned.",
    stats: [
      { value: "80+", label: "Active managers" },
      { value: "6.4", label: "Avg. artists / mgr" },
    ],
    profile: {
      name: "Amara Diallo",
      role: "Artist manager",
      location: "Dakar, Senegal",
      imageUrl:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
      verified: true,
      highlight: "Manages 12 artists across West Africa",
    },
    accent: "from-accent/30 to-primary/10",
  },
  {
    key: "producers",
    label: "Producers",
    icon: Sliders,
    description: "Track sessions, register splits, and get paid on every placement, automatically.",
    stats: [
      { value: "310+", label: "Producers" },
      { value: "1.2K", label: "Sessions / mo" },
    ],
    profile: {
      name: "Tunde Beats",
      role: "Producer · Mixer",
      location: "Accra, Ghana",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      highlight: "Placed on 47 releases in 2025",
    },
    accent: "from-primary/30 to-primary/5",
  },
  {
    key: "distributors",
    label: "Distributors",
    icon: Truck,
    description: "Deliver catalogs to 150+ stores with QC, takedowns and real-time delivery status.",
    stats: [
      { value: "150+", label: "Stores" },
      { value: "99.4%", label: "Delivery SLA" },
    ],
    profile: {
      name: "Baseline Distro",
      role: "Independent distributor",
      location: "Nairobi, Kenya",
      imageUrl:
        "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=400&fit=crop",
      verified: true,
      highlight: "Delivers 400+ releases per quarter",
    },
    accent: "from-accent/30 to-accent/5",
  },
  {
    key: "labels",
    label: "Record Labels",
    icon: Building2,
    description: "Run releases, marketing, and finance across your roster from one control center.",
    stats: [
      { value: "42", label: "Labels" },
      { value: "$1.8M", label: "Royalties / mo" },
    ],
    profile: {
      name: "Sable Records",
      role: "Independent label",
      location: "Cape Town, South Africa",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
      verified: true,
      highlight: "38 artists · 220+ releases",
    },
    accent: "from-primary/25 to-accent/20",
  },
  {
    key: "publishers",
    label: "Publishers",
    icon: BookOpen,
    description: "Register works, collect mechanicals and performance royalties across territories.",
    stats: [
      { value: "18", label: "Publishing partners" },
      { value: "62", label: "Collection societies" },
    ],
    profile: {
      name: "Highlife Publishing",
      role: "Music publisher",
      location: "London, UK",
      imageUrl:
        "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?w=400&h=400&fit=crop",
      highlight: "Global sub-publishing across 62 PROs",
    },
    accent: "from-accent/20 to-primary/10",
  },
  {
    key: "promoters",
    label: "Promoters",
    icon: Megaphone,
    description: "Plan campaigns, brief creators, and measure lift on every release.",
    stats: [
      { value: "120+", label: "Campaigns / mo" },
      { value: "3.2×", label: "Avg. ROAS" },
    ],
    profile: {
      name: "Riot Promo Group",
      role: "Digital promotion",
      location: "Johannesburg, SA",
      imageUrl:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop",
      highlight: "Ran 40+ #1 charting campaigns",
    },
    accent: "from-primary/25 to-primary/5",
  },
  {
    key: "booking",
    label: "Booking Agents",
    icon: CalendarRange,
    description: "Route tours, contract shows, and sync availabilities with your artists.",
    stats: [
      { value: "260+", label: "Shows booked" },
      { value: "24", label: "Countries" },
    ],
    profile: {
      name: "Nia Okafor",
      role: "Booking agent",
      location: "Abuja, Nigeria",
      imageUrl:
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop",
      verified: true,
      highlight: "Booked 18 headline tours in 2025",
    },
    accent: "from-accent/25 to-accent/5",
  },
  {
    key: "engineers",
    label: "Engineers",
    icon: Headphones,
    description: "Deliver stems, receive approvals, and log credits that follow the release forever.",
    stats: [
      { value: "175+", label: "Engineers" },
      { value: "4.9★", label: "Avg. rating" },
    ],
    profile: {
      name: "Marcus Idris",
      role: "Mixing engineer",
      location: "Berlin, Germany",
      imageUrl:
        "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&h=400&fit=crop",
      highlight: "Mixed 120+ tracks across CBM roster",
    },
    accent: "from-primary/30 to-accent/10",
  },
  {
    key: "songwriters",
    label: "Songwriters",
    icon: PenLine,
    description: "Log co-writes, protect splits, and see every royalty statement in real time.",
    stats: [
      { value: "410+", label: "Writers" },
      { value: "2.8K", label: "Works registered" },
    ],
    profile: {
      name: "Zainab Yusuf",
      role: "Songwriter · Topliner",
      location: "Lagos, Nigeria",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      verified: true,
      highlight: "Co-wrote 3 platinum singles",
    },
    accent: "from-accent/25 to-primary/10",
  },
];

export function IndustryCategories() {
  return (
    <section
      id="who-uses-cbm"
      className="relative border-y border-border/60 bg-gradient-to-b from-background via-background/60 to-background py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-primary">Who uses CBM?</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Ten roles.{" "}
            <span className="text-gradient-brand">One connected industry.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From bedroom producers to global labels, CBM Records powers every professional in the
            modern music supply chain. Hover a card to meet a representative.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((c, i) => (
            <CategoryCard key={c.key} category={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }: { category: Category; index: number }) {
  const Icon = category.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, delay: (index % 5) * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
    >
      {/* accent glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-8 -z-10 rounded-[32px] bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
          category.accent,
        )}
      />

      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold">{category.label}</h3>
      <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">{category.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
        {category.stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-base font-semibold">{s.value}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Hover reveal: representative profile */}
      <div className="grid max-h-0 grid-rows-[0fr] overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:max-h-64 group-hover:grid-rows-[1fr] group-hover:opacity-100">
        <div className="min-h-0">
          <div className="rounded-xl border border-border/60 bg-background/60 p-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={category.profile.imageUrl}
                  alt={category.profile.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-border/60"
                />
                {category.profile.verified && (
                  <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-background ring-1 ring-border/60">
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{category.profile.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {category.profile.role} · {category.profile.location}
                </p>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-[11px] text-muted-foreground">
              {category.profile.highlight}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

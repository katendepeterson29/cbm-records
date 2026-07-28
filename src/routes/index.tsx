import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Music2,
  BarChart3,
  ShieldCheck,
  Radio,
  MessagesSquare,
  Wallet,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { EcosystemShowcase } from "@/components/landing/EcosystemShowcase";
import { IndustryCategories } from "@/components/landing/IndustryCategories";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CBM Records — Africa's music platform for artists" },
      {
        name: "description",
        content:
          "Distribute music, manage rights, track royalties and grow your career. Built for African artists and the world.",
      },
      { property: "og:title", content: "CBM Records — Africa's music platform for artists" },
      {
        property: "og:description",
        content:
          "Distribute music, manage rights, track royalties and grow your career. Built for African artists and the world.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Music2, title: "Distribution", copy: "Ship to Spotify, Apple Music, Boomplay, Audiomack and 150+ stores with a guided release wizard." },
  { icon: Wallet, title: "Royalties & payouts", copy: "Transparent statements, monthly accruals and fast payouts in USD, NGN and more." },
  { icon: ShieldCheck, title: "Copyright vault", copy: "Register compositions, masters and splits. Keep every right documented and defensible." },
  { icon: BarChart3, title: "Analytics", copy: "Streams, listeners, top territories and platforms — updated daily and easy to read." },
  { icon: Radio, title: "Marketing hub", copy: "Plan launches, brief creators, and coordinate with your CBM marketing team from one place." },
  { icon: MessagesSquare, title: "Direct comms", copy: "Chat with your manager, marketing lead and finance team — no more scattered threads." },
];

function Landing() {
  return (
    <div className="min-h-screen gradient-hero">
      <SiteHeader />
      <Hero />
      <TrustStrip />
        <IndustryCategories />
        <EcosystemShowcase />
      <FeatureGrid />
      <ShowcaseBand />
      <CTA />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg gradient-brand shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">CBM Records</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Platform</a>
          <a href="#showcase" className="transition-colors hover:text-foreground">Artists</a>
          <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/auth">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95">
            <Link to="/app">Open portal</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 pt-24 pb-32 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <Badge variant="secondary" className="mb-6 border border-border/80 bg-background/60 text-xs font-medium text-muted-foreground">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Now onboarding the 2026 roster
          </Badge>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            The home of <span className="text-gradient-brand">African music</span>, built for artists.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Release music, protect your rights, get paid, and grow your audience — all from a single, modern
            platform designed with artists first.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95">
              <Link to="/auth">
                Get started free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border/80 bg-background/40">
              <Link to="/app">
                <PlayCircle className="mr-2 h-4 w-4" /> See demo
              </Link>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
            <div><span className="text-foreground font-semibold">240+</span> artists</div>
            <div><span className="text-foreground font-semibold">18M</span> monthly streams</div>
            <div><span className="text-foreground font-semibold">150+</span> stores</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl gradient-brand opacity-20 blur-3xl" aria-hidden />
          <div className="relative surface-card overflow-hidden shadow-elegant">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&h=1100&fit=crop"
              alt="Artist performing on stage"
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Now playing</p>
                  <p className="mt-1 font-display text-lg font-semibold">Midnight in Lagos — Kola Sunshine</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full gradient-brand shadow-glow">
                  <PlayCircle className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const logos = ["Spotify", "Apple Music", "Boomplay", "Audiomack", "Tidal", "YouTube Music"];
  return (
    <section className="border-y border-border/60 bg-background/40 py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 text-sm text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">Delivered to</span>
        {logos.map((l) => (
          <span key={l} className="font-display font-semibold text-foreground/70">{l}</span>
        ))}
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-widest text-primary">The platform</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Everything you need to run your career
        </h2>
        <p className="mt-4 text-muted-foreground">
          One workspace for distribution, rights, royalties, marketing and support.
        </p>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="group surface-card p-6 transition-all hover:border-primary/40">
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-110">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShowcaseBand() {
  return (
    <section id="showcase" className="border-y border-border/60 bg-gradient-to-b from-background to-card/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary">Case study</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
              From 4K to 480K monthly listeners in 18 months.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Kola Sunshine partnered with CBM to release his debut EP, unlock editorial support across
              Spotify and Boomplay, and build a repeatable launch playbook.
            </p>
            <Button asChild variant="outline" className="mt-8 border-border/80">
              <Link to="/app">Explore the artist portal <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "Monthly listeners", v: "482K", d: "+11.2%" },
              { k: "Streams / mo", v: "1.8M", d: "+18.4%" },
              { k: "Royalties YTD", v: "$52.8K", d: "+64%" },
              { k: "Territories", v: "38", d: "+9 new" },
            ].map((s) => (
              <div key={s.k} className="surface-card p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.k}</p>
                <p className="mt-2 font-display text-3xl font-semibold">{s.v}</p>
                <p className="mt-1 text-sm text-primary">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="pricing" className="mx-auto max-w-5xl px-6 py-28 text-center">
      <div className="surface-card relative overflow-hidden p-12 shadow-elegant">
        <div className="pointer-events-none absolute -inset-20 gradient-brand opacity-20 blur-3xl" aria-hidden />
        <div className="relative">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready when you are.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sign up in minutes. No credit card required for the artist plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gradient-brand text-primary-foreground shadow-glow hover:opacity-95">
              <Link to="/auth">Create your account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border/80">
              <Link to="/app">Explore the demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} CBM Records. Lagos · Accra · London.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

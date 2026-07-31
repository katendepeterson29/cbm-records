import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Handshake,
  Megaphone,
  Music2,
  ShieldCheck,
  ShoppingBag,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import mainLogo from "../../../assets/logo/logo main.png";

const SERVICES = [
  {
    icon: UsersRound,
    title: "Artist Management",
    copy: "Career strategy, team coordination and day-to-day support built around the artist.",
  },
  {
    icon: Music2,
    title: "Music Distribution",
    copy: "Global delivery, release planning and metadata management for every stage of a project.",
  },
  {
    icon: ShieldCheck,
    title: "Rights & Publishing",
    copy: "Copyright registration, publishing administration and transparent royalty management.",
  },
  {
    icon: Megaphone,
    title: "Marketing & Promotion",
    copy: "Campaigns that connect releases with audiences, media and culture.",
  },
  {
    icon: Handshake,
    title: "Brand Partnerships",
    copy: "Meaningful collaborations that create new opportunities beyond the music.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Creative Consulting",
    copy: "Practical guidance for artists, labels and teams navigating the industry.",
  },
];

const OUTCOMES = [
  ["10+", "artists supported across Africa and its diaspora"],
  ["3", "projects developed, released and marketed"],
  ["1", "countries represented in the CBM ecosystem"],
  ["100K", "collective monthly listeners across the roster"],
];

export function BrandNavigation() {
  const links = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Artists", "#artists"],
    ["Projects", "#projects"],
    ["Partners", "#partners"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/90 backdrop-blur-xl text-black">
      <div className="relative mx-auto flex h-[72px] max-w-7xl items-center px-6">
        <nav aria-label="Primary navigation" className="flex items-center gap-7 text-sm tracking-[0.18em] text-muted-foreground">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition-opacity hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          aria-label="CBM Records home"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <img src={mainLogo} alt="CBM Records" className="h-12 w-12 object-contain" />
        </a>

        <div className="ml-auto flex items-center gap-4">
          <a
            href="/shop"
            aria-label="Shop"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black transition hover:border-black hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shop
          </a>
        </div>
      </div>
    </header>
  );
}

export function BrandOverview() {
  return (
    <>
      <section id="about" className="border-b border-border/60 bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Who we are
          </p>
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              A home for ambitious African music.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              CBM Records is a full-service music company building lasting careers. We bring artist
              development, rights, distribution, creative strategy and partnerships into one
              committed team.
            </p>
            <a
              href="#services"
              className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:text-primary-glow"
            >
              How we work <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="border-b border-border/60 bg-card/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Our services
          </p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              The work behind every great artist story.
            </h2>
            <p className="max-w-md text-muted-foreground">
              From the first idea to international opportunity, CBM provides the specialist support
              to make momentum last.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="group bg-background p-7 transition hover:bg-card">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-8 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Success stories
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Measured in careers, not just clicks.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              We pair creative conviction with the insight and infrastructure to turn good work into
              lasting results.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-border/60 bg-card/50 p-7">
                <BarChart3 className="h-5 w-5 text-primary" />
                <p className="mt-10 font-display text-5xl font-semibold">{value}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="border-b border-border/60 bg-card/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Built with trusted industry partners
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {["Spotify", "Apple Music", "Boomplay", "YouTube Music", "Audiomack", "TikTok"].map(
              (partner) => (
                <div
                  key={partner}
                  className="flex h-20 items-center justify-center border border-border/60 bg-background/50 font-display text-lg font-semibold text-muted-foreground"
                >
                  {partner}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="news" className="border-b border-border/60 bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Industry news
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            From the CBM world.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "CBM welcomes a new generation of East African voices.",
              "Inside the campaign turning a debut into a regional moment.",
              "Building more transparent systems for artist royalties.",
            ].map((title, index) => (
              <article key={title} className="border-t border-primary pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  CBM Journal · 0{index + 1}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight">{title}</h3>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
                >
                  Read story <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <BadgeCheck className="h-8 w-8" />
          <h2 className="mt-6 max-w-3xl font-display text-5xl font-semibold tracking-tight sm:text-7xl">
            Ready to take your career further?
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/75">
            Whether you are an artist, label, manager or brand, CBM Records has the expertise and
            network to help you grow.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <a href="#artists">Apply as an artist</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="#contact">Partner with us</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

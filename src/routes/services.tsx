import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, Handshake, Megaphone, Music2, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { BrandNavigation } from "@/components/landing/BrandOverview";

const SERVICE_CARDS = [
  {
    icon: Users,
    title: "Artist Management",
    description:
      "Career strategy, team coordination and day-to-day support built around the artist.",
  },
  {
    icon: Music2,
    title: "Music Distribution",
    description:
      "Global delivery, release planning and metadata management for every stage of a project.",
  },
  {
    icon: ShieldCheck,
    title: "Rights & Publishing",
    description:
      "Copyright registration, publishing administration and transparent royalty management.",
  },
  {
    icon: Megaphone,
    title: "Marketing & Promotion",
    description: "Campaigns that connect releases with audiences, media and culture.",
  },
  {
    icon: Handshake,
    title: "Brand Partnerships",
    description: "Meaningful collaborations that create new opportunities beyond the music.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Creative Consulting",
    description: "Practical guidance for artists, labels and teams navigating the industry.",
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | CBM Records" },
      {
        name: "description",
        content:
          "CBM Records supports artists, music professionals, labels, and creative businesses through artist management, distribution, publishing and marketing.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <main className="min-h-screen bg-black text-white">
      <BrandNavigation />
      <section className="relative overflow-hidden bg-black/95 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(4,187,169,0.16),_transparent_36%)]" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-400">OUR SERVICES</p>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            CBM Records supports artists, music professionals, labels, and creative businesses.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            From artist development and distribution to publishing, marketing and partnerships, we build campaigns that help creators move with confidence.
          </p>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="bg-teal-500 text-black hover:bg-teal-400">
              <Link to="/contact">WORK WITH US</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CARDS.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-3xl border border-black/10 bg-background p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-teal-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-6 text-2xl-white font-semibold">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-600"
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-black px-8 py-12 text-white shadow-lg">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-teal-400">More from CBM</p>
                <h2 className="mt-4 text-3xl font-semibold">We support every stage of an artist’s career.</h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                  Through management, distribution, publishing, marketing and partnerships, CBM helps artists build momentum and capture opportunities across sound, stage and culture.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-teal-300">Capabilities</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    <li>Campaign planning</li>
                    <li>Rights administration</li>
                    <li>Distribution strategy</li>
                    <li>Creative positioning</li>
                  </ul>
                </div>
                <div className="rounded-3xl bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-teal-300">Team support</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    <li>Artist relations</li>
                    <li>Media & PR</li>
                    <li>Label partnerships</li>
                    <li>Publishing guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-16 rounded-[2rem] border border-black/10 bg-white p-10 shadow-sm">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-primary">Details</p>
                <h2 className="mt-4 text-3xl font-semibold">Artist Management & distribution with cultural precision.</h2>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  We help artists navigate the music ecosystem with clarity, from planning release campaigns to managing rights and delivering content to global platforms.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-3xl border border-border/70 bg-background p-6">
                  <h3 className="font-semibold">Strategy</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Artist development and release planning grounded in audience, culture, and platform demand.
                  </p>
                </div>
                <div className="rounded-3xl border border-border/70 bg-background p-6">
                  <h3 className="font-semibold">Execution</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Creative campaigns, brand partnerships, and global distribution that make each project feel premium.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16 rounded-[2rem] border border-black/10 bg-black px-10 py-14 text-white">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-teal-400">LET'S BUILD WHAT'S NEXT.</p>
                <h2 className="mt-4 text-4xl font-semibold">Create work that carries beyond the release.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  CBM combines deep music experience with creative strategy to help artists and brands move confidently from concept to culture.
                </p>
              </div>
              <Button asChild size="lg" className="w-full bg-white text-black hover:bg-slate-100">
                <Link to="/contact">CONTACT US</Link>
              </Button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

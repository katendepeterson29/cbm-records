import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "CBM Records Shop" },
      {
        name: "description",
        content: "Discover official CBM Records merchandise, apparel, and lifestyle essentials.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-6 text-center">
          <span className="text-sm uppercase tracking-[0.35em] text-primary">CBM Records Shop</span>
          <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            The official CBM store
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Music, merch, and essentials from the CBM Records family — curated for artists, fans, and culture.
          </p>
        </div>
        <div className="grid gap-6 rounded-3xl border border-black/10 bg-white/90 p-8 shadow-sm sm:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            The shop page is live. Browse the collection, discover new arrivals, and add premium CBM pieces to your cart.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border/80 bg-background p-6">
              <h2 className="text-2xl font-semibold">Featured Merch</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Premium apparel, limited drops, and official CBM essentials designed for daily wear and stage-ready style.
              </p>
            </div>
            <div className="rounded-3xl border border-border/80 bg-background p-6">
              <h2 className="text-2xl font-semibold">Artist Collections</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Discover artist collaborations, capsule pieces, and merch built around CBM's creative community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

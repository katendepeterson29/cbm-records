import { createFileRoute } from "@tanstack/react-router";
import { shopProducts } from "@/data/shop-products";
import { ShoppingBag } from "lucide-react";

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
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-3xl space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-primary">CBM Records Shop</p>
          <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            The official CBM store
          </h1>
          <p className="mx-auto text-base leading-8 text-muted-foreground sm:text-lg">
            Music, merchandise, and essentials from the CBM Records family — curated for artists, fans and culture.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {shopProducts.map((product) => (
            <article key={product.id} className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="relative overflow-hidden bg-slate-950">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-black">
                  {product.category}
                </span>
                {product.isLimited ? (
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-black">
                    Limited
                  </span>
                ) : null}
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
                  <span>{product.artist}</span>
                  <span>{product.availability}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    {product.salePrice ? (
                      <p className="text-base font-semibold text-foreground line-through text-muted-foreground">
                        ${product.price}
                      </p>
                    ) : null}
                    <p className="text-2xl font-semibold text-foreground">
                      ${product.salePrice ?? product.price}
                    </p>
                  </div>
                  <button className="inline-flex items-center rounded-full border border-black/10 bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900">
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

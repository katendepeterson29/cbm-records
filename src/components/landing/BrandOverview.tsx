import { ArrowRight, Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import mainLogo from "../../../assets/logo/logo5.png";

export function BrandNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const leftLinks = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Projects", to: "/projects" },
  ];
  const rightLinks = [
    { label: "Artists", to: "/artists" },
    { label: "Shop", to: "/shop", icon: ShoppingBag },
    { label: "Contact", to: "/contact" },
  ];

  const linkClass = (to: string) =>
    `transition text-sm tracking-[0.18em] ${
      pathname === to ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/90 backdrop-blur-xl text-black">
      <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-6">
        <div className="hidden items-center gap-5 md:flex">
          {leftLinks.map(({ label, to }) => (
            <Link key={to} to={to} className={linkClass(to)}>
              {label}
            </Link>
          ))}
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link to="/" aria-label="CBM Records home" className="block">
            <img src={mainLogo} alt="CBM Records" className="h-20 w-20 object-contain" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-7 md:flex">
            {rightLinks.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={
                  to === "/shop"
                    ? "inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-slate-100"
                    : linkClass(to)
                }
              >
                {Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null}
                {label}
              </Link>
            ))}
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-xs">
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <Link to="/" className="flex items-center gap-3 text-lg font-semibold">
                  <img src={mainLogo} alt="CBM Records" className="h-10 w-10 object-contain" />
                  CBM
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  ✕
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="mt-6 flex flex-col gap-4">
                {[...leftLinks, ...rightLinks].map(({ label, to, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={
                      to === "/shop"
                        ? "inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-base font-semibold text-foreground shadow-sm transition hover:bg-slate-100"
                        : linkClass(to) + " text-base font-medium"
                    }
                  >
                    {Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null}
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function BrandOverview() {
  return (
    <section id="about" className="border-b border-border/60 bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Who we are</p>
        <div>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            A home for ambitious African music.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            CBM Records is a full-service music company building lasting careers. We bring artist
            development, rights, distribution, creative strategy and partnerships into one
            committed team.
          </p>
          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:text-primary-glow"
          >
            How we work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

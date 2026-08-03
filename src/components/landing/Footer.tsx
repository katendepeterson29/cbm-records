import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import mainLogo from "../../../assets/logo/logo5.png";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M16.5 5.5a6.22 6.22 0 0 1-1.75-.25v6.02a4.5 4.5 0 1 1-4.5-4.5V9A6 6 0 1 0 16.5 5.5Z" />
      <path d="M13.75 8.3V18.5a4.5 4.5 0 1 1-4.5-4.5V12a8.5 8.5 0 0 0 4.5 1.3V8.3Z" />
    </svg>
  );
}

const FOOTER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Artists", to: "/artists" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Shop", to: "/shop" },
  { label: "Contact", to: "/contact" },
];

const SERVICE_LINKS = [
  "Artist Management",
  "Distribution",
  "Marketing",
  "Publishing",
  "Partnerships",
].map((label) => ({ label, to: "/services" }));

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/epikano",
    Icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@epikano",
    Icon: TikTokIcon,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#04bba9] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr_1fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={mainLogo} alt="CBM Records" className="h-14 w-14 object-contain" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/80">CBM RECORDS</p>
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">
                  Artist management, distribution and culture.
                </p>
              </div>
            </div>
            <p className="max-w-xl text-3xl font-display font-semibold leading-tight text-white sm:text-4xl">
              WE BUILD MUSIC. WE BUILD BRANDS. WE BUILD CAREERS.
            </p>
          </div>

          <div className="grid gap-4">
            <p className="text-sm uppercase tracking-[0.35em] text-white/80">Explore</p>
            <nav className="grid gap-3">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium uppercase tracking-[0.18em] text-white/90 transition hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="grid gap-4">
            <p className="text-sm uppercase tracking-[0.35em] text-white/80">Services</p>
            <nav className="grid gap-3">
              {SERVICE_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm font-medium uppercase tracking-[0.18em] text-white/90 transition hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-12 sm:flex sm:items-center sm:justify-between">
          <div className="space-y-5 sm:space-y-0 sm:flex sm:items-center sm:gap-8">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-white/80">Connect</p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-black"
                  >
                    <Icon className="h-5 w-5 transition-colors duration-200 group-hover:text-black" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <p className="max-w-xl text-sm uppercase tracking-[0.25em] text-white/80">
              READY TO BUILD WHAT'S NEXT?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:bg-white hover:text-black"
            >
              CONTACT US →
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/80 sm:flex sm:items-center sm:justify-between">
          <p>© {currentYear} CBM RECORDS. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}

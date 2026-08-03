import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, X } from "lucide-react";
import type { ArtistProfile } from "@/data/artists";

type ArtistProfileModalProps = {
  artist: ArtistProfile | null;
  onClose: () => void;
};

function socialLabel(platform: string) {
  return platform.slice(0, 2).toUpperCase();
}

export function ArtistProfileModal({ artist, onClose }: ArtistProfileModalProps) {
  useEffect(() => {
    if (!artist) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [artist, onClose]);

  if (typeof document === "undefined") return null;

  const metadata = artist
    ? ([
        ["Genre", artist.genre],
        ["From", artist.country],
        ["Artist type", artist.services?.[0]],
        ["Label", "CBM Records"],
      ].filter(([, value]) => Boolean(value)) as [string, string][])
    : [];

  return createPortal(
    <AnimatePresence>
      {artist ? (
        <motion.div
          key="artist-modal"
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close artist profile"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${artist.name} profile`}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 my-0 flex min-h-screen w-full flex-col bg-black text-white sm:my-auto sm:min-h-0 sm:max-w-5xl sm:flex-row sm:border sm:border-white/10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition hover:border-[#04bba9] hover:text-[#04bba9]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative w-full shrink-0 sm:w-[46%]">
              <img
                src={artist.heroImage || artist.profileImage}
                alt={artist.name}
                className="h-64 w-full object-cover object-center sm:h-full sm:min-h-[560px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>

            <div className="flex flex-1 flex-col gap-7 overflow-y-auto px-6 py-10 sm:max-h-[85vh] sm:px-10 sm:py-14">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#04bba9]">
                  Artist
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                    {artist.name}
                  </h2>
                  {artist.verified ? (
                    <BadgeCheck className="h-6 w-6 shrink-0 text-[#04bba9]" aria-label="Verified" />
                  ) : null}
                </div>
              </div>

              {artist.socialLinks?.length ? (
                <div className="flex flex-wrap items-center gap-3">
                  {artist.socialLinks
                    .filter((link) => Boolean(link.url))
                    .map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        title={link.platform}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition hover:border-[#04bba9] hover:text-[#04bba9]"
                      >
                        {socialLabel(link.platform)}
                      </a>
                    ))}
                </div>
              ) : null}

              <div className="h-px w-16 bg-[#04bba9]" />

              <p className="max-w-xl text-base leading-8 text-white/75">{artist.bio}</p>

              {metadata.length ? (
                <div className="mt-auto grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8">
                  {metadata.map(([label, value]) => (
                    <div key={label}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#04bba9]">
                        {label}
                      </p>
                      <p className="mt-2 text-sm text-white">{value}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

import type { ImgHTMLAttributes } from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
const TIKTOK_IMAGE = "/public/assets/logo/tiktok.png";
const X_ICON = "/public/assets/logo/twitter.png";

const fallbackTikTokSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M9 2.5v11.4a3.6 3.6 0 1 0 3.6 3.6V9.5a3.5 3.5 0 0 1-3.6-3.5V2.5H9Zm2.4 13.6a2.4 2.4 0 1 1-2.4-2.4 2.4 2.4 0 0 1 2.4 2.4Zm5.1-11.7V7.4a5.9 5.9 0 0 1-2.3-.3v7.6a6.1 6.1 0 1 1-6.1-6.1V2.5h2.4v5.2a3.7 3.7 0 0 0 3.7 3.7 3.6 3.6 0 0 0 2.3-.8V4.4h2.4Z'/%3E%3C/svg%3E";

function TikTokIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={TIKTOK_IMAGE}
      alt="TikTok"
      {...props}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = fallbackTikTokSvg;
      }}
    />
  );
}
function TwitterxIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={X_ICON}
      alt="X" className="w-24 h-24"
      {...props}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = fallbackTikTokSvg;
      }}
    />
  );
}

const ICON_MAP = {
  Instagram,
  Facebook,
  Linkedin,
  Twitter: TwitterxIcon,
  TikTok: TikTokIcon,
} as const;

export type SocialPlatform = keyof typeof ICON_MAP;

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const Icon = ICON_MAP[platform];
  return <Icon className={className} />;
}

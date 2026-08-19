import type { ImgHTMLAttributes } from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
const TIKTOK_IMAGE = "/public/assets/logo/tiktok.png";
const X_ICON = "/public/assets/logo/twitter.png";


function TikTokIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={TIKTOK_IMAGE}
      alt="TikTok"
      {...props}
      onError={(event) => {
        event.currentTarget.onerror = null;
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
      }}
    />
  );
}

const ICON_MAP = {
  Instagram,
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

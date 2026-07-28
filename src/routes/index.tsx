import { createFileRoute } from "@tanstack/react-router";
import { ArtistDiscovery } from "@/components/landing/ArtistDiscovery";

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

function Landing() {
  return <ArtistDiscovery />;
}
// new landing page for cbm records, with a focus on artist discovery and music distribution
import { createFileRoute } from "@tanstack/react-router";
import { FounderProfilePage } from "@/components/founders/FounderProfilePage";

export const Route = createFileRoute("/founders/mohannad")({
  head: () => ({
    meta: [
      { title: "Mohannad Abuayyash | Founder & CEO of NextAura AI" },
      {
        name: "description",
        content:
          "Learn about Mohannad Abuayyash, Founder and CEO of NextAura AI, AI developer, backend developer, and builder of intelligent digital products.",
      },
    ],
  }),
  component: MohannadFounderPage,
});

function MohannadFounderPage() {
  return <FounderProfilePage founderId="mohannad" />;
}

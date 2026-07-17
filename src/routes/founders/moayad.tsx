import { createFileRoute } from "@tanstack/react-router";
import { FounderProfilePage } from "@/components/founders/FounderProfilePage";

export const Route = createFileRoute("/founders/moayad")({
  head: () => ({
    meta: [
      { title: "Moayad Rabah | Founder & AI Engineer at NextAura AI" },
      {
        name: "description",
        content:
          "Learn about Moayad Rabah, Founder and AI Engineer at NextAura AI, focused on LLMs, RAG, MCP, computer vision, and production AI systems.",
      },
    ],
  }),
  component: MoayadFounderPage,
});

function MoayadFounderPage() {
  return <FounderProfilePage founderId="moayad" />;
}

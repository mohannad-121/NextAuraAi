import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { HeroUndergroundJourney } from "@/components/landing/HeroUndergroundJourney";
import { ServicesUniverse } from "@/components/landing/ServicesUniverse";
import { Process } from "@/components/landing/Process";
import { FeaturedProject } from "@/components/landing/FeaturedProject";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { Team } from "@/components/landing/Team";
import { Contact } from "@/components/landing/Contact";
import { ProjectRequestModal } from "@/components/landing/ProjectRequestModal";
import { MobileCTA } from "@/components/landing/MobileCTA";
import { WebsiteAssistantChatbot } from "@/components/landing/WebsiteAssistantChatbot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NextAura AI | Websites, AI Solutions & Business Automation" },
      {
        name: "description",
        content:
          "NextAura AI builds premium websites, AI assistants, automation systems, CRM platforms, MVPs, and custom digital products for businesses in Jordan, the UAE, and beyond.",
      },
      {
        property: "og:title",
        content: "NextAura AI | Websites, AI Solutions & Business Automation",
      },
      {
        property: "og:description",
        content:
          "Premium websites, AI assistants, automation systems, CRM platforms, MVPs, and custom digital products.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/cinematic/nextaura-ai-hero.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NextAura AI | Intelligent Digital Products" },
      {
        name: "twitter:description",
        content: "Websites, AI solutions, automation, CRM platforms, MVPs, and custom software.",
      },
      { name: "twitter:image", content: "/images/cinematic/nextaura-ai-hero.webp" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}

function LandingPage() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-clip pb-24 md:pb-0">
      <Nav onStartProject={() => setProjectModalOpen(true)} />
      <HeroUndergroundJourney onStartProject={() => setProjectModalOpen(true)} />
      <ServicesUniverse onStartProject={() => setProjectModalOpen(true)} />
      <FeaturedProject onStartProject={() => setProjectModalOpen(true)} />
      <Process />
      <Team />
      <WhyChoose />
      <Contact onStartProject={() => setProjectModalOpen(true)} />
      <MobileCTA onStartProject={() => setProjectModalOpen(true)} />
      <WebsiteAssistantChatbot />
      <ProjectRequestModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { CinematicHero } from "@/components/landing/CinematicHero";
import { ScrollProductStory } from "@/components/landing/ScrollProductStory";
import { Process } from "@/components/landing/Process";
import { CaseStudy } from "@/components/landing/CaseStudy";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { EarlyWork } from "@/components/landing/EarlyWork";
import { Team } from "@/components/landing/Team";
import { Contact } from "@/components/landing/Contact";
import { ProjectRequestModal } from "@/components/landing/ProjectRequestModal";
import { MobileCTA } from "@/components/landing/MobileCTA";
import { WebsiteAssistantChatbot } from "@/components/landing/WebsiteAssistantChatbot";
import { LanguageProvider } from "@/i18n/translations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NextAura AI - AI-powered websites, chatbots & MVPs" },
      { name: "description", content: "We help businesses turn ideas into intelligent digital products with AI, automation, and modern software development." },
      { property: "og:title", content: "NextAura AI - AI software studio" },
      { property: "og:description", content: "We build AI-powered websites, chatbots, and MVPs for businesses and startups." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <LandingPage />
    </LanguageProvider>
  );
}

function LandingPage() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-24 md:pb-0">
      <Nav onStartProject={() => setProjectModalOpen(true)} />
      <CinematicHero onStartProject={() => setProjectModalOpen(true)} />
      <ScrollProductStory />
      <Process />
      <CaseStudy onStartProject={() => setProjectModalOpen(true)} />
      <WhyChoose />
      <EarlyWork />
      <Team />
      <Contact onStartProject={() => setProjectModalOpen(true)} />
      <MobileCTA onStartProject={() => setProjectModalOpen(true)} />
      <WebsiteAssistantChatbot />
      <ProjectRequestModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </main>
  );
}

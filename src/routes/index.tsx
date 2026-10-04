import { lazy, Suspense, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { HeroUndergroundJourney } from "@/components/landing/HeroUndergroundJourney";
import { NextAuraWorld } from "@/components/landing/cinematic/NextAuraWorld";
import { ServicesUniverse } from "@/components/landing/ServicesUniverse";
import { FeaturedProject } from "@/components/landing/FeaturedProject";
import { Team } from "@/components/landing/Team";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { CustomerReviewsSection } from "@/components/landing/CustomerReviewsSection";
import { Contact } from "@/components/landing/Contact";
import { MobileCTA } from "@/components/landing/MobileCTA";
import { EcosystemChapter, FaqChapter } from "@/components/landing/ReferenceChapters";
import "@/styles/conicorn-rebuild.css";
import "@/styles/conicorn-rebuild-finishing.css";
import "@/styles/conicorn-fidelity.css";
const WebsiteAssistantChatbot = lazy(() =>
  import("@/components/landing/WebsiteAssistantChatbot").then((module) => ({
    default: module.WebsiteAssistantChatbot,
  })),
);

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
        href: "https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Exo+2:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}

function LandingPage() {
  const navigate = useNavigate();
  const startProject = () => navigate({ to: "/start-project" });
  const [chatbotReady, setChatbotReady] = useState(false);

  useEffect(() => {
    const ready = () => setChatbotReady(true);
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(ready, { timeout: 5000 })
        : globalThis.setTimeout(ready, 3500);
    return () => {
      if (typeof window.cancelIdleCallback === "function")
        window.cancelIdleCallback(idle as number);
      else globalThis.clearTimeout(idle);
    };
  }, []);

  return (
    <NextAuraWorld>
      <main className="relative min-h-screen overflow-x-clip pb-24 md:pb-0">
        <Nav onStartProject={startProject} />
        <HeroUndergroundJourney onStartProject={startProject}>
          <div id="why-choose" className="con-anchor">
            <WhyChoose />
          </div>
          <div id="services" className="con-anchor">
            <ServicesUniverse onStartProject={startProject} />
          </div>
          <div id="projects" className="con-anchor">
            <FeaturedProject onStartProject={startProject} />
          </div>
          <EcosystemChapter />
          <div id="team" className="con-anchor">
            <Team />
          </div>
          <FaqChapter />
          <div id="reviews" className="con-anchor">
            <CustomerReviewsSection />
          </div>
          <div id="contact" className="con-anchor con-contact-shell">
            <Contact onStartProject={startProject} />
          </div>
        </HeroUndergroundJourney>
        <MobileCTA onStartProject={startProject} />
        {chatbotReady ? (
          <Suspense fallback={null}>
            <WebsiteAssistantChatbot />
          </Suspense>
        ) : null}
      </main>
    </NextAuraWorld>
  );
}

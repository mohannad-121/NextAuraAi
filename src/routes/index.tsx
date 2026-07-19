import { lazy, Suspense, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { HeroUndergroundJourney } from "@/components/landing/HeroUndergroundJourney";
import { DeferredSection } from "@/components/landing/DeferredSection";

const ServicesUniverse = lazy(() =>
  import("@/components/landing/ServicesUniverse").then((module) => ({
    default: module.ServicesUniverse,
  })),
);
const FeaturedProject = lazy(() =>
  import("@/components/landing/FeaturedProject").then((module) => ({
    default: module.FeaturedProject,
  })),
);
const Process = lazy(() =>
  import("@/components/landing/Process").then((module) => ({ default: module.Process })),
);
const Team = lazy(() =>
  import("@/components/landing/Team").then((module) => ({ default: module.Team })),
);
const WhyChoose = lazy(() =>
  import("@/components/landing/WhyChoose").then((module) => ({ default: module.WhyChoose })),
);
const CustomerReviewsSection = lazy(() =>
  import("@/components/landing/CustomerReviewsSection").then((module) => ({
    default: module.CustomerReviewsSection,
  })),
);
const Contact = lazy(() =>
  import("@/components/landing/Contact").then((module) => ({ default: module.Contact })),
);
const MobileCTA = lazy(() =>
  import("@/components/landing/MobileCTA").then((module) => ({ default: module.MobileCTA })),
);
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
      "requestIdleCallback" in window
        ? window.requestIdleCallback(ready, { timeout: 5000 })
        : window.setTimeout(ready, 3500);
    return () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip pb-24 md:pb-0">
      <Nav onStartProject={startProject} />
      <HeroUndergroundJourney onStartProject={startProject} />
      <DeferredSection minHeight="42rem">
        <ServicesUniverse onStartProject={startProject} />
      </DeferredSection>
      <DeferredSection minHeight="46rem">
        <FeaturedProject onStartProject={startProject} />
      </DeferredSection>
      <DeferredSection minHeight="42rem">
        <Process />
      </DeferredSection>
      <DeferredSection minHeight="34rem">
        <Team />
      </DeferredSection>
      <DeferredSection minHeight="36rem">
        <WhyChoose />
      </DeferredSection>
      <DeferredSection minHeight="38rem">
        <CustomerReviewsSection />
      </DeferredSection>
      <DeferredSection minHeight="36rem">
        <Contact onStartProject={startProject} />
      </DeferredSection>
      <DeferredSection minHeight="5rem">
        <MobileCTA onStartProject={startProject} />
      </DeferredSection>
      {chatbotReady ? (
        <Suspense fallback={null}>
          <WebsiteAssistantChatbot />
        </Suspense>
      ) : null}
    </main>
  );
}

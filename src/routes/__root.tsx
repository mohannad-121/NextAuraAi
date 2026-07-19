import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, type ReactNode, Suspense, useEffect, useState } from "react";
import { SpaceAmbientAudio } from "@/components/landing/SpaceAmbientAudio";
import { LanguageProvider } from "@/i18n/translations";

import appCss from "../styles.css?url";

const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((module) => ({ default: module.Analytics })),
);

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NextAura AI | Websites, AI Solutions & Business Automation" },
      {
        name: "description",
        content:
          "NextAura AI builds premium websites, AI assistants, automation systems, CRM platforms, MVPs, and custom digital products for businesses in Jordan, the UAE, and beyond.",
      },
      { name: "author", content: "NextAura AI" },
      {
        property: "og:title",
        content: "NextAura AI | Websites, AI Solutions & Business Automation",
      },
      {
        property: "og:description",
        content:
          "Websites, AI solutions, business automation, CRM platforms, MVPs, and custom software.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/cinematic/nextaura-ai-hero.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#030817" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png?v=3",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png?v=3",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png?v=3",
      },
      { rel: "manifest", href: "/site.webmanifest" },
      {
        rel: "preload",
        href: "/images/cinematic/hero-robot-poster.webp",
        as: "image",
        type: "image/webp",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NextAura AI",
    description:
      "Websites, AI assistants, automation systems, CRM platforms, MVPs, and custom digital products.",
    email: "info@next-aura-ai.com",
    areaServed: ["Jordan", "United Arab Emirates"],
    sameAs: ["https://linkedin.com/company/nextaura-ai"],
  };

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{const l=localStorage.getItem('nextaura-language');if(l&&['ar','en','es'].includes(l)){document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr'}}catch{}",
          }}
        />
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [analyticsReady, setAnalyticsReady] = useState(false);

  useEffect(() => {
    const activate = () => setAnalyticsReady(true);
    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(activate, { timeout: 4000 })
        : window.setTimeout(activate, 2500);

    return () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SpaceAmbientAudio />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        {analyticsReady ? (
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        ) : null}
      </LanguageProvider>
    </QueryClientProvider>
  );
}

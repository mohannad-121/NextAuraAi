import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProjectRequestModal } from "@/components/landing/ProjectRequestModal";

export const Route = createFileRoute("/start-project")({
  head: () => ({
    meta: [
      { title: "Start a Project | NextAura AI" },
      {
        name: "description",
        content:
          "Tell NextAura AI about your website, AI assistant, automation, or custom software project.",
      },
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
  component: StartProjectPage,
});

function StartProjectPage() {
  const navigate = useNavigate();

  return (
    <ProjectRequestModal
      open
      presentation="page"
      onClose={() => navigate({ to: "/" })}
      onSubmitted={() => navigate({ to: "/", hash: "contact" })}
    />
  );
}

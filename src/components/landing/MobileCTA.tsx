import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/translations";

type MobileCTAProps = {
  onStartProject: () => void;
};

export function MobileCTA({ onStartProject }: MobileCTAProps) {
  const { tr } = useLanguage();
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  if (contactVisible) return null;

  return (
    <div
      className="fixed left-3 right-3 z-50 rounded-2xl border border-white/12 bg-[#0b1529]/96 p-2.5 shadow-2xl backdrop-blur-md md:hidden"
      style={{ bottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold">{tr.mobileCta.ready}</div>
          <div className="truncate text-xs text-muted-foreground">{tr.mobileCta.idea}</div>
        </div>
        <button
          type="button"
          onClick={onStartProject}
          className="btn-primary inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 text-sm"
        >
          <Rocket className="h-4 w-4" />
          {tr.mobileCta.start}
        </button>
      </div>
    </div>
  );
}

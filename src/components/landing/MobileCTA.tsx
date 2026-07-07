import { Rocket } from "lucide-react";
import { LanguageSwitcher, useLanguage } from "@/i18n/translations";

type MobileCTAProps = {
  onStartProject: () => void;
};

export function MobileCTA({ onStartProject }: MobileCTAProps) {
  const { tr } = useLanguage();
  return (
    <div className="fixed bottom-2 left-3 right-3 z-50 rounded-2xl glass p-2.5 shadow-2xl md:hidden">
      <div className="flex items-center justify-between gap-3">
        <LanguageSwitcher />
        <div className="min-w-0">
          <div className="text-sm font-semibold">{tr.mobileCta.ready}</div>
          <div className="truncate text-xs text-muted-foreground">{tr.mobileCta.idea}</div>
        </div>
        <button type="button" onClick={onStartProject} className="btn-primary inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm">
          <Rocket className="h-4 w-4" />
          {tr.mobileCta.start}
        </button>
      </div>
    </div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageSwitcher, useLanguage } from "@/i18n/translations";
import { homepageContent } from "@/i18n/homepageContent";
import { BrandSymbol } from "@/components/landing/BrandSymbol";

type NavProps = { onStartProject: () => void; internalPage?: boolean };

export function Nav({ onStartProject, internalPage = false }: NavProps) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].nav;
  const [open, setOpen] = useState(false);
  const links = [
    ["home", copy.home],
    ["services", copy.services],
    ["projects", copy.projects],
    ["team", copy.team],
    ["reviews", language === "ar" ? "الآراء" : language === "es" ? "Reseñas" : "Reviews"],
    ["contact", copy.contact],
  ];

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  const hrefFor = (id: string) => (internalPage ? `/#${id}` : `#${id}`);

  return (
    <header className="con-nav" dir={dir}>
      <div className="con-nav-pill">
        <a href={hrefFor("home")} aria-label="NextAura AI home" className="con-nav-brand">
          <BrandSymbol className="h-7 w-7" imageClassName="h-full w-full" />
        </a>
        <button
          type="button"
          className="con-nav-menu"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="con-nav-panel"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
          <span>
            {open
              ? copy.close
              : language === "ar"
                ? "القائمة"
                : language === "es"
                  ? "Menú"
                  : "Menu"}
          </span>
        </button>
        <div className="con-nav-language">
          <LanguageSwitcher />
        </div>
        <button type="button" className="con-nav-project" onClick={onStartProject}>
          {copy.start}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="con-nav-panel"
            aria-label="Primary navigation"
            className="con-nav-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {links.map(([id, label], index) => (
              <a key={id} href={hrefFor(id)} onClick={() => setOpen(false)}>
                <span>{label}</span>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </a>
            ))}
            <div className="con-nav-panel-language">
              <LanguageSwitcher />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

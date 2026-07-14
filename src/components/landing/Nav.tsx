import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LanguageSwitcher, useLanguage } from "@/i18n/translations";
import { homepageContent } from "@/i18n/homepageContent";
import { BrandSymbol } from "@/components/landing/BrandSymbol";

type NavProps = { onStartProject: () => void };

const ids = ["home", "services", "projects", "process", "team", "contact"];

export function Nav({ onStartProject }: NavProps) {
  const { language, dir } = useLanguage();
  const copy = homepageContent[language].nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const links = useMemo(
    () => [
      { id: "home", label: copy.home },
      { id: "services", label: copy.services },
      { id: "projects", label: copy.projects },
      { id: "process", label: copy.process },
      { id: "team", label: copy.team },
      { id: "contact", label: copy.contact },
    ],
    [copy],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -68%", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const startProject = () => {
    setOpen(false);
    onStartProject();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[70] px-3 sm:px-5">
      <div
        className={`mx-auto mt-3 flex max-w-[var(--homepage-container)] items-center justify-between rounded-2xl px-3 py-2.5 transition-[background-color,border-color,box-shadow] duration-200 sm:mt-4 sm:px-4 ${scrolled ? "border border-white/10 bg-[#081123]/92 shadow-[0_14px_40px_rgb(0_0_0_/_0.32)] backdrop-blur-md" : "border border-transparent bg-transparent"}`}
      >
        <a
          href="#home"
          aria-label="NextAura AI home"
          className="relative z-10 inline-flex min-h-11 items-center"
        >
          <BrandSymbol className="!rounded-xl !bg-black/45 !p-1.5" imageClassName="w-11 sm:w-12" />
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative rounded-full px-3 py-2 text-[0.78rem] font-medium transition-colors ${active === link.id ? "text-white" : "text-slate-400 hover:text-white"}`}
            >
              {link.label}
              <span
                className={`absolute inset-x-3 -bottom-0.5 h-px origin-center bg-gradient-to-r from-violet-500 to-cyan-400 transition-transform ${active === link.id ? "scale-x-100" : "scale-x-0"}`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            onClick={startProject}
            className="nav-desktop-cta premium-button premium-button-primary min-h-11 px-5"
          >
            {copy.start}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? copy.close : copy.menu}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 text-white xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-3 top-[4.9rem] overflow-hidden rounded-2xl border border-white/10 bg-[#081123]/98 p-5 shadow-2xl backdrop-blur-md sm:inset-x-5"
            dir={dir}
          >
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {links.map((link, index) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center justify-between border-b border-white/6 px-2 text-lg ${active === link.id ? "text-cyan-300" : "text-white"}`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-[0.65rem] text-slate-600">0{index + 1}</span>
                </a>
              ))}
            </nav>
            <div className="mt-5 flex items-center gap-3 sm:hidden">
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              onClick={startProject}
              className="premium-button premium-button-primary mt-5 w-full justify-center"
            >
              {copy.start}
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

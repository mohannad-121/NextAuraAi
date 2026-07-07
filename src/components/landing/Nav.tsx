import { motion } from "framer-motion";
import { LanguageSwitcher, useLanguage } from "@/i18n/translations";
import { BrandSymbol } from "@/components/landing/BrandSymbol";

type NavProps = {
  onStartProject: () => void;
};

export function Nav({ onStartProject }: NavProps) {
  const { tr } = useLanguage();
  const links = [
    { href: "#home", label: tr.nav.home },
    { href: "#services", label: tr.nav.services },
    { href: "#work", label: tr.nav.work },
    { href: "#team", label: tr.nav.team },
    { href: "#contact", label: tr.nav.contact },
  ];
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5"
    >
      <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl glass px-3 py-2.5 sm:mt-4 sm:px-5 sm:py-3">
        <a href="#home" className="flex min-h-11 items-center">
          <BrandSymbol imageClassName="w-14 sm:w-[4.5rem] md:w-[4.75rem]" />
        </a>
        <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>
        <button type="button" onClick={onStartProject} className="btn-primary inline-flex min-h-10 items-center rounded-full px-4 text-sm">
          <span className="sm:hidden">{tr.nav.startShort}</span>
          <span className="hidden sm:inline">{tr.nav.start}</span>
        </button>
      </div>
    </motion.header>
  );
}

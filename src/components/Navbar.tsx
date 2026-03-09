import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import NexovLogo from "@/components/NexovLogo";
import { Link } from "react-router-dom";
import { useBooking } from "@/contexts/BookingContext";
import { useLanguage, Lang } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const booking = useBooking();
  const { lang, setLang, t } = useLanguage();

  const prefix = lang === "en" ? "/en" : "";

  const navLinks = [
    { label: t("nav.services"), href: `${prefix}/#servicios` },
    { label: t("nav.process"), href: `${prefix}/#proceso` },
    { label: t("nav.about"), href: `${prefix}/#nosotros` },
    { label: t("nav.contact"), href: `${prefix}/#contacto` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = (newLang: Lang) => {
    if (newLang !== lang) setLang(newLang);
  };

  const renderLink = (link: { label: string; href: string }, mobile = false) => {
    const cls = `${mobile ? "block " : ""}text-sm font-medium text-muted-foreground hover:text-foreground transition-colors`;
    if (link.href.startsWith("/") && !link.href.includes("#")) {
      return (
        <Link key={link.href} to={link.href} className={cls} onClick={() => mobile && setOpen(false)}>
          {link.label}
        </Link>
      );
    }
    return (
      <a key={link.href} href={link.href} className={cls} onClick={() => mobile && setOpen(false)}>
        {link.label}
      </a>
    );
  };

  const LangSwitcher = () => (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => toggleLang("es")}
        className={`transition-colors ${lang === "es" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        ES
      </button>
      <span className="text-muted-foreground/50">|</span>
      <button
        onClick={() => toggleLang("en")}
        className={`transition-colors ${lang === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        EN
      </button>
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to={prefix || "/"} className="flex items-center">
          <NexovLogo size="md" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => renderLink(link))}
        </div>

        {/* Desktop CTA + Lang */}
        <div className="hidden md:flex items-center gap-4">
          <LangSwitcher />
          <Button size="sm" className="font-semibold" onClick={booking.open}>
            {t("nav.bookCall")}
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 pb-6 pt-2 space-y-4">
          {navLinks.map((link) => renderLink(link, true))}
          <div className="pt-2">
            <LangSwitcher />
          </div>
          <Button size="sm" className="w-full font-semibold" onClick={() => { setOpen(false); booking.open(); }}>
            {t("nav.bookCall")}
          </Button>
        </div>
      )}
    </nav>
  );
}

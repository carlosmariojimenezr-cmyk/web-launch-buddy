import { Instagram, Linkedin, Mail } from "lucide-react";
import NexovLogo from "@/components/NexovLogo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-12 bg-secondary/10">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center mb-3"><NexovLogo size="sm" /></a>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.tagline")}</p>
            <p className="font-mono text-xs text-muted-foreground/40 tracking-[0.2em] mt-2">AI · WEB · AUTOMATION</p>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4">{t("footer.servicesTitle")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#servicios" className="hover:text-foreground transition-colors">{t("footer.agents")}</a></li>
              <li><a href="#servicios" className="hover:text-foreground transition-colors">{t("footer.consulting")}</a></li>
              <li><a href="#servicios" className="hover:text-foreground transition-colors">{t("footer.web")}</a></li>
              <li><a href="#servicios" className="hover:text-foreground transition-colors">{t("footer.automations")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4">{t("footer.companyTitle")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#nosotros" className="hover:text-foreground transition-colors">{t("footer.about")}</a></li>
              <li><a href="#proceso" className="hover:text-foreground transition-colors">{t("footer.process")}</a></li>
              <li><a href="#contacto" className="hover:text-foreground transition-colors">{t("footer.contact")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4">{t("footer.contactTitle")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:hola@nexov.co" className="hover:text-foreground transition-colors">hola@nexov.co</a></li>
              {/* TODO: Reemplazar con número real de WhatsApp */}
              <li><a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">WhatsApp</a></li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="mailto:hola@nexov.co" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NEXOV. {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}

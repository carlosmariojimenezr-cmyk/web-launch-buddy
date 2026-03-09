import { Instagram, Linkedin, Mail } from "lucide-react";
import NexovLogo from "@/components/NexovLogo";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-secondary/10">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-primary rounded-sm" />
              <span className="font-display text-xl font-bold tracking-tight">NEXOV</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              IA y automatización para PYMEs colombianas.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#servicios" className="hover:text-foreground transition-colors">Agentes IA</a></li>
              <li><a href="#servicios" className="hover:text-foreground transition-colors">Asesoría</a></li>
              <li><a href="#servicios" className="hover:text-foreground transition-colors">Páginas Web</a></li>
              <li><a href="#servicios" className="hover:text-foreground transition-colors">Automatizaciones</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#nosotros" className="hover:text-foreground transition-colors">Nosotros</a></li>
              <li><a href="#proceso" className="hover:text-foreground transition-colors">Proceso</a></li>
              <li><a href="#casos" className="hover:text-foreground transition-colors">Casos de éxito</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:hola@nexov.co" className="hover:text-foreground transition-colors">hola@nexov.co</a></li>
              <li><a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">WhatsApp</a></li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:hola@nexov.co" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NEXOV. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

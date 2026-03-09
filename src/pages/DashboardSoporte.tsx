import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardSoporte() {
  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
        Soporte
      </h1>
      <p className="text-muted-foreground mb-8">
        ¿Necesitas ayuda? Nuestro equipo está disponible para asistirte.
      </p>

      <div className="bg-card border border-border rounded-xl p-8 text-center max-w-md">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="text-primary" size={22} />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Escríbenos por WhatsApp</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Respondemos en menos de 1 hora durante horario laboral.
        </p>
        <Button asChild className="font-semibold gap-2">
          <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} />
            Abrir WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">
            Tecnología para PYMEs colombianas
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.9] tracking-tight mb-6">
          Hacemos que la{" "}
          <span className="text-gradient">IA trabaje</span>
          <br />
          para tu negocio
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Agentes inteligentes, automatizaciones y desarrollo web que transforman
          la operación de tu empresa. Sin complicaciones.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="text-base font-semibold px-8 gap-2">
            <a href="#contacto">
              Agendar una llamada gratis
              <ArrowRight size={18} />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base font-semibold px-8 gap-2 border-muted-foreground/30 text-foreground hover:bg-secondary">
            <a href="#servicios">
              <Play size={16} />
              Ver servicios
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

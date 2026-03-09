import { MessageSquare, PenTool, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Conversamos",
    description: "Entendemos tu negocio, tus retos y tus objetivos. Sin jerga técnica, sin compromiso.",
  },
  {
    num: "02",
    icon: PenTool,
    title: "Diseñamos",
    description: "Creamos una propuesta personalizada con las soluciones que realmente necesitas.",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Implementamos",
    description: "Construimos, integramos y entregamos. Tú ves resultados desde la primera semana.",
  },
];

export default function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="proceso" className="py-24 md:py-32 bg-secondary/20">
      <div className="container" ref={ref}>
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            Proceso
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">
            Así trabajamos
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <span className="font-display text-7xl md:text-8xl font-extrabold text-primary/10 absolute -top-6 left-1/2 -translate-x-1/2 select-none">
                {step.num}
              </span>
              <div className="relative z-10 pt-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Button asChild size="lg" className="font-semibold px-8">
            <a href="#contacto">Empezar con el paso 1</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

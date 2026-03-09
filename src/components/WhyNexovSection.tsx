import { Languages, Building2, Target, HeartHandshake } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const reasons = [
  {
    icon: Languages,
    title: "Hablamos tu idioma",
    description: "Nada de jerga técnica. Te explicamos todo de forma clara y directa.",
  },
  {
    icon: Building2,
    title: "Hechos para PYMEs",
    description: "Soluciones a la medida de tu presupuesto y tu operación.",
  },
  {
    icon: Target,
    title: "Resultados, no promesas",
    description: "Medimos todo. Te mostramos el impacto real en tu negocio.",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento real",
    description: "No desaparecemos después de entregar. Estamos contigo a largo plazo.",
  },
];

export default function WhyNexovSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="nosotros" className="py-24 md:py-32">
      <div className="container" ref={ref}>
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            Por qué elegirnos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">
            ¿Por qué NEXOV?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`text-center p-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-2">
                {r.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

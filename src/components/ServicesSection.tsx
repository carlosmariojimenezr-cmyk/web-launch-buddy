import { Bot, BrainCircuit, Globe, Zap, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: Bot,
    title: "Agentes IA",
    subtitle: "WhatsApp & Web",
    description: "Chatbots inteligentes que atienden, venden y resuelven 24/7. Integrados con tu CRM y canales de comunicación.",
    popular: true,
  },
  {
    icon: BrainCircuit,
    title: "Asesoría en IA",
    subtitle: "Estrategia",
    description: "Te ayudamos a identificar dónde la inteligencia artificial puede generar mayor impacto en tu negocio.",
    popular: false,
  },
  {
    icon: Globe,
    title: "Páginas Web",
    subtitle: "Diseño & Desarrollo",
    description: "Sitios rápidos, modernos y optimizados para convertir visitantes en clientes. Desde landing pages hasta e-commerce.",
    popular: false,
  },
  {
    icon: Zap,
    title: "Automatizaciones",
    subtitle: "Flujos inteligentes",
    description: "Conectamos tus herramientas y eliminamos tareas repetitivas. Más productividad, menos errores manuales.",
    popular: false,
  },
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="servicios" className="py-24 md:py-32">
      <div className="container" ref={ref}>
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            Servicios
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">
            Lo que hacemos por ti
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`group relative p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-500 cursor-default ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {s.popular && (
                <Badge className="absolute -top-3 right-4 text-[10px] font-mono uppercase tracking-wider shadow-lg shadow-primary/20">
                  Más popular
                </Badge>
              )}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                {s.title}
              </h3>
              <p className="text-xs font-mono text-primary mt-1 mb-3">{s.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {s.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Saber más <ArrowRight size={12} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

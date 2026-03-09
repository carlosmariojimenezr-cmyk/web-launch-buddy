import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const metrics = [
  { value: 300, suffix: "%", prefix: "+", label: "Respuestas automatizadas" },
  { value: 60, suffix: "%", prefix: "-", label: "Tiempo en tareas manuales" },
  { value: 45, suffix: "%", prefix: "+", label: "Conversiones en ventas" },
  { value: 24, suffix: "/7", prefix: "", label: "Atención sin descanso" },
];

function AnimatedCounter({ target, prefix, suffix, active }: { target: number; prefix: string; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return (
    <span className="font-display text-5xl md:text-6xl font-extrabold text-primary">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function CasesSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="casos" className="py-24 md:py-32 bg-secondary/20">
      <div className="container" ref={ref}>
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            Resultados
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">
            Casos de éxito
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Estos son los resultados que hemos logrado con nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} active={isVisible} />
              <p className="text-sm text-muted-foreground mt-2">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

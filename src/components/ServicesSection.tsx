import { Bot, BrainCircuit, Globe, Zap, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

const icons = [Bot, BrainCircuit, Globe, Zap];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { lang, t } = useLanguage();
  const cards = translations[lang].services.cards;

  return (
    <section id="servicios" className="py-16 md:py-20">
      <div className="container" ref={ref}>
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            {t("services.tag")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">
            {t("services.headline")}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((s, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className={`group relative p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-500 cursor-default ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {i === 0 && (
                  <Badge className="absolute -top-3 right-4 text-[10px] font-mono uppercase tracking-wider shadow-lg shadow-primary/20">
                    {t("services.popular")}
                  </Badge>
                )}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight">{s.title}</h3>
                <p className="text-xs font-mono text-primary mt-1 mb-3">{s.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("services.learnMore")} <ArrowRight size={12} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

export default function CasesSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { lang, t } = useLanguage();
  const scenarios = translations[lang].cases.scenarios;

  return (
    <section id="resultados" className="py-16 md:py-20 bg-secondary/20 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px]" />

      <div className="container relative" ref={ref}>
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">{t("cases.tag")}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">{t("cases.headline")}</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">{t("cases.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {scenarios.map((s, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-500 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="font-display text-5xl font-bold text-primary block mb-3">{s.number}</span>
              <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

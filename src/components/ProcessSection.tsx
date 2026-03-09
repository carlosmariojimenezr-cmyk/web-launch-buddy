import { MessageSquare, PenTool, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

const icons = [MessageSquare, PenTool, Rocket];

export default function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { lang, t } = useLanguage();
  const steps = translations[lang].process.steps;

  return (
    <section id="proceso" className="py-24 md:py-32 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/3 blur-[150px]" />

      <div className="container relative" ref={ref}>
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">{t("process.tag")}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">{t("process.headline")}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto relative">
          <div className="hidden md:block absolute top-[72px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div
                key={step.num}
                className={`relative text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <span className="font-display text-7xl md:text-8xl font-extrabold text-primary/8 absolute -top-6 left-1/2 -translate-x-1/2 select-none pointer-events-none">
                  {step.num}
                </span>
                <div className="relative z-10 pt-8">
                  <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-14">
          <Button asChild size="lg" className="font-semibold px-8 shadow-lg shadow-primary/20">
            <a href="#contacto">{t("process.cta")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

import { Bot, BrainCircuit, Globe, Zap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import { MotionSection, StaggerContainer, StaggerItem, MotionDiv } from "@/components/MotionComponents";

const icons = [Bot, BrainCircuit, Globe, Zap];

export default function ServicesSection() {
  const { lang, t } = useLanguage();
  const cards = translations[lang].services.cards;

  return (
    <MotionSection id="servicios" className="py-16 md:py-20" variant="fadeIn">
      <div className="container">
        <MotionDiv className="text-center mb-16">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            {t("services.tag")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">
            {t("services.headline")}
          </h2>
        </MotionDiv>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((s, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={i}>
                <div className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-500 cursor-default h-full">
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
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    {t("services.learnMore")} <ArrowRight size={12} />
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </MotionSection>
  );
}

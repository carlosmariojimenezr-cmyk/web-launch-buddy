import { Languages, Building2, Target, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import { MotionSection, StaggerContainer, StaggerItem, MotionDiv } from "@/components/MotionComponents";

const icons = [Languages, Building2, Target, HeartHandshake];

export default function WhyNexovSection() {
  const { lang, t } = useLanguage();
  const reasons = translations[lang].whyNexov.reasons;

  return (
    <MotionSection id="nosotros" className="py-16 md:py-20" variant="fadeIn">
      <div className="container">
        <MotionDiv className="text-center mb-16">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">{t("whyNexov.tag")}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">{t("whyNexov.headline")}</h2>
        </MotionDiv>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {reasons.map((r, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={i} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </MotionSection>
  );
}

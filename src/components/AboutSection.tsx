import { useLanguage } from "@/contexts/LanguageContext";
import NexovLogo from "@/components/NexovLogo";
import { MotionSection, MotionDiv } from "@/components/MotionComponents";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <MotionSection id="about" className="py-16 md:py-20" variant="fadeIn">
      <div className="container">
        <MotionDiv className="text-center mb-12">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">{t("about.tag")}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">{t("about.headline")}</h2>
        </MotionDiv>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
          <MotionDiv variant="slideLeft" delay={0.2} className="space-y-5">
            <p className="text-muted-foreground leading-relaxed">{t("about.p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("about.p2")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("about.p3")}</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
              <span className="font-mono text-xs text-muted-foreground tracking-wide">{t("about.badge")}</span>
            </div>
          </MotionDiv>

          <MotionDiv variant="slideRight" delay={0.3} className="flex items-center justify-center">
            <div className="w-full max-w-sm aspect-square rounded-xl bg-card border border-border flex items-center justify-center">
              <div className="opacity-30">
                <NexovLogo size="lg" />
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}

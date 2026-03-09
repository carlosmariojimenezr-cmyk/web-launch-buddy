import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const booking = useBooking();
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />

      <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">
            {t("hero.badge")}
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.9] tracking-tight mb-6">
          {t("hero.headline1")}{" "}
          <span className="text-gradient">{t("hero.headlineHighlight")}</span>{" "}
          {t("hero.headline2")}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("hero.description")}{" "}
          <span className="text-foreground font-medium">{t("hero.descriptionBold")}</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="text-base font-semibold px-8 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow" onClick={booking.open}>
            {t("hero.cta")}
            <ArrowRight size={18} />
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base font-semibold px-8 gap-2 border-muted-foreground/30 text-foreground hover:bg-secondary">
            <a href="#servicios">
              <Play size={16} />
              {t("hero.ctaSecondary")}
            </a>
          </Button>
        </div>

        <div className="mt-16 md:mt-24 flex flex-col items-center gap-2 animate-bounce opacity-40">
          <span className="text-xs font-mono text-muted-foreground">{t("hero.scroll")}</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </section>
  );
}

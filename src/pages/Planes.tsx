import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, X, Zap, Star, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBooking } from "@/contexts/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MotionSection, MotionDiv, StaggerContainer, StaggerItem } from "@/components/MotionComponents";
import { cn } from "@/lib/utils";

const plans = [
  {
    key: "basic",
    icon: Zap,
    features: [
      "chatbot",
      "whatsapp",
      "basicAutomations",
      "landingPage",
      "emailSupport",
    ],
    excluded: ["advancedAutomations", "customIntegrations", "prioritySupport", "dedicatedManager", "customDev"],
  },
  {
    key: "pro",
    icon: Star,
    popular: true,
    features: [
      "chatbot",
      "whatsapp",
      "basicAutomations",
      "advancedAutomations",
      "landingPage",
      "customIntegrations",
      "prioritySupport",
    ],
    excluded: ["dedicatedManager", "customDev"],
  },
  {
    key: "enterprise",
    icon: Building2,
    features: [
      "chatbot",
      "whatsapp",
      "basicAutomations",
      "advancedAutomations",
      "landingPage",
      "customIntegrations",
      "prioritySupport",
      "dedicatedManager",
      "customDev",
    ],
    excluded: [],
  },
];

export default function Planes() {
  const [annual, setAnnual] = useState(false);
  const { t, lang } = useLanguage();
  const booking = useBooking();
  const prefix = lang === "en" ? "/en" : "";

  const prices = {
    basic: { monthly: 299000, annual: 249000 },
    pro: { monthly: 699000, annual: 579000 },
    enterprise: { monthly: 0, annual: 0 },
  };

  const formatPrice = (amount: number) => {
    if (amount === 0) return t("pricing.custom");
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSelectPlan = (planKey: string) => {
    // Future Wompi integration point
    if (planKey === "enterprise") {
      booking.open();
    } else {
      booking.open();
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("pricing.seoTitle")}</title>
        <meta name="description" content={t("pricing.seoDesc")} />
        <link rel="canonical" href={`https://nexov.lovable.app${prefix}/planes`} />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        {/* Hero */}
        <MotionSection className="pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="container text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              {t("pricing.tag")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {t("pricing.headline")}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              {t("pricing.subtitle")}
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={cn("text-sm font-medium transition-colors", !annual ? "text-foreground" : "text-muted-foreground")}>
                {t("pricing.monthly")}
              </span>
              <Switch checked={annual} onCheckedChange={setAnnual} />
              <span className={cn("text-sm font-medium transition-colors", annual ? "text-foreground" : "text-muted-foreground")}>
                {t("pricing.annual")}
              </span>
              {annual && (
                <span className="ml-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {t("pricing.save")}
                </span>
              )}
            </div>
          </div>
        </MotionSection>

        {/* Plans Grid */}
        <section className="pb-20 md:pb-28">
          <StaggerContainer className="container grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const price = prices[plan.key as keyof typeof prices];
              const currentPrice = annual ? price.annual : price.monthly;
              const isPro = plan.popular;

              return (
                <StaggerItem key={plan.key}>
                  <div
                    className={cn(
                      "relative flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-300 h-full",
                      isPro
                        ? "border-primary bg-primary/5 shadow-[0_0_40px_-12px_hsl(var(--primary)/0.3)]"
                        : "border-border bg-card hover:border-muted-foreground/30"
                    )}
                  >
                    {isPro && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                          {t("pricing.mostPopular")}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        isPro ? "bg-primary/20" : "bg-muted"
                      )}>
                        <plan.icon className={cn("w-5 h-5", isPro ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold">{t(`pricing.plans.${plan.key}.name`)}</h3>
                        <p className="text-xs text-muted-foreground">{t(`pricing.plans.${plan.key}.tagline`)}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-3xl md:text-4xl font-bold">
                          {formatPrice(currentPrice)}
                        </span>
                        {currentPrice > 0 && (
                          <span className="text-sm text-muted-foreground">/{t("pricing.perMonth")}</span>
                        )}
                      </div>
                      {currentPrice > 0 && annual && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {t("pricing.billedAnnually")}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-6">
                      {t(`pricing.plans.${plan.key}.description`)}
                    </p>

                    <div className="flex-1 space-y-3 mb-8">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm">{t(`pricing.features.${f}`)}</span>
                        </div>
                      ))}
                      {plan.excluded.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 opacity-40">
                          <X className="w-4 h-4 mt-0.5 shrink-0" />
                          <span className="text-sm line-through">{t(`pricing.features.${f}`)}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={cn(
                        "w-full font-semibold",
                        isPro ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                      size="lg"
                      onClick={() => handleSelectPlan(plan.key)}
                    >
                      {plan.key === "enterprise" ? t("pricing.contactSales") : t("pricing.selectPlan")}
                    </Button>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>

        {/* FAQ / Guarantee */}
        <MotionSection className="pb-20 md:pb-28">
          <div className="container max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                {t("pricing.guaranteeTitle")}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                {t("pricing.guaranteeDesc")}
              </p>
              <Button variant="outline" onClick={booking.open}>
                {t("pricing.guaranteeCta")}
              </Button>
            </div>
          </div>
        </MotionSection>

        <Footer />
      </div>
    </>
  );
}

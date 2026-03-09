import { useState, useMemo } from "react";
import { ArrowRight, MessageCircle, Clock, Bot, Wifi } from "lucide-react";
import { ArrowRight, MessageCircle, Clock, Bot, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { useLanguage } from "@/contexts/LanguageContext";

const AUTOMATION_RATE = 0.6;
const WEEKS_PER_MONTH = 4;
const AI_MESSAGE_RATE = 0.7;
const TEAM_MULTIPLIER = 2;

const employeeOptions = ["1-5", "6-15", "16-30", "30+"] as const;

function getEmployeeCount(option: string): number {
  switch (option) {
    case "1-5": return 3;
    case "6-15": return 10;
    case "16-30": return 23;
    case "30+": return 40;
    default: return 10;
  }
}

export default function ROICalculator() {
  const { ref, isVisible } = useScrollAnimation();
  const booking = useBooking();
  const { t } = useLanguage();
  const [messages, setMessages] = useState(500);
  const [hours, setHours] = useState(15);
  const [employees, setEmployees] = useState<string>("6-15");
  const [webStatus, setWebStatus] = useState<string>("opt2");

  const webOptions = [
    { key: "opt1", label: t("calculator.webOpt1") },
    { key: "opt2", label: t("calculator.webOpt2") },
    { key: "opt3", label: t("calculator.webOpt3") },
  ];

  const results = useMemo(() => {
    const hoursSaved = Math.round(hours * AUTOMATION_RATE * WEEKS_PER_MONTH);
    const messagesAutomated = Math.round(messages * AI_MESSAGE_RATE);
    const empCount = getEmployeeCount(employees);
    return { hoursSaved, messagesAutomated, empCount, empMultiplied: empCount * TEAM_MULTIPLIER };
  }, [messages, hours, employees]);

  const whatsappText = encodeURIComponent(
    t("calculator.whatsappMsg")
      .replace("{hours}", String(results.hoursSaved))
      .replace("{messages}", String(results.messagesAutomated))
      .replace("{emp}", String(results.empCount))
      .replace("{empX}", String(results.empMultiplied))
  );

  return (
    <section id="calculadora" className="py-16 md:py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px]" />

      <div className="container max-w-5xl relative">
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="font-mono text-xs text-primary uppercase tracking-widest">{t("calculator.tag")}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">{t("calculator.headline")}</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">{t("calculator.subtitle")}</p>
        </div>

        <div className={`rounded-2xl border border-border bg-card p-8 md:p-12 lg:p-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "150ms" }}>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Inputs */}
            <div className="space-y-8">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-1">{t("calculator.q1")}</label>
                <p className="text-xs text-muted-foreground mb-3">{t("calculator.q1sub")}</p>
                <div className="text-3xl font-bold text-primary mb-2 tabular-nums transition-all duration-300">{messages.toLocaleString()}</div>
                <input type="range" min={50} max={5000} step={50} value={messages} onChange={(e) => setMessages(Number(e.target.value))} className="w-full roi-slider" />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1"><span>50</span><span>5,000</span></div>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-1">{t("calculator.q2")}</label>
                <p className="text-xs text-muted-foreground mb-3">{t("calculator.q2sub")}</p>
                <div className="text-3xl font-bold text-primary mb-2 tabular-nums transition-all duration-300">{hours}</div>
                <input type="range" min={2} max={40} step={2} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full roi-slider" />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1"><span>2</span><span>40</span></div>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-3">{t("calculator.q3")}</label>
                <div className="flex flex-wrap gap-2">
                  {employeeOptions.map((opt) => (
                    <button key={opt} onClick={() => setEmployees(opt)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${employees === opt ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border text-muted-foreground hover:border-primary/40"}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-3">{t("calculator.q4")}</label>
                <div className="flex flex-wrap gap-2">
                  {webOptions.map((opt) => (
                    <button key={opt.key} onClick={() => setWebStatus(opt.key)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${webStatus === opt.key ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border text-muted-foreground hover:border-primary/40"}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-5">
              <div className="lg:hidden h-px bg-border" />
              <div className="rounded-xl bg-secondary border border-border p-6 transition-all duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Clock className="w-5 h-5 text-primary" /></div>
                  <span className="text-sm font-semibold text-foreground">{t("calculator.timeSaved")}</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary tabular-nums transition-all duration-500">{results.hoursSaved}</div>
                <p className="text-sm text-muted-foreground mt-1">{t("calculator.timeSavedDesc")}</p>
              </div>
              <div className="rounded-xl bg-secondary border border-border p-6 transition-all duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Bot className="w-5 h-5 text-primary" /></div>
                  <span className="text-sm font-semibold text-foreground">{t("calculator.messagesAuto")}</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary tabular-nums transition-all duration-500">{results.messagesAutomated.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-1">{t("calculator.messagesAutoDesc")}</p>
              </div>
              <div className="rounded-xl bg-secondary border border-border p-6 transition-all duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Wifi className="w-5 h-5 text-primary" /></div>
                  <span className="text-sm font-semibold text-foreground">{t("calculator.availability")}</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary">24/7</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("calculator.availabilityDesc")}
                  {webStatus === "opt1" && <span className="block text-primary/80 mt-1">{t("calculator.webBonus")}</span>}
                </p>
              </div>

              <p className="text-sm text-foreground leading-relaxed mt-2">
                {t("calculator.summary")}{" "}
                <strong className="text-primary">{results.empCount}</strong> {t("calculator.summaryPeople")}{" "}
                <strong className="text-primary">{results.empMultiplied}</strong>{t("calculator.summaryAttending")}{" "}
                <strong className="text-primary">{results.messagesAutomated.toLocaleString()}</strong> {t("calculator.summaryMessages")}{" "}
                <strong className="text-primary">{results.hoursSaved}</strong> {t("calculator.summaryHours")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Button size="lg" className="font-semibold gap-2 flex-1 shadow-lg shadow-primary/20" onClick={booking.open}>
                  {t("calculator.ctaPrimary")} <ArrowRight size={16} />
                </Button>
                <Button variant="outline" size="lg" className="font-semibold gap-2 flex-1 border-primary/30 text-primary hover:bg-primary/10" asChild>
                  <a href={`https://wa.me/573000000000?text=${whatsappText}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={16} /> {t("calculator.ctaWhatsApp")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

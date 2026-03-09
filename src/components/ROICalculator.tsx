import { useState, useMemo } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, MessageCircle, Clock, Bot, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";

// ── Calculation constants (easy to adjust) ──
const AUTOMATION_RATE = 0.6;   // 60% of repetitive hours saved
const WEEKS_PER_MONTH = 4;
const AI_MESSAGE_RATE = 0.7;   // 70% of messages handled by AI
const TEAM_MULTIPLIER = 2;     // team operates as X×2

const employeeOptions = ["1-5", "6-15", "16-30", "30+"] as const;
const webOptions = ["No tengo", "Sí, pero necesita mejoras", "Sí, está bien"] as const;

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
  const [messages, setMessages] = useState(500);
  const [hours, setHours] = useState(15);
  const [employees, setEmployees] = useState<string>("6-15");
  const [webStatus, setWebStatus] = useState<string>("Sí, pero necesita mejoras");

  const results = useMemo(() => {
    const hoursSaved = Math.round(hours * AUTOMATION_RATE * WEEKS_PER_MONTH);
    const messagesAutomated = Math.round(messages * AI_MESSAGE_RATE);
    const empCount = getEmployeeCount(employees);
    return { hoursSaved, messagesAutomated, empCount, empMultiplied: empCount * TEAM_MULTIPLIER };
  }, [messages, hours, employees]);

  const whatsappText = encodeURIComponent(
    `¡Hola NEXOV! Usé su calculadora de ROI y estos son mis resultados:\n` +
    `• ${results.hoursSaved} horas/mes ahorradas\n` +
    `• ${results.messagesAutomated} mensajes automatizados\n` +
    `• Equipo de ${results.empCount} operando como ${results.empMultiplied}\n` +
    `Me gustaría saber más sobre cómo implementar esto.`
  );

  return (
    <section id="calculadora" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px]" />

      <div className="container max-w-5xl relative">
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            Herramienta gratuita
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">
            Calcula cuánto podrías ahorrar con IA y automatización
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Responde 4 preguntas sobre tu negocio y descubre el impacto potencial.
          </p>
        </div>

        <div
          className={`rounded-2xl border border-border bg-card p-8 md:p-12 lg:p-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "150ms" }}
        >
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            {/* ── Inputs ── */}
            <div className="space-y-8">
              {/* Messages slider */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-1">
                  ¿Cuántos mensajes de clientes recibes al mes?
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  WhatsApp, redes sociales, email, llamadas
                </p>
                <div className="text-3xl font-bold text-primary mb-2 tabular-nums transition-all duration-300">
                  {messages.toLocaleString()}
                </div>
                <input
                  type="range"
                  min={50} max={5000} step={50}
                  value={messages}
                  onChange={(e) => setMessages(Number(e.target.value))}
                  className="w-full roi-slider"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>50</span><span>5,000</span>
                </div>
              </div>

              {/* Hours slider */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-1">
                  ¿Cuántas horas semanales dedicas a tareas repetitivas?
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  Facturación, reportes, seguimientos, copiar datos...
                </p>
                <div className="text-3xl font-bold text-primary mb-2 tabular-nums transition-all duration-300">
                  {hours}
                </div>
                <input
                  type="range"
                  min={2} max={40} step={2}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full roi-slider"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>2</span><span>40</span>
                </div>
              </div>

              {/* Employees */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-3">
                  ¿Cuántos empleados tienes?
                </label>
                <div className="flex flex-wrap gap-2">
                  {employeeOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setEmployees(opt)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        employees === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Web status */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-3">
                  ¿Tienes página web actualmente?
                </label>
                <div className="flex flex-wrap gap-2">
                  {webOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setWebStatus(opt)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        webStatus === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Results ── */}
            <div className="flex flex-col gap-5">
              <div className="lg:hidden h-px bg-border" />

              {/* Card 1 */}
              <div className="rounded-xl bg-secondary border border-border p-6 transition-all duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Tiempo ahorrado</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary tabular-nums transition-all duration-500">
                  {results.hoursSaved}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  horas al mes que podrías recuperar con automatización
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-xl bg-secondary border border-border p-6 transition-all duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Mensajes automatizados</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary tabular-nums transition-all duration-500">
                  {results.messagesAutomated.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  mensajes atendidos automáticamente por IA
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-xl bg-secondary border border-border p-6 transition-all duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Wifi className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Disponibilidad</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary">24/7</div>
                <p className="text-sm text-muted-foreground mt-1">
                  atención continua sin contratar personal adicional
                  {webStatus === "No tengo" && (
                    <span className="block text-primary/80 mt-1">+ una web profesional generando leads</span>
                  )}
                </p>
              </div>

              {/* Summary */}
              <p className="text-sm text-foreground leading-relaxed mt-2">
                Con las soluciones de NEXOV, tu equipo de{" "}
                <strong className="text-primary">{results.empCount}</strong> personas podría operar como uno de{" "}
                <strong className="text-primary">{results.empMultiplied}</strong>, atendiendo{" "}
                <strong className="text-primary">{results.messagesAutomated.toLocaleString()}</strong> mensajes
                automáticamente y ahorrando{" "}
                <strong className="text-primary">{results.hoursSaved}</strong> horas cada mes.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Button asChild size="lg" className="font-semibold gap-2 flex-1 shadow-lg shadow-primary/20">
                  <a href="#contacto">
                    Quiero estos resultados
                    <ArrowRight size={16} />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="font-semibold gap-2 flex-1 border-primary/30 text-primary hover:bg-primary/10"
                  asChild
                >
                  <a
                    href={`https://wa.me/573000000000?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={16} />
                    Enviar por WhatsApp
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

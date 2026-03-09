import { useState, useEffect, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Check, CalendarDays } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"];
const DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday-based
}

export default function BookingModal() {
  const { isOpen, close } = useBooking();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", empresa: "", telefono: "" });

  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
        setSelectedDay(null);
        setSelectedTime(null);
        setForm({ nombre: "", email: "", empresa: "", telefono: "" });
      }, 300);
    }
  }, [isOpen]);

  const calendarData = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
    return { daysInMonth, firstDay };
  }, [viewYear, viewMonth]);

  const monthName = new Date(viewYear, viewMonth).toLocaleDateString("es-CO", { month: "long", year: "numeric" });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
    setSelectedDay(null);
  };

  const isToday = (day: number) =>
    viewYear === now.getFullYear() && viewMonth === now.getMonth() && day === now.getDate();

  const isPast = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return date < today;
  };

  const isWeekend = (day: number) => {
    const d = new Date(viewYear, viewMonth, day).getDay();
    return d === 0 || d === 6;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="p-8 md:p-10">
          {submitted ? (
            /* Success state */
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-5">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                ¡Tu cita ha sido agendada!
              </h3>
              <p className="text-muted-foreground mt-3 max-w-sm mx-auto">
                Te enviaremos un email de confirmación con los detalles de tu llamada.
              </p>
              <button className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
                <CalendarDays size={14} />
                Agregar al calendario
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
                  Agenda tu llamada gratuita
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  30 minutos para entender tu negocio y proponerte soluciones concretas.
                </p>
              </div>

              {/* REPLACE WITH: <InlineWidget url='https://calendly.com/nexov/30min' /> */}
              <div id="booking-embed">
                {/* Calendar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-semibold capitalize">{monthName}</span>
                    <button onClick={nextMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {DAYS.map((d) => (
                      <div key={d} className="text-center text-[10px] text-muted-foreground font-medium py-1">
                        {d}
                      </div>
                    ))}
                    {Array.from({ length: calendarData.firstDay }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: calendarData.daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const disabled = isPast(day) || isWeekend(day);
                      const selected = selectedDay === day;
                      const today = isToday(day);
                      return (
                        <button
                          key={day}
                          disabled={disabled}
                          onClick={() => setSelectedDay(day)}
                          className={`h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selected
                              ? "bg-primary text-primary-foreground"
                              : today
                              ? "bg-primary/10 text-primary border border-primary/30"
                              : disabled
                              ? "text-muted-foreground/30 cursor-not-allowed"
                              : "text-foreground hover:bg-secondary"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                {selectedDay && (
                  <div className="mb-6 animate-fade-in">
                    <p className="text-sm font-semibold mb-3">Horarios disponibles</p>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                            selectedTime === slot
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-secondary border-border text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Form */}
                {selectedTime && (
                  <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        required
                        className="bg-secondary border-border"
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="bg-secondary border-border"
                      />
                      <Input
                        placeholder="Empresa"
                        value={form.empresa}
                        onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                        className="bg-secondary border-border"
                      />
                      <Input
                        type="tel"
                        placeholder="Teléfono"
                        value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                        className="bg-secondary border-border"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full font-semibold gap-2">
                      Confirmar cita
                      <Check size={16} />
                    </Button>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

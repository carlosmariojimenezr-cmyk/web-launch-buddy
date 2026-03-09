import { Activity, Calendar, Clock, Mail } from "lucide-react";

const stats = [
  { label: "Estado del proyecto", value: "En progreso", icon: Activity, badge: true },
  { label: "Próxima entrega", value: "Mar 15, 2025", icon: Calendar },
  { label: "Horas invertidas", value: "47/120", icon: Clock },
  { label: "Mensajes sin leer", value: "2", icon: Mail },
];

const timeline = [
  { text: "Se completó el diseño de la página de inicio", time: "Hace 2 días" },
  { text: "Nueva versión del chatbot disponible para revisión", time: "Hace 4 días" },
  { text: "Reunión de seguimiento agendada para el viernes", time: "Hace 5 días" },
  { text: "Se configuró la integración con WhatsApp Business", time: "Hace 1 semana" },
  { text: "Kickoff del proyecto completado", time: "Hace 2 semanas" },
];

export default function DashboardHome() {
  const today = new Date().toLocaleDateString("es-CO", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
          Bienvenido, Juan
        </h1>
        <p className="text-sm text-muted-foreground capitalize mt-1">{today}</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <s.icon size={16} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            {s.badge ? (
              <span className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                {s.value}
              </span>
            ) : (
              <p className="text-lg font-bold text-foreground">{s.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Timeline */}
      <h2 className="font-display text-lg font-bold uppercase tracking-tight mb-5">Actividad reciente</h2>
      <div className="space-y-0">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-4 pb-6 last:pb-0">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-1.5" />
              {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
            </div>
            <div>
              <p className="text-sm text-foreground">{item.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

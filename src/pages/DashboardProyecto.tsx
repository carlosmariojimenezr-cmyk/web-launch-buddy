import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, Clock, RefreshCw } from "lucide-react";

interface Phase {
  name: string;
  status: "done" | "progress" | "pending";
  progress?: number;
  icon: typeof CheckCircle2;
  tasks: string[];
}

const phases: Phase[] = [
  {
    name: "Fase 1: Descubrimiento",
    status: "done",
    icon: CheckCircle2,
    tasks: ["Reunión de kickoff", "Análisis de requerimientos", "Benchmarking de competencia", "Definición de alcance"],
  },
  {
    name: "Fase 2: Diseño",
    status: "progress",
    progress: 60,
    icon: RefreshCw,
    tasks: ["Wireframes de la landing page", "Diseño de flujos del chatbot", "Prototipo interactivo", "Revisión con cliente"],
  },
  {
    name: "Fase 3: Desarrollo",
    status: "pending",
    icon: Clock,
    tasks: ["Desarrollo frontend", "Integración del chatbot", "Configuración de WhatsApp Business", "Testing interno"],
  },
  {
    name: "Fase 4: Testing",
    status: "pending",
    icon: Clock,
    tasks: ["QA funcional", "Testing de usuario", "Optimización de rendimiento", "Corrección de bugs"],
  },
  {
    name: "Fase 5: Lanzamiento",
    status: "pending",
    icon: Clock,
    tasks: ["Deploy a producción", "Monitoreo post-lanzamiento", "Capacitación del equipo", "Entrega de documentación"],
  },
];

const statusConfig = {
  done: { label: "Completada", color: "text-primary", bg: "bg-primary/10" },
  progress: { label: "En progreso", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  pending: { label: "Pendiente", color: "text-muted-foreground", bg: "bg-secondary" },
};

export default function DashboardProyecto() {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">
        Chatbot WhatsApp + Landing Page
      </h1>
      <p className="text-sm text-muted-foreground mb-8">Progreso general del proyecto</p>

      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">40% completado</span>
          <span className="text-xs text-muted-foreground">2 de 5 fases</span>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: "40%" }} />
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-3">
        {phases.map((phase, i) => {
          const config = statusConfig[phase.status];
          const isOpen = expanded === i;
          return (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-secondary/30 transition-colors"
              >
                {isOpen ? <ChevronDown size={16} className="text-muted-foreground shrink-0" /> : <ChevronRight size={16} className="text-muted-foreground shrink-0" />}
                <phase.icon size={16} className={config.color + " shrink-0"} />
                <span className="text-sm font-semibold text-foreground flex-1">{phase.name}</span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>
                  {phase.status === "progress" ? `En progreso (${phase.progress}%)` : config.label}
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-border">
                  {phase.status === "progress" && phase.progress && (
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-4">
                      <div className="h-full rounded-full bg-yellow-400 transition-all" style={{ width: `${phase.progress}%` }} />
                    </div>
                  )}
                  <ul className="space-y-2">
                    {phase.tasks.map((task, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        {phase.status === "done" ? (
                          <CheckCircle2 size={14} className="text-primary shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-border shrink-0" />
                        )}
                        <span className={phase.status === "done" ? "text-muted-foreground line-through" : "text-foreground"}>
                          {task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

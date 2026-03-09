import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const documents = [
  { name: "Propuesta comercial NEXOV.pdf", shared: "Compartido hace 3 semanas" },
  { name: "Wireframes v2.fig", shared: "Compartido hace 1 semana" },
  { name: "Guía de marca NEXOV.pdf", shared: "Compartido hace 2 semanas" },
];

export default function DashboardDocumentos() {
  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight mb-8">
        Documentos
      </h1>

      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileText size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.shared}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 border-border text-muted-foreground hover:text-foreground shrink-0">
              <Download size={14} />
              Descargar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

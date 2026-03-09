import { useState } from "react";
import { Send } from "lucide-react";

interface Msg {
  id: number;
  sender: "team" | "client";
  name: string;
  text: string;
  time: string;
}

const initialMessages: Msg[] = [
  { id: 1, sender: "team", name: "Ana — NEXOV", text: "¡Hola Juan! Bienvenido al proyecto. Aquí podremos comunicarnos durante todo el proceso.", time: "Hace 2 semanas" },
  { id: 2, sender: "client", name: "Juan Demo", text: "¡Perfecto! Estoy emocionado de arrancar. ¿Cuáles son los próximos pasos?", time: "Hace 2 semanas" },
  { id: 3, sender: "team", name: "Ana — NEXOV", text: "Te vamos a compartir los wireframes esta semana para que los revises. También agendamos una reunión de seguimiento para el viernes.", time: "Hace 1 semana" },
  { id: 4, sender: "team", name: "Ana — NEXOV", text: "Los wireframes están listos. Los subí a la sección de Documentos. ¿Los puedes revisar cuando tengas un momento?", time: "Hace 5 días" },
  { id: 5, sender: "client", name: "Juan Demo", text: "¡Se ven geniales! Tengo un par de comentarios sobre la sección de servicios, pero en general me encanta la dirección.", time: "Hace 4 días" },
  { id: 6, sender: "team", name: "Ana — NEXOV", text: "Perfecto, tomamos nota. Incorporamos los cambios y te compartimos la versión actualizada pronto. 🚀", time: "Hace 3 días" },
];

export default function DashboardMensajes() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "client", name: "Juan Demo", text: input.trim(), time: "Ahora" },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <h1 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6 shrink-0">
        Mensajes
      </h1>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
              msg.sender === "client"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-card border border-border text-foreground rounded-bl-md"
            }`}>
              <p className={`text-xs font-semibold mb-1 ${msg.sender === "client" ? "text-primary-foreground/70" : "text-primary"}`}>
                {msg.name}
              </p>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-1.5 ${msg.sender === "client" ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 disabled:opacity-40 hover:brightness-110 transition-all"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

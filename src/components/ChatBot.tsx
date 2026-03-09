import { useState, useEffect, useRef } from "react";
import { X, Send, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
  quickReplies?: string[];
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "bot",
  content:
    "Hola 👋 Soy el asistente de NEXOV. Puedo ayudarte con información sobre nuestros servicios de IA, automatización y desarrollo web. ¿En qué te puedo ayudar?",
  quickReplies: [
    "¿Qué servicios ofrecen?",
    "¿Cuánto cuesta?",
    "Quiero agendar una llamada",
  ],
};

function getResponse(userMessage: string): Message {
  const msg = userMessage.toLowerCase();
  const id = crypto.randomUUID();

  if (
    msg.includes("servicio") ||
    msg.includes("ofrecen") ||
    msg.includes("hacen")
  ) {
    return {
      id,
      role: "bot",
      content:
        "Ofrecemos 4 servicios principales:\n\n🤖 **Agentes de IA** para WhatsApp y web — chatbots que atienden clientes 24/7\n🧠 **Asesoría en IA** — te ayudamos a implementar inteligencia artificial en tu negocio\n🌐 **Páginas web** profesionales y optimizadas\n⚡ **Automatizaciones** — eliminamos tareas repetitivas\n\n¿Sobre cuál te gustaría saber más?",
      quickReplies: ["Agentes de IA", "Asesoría", "Páginas web", "Automatizaciones"],
    };
  }

  if (
    msg.includes("precio") ||
    msg.includes("cuesta") ||
    msg.includes("costo") ||
    msg.includes("cuánto") ||
    msg.includes("cuanto") ||
    msg.includes("tarifa")
  ) {
    return {
      id,
      role: "bot",
      content:
        "Cada proyecto es diferente, así que nuestros precios se ajustan a lo que realmente necesitas. No manejamos paquetes inflados.\n\nLo mejor es agendar una llamada gratuita de 30 minutos donde entendemos tu caso y te damos una propuesta clara. ¿Te gustaría agendar?",
      quickReplies: ["Sí, agendar llamada", "Prefiero escribir por WhatsApp"],
    };
  }

  if (
    msg.includes("agendar") ||
    msg.includes("llamada") ||
    msg.includes("cita") ||
    msg.includes("reunión") ||
    msg.includes("reunion")
  ) {
    return {
      id,
      role: "bot",
      content:
        "¡Perfecto! Puedes agendar directamente en nuestra sección de contacto 👇\n\nO si prefieres, escríbenos por WhatsApp y te respondemos en minutos.",
      quickReplies: ["Ir a contacto", "Abrir WhatsApp"],
    };
  }

  if (
    msg.includes("agente") ||
    msg.includes("chatbot") ||
    msg.includes("bot") ||
    msg.includes("whatsapp")
  ) {
    return {
      id,
      role: "bot",
      content:
        "Nuestros agentes de IA pueden:\n\n✅ Responder preguntas frecuentes automáticamente\n✅ Agendar citas y reservas\n✅ Calificar leads y recopilar información\n✅ Procesar pedidos básicos\n✅ Atender en varios idiomas\n\nFuncionan en WhatsApp, tu sitio web, o ambos. De hecho, ¡estás hablando con uno ahora mismo! 😉\n\n¿Quieres ver cómo funcionaría en tu negocio?",
      quickReplies: ["Sí, quiero saber más", "Agendar llamada"],
    };
  }

  if (
    msg.includes("asesoría") ||
    msg.includes("asesoria") ||
    msg.includes("consultoría") ||
    msg.includes("consultoria")
  ) {
    return {
      id,
      role: "bot",
      content:
        "Nuestra asesoría en IA te ayuda a identificar las mejores oportunidades de automatización e inteligencia artificial para tu negocio.\n\n📊 Analizamos tus procesos actuales\n🎯 Identificamos qué automatizar primero\n🗺️ Creamos un roadmap de implementación\n💡 Te acompañamos en cada paso\n\n¿Te gustaría agendar una consulta gratuita?",
      quickReplies: ["Sí, agendar", "¿Cuánto cuesta?"],
    };
  }

  if (
    msg.includes("web") ||
    msg.includes("página") ||
    msg.includes("pagina") ||
    msg.includes("sitio")
  ) {
    return {
      id,
      role: "bot",
      content:
        "Creamos páginas web que no solo se ven bien, sino que convierten visitantes en clientes:\n\n🚀 Ultra rápidas y optimizadas para SEO\n📱 Responsivas en todos los dispositivos\n🎯 Diseñadas para generar leads\n🔗 Integradas con WhatsApp y herramientas de IA\n\n¿Quieres ver ejemplos de nuestro trabajo?",
      quickReplies: ["Ver ejemplos", "Agendar llamada"],
    };
  }

  if (
    msg.includes("automatiza") ||
    msg.includes("automática") ||
    msg.includes("automatica") ||
    msg.includes("tareas")
  ) {
    return {
      id,
      role: "bot",
      content:
        "Con nuestras automatizaciones eliminamos las tareas repetitivas de tu negocio:\n\n⚡ Facturación automática\n📧 Seguimiento de clientes por email/WhatsApp\n📊 Reportes generados automáticamente\n🔔 Alertas de inventario\n📱 Publicación en redes sociales\n\nTu equipo se enfoca en lo importante mientras la tecnología hace el resto.",
      quickReplies: ["Quiero automatizar", "¿Cuánto cuesta?"],
    };
  }

  // Fallback
  return {
    id,
    role: "bot",
    content:
      "Gracias por tu interés. Para darte la mejor respuesta, te recomiendo agendar una llamada gratuita con nuestro equipo. ¿Te gustaría hacerlo?",
    quickReplies: ["Sí, agendar", "Tengo otra pregunta"],
  };
}

function handleAction(text: string) {
  if (text === "Ir a contacto") {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
    return true;
  }
  if (text === "Abrir WhatsApp" || text === "Prefiero escribir por WhatsApp") {
    window.open("https://wa.me/573000000000", "_blank");
    return true;
  }
  return false;
}

function formatContent(content: string) {
  return content.split("\n").map((line, i) => {
    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return (
      <span key={i}>
        {i > 0 && <br />}
        <span dangerouslySetInnerHTML={{ __html: formatted }} />
      </span>
    );
  });
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Hide tooltip after 4 seconds
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Check for navigation actions
    if (handleAction(text)) {
      setIsOpen(false);
      return;
    }

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botReply = getResponse(text);
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating bubble */}
      <div className="fixed bottom-6 left-6 z-50">
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div className="absolute bottom-16 left-0 bg-card text-foreground text-sm px-4 py-2 rounded-xl shadow-lg border border-border whitespace-nowrap animate-fade-in">
            ¡Hola! ¿Puedo ayudarte?
            <div className="absolute -bottom-1.5 left-5 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
          </div>
        )}

        {!isOpen && (
          <button
            onClick={() => { setIsOpen(true); setShowTooltip(false); }}
            className="w-14 h-14 rounded-full bg-card border border-primary/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:border-primary"
            aria-label="Abrir chat"
          >
            <MessageSquare size={24} className="text-primary" />
          </button>
        )}
      </div>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed z-50 bottom-6 left-6 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[85vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-border animate-scale-in"
          style={{
            background: "hsl(0 0% 7%)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-display text-xs font-bold text-primary">N</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-none">NEXOV AI Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-card text-foreground rounded-bl-md mr-auto"
                      : "bg-primary text-primary-foreground rounded-br-md ml-auto"
                  }`}
                >
                  {formatContent(msg.content)}
                </div>
                {msg.quickReplies && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => sendMessage(qr)}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-colors"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 px-4 py-3 bg-card rounded-2xl rounded-bl-md w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 border-t border-border bg-card/50 shrink-0"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-card border border-border rounded-xl px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 disabled:opacity-40 hover:brightness-110 transition-all"
            >
              <Send size={16} />
            </button>
          </form>

          {/* Footer */}
          <div className="text-center py-1.5 shrink-0">
            <span className="text-[10px] text-muted-foreground/50">Powered by NEXOV AI</span>
          </div>
        </div>
      )}
    </>
  );
}

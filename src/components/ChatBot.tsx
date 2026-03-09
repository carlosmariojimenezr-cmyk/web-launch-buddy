import { useState, useEffect, useRef } from "react";
import { X, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
  quickReplies?: string[];
}

type ChatMsg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

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

async function streamChat({
  messages,
  onDelta,
  onDone,
}: {
  messages: ChatMsg[];
  onDelta: (text: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok || !resp.body) {
    const errorData = await resp.json().catch(() => ({}));
    throw new Error(errorData.error || `Error ${resp.status}`);
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { streamDone = true; break; }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  // Flush remaining
  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
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
  const [chatHistory, setChatHistory] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => { if (!isOpen) setShowTooltip(true); }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    if (handleAction(text)) { setIsOpen(false); return; }

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const newHistory: ChatMsg[] = [...chatHistory, { role: "user", content: text }];
    setChatHistory(newHistory);

    const botId = crypto.randomUUID();
    let assistantContent = "";

    const upsertBot = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.id === botId) {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
        }
        return [...prev, { id: botId, role: "bot", content: assistantContent }];
      });
    };

    try {
      await streamChat({
        messages: newHistory,
        onDelta: upsertBot,
        onDone: () => {
          setIsTyping(false);
          setChatHistory((prev) => [...prev, { role: "assistant", content: assistantContent }]);
        },
      });
    } catch (e) {
      setIsTyping(false);
      const errorMsg = e instanceof Error ? e.message : "Error desconocido";
      toast({ title: "Error", description: errorMsg, variant: "destructive" });
      // Fallback message
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: "Lo siento, hubo un problema al conectar. Puedes escribirnos por WhatsApp o intentar de nuevo.",
          quickReplies: ["Abrir WhatsApp", "Tengo otra pregunta"],
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating bubble */}
      <div className="fixed bottom-6 left-6 z-50">
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

            {isTyping && !messages.some(m => m.id && m.content === "") && (
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
              disabled={isTyping}
              className="flex-1 bg-card border border-border rounded-xl px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
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

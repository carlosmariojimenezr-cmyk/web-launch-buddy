import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [form, setForm] = useState({ nombre: "", email: "", empresa: "", mensaje: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "¡Mensaje enviado!", description: "Te contactaremos pronto." });
    setForm({ nombre: "", email: "", empresa: "", mensaje: "" });
  };

  return (
    <section id="contacto" className="py-24 md:py-32">
      <div className="container max-w-4xl" ref={ref}>
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            Contacto
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">
            ¿Listo para empezar?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Cuéntanos sobre tu proyecto. La primera consulta es gratis y sin compromiso.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`grid sm:grid-cols-2 gap-4 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "150ms" }}
        >
          <Input
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
            className="bg-card border-border"
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="bg-card border-border"
          />
          <Input
            placeholder="Empresa"
            value={form.empresa}
            onChange={(e) => setForm({ ...form, empresa: e.target.value })}
            className="bg-card border-border sm:col-span-2"
          />
          <Textarea
            placeholder="Cuéntanos sobre tu proyecto o necesidad..."
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            required
            className="bg-card border-border sm:col-span-2 min-h-[120px]"
          />
          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
            <Button type="submit" size="lg" className="font-semibold flex-1 gap-2">
              Agendar llamada
              <ArrowRight size={18} />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="font-semibold flex-1 gap-2 border-primary/30 text-primary hover:bg-primary/10"
              asChild
            >
              <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} />
                Escribir por WhatsApp
              </a>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

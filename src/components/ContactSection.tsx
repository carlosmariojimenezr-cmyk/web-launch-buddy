import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [form, setForm] = useState({ nombre: "", email: "", empresa: "", telefono: "", mensaje: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "¡Mensaje enviado!", description: "Te contactaremos pronto." });
    setForm({ nombre: "", email: "", empresa: "", telefono: "", mensaje: "" });
  };

  return (
    <section id="contacto" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />

      <div className="container max-w-5xl relative" ref={ref}>
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

        <div className={`grid md:grid-cols-5 gap-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "150ms" }}>
          {/* Info sidebar */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Email</p>
                <a href="mailto:hola@nexov.co" className="text-sm text-muted-foreground hover:text-primary transition-colors">hola@nexov.co</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">WhatsApp</p>
                <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">+57 300 000 0000</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Ubicación</p>
                <p className="text-sm text-muted-foreground">Colombia 🇨🇴</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 grid sm:grid-cols-2 gap-4">
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
              className="bg-card border-border"
            />
            <Input
              type="tel"
              placeholder="Teléfono (opcional)"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className="bg-card border-border"
            />
            <Textarea
              placeholder="Cuéntanos sobre tu proyecto o necesidad..."
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              required
              className="bg-card border-border sm:col-span-2 min-h-[120px]"
            />
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
              <Button type="submit" size="lg" className="font-semibold flex-1 gap-2 shadow-lg shadow-primary/20">
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
                  WhatsApp
                </a>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

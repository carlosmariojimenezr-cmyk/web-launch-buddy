import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, MessageCircle, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { MotionSection, MotionDiv } from "@/components/MotionComponents";

export default function ContactSection() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [form, setForm] = useState({ nombre: "", email: "", empresa: "", telefono: "", mensaje: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      empresa: form.empresa.trim() || null,
      telefono: form.telefono.trim() || null,
      mensaje: form.mensaje.trim(),
    });
    setLoading(false);
    if (error) {
      toast({ title: t("contact.errorTitle"), description: t("contact.errorDesc"), variant: "destructive" });
      return;
    }
    toast({ title: t("contact.successTitle"), description: t("contact.successDesc") });
    setForm({ nombre: "", email: "", empresa: "", telefono: "", mensaje: "" });
  };

  return (
    <MotionSection id="contacto" className="py-16 md:py-20 relative overflow-hidden" variant="fadeIn">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
      <div className="container max-w-5xl relative">
        <MotionDiv className="text-center mb-12">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">{t("contact.tag")}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">{t("contact.headline")}</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">{t("contact.subtitle")}</p>
        </MotionDiv>

        <MotionDiv className="grid md:grid-cols-5 gap-10" delay={0.15}>
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t("contact.email")}</p>
                <a href="mailto:hola@nexov.co" className="text-sm text-muted-foreground hover:text-primary transition-colors">hola@nexov.co</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t("contact.whatsapp")}</p>
                {/* TODO: Reemplazar con número real de WhatsApp */}
                <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">+57 300 000 0000</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t("contact.location")}</p>
                <p className="text-sm text-muted-foreground">{t("contact.locationValue")}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-3 grid sm:grid-cols-2 gap-4">
            <Input placeholder={t("contact.formName")} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required className="bg-card border-border" />
            <Input type="email" placeholder={t("contact.formEmail")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-card border-border" />
            <Input placeholder={t("contact.formCompany")} value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} className="bg-card border-border" />
            <Input type="tel" placeholder={t("contact.formPhone")} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className="bg-card border-border" />
            <Textarea placeholder={t("contact.formMessage")} value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} required className="bg-card border-border sm:col-span-2 min-h-[120px]" />
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
              <Button type="submit" size="lg" disabled={loading} className="font-semibold flex-1 gap-2 shadow-lg shadow-primary/20">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                {loading ? t("contact.sending") : t("contact.submit")}
              </Button>
              <Button type="button" variant="outline" size="lg" className="font-semibold flex-1 gap-2 border-primary/30 text-primary hover:bg-primary/10" asChild>
                <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} />
                  {t("contact.whatsappBtn")}
                </a>
              </Button>
            </div>
          </form>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}

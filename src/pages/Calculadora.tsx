import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import ROICalculator from "@/components/ROICalculator";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Calculadora() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{lang === "en" ? "ROI Calculator | NEXOV — Save with AI" : "Calculadora ROI | NEXOV — Ahorra con IA"}</title>
        <meta name="description" content={lang === "en" ? "Calculate how much you could save with AI and automation in your SMB. Free tool by NEXOV." : "Calcula cuánto podrías ahorrar con IA y automatización en tu PYME. Herramienta gratuita de NEXOV."} />
      </Helmet>
      <Navbar />
      <div className="pt-12"><ROICalculator /></div>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
}

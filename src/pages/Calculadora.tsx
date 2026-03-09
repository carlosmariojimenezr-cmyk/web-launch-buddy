import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import ROICalculator from "@/components/ROICalculator";

export default function Calculadora() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Calculadora ROI | NEXOV — Ahorra con IA</title>
        <meta name="description" content="Calcula cuánto podrías ahorrar con IA y automatización en tu PYME. Herramienta gratuita de NEXOV." />
      </Helmet>
      <Navbar />
      <div className="pt-12">
        <ROICalculator />
      </div>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
}

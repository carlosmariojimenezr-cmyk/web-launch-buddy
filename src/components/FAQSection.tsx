import { Shield, Lock, Eye, Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MotionDiv, StaggerContainer, StaggerItem } from "./MotionComponents";

const faqData = {
  es: {
    tag: "Preguntas frecuentes",
    headline: "Seguridad y protección de datos",
    subtitle: "Tu información es nuestra prioridad. Respondemos las dudas más comunes sobre cómo protegemos tus datos.",
    faqs: [
      {
        icon: Shield,
        q: "¿Cómo protegen la información de mi empresa?",
        a: "Usamos cifrado de extremo a extremo (AES-256) para todos los datos en reposo y en tránsito. Nuestros servidores cuentan con certificaciones de seguridad y realizamos auditorías periódicas para garantizar la integridad de tu información.",
      },
      {
        icon: Lock,
        q: "¿Quién tiene acceso a mis datos?",
        a: "Solo tú y las personas que autorices tienen acceso a tu información. Nuestro equipo técnico opera bajo estrictos acuerdos de confidencialidad (NDA) y solo accede a datos cuando es necesario para soporte, siempre con tu autorización previa.",
      },
      {
        icon: Eye,
        q: "¿Comparten o venden mis datos a terceros?",
        a: "Nunca. Tu información es tuya y solo tuya. No compartimos, vendemos ni monetizamos tus datos con terceros bajo ninguna circunstancia. Cumplimos con la Ley 1581 de 2012 de Protección de Datos Personales de Colombia.",
      },
      {
        icon: Server,
        q: "¿Dónde se almacenan mis datos?",
        a: "Tus datos se almacenan en servidores seguros con redundancia geográfica. Realizamos copias de seguridad automáticas diarias para garantizar que tu información nunca se pierda.",
      },
      {
        q: "¿Qué pasa con mis datos si cancelo el servicio?",
        a: "Si decides cancelar, te entregamos una copia completa de todos tus datos en un formato estándar. Después de la entrega, eliminamos toda tu información de nuestros servidores en un plazo máximo de 30 días.",
      },
      {
        q: "¿Los agentes de IA almacenan conversaciones de mis clientes?",
        a: "Las conversaciones se procesan en tiempo real para generar respuestas. Solo almacenamos métricas agregadas (número de consultas, temas frecuentes) para mejorar el servicio, nunca datos personales identificables de tus clientes, a menos que tú lo solicites expresamente.",
      },
    ],
  },
  en: {
    tag: "FAQ",
    headline: "Security & Data Protection",
    subtitle: "Your information is our priority. We answer the most common questions about how we protect your data.",
    faqs: [
      {
        icon: Shield,
        q: "How do you protect my company's information?",
        a: "We use end-to-end encryption (AES-256) for all data at rest and in transit. Our servers hold security certifications and we conduct regular audits to ensure your information's integrity.",
      },
      {
        icon: Lock,
        q: "Who has access to my data?",
        a: "Only you and the people you authorize have access to your information. Our technical team operates under strict NDAs and only accesses data when necessary for support, always with your prior authorization.",
      },
      {
        icon: Eye,
        q: "Do you share or sell my data to third parties?",
        a: "Never. Your information is yours and yours alone. We never share, sell, or monetize your data with third parties under any circumstances. We comply with Colombia's Data Protection Law 1581 of 2012.",
      },
      {
        icon: Server,
        q: "Where is my data stored?",
        a: "Your data is stored on secure servers with geographic redundancy. We perform automatic daily backups to ensure your information is never lost.",
      },
      {
        q: "What happens to my data if I cancel the service?",
        a: "If you decide to cancel, we provide you with a complete copy of all your data in a standard format. After delivery, we delete all your information from our servers within a maximum of 30 days.",
      },
      {
        q: "Do AI agents store my customers' conversations?",
        a: "Conversations are processed in real time to generate responses. We only store aggregated metrics (number of queries, frequent topics) to improve the service, never personally identifiable data from your customers, unless you expressly request it.",
      },
    ],
  },
};

const FAQSection = () => {
  const { lang } = useLanguage();
  const content = faqData[lang];

  return (
    <section id="faq" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <MotionDiv variant="fadeIn">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-4">
              {content.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {content.headline}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>
        </MotionDiv>

        <StaggerContainer className="space-y-0">
          <Accordion type="single" collapsible className="w-full">
            {content.faqs.map((faq, i) => (
              <StaggerItem key={i}>
                <AccordionItem value={`item-${i}`} className="border-border/50">
                  <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5 gap-3">
                    <span className="flex items-center gap-3">
                      {faq.icon && <faq.icon className="h-5 w-5 text-primary shrink-0" />}
                      <span className="font-semibold">{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
            ))}
          </Accordion>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FAQSection;

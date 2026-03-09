import { Shield, Clock, Users } from "lucide-react";

const items = [
  { icon: Shield, text: "Consulta inicial gratuita" },
  { icon: Clock, text: "Resultados en la primera semana" },
  { icon: Users, text: "+20 PYMEs confían en nosotros" },
];

export default function TrustBar() {
  return (
    <section className="py-6 border-y border-border bg-secondary/20">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <item.icon className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

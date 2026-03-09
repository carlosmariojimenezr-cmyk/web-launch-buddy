interface NexovLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { text: "text-xl", dot: "w-1.5 h-1.5", gap: "gap-0" },
  md: { text: "text-2xl", dot: "w-2 h-2", gap: "gap-0" },
  lg: { text: "text-4xl", dot: "w-2.5 h-2.5", gap: "gap-0" },
};

export default function NexovLogo({ size = "md", className = "" }: NexovLogoProps) {
  const s = sizes[size];
  return (
    <span className={`inline-flex items-start ${s.gap} ${className}`}>
      <span className={`font-display ${s.text} font-extrabold tracking-tight text-foreground uppercase leading-none`}>
        NEXOV
      </span>
      <span className={`${s.dot} bg-primary rounded-[2px] -ml-0.5 mt-0.5 shrink-0`} />
    </span>
  );
}

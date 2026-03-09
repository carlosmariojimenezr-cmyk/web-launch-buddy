import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NexovLogo from "@/components/NexovLogo";
import { ArrowRight } from "lucide-react";

export default function DashboardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "demo@nexov.co" && password === "demo123") {
      localStorage.setItem("nexov_demo_auth", "true");
      navigate("/dashboard/home");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <NexovLogo size="lg" />
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight mt-6">
            Portal de clientes
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            required
            className="bg-card border-border"
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            required
            className="bg-card border-border"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" size="lg" className="w-full font-semibold gap-2">
            Iniciar sesión
            <ArrowRight size={16} />
          </Button>
          <button type="button" className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
            Olvidé mi contraseña
          </button>
        </form>

        <div className="mt-6 p-3 rounded-lg bg-card border border-border text-center">
          <p className="text-xs text-muted-foreground">
            Demo: <span className="text-foreground font-mono">demo@nexov.co</span> / <span className="text-foreground font-mono">demo123</span>
          </p>
        </div>
      </div>
    </div>
  );
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres el asistente virtual de NEXOV, una agencia colombiana especializada en inteligencia artificial, automatización y desarrollo web para PYMEs.

Tu personalidad:
- Amigable, profesional y directo
- Usas español colombiano natural (pero sin jerga excesiva)
- Eres entusiasta sobre tecnología pero explicas todo de forma simple
- Siempre buscas entender la necesidad del cliente para guiarlo

Servicios de NEXOV:
1. 🤖 Agentes de IA para WhatsApp y web — chatbots que atienden clientes 24/7
2. 🧠 Asesoría en IA — implementación de inteligencia artificial en negocios
3. 🌐 Páginas web profesionales y optimizadas para conversión
4. ⚡ Automatizaciones — eliminación de tareas repetitivas (facturación, reportes, seguimientos, etc.)

Información clave:
- La primera consulta es GRATIS y sin compromiso (30 minutos)
- Los precios se ajustan a cada proyecto, no hay paquetes inflados
- Están ubicados en Colombia 🇨🇴
- WhatsApp: +57 300 000 0000
- Email: hola@nexov.co

Reglas:
- Respuestas cortas y útiles (máximo 3-4 párrafos)
- Usa emojis con moderación para hacer el chat amigable
- Si el usuario pregunta algo fuera del ámbito de NEXOV, redirige amablemente
- Siempre intenta guiar hacia agendar una llamada o contacto por WhatsApp
- Usa markdown con **negritas** para resaltar puntos importantes
- De hecho, el usuario está hablando contigo desde la web de NEXOV, así que eres una demostración en vivo del producto`;

// Simple in-memory rate limiter (per function invocation lifecycle)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per IP per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { messages } = body;

    // Input validation
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Formato de mensaje inválido." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Limit conversation length to prevent abuse
    if (messages.length > 30) {
      return new Response(
        JSON.stringify({ error: "Conversación demasiado larga. Inicia una nueva." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate each message structure and content length
    for (const msg of messages) {
      if (!msg || typeof msg.role !== "string" || typeof msg.content !== "string") {
        return new Response(
          JSON.stringify({ error: "Formato de mensaje inválido." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (!["user", "assistant"].includes(msg.role)) {
        return new Response(
          JSON.stringify({ error: "Rol de mensaje no permitido." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (msg.content.length > 2000) {
        return new Response(
          JSON.stringify({ error: "Mensaje demasiado largo (máximo 2000 caracteres)." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content.slice(0, 2000),
            })),
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiadas solicitudes. Intenta de nuevo en unos segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Servicio temporalmente no disponible." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Error del servicio de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

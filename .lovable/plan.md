
# Plan: Landing Page de NEXOV

Sitio web de una sola página (landing con scroll) para NEXOV, empresa colombiana de tecnología enfocada en IA, automatización y desarrollo web para PYMEs.

## Identidad Visual
- **Tema oscuro** completo: fondos en negro/charcoal (#0A0A0A, #111111, #1A1A1A)
- **Acento verde menta** (#3DFAB4) usado de forma quirúrgica solo en CTAs, highlights e íconos
- **Tipografías**: Barlow Condensed Bold (títulos UPPERCASE), DM Sans (body), JetBrains Mono (badges tech)
- Logo "NEXOV" con cuadrado verde menta incorporado

## Secciones (en orden)

### 1. Navbar fijo
- Logo NEXOV a la izquierda, links al centro (Servicios, Proceso, Nosotros, Casos), botón "Agendar llamada" verde menta a la derecha
- Transparente al inicio → fondo oscuro con blur al hacer scroll
- Hamburger menu en mobile

### 2. Hero Section
- Headline: "Hacemos que la IA trabaje para tu negocio"
- Subtítulo descriptivo en gris claro
- Dos botones: "Agendar una llamada gratis" (verde menta) + "Ver servicios" (outline blanco)
- Fondo con efecto visual sutil (grid de puntos o glow difuso verde)

### 3. Trust Bar
- Franja con texto de social proof sobre PYMEs colombianas

### 4. Servicios — 4 tarjetas
- Agentes IA WhatsApp/Web (badge "MÁS POPULAR"), Asesoría IA, Páginas Web, Automatizaciones
- Tarjetas oscuras con hover: borde verde menta + elevación sutil
- Animación stagger al aparecer

### 5. Proceso — 3 pasos
- Timeline visual: Conversamos → Diseñamos → Implementamos
- Números grandes decorativos (01, 02, 03) en verde menta semitransparente
- CTA: "Empezar con el paso 1"

### 6. Por Qué NEXOV — 4 diferenciadores
- "Hablamos tu idioma", "Hechos para PYMEs", "Resultados, no promesas", "Acompañamiento real"

### 7. Casos de Éxito
- Métricas animadas (contador de 0 al valor): "+300% respuestas automatizadas", "-60% tiempo manual"
- Datos placeholder con clientes ficticios

### 8. CTA Final / Contacto
- Headline de conversión + formulario (nombre, email, empresa, mensaje)
- Botones: "Agendar llamada" + "Escribir por WhatsApp"

### 9. Footer
- Logo, columnas de links (Servicios, Empresa, Contacto), iconos redes sociales, copyright

## Funcionalidad y UX
- **Botón WhatsApp flotante** fijo esquina inferior derecha con pulse cada 10s
- **Smooth scroll** para navegación interna
- **Animaciones**: fade-in + slide-up con Intersection Observer, stagger en tarjetas, contadores animados
- **100% responsive** mobile-first: grids a 1 columna, CTAs apilados, formulario full-width
- **Sin imágenes pesadas**: todo logrado con CSS, SVG y tipografía
- Formulario controlado con React state (sin backend por ahora)

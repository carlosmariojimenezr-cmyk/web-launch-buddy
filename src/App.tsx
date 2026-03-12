import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { BookingProvider } from "@/contexts/BookingContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BookingModal from "@/components/BookingModal";
import Index from "./pages/Index";

// Lazy-load non-critical routes to reduce initial JS bundle
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Calculadora = lazy(() => import("./pages/Calculadora"));
const DashboardLogin = lazy(() => import("./pages/DashboardLogin"));
const DashboardLayout = lazy(() => import("./pages/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/DashboardHome"));
const DashboardProyecto = lazy(() => import("./pages/DashboardProyecto"));
const DashboardDocumentos = lazy(() => import("./pages/DashboardDocumentos"));
const DashboardMensajes = lazy(() => import("./pages/DashboardMensajes"));
const DashboardSoporte = lazy(() => import("./pages/DashboardSoporte"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AppRoutes = () => (
  <LanguageProvider>
    <BookingProvider>
      <Toaster />
      <Sonner />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          {/* Spanish routes (default) */}
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/calculadora" element={<Calculadora />} />

          {/* English routes */}
          <Route path="/en" element={<Index />} />
          <Route path="/en/blog" element={<Blog />} />
          <Route path="/en/blog/:slug" element={<BlogArticle />} />
          <Route path="/en/calculator" element={<Calculadora />} />

          {/* Dashboard (no i18n) */}
          <Route path="/dashboard" element={<DashboardLogin />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/home" element={<DashboardHome />} />
            <Route path="/dashboard/proyecto" element={<DashboardProyecto />} />
            <Route path="/dashboard/documentos" element={<DashboardDocumentos />} />
            <Route path="/dashboard/mensajes" element={<DashboardMensajes />} />
            <Route path="/dashboard/soporte" element={<DashboardSoporte />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <BookingModal />
    </BookingProvider>
  </LanguageProvider>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { BookingProvider } from "@/contexts/BookingContext";
import BookingModal from "@/components/BookingModal";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Calculadora from "./pages/Calculadora";
import DashboardLogin from "./pages/DashboardLogin";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import DashboardProyecto from "./pages/DashboardProyecto";
import DashboardDocumentos from "./pages/DashboardDocumentos";
import DashboardMensajes from "./pages/DashboardMensajes";
import DashboardSoporte from "./pages/DashboardSoporte";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BookingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/calculadora" element={<Calculadora />} />
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
          </BrowserRouter>
          <BookingModal />
        </BookingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

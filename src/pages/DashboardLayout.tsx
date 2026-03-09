import { useState } from "react";
import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";
import NexovLogo from "@/components/NexovLogo";
import { LayoutDashboard, FolderKanban, FileText, MessageSquare, HelpCircle, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { label: "Resumen", to: "/dashboard/home", icon: LayoutDashboard },
  { label: "Mi Proyecto", to: "/dashboard/proyecto", icon: FolderKanban },
  { label: "Documentos", to: "/dashboard/documentos", icon: FileText },
  { label: "Mensajes", to: "/dashboard/mensajes", icon: MessageSquare },
  { label: "Soporte", to: "/dashboard/soporte", icon: HelpCircle },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("nexov_demo_auth") === "true";

  if (!isAuth) return <Navigate to="/dashboard" replace />;

  const handleLogout = () => {
    localStorage.removeItem("nexov_demo_auth");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-border transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "hsl(0 0% 5%)" }}
      >
        <div className="p-5 flex items-center justify-between">
          <NexovLogo size="sm" />
          <button className="lg:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground leading-none">Juan Demo</p>
              <p className="text-[11px] text-muted-foreground">demo@nexov.co</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center px-4 lg:px-6 shrink-0">
          <button className="lg:hidden mr-3 text-muted-foreground" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <span className="text-sm font-medium text-muted-foreground">Portal de Clientes</span>
        </header>
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

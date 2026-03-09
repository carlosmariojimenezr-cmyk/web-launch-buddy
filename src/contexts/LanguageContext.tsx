import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export type Lang = "es" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

function getNestedValue(obj: any, path: string): string {
  const val = path.split(".").reduce((o, k) => o?.[k], obj);
  return typeof val === "string" ? val : path;
}

import { translations } from "@/data/translations";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const detectLang = (): Lang => location.pathname.startsWith("/en") ? "en" : "es";
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    const path = location.pathname;

    if (newLang === "en") {
      if (!path.startsWith("/en")) {
        // Map ES routes to EN
        if (path === "/" || path === "") navigate("/en");
        else if (path === "/blog") navigate("/en/blog");
        else if (path.startsWith("/blog/")) navigate("/en/blog/" + path.slice(6));
        else if (path === "/calculadora") navigate("/en/calculator");
        else navigate("/en" + path);
      }
    } else {
      if (path.startsWith("/en")) {
        const rest = path.slice(3) || "/";
        if (rest === "/calculator") navigate("/calculadora");
        else navigate(rest === "" ? "/" : rest);
      }
    }
  }, [location.pathname, navigate]);

  const t = useCallback((key: string): string => {
    return getNestedValue(translations[lang], key);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

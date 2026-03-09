import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import { articles } from "@/data/blogArticles";
import { articlesEn } from "@/data/blogArticlesEn";
import { Clock, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Blog() {
  const { lang, t } = useLanguage();
  const prefix = lang === "en" ? "/en" : "";
  const data = lang === "en" ? articlesEn : articles;

  function formatDate(dateStr: string) {
    return new Date(dateStr + "T12:00:00").toLocaleDateString(lang === "en" ? "en-US" : "es-CO", { year: "numeric", month: "long", day: "numeric" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{lang === "en" ? "Blog | NEXOV — AI and Automation for SMBs" : "Blog | NEXOV — IA y Automatización para PYMEs"}</title>
        <meta name="description" content={lang === "en" ? "Practical guides, trends, and AI automation strategies for Colombian SMBs." : "Guías prácticas, tendencias y estrategias de IA y automatización para PYMEs colombianas."} />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container max-w-5xl">
          <div className="text-center mb-14">
            <span className="font-mono text-xs text-primary uppercase tracking-widest">{t("blog.tag")}</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 tracking-tight">{t("blog.headline")}</h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">{t("blog.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.map((article) => (
              <Link key={article.slug} to={`${prefix}/blog/${article.slug}`} className="group block bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest">{article.category}</span>
                <h2 className="font-display text-xl font-bold uppercase mt-2 tracking-tight group-hover:text-primary transition-colors leading-tight">{article.title}</h2>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} />{article.readTime}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(article.date)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
}

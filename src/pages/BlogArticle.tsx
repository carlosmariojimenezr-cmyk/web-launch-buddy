import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import { getArticleBySlug, getRelatedArticles } from "@/data/blogArticles";
import { articlesEn } from "@/data/blogArticlesEn";
import { ArrowLeft, ArrowRight, Clock, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { useLanguage } from "@/contexts/LanguageContext";

function renderContent(content: string) {
  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("## ")) return (<h2 key={i} className="font-display text-2xl font-bold uppercase tracking-tight mt-10 mb-4 text-foreground">{trimmed.slice(3)}</h2>);
    if (trimmed.startsWith("> ")) return (<blockquote key={i} className="border-l-2 border-primary pl-5 my-8 text-primary/90 italic text-lg leading-relaxed">{trimmed.slice(2)}</blockquote>);
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
      return (<ul key={i} className="space-y-2 my-4">{items.map((item, j) => { const text = item.slice(2); const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); return (<li key={j} className="flex items-start gap-2 text-muted-foreground leading-relaxed"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" /><span dangerouslySetInnerHTML={{ __html: formatted }} /></li>); })}</ul>);
    }
    const formatted = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>');
    return (<p key={i} className="text-muted-foreground leading-[1.8] mb-5" dangerouslySetInnerHTML={{ __html: formatted }} />);
  });
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const booking = useBooking();
  const { lang, t } = useLanguage();
  const prefix = lang === "en" ? "/en" : "";

  const article = lang === "en"
    ? articlesEn.find(a => a.slug === slug)
    : slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <Navigate to={`${prefix}/blog`} replace />;

  const relatedSource = lang === "en" ? articlesEn : undefined;
  const related = relatedSource
    ? relatedSource.filter(a => a.slug !== slug).slice(0, 2)
    : getRelatedArticles(article.slug, 2);

  function formatDate(dateStr: string) {
    return new Date(dateStr + "T12:00:00").toLocaleDateString(lang === "en" ? "en-US" : "es-CO", { year: "numeric", month: "long", day: "numeric" });
  }

  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.metaDescription, datePublished: article.date, author: { "@type": "Organization", name: "NEXOV" }, publisher: { "@type": "Organization", name: "NEXOV" } };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{article.title} | NEXOV Blog</title>
        <meta name="description" content={article.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-20">
        <article className="container max-w-[720px]">
          <Link to={`${prefix}/blog`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={14} /> {t("blog.backToBlog")}
          </Link>
          <span className="font-mono text-xs text-primary uppercase tracking-widest">{article.category}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase mt-2 tracking-tight leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(article.date)}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{article.readTime}</span>
          </div>
          <div className="h-px bg-border my-8" />
          <div className="prose-custom">{renderContent(article.content)}</div>

          <div className="mt-14 p-8 rounded-2xl bg-card border border-primary/30">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">{t("blog.ctaTitle")}</h3>
            <p className="text-sm text-muted-foreground mt-2">{t("blog.ctaDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Button size="lg" className="font-semibold gap-2" onClick={booking.open}>{t("blog.ctaBook")} <ArrowRight size={16} /></Button>
              <Button variant="outline" size="lg" className="font-semibold gap-2 border-primary/30 text-primary hover:bg-primary/10" asChild>
                <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> {t("blog.ctaWhatsApp")}</a>
              </Button>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-6">{t("blog.related")}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} to={`${prefix}/blog/${r.slug}`} className="group block bg-card border border-border rounded-xl p-5 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-widest">{r.category}</span>
                    <h4 className="font-display text-sm font-bold uppercase mt-1.5 tracking-tight group-hover:text-primary transition-colors leading-tight">{r.title}</h4>
                    <span className="text-xs text-muted-foreground mt-2 block">{r.readTime}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
}

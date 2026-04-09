import { Calendar, Clock, Newspaper } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNews } from "../hooks/useBackend";
import type { NewsArticle } from "../types/festival";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  const ms = Number(ts) < 1e12 ? Number(ts) * 1000 : Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function excerpt(text: string, max = 180): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function NewsSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.1 0.02 260)",
        border: "1px solid oklch(0.2 0.03 260 / 0.4)",
      }}
    >
      <div
        className="h-48 w-full"
        style={{ background: "oklch(0.15 0.02 260)" }}
      />
      <div className="p-6 space-y-3">
        <div
          className="h-3 w-24 rounded"
          style={{ background: "oklch(0.2 0.02 260)" }}
        />
        <div
          className="h-5 w-4/5 rounded"
          style={{ background: "oklch(0.2 0.02 260)" }}
        />
        <div
          className="h-3 w-full rounded"
          style={{ background: "oklch(0.18 0.02 260)" }}
        />
        <div
          className="h-3 w-3/4 rounded"
          style={{ background: "oklch(0.18 0.02 260)" }}
        />
      </div>
    </div>
  );
}

// ── Article Card ──────────────────────────────────────────────────────────────

function ArticleCard({
  article,
  index,
}: {
  article: NewsArticle;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-2xl transition-smooth cursor-pointer"
      style={{
        background: "oklch(0.1 0.02 260)",
        border: "1px solid oklch(0.25 0.05 180 / 0.3)",
        boxShadow: "0 4px 20px oklch(0 0 0 / 0.35)",
      }}
      onClick={() => setExpanded((v) => !v)}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.65 0.2 180 / 0.5)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 30px oklch(0.65 0.2 180 / 0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.25 0.05 180 / 0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 20px oklch(0 0 0 / 0.35)";
      }}
      data-ocid="news-card"
    >
      {/* Image */}
      {article.imageUrl ? (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, oklch(0.1 0.02 260) 0%, transparent 60%)",
            }}
          />
        </div>
      ) : (
        <div
          className="h-48 w-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.1 0.05 260) 0%, oklch(0.2 0.15 180) 50%, oklch(0.15 0.1 310) 100%)",
          }}
        >
          <Newspaper size={40} style={{ color: "oklch(0.65 0.2 180 / 0.3)" }} />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="flex items-center gap-1.5 text-xs font-display uppercase tracking-wider"
            style={{ color: "oklch(0.65 0.18 70)" }}
          >
            <Calendar size={12} />
            {formatDate(article.publishDate)}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-display font-bold uppercase tracking-wider"
            style={{
              background: "oklch(0.65 0.2 180 / 0.08)",
              border: "1px solid oklch(0.65 0.2 180 / 0.3)",
              color: "oklch(0.65 0.2 180)",
            }}
          >
            News
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-lg font-display font-bold leading-snug"
          style={{ color: "oklch(0.9 0 0)" }}
        >
          {article.title}
        </h2>

        {/* Content — toggleable */}
        <div
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.65 0 0)" }}
        >
          {expanded ? article.content : excerpt(article.content)}
        </div>

        {/* Read more / Collapse */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
          className="mt-auto flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:opacity-80 w-fit"
          style={{ color: "oklch(0.65 0.2 180)" }}
          data-ocid="news-read-more-btn"
        >
          <Clock size={12} />
          {expanded ? "Show less" : "Read more"}
        </button>
      </div>
    </motion.article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NewsPage() {
  const { data: articles = [], isLoading } = useNews();

  // Sort newest first by publishDate
  const sorted = [...articles].sort(
    (a, b) => Number(b.publishDate) - Number(a.publishDate),
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.06 0.01 260)" }}
    >
      {/* ── Hero ── */}
      <header
        className="relative overflow-hidden"
        style={{ background: "oklch(0.06 0.01 260)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, oklch(0.65 0.2 180 / 0.1) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, oklch(0.55 0.23 310 / 0.08) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.65 0.2 180) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.2 180) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="mb-3 text-xs font-display font-bold uppercase tracking-[0.3em]"
              style={{ color: "oklch(0.55 0.23 310)" }}
            >
              We Are One · Latest Updates
            </p>
            <h1
              className="mb-4 text-5xl font-display font-black uppercase tracking-tight leading-none md:text-7xl"
              style={{
                color: "oklch(0.65 0.2 180)",
                textShadow:
                  "0 0 10px oklch(0.65 0.2 180 / 0.8), 0 0 20px oklch(0.65 0.2 180 / 0.4)",
              }}
            >
              Festival
              <br />
              <span
                style={{
                  color: "oklch(0.75 0.23 310)",
                  textShadow:
                    "0 0 10px oklch(0.55 0.23 310 / 0.8), 0 0 20px oklch(0.55 0.23 310 / 0.4)",
                }}
              >
                News
              </span>
            </h1>
            <p
              className="mt-6 max-w-xl mx-auto text-base md:text-lg leading-relaxed"
              style={{ color: "oklch(0.65 0 0)" }}
            >
              Stay up to date with the latest announcements, lineups, and news
              from WE ARE ONE festivals worldwide.
            </p>
          </motion.div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="mx-auto max-w-7xl px-4 py-12">
        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <NewsSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Articles */}
        {!isLoading && sorted.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((article, i) => (
              <ArticleCard
                key={article.id.toString()}
                article={article}
                index={i}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && sorted.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
            data-ocid="news-empty-state"
          >
            <div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: "oklch(0.65 0.2 180 / 0.1)",
                border: "2px solid oklch(0.65 0.2 180 / 0.3)",
              }}
            >
              <Newspaper size={32} style={{ color: "oklch(0.65 0.2 180)" }} />
            </div>
            <h3
              className="mb-2 text-2xl font-display font-bold glow-cyan"
              style={{ color: "oklch(0.65 0.2 180)" }}
            >
              No News Yet
            </h3>
            <p style={{ color: "oklch(0.55 0 0)" }}>
              Check back soon for the latest festival updates and announcements.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

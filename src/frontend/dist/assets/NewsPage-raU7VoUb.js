import { j as jsxRuntimeExports, r as reactExports } from "./index-1UpKlSK4.js";
import { L as useNews } from "./useBackend-C1IpNJlA.js";
import { m as motion } from "./proxy-Dt_0N6RP.js";
import { N as Newspaper } from "./newspaper-D4_7pKH0.js";
import { C as Calendar } from "./calendar-CsxZ3u2u.js";
import { C as Clock } from "./clock-DGdlAEgF.js";
function formatDate(ts) {
  const ms = Number(ts) < 1e12 ? Number(ts) * 1e3 : Number(ts) / 1e6;
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function excerpt(text, max = 180) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}
function NewsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "animate-pulse rounded-2xl overflow-hidden",
      style: {
        background: "oklch(0.1 0.02 260)",
        border: "1px solid oklch(0.2 0.03 260 / 0.4)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-48 w-full",
            style: { background: "oklch(0.15 0.02 260)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-3 w-24 rounded",
              style: { background: "oklch(0.2 0.02 260)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-5 w-4/5 rounded",
              style: { background: "oklch(0.2 0.02 260)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-3 w-full rounded",
              style: { background: "oklch(0.18 0.02 260)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-3 w-3/4 rounded",
              style: { background: "oklch(0.18 0.02 260)" }
            }
          )
        ] })
      ]
    }
  );
}
function ArticleCard({
  article,
  index
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.08 },
      className: "group flex flex-col overflow-hidden rounded-2xl transition-smooth cursor-pointer",
      style: {
        background: "oklch(0.1 0.02 260)",
        border: "1px solid oklch(0.25 0.05 180 / 0.3)",
        boxShadow: "0 4px 20px oklch(0 0 0 / 0.35)"
      },
      onClick: () => setExpanded((v) => !v),
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = "oklch(0.65 0.2 180 / 0.5)";
        e.currentTarget.style.boxShadow = "0 0 30px oklch(0.65 0.2 180 / 0.12)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = "oklch(0.25 0.05 180 / 0.3)";
        e.currentTarget.style.boxShadow = "0 4px 20px oklch(0 0 0 / 0.35)";
      },
      "data-ocid": "news-card",
      children: [
        article.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: article.imageUrl,
              alt: article.title,
              className: "h-full w-full object-cover transition-smooth group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: {
                background: "linear-gradient(to top, oklch(0.1 0.02 260) 0%, transparent 60%)"
              }
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-48 w-full flex items-center justify-center",
            style: {
              background: "linear-gradient(135deg, oklch(0.1 0.05 260) 0%, oklch(0.2 0.15 180) 50%, oklch(0.15 0.1 310) 100%)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { size: 40, style: { color: "oklch(0.65 0.2 180 / 0.3)" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-3 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "flex items-center gap-1.5 text-xs font-display uppercase tracking-wider",
                style: { color: "oklch(0.65 0.18 70)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
                  formatDate(article.publishDate)
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rounded-full px-2.5 py-0.5 text-xs font-display font-bold uppercase tracking-wider",
                style: {
                  background: "oklch(0.65 0.2 180 / 0.08)",
                  border: "1px solid oklch(0.65 0.2 180 / 0.3)",
                  color: "oklch(0.65 0.2 180)"
                },
                children: "News"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-lg font-display font-bold leading-snug",
              style: { color: "oklch(0.9 0 0)" },
              children: article.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-sm leading-relaxed",
              style: { color: "oklch(0.65 0 0)" },
              children: expanded ? article.content : excerpt(article.content)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                setExpanded((v) => !v);
              },
              className: "mt-auto flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:opacity-80 w-fit",
              style: { color: "oklch(0.65 0.2 180)" },
              "data-ocid": "news-read-more-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
                expanded ? "Show less" : "Read more"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function NewsPage() {
  const { data: articles = [], isLoading } = useNews();
  const sorted = [...articles].sort(
    (a, b) => Number(b.publishDate) - Number(a.publishDate)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { background: "oklch(0.06 0.01 260)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "header",
          {
            className: "relative overflow-hidden",
            style: { background: "oklch(0.06 0.01 260)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse at 30% 50%, oklch(0.65 0.2 180 / 0.1) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, oklch(0.55 0.23 310 / 0.08) 0%, transparent 55%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 opacity-[0.03] pointer-events-none",
                  style: {
                    backgroundImage: "linear-gradient(oklch(0.65 0.2 180) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.2 180) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-7xl px-4 py-20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "mb-3 text-xs font-display font-bold uppercase tracking-[0.3em]",
                        style: { color: "oklch(0.55 0.23 310)" },
                        children: "We Are One · Latest Updates"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "h1",
                      {
                        className: "mb-4 text-5xl font-display font-black uppercase tracking-tight leading-none md:text-7xl",
                        style: {
                          color: "oklch(0.65 0.2 180)",
                          textShadow: "0 0 10px oklch(0.65 0.2 180 / 0.8), 0 0 20px oklch(0.65 0.2 180 / 0.4)"
                        },
                        children: [
                          "Festival",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                color: "oklch(0.75 0.23 310)",
                                textShadow: "0 0 10px oklch(0.55 0.23 310 / 0.8), 0 0 20px oklch(0.55 0.23 310 / 0.4)"
                              },
                              children: "News"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "mt-6 max-w-xl mx-auto text-base md:text-lg leading-relaxed",
                        style: { color: "oklch(0.65 0 0)" },
                        children: "Stay up to date with the latest announcements, lineups, and news from WE ARE ONE festivals worldwide."
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-4 py-12", children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(NewsSkeleton, {}, i)) }),
          !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: sorted.map((article, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ArticleCard,
            {
              article,
              index: i
            },
            article.id.toString()
          )) }),
          !isLoading && sorted.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "flex flex-col items-center justify-center py-32 text-center",
              "data-ocid": "news-empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mb-6 flex h-20 w-20 items-center justify-center rounded-full",
                    style: {
                      background: "oklch(0.65 0.2 180 / 0.1)",
                      border: "2px solid oklch(0.65 0.2 180 / 0.3)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { size: 32, style: { color: "oklch(0.65 0.2 180)" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "mb-2 text-2xl font-display font-bold glow-cyan",
                    style: { color: "oklch(0.65 0.2 180)" },
                    children: "No News Yet"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "oklch(0.55 0 0)" }, children: "Check back soon for the latest festival updates and announcements." })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  NewsPage as default
};

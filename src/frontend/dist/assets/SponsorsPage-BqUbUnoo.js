import { j as jsxRuntimeExports } from "./index-D9S6QrCw.js";
import { f as useSponsors } from "./useBackend-FFsO06Zm.js";
import { S as Star } from "./star-BPZV4dRu.js";
import { H as Handshake } from "./handshake-jnEohfXn.js";
import { G as Gem } from "./gem-D829NcsS.js";
import { E as ExternalLink } from "./external-link-Bujyw8-M.js";
const TIER_ORDER = ["Headline", "Gold", "Silver", "Bronze", "Partner"];
function tierColor(tier) {
  switch (tier.toLowerCase()) {
    case "headline":
      return "oklch(0.92 0.04 200)";
    case "gold":
      return "oklch(0.65 0.18 70)";
    case "silver":
      return "oklch(0.75 0.02 210)";
    case "bronze":
      return "oklch(0.62 0.12 50)";
    default:
      return "oklch(0.65 0.23 310)";
  }
}
function tierGlow(tier) {
  switch (tier.toLowerCase()) {
    case "headline":
      return "0 0 40px oklch(0.92 0.04 200 / 0.4), 0 0 80px oklch(0.8 0.06 210 / 0.2)";
    case "gold":
      return "0 0 24px oklch(0.65 0.18 70 / 0.3)";
    case "silver":
      return "0 0 24px oklch(0.75 0.02 210 / 0.25)";
    case "bronze":
      return "0 0 24px oklch(0.62 0.12 50 / 0.25)";
    default:
      return "0 0 24px oklch(0.65 0.23 310 / 0.25)";
  }
}
function tierGridCols(tier) {
  switch (tier.toLowerCase()) {
    case "headline":
      return "grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2";
    case "gold":
      return "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";
    case "silver":
      return "grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    default:
      return "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
  }
}
function HeadlineSponsorCard({ sponsor }) {
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group relative flex flex-col md:flex-row items-center gap-6 overflow-hidden rounded-2xl p-8 cursor-pointer transition-smooth",
      style: {
        background: "linear-gradient(135deg, oklch(0.1 0.04 200), oklch(0.08 0.03 220), oklch(0.1 0.05 260))",
        border: "1px solid oklch(0.92 0.04 200 / 0.25)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = "oklch(0.92 0.04 200 / 0.6)";
        e.currentTarget.style.boxShadow = "0 0 60px oklch(0.92 0.04 200 / 0.2), 0 0 120px oklch(0.8 0.06 210 / 0.1)";
        e.currentTarget.style.transform = "translateY(-3px)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = "oklch(0.92 0.04 200 / 0.25)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      },
      "data-ocid": `headline-sponsor-card-${sponsor.id.toString()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth",
            style: {
              background: "linear-gradient(105deg, transparent 40%, oklch(0.92 0.04 200 / 0.06) 50%, transparent 60%)",
              backgroundSize: "200% 100%"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute -top-4 -right-4 h-32 w-32 rounded-full animate-pulse",
            style: {
              background: "radial-gradient(circle, oklch(0.92 0.04 200 / 0.12), transparent 70%)",
              animationDuration: "4s"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full animate-pulse",
            style: {
              background: "radial-gradient(circle, oklch(0.8 0.06 210 / 0.1), transparent 70%)",
              animationDuration: "6s",
              animationDelay: "1s"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative shrink-0", children: sponsor.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex h-28 w-44 items-center justify-center overflow-hidden rounded-xl",
            style: {
              background: "oklch(0.15 0.03 200)",
              border: "1px solid oklch(0.92 0.04 200 / 0.3)",
              boxShadow: "0 0 24px oklch(0.92 0.04 200 / 0.15)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: sponsor.logoUrl,
                alt: sponsor.name,
                className: "h-full w-full object-contain p-3",
                onError: (e) => {
                  e.target.style.display = "none";
                }
              }
            )
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex h-28 w-28 items-center justify-center rounded-xl font-display text-4xl font-black",
            style: {
              background: "oklch(0.15 0.03 200)",
              border: "1px solid oklch(0.92 0.04 200 / 0.3)",
              color: "oklch(0.92 0.04 200)"
            },
            children: sponsor.name.charAt(0)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-center md:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center md:justify-start gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gem, { size: 14, style: { color: "oklch(0.92 0.04 200)" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-display font-black uppercase tracking-[0.3em]",
                style: {
                  color: "oklch(0.92 0.04 200)",
                  textShadow: "0 0 12px oklch(0.92 0.04 200 / 0.8)"
                },
                children: "Headline Sponsor"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gem, { size: 14, style: { color: "oklch(0.92 0.04 200)" } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display text-3xl font-black uppercase tracking-wider mb-2",
              style: {
                color: "oklch(0.96 0.02 200)",
                textShadow: "0 0 16px oklch(0.92 0.04 200 / 0.5)"
              },
              children: sponsor.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-sm mb-4",
              style: { color: "oklch(0.65 0 0)" },
              children: "Official headline sponsor of all WE ARE ONE events — festivals, raves & nightclub events worldwide."
            }
          ),
          sponsor.websiteUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-display font-bold uppercase tracking-wider",
              style: {
                background: "oklch(0.92 0.04 200 / 0.1)",
                border: "1px solid oklch(0.92 0.04 200 / 0.4)",
                color: "oklch(0.92 0.04 200)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 13 }),
                "Visit Website"
              ]
            }
          )
        ] })
      ]
    }
  );
  if (sponsor.websiteUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: sponsor.websiteUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: { textDecoration: "none" },
        children: content
      }
    );
  }
  return content;
}
function SponsorCard({ sponsor, tier }) {
  const color = tierColor(tier);
  const glow = tierGlow(tier);
  const isGold = tier.toLowerCase() === "gold";
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-smooth cursor-pointer",
      style: {
        background: isGold ? "linear-gradient(135deg, oklch(0.12 0.03 260), oklch(0.1 0.03 60))" : "oklch(0.13 0.02 260)",
        border: `1px solid ${color.replace(")", " / 0.25)")}`,
        textDecoration: "none"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = glow;
        e.currentTarget.style.transform = "translateY(-2px)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = color.replace(
          ")",
          " / 0.25)"
        );
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      },
      "data-ocid": `sponsor-card-${sponsor.id.toString()}`,
      children: [
        sponsor.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex h-16 w-24 items-center justify-center overflow-hidden rounded-xl",
            style: { background: "oklch(0.18 0.02 260)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: sponsor.logoUrl,
                alt: sponsor.name,
                className: "h-full w-full object-contain p-1",
                onError: (e) => {
                  e.target.style.display = "none";
                }
              }
            )
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex h-16 w-16 items-center justify-center rounded-xl font-display text-2xl font-bold",
            style: { background: "oklch(0.18 0.02 260)", color },
            children: sponsor.name.charAt(0)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "truncate font-display font-bold uppercase tracking-wide text-sm",
              style: { color: "oklch(0.92 0 0)" },
              children: sponsor.name
            }
          ),
          sponsor.websiteUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center justify-center gap-1 mt-1 text-xs",
              style: { color },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 10 }),
                "Visit Website"
              ]
            }
          )
        ] })
      ]
    }
  );
  if (sponsor.websiteUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: sponsor.websiteUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: { textDecoration: "none" },
        children: content
      }
    );
  }
  return content;
}
function SponsorsPage() {
  const { data: sponsors = [], isLoading } = useSponsors();
  const grouped = {};
  for (const s of sponsors) {
    const tier = s.tier || "Partner";
    if (!grouped[tier]) grouped[tier] = [];
    grouped[tier].push(s);
  }
  const orderedTiers = TIER_ORDER.filter((t) => {
    var _a;
    return (_a = grouped[t]) == null ? void 0 : _a.length;
  });
  const otherTiers = Object.keys(grouped).filter(
    (t) => !TIER_ORDER.includes(t)
  );
  const allTiers = [...orderedTiers, ...otherTiers];
  const headlineSponsors = grouped.Headline ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { background: "oklch(0.08 0.02 260)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "relative overflow-hidden py-28 text-center",
            style: {
              background: "linear-gradient(180deg, oklch(0.12 0.04 60) 0%, oklch(0.08 0.02 260) 100%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "pointer-events-none absolute inset-0",
                  style: {
                    background: "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.65 0.18 70 / 0.15) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 20% 80%, oklch(0.65 0.2 180 / 0.08) 0%, transparent 60%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "pointer-events-none absolute top-10 left-1/4 h-48 w-48 rounded-full animate-pulse",
                  style: {
                    background: "oklch(0.65 0.18 70 / 0.08)",
                    filter: "blur(50px)",
                    animationDuration: "5s"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "pointer-events-none absolute bottom-8 right-1/3 h-36 w-36 rounded-full animate-pulse",
                  style: {
                    background: "oklch(0.65 0.2 180 / 0.1)",
                    filter: "blur(40px)",
                    animationDuration: "7s",
                    animationDelay: "1.5s"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container mx-auto max-w-3xl px-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mx-auto mb-6 flex items-center justify-center rounded-full",
                    style: {
                      width: "4.5rem",
                      height: "4.5rem",
                      background: "oklch(0.65 0.18 70 / 0.1)",
                      border: "2px solid oklch(0.65 0.18 70 / 0.5)",
                      boxShadow: "0 0 30px oklch(0.65 0.18 70 / 0.25)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 30, style: { color: "oklch(0.65 0.18 70)" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mb-3 text-xs font-display font-bold uppercase tracking-[0.3em]",
                    style: { color: "oklch(0.55 0.23 310)" },
                    children: "We Are One · Partners"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "mb-4 font-display text-5xl md:text-6xl font-black uppercase tracking-widest",
                    style: {
                      color: "oklch(0.65 0.18 70)",
                      textShadow: "0 0 12px oklch(0.65 0.18 70 / 0.7), 0 0 30px oklch(0.65 0.18 70 / 0.3)"
                    },
                    children: "Our Sponsors"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-body text-base md:text-lg leading-relaxed max-w-xl mx-auto",
                    style: { color: "oklch(0.65 0 0)" },
                    children: "The incredible brands and organisations that make WE ARE ONE possible. Together we create magic across the globe."
                  }
                ),
                sponsors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-10", children: [
                  { label: "Partners", value: sponsors.length.toString() },
                  { label: "Tiers", value: allTiers.length.toString() },
                  {
                    label: "Headline",
                    value: headlineSponsors.length.toString()
                  }
                ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-3xl font-display font-black",
                      style: {
                        color: "oklch(0.65 0.18 70)",
                        textShadow: "0 0 10px oklch(0.65 0.18 70 / 0.6), 0 0 20px oklch(0.65 0.18 70 / 0.3)"
                      },
                      children: value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs uppercase tracking-widest font-display",
                      style: { color: "oklch(0.5 0 0)" },
                      children: label
                    }
                  )
                ] }, label)) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto max-w-7xl px-4 py-16", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "animate-pulse rounded-2xl p-6",
            style: { background: "oklch(0.13 0.02 260)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mx-auto mb-4 h-16 w-24 rounded-xl",
                  style: { background: "oklch(0.2 0.02 260)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mx-auto h-4 w-2/3 rounded",
                  style: { background: "oklch(0.2 0.02 260)" }
                }
              )
            ]
          },
          i
        )) }) : sponsors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-4 rounded-2xl py-24 text-center",
            style: {
              background: "oklch(0.1 0.02 260)",
              border: "1px solid oklch(0.2 0.02 260 / 0.5)"
            },
            "data-ocid": "sponsors-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Handshake, { size: 52, style: { color: "oklch(0.35 0 0)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-display text-xl font-bold uppercase tracking-widest",
                  style: { color: "oklch(0.55 0 0)" },
                  children: "Sponsor Announcements Coming Soon"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "max-w-xs font-body text-sm",
                  style: { color: "oklch(0.4 0 0)" },
                  children: "Our 2025–2026 sponsor lineup will be revealed ahead of each festival season."
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-16", children: allTiers.map((tier) => {
          const color = tierColor(tier);
          const isHeadline = tier.toLowerCase() === "headline";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-4", children: [
              isHeadline && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Gem,
                {
                  size: 18,
                  style: {
                    color: "oklch(0.92 0.04 200)",
                    filter: "drop-shadow(0 0 8px oklch(0.92 0.04 200 / 0.8))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display text-2xl font-bold uppercase tracking-widest",
                  style: {
                    color,
                    textShadow: isHeadline ? `0 0 16px ${color.replace(")", " / 0.8)")}, 0 0 32px ${color.replace(")", " / 0.3)")}` : `0 0 10px ${color.replace(")", " / 0.6)")}, 0 0 20px ${color.replace(")", " / 0.25)")}`
                  },
                  children: isHeadline ? "Headline Sponsor" : tier
                }
              ),
              isHeadline && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Gem,
                {
                  size: 18,
                  style: {
                    color: "oklch(0.92 0.04 200)",
                    filter: "drop-shadow(0 0 8px oklch(0.92 0.04 200 / 0.8))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-px flex-1",
                  style: {
                    background: `linear-gradient(90deg, ${color.replace(")", " / 0.4)")}, transparent)`
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "rounded-full px-3 py-0.5 text-xs font-display font-bold uppercase tracking-widest",
                  style: {
                    background: color.replace(")", " / 0.1)"),
                    border: `1px solid ${color.replace(")", " / 0.3)")}`,
                    color
                  },
                  children: [
                    grouped[tier].length,
                    " ",
                    grouped[tier].length === 1 ? "Sponsor" : "Sponsors"
                  ]
                }
              )
            ] }),
            isHeadline && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "mb-6 text-center font-body text-sm max-w-xl mx-auto",
                style: { color: "oklch(0.55 0 0)" },
                children: "Proudly sponsoring all WE ARE ONE events — festivals, raves and nightclub events around the world."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: tierGridCols(tier), children: grouped[tier].map(
              (sponsor) => isHeadline ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                HeadlineSponsorCard,
                {
                  sponsor
                },
                sponsor.id.toString()
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                SponsorCard,
                {
                  sponsor,
                  tier
                },
                sponsor.id.toString()
              )
            ) })
          ] }, tier);
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "mt-8 py-20 text-center",
            style: {
              background: "linear-gradient(180deg, oklch(0.08 0.02 260) 0%, oklch(0.1 0.03 60) 100%)",
              borderTop: "1px solid oklch(0.65 0.18 70 / 0.1)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-2xl px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "mb-3 font-display text-3xl font-bold uppercase tracking-widest",
                  style: {
                    color: "oklch(0.65 0.18 70)",
                    textShadow: "0 0 12px oklch(0.65 0.18 70 / 0.5)"
                  },
                  children: "Become a Sponsor"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "mb-8 font-body leading-relaxed",
                  style: { color: "oklch(0.6 0 0)" },
                  children: "Partner with WE ARE ONE and reach hundreds of thousands of festival-goers across the globe. Contact us to explore sponsorship opportunities."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "mailto:contact@weareone.com",
                  className: "inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                  style: {
                    background: "oklch(0.65 0.18 70 / 0.12)",
                    border: "2px solid oklch(0.65 0.18 70 / 0.6)",
                    color: "oklch(0.65 0.18 70)",
                    boxShadow: "0 0 20px oklch(0.65 0.18 70 / 0.2)",
                    textDecoration: "none"
                  },
                  "data-ocid": "become-sponsor-cta",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Handshake, { size: 18 }),
                    "Get in Touch"
                  ]
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
export {
  SponsorsPage as default
};

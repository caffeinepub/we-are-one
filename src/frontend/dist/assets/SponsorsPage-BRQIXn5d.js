import { j as jsxRuntimeExports } from "./index-Bn1FPUc6.js";
import { _ as useSponsors } from "./useBackend-BGoIDPx7.js";
import { S as Star } from "./star-ClMNMdIm.js";
import { H as Handshake } from "./handshake-KDorNRf1.js";
import { E as ExternalLink } from "./external-link-7NHXuibP.js";
const TIER_ORDER = ["Gold", "Silver", "Bronze", "Partner"];
function tierColor(tier) {
  switch (tier.toLowerCase()) {
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
    case "gold":
      return "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";
    case "silver":
      return "grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    default:
      return "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
  }
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
  var _a;
  const { data: sponsors = [], isLoading } = useSponsors();
  const grouped = {};
  for (const s of sponsors) {
    const tier = s.tier || "Partner";
    if (!grouped[tier]) grouped[tier] = [];
    grouped[tier].push(s);
  }
  const orderedTiers = TIER_ORDER.filter((t) => {
    var _a2;
    return (_a2 = grouped[t]) == null ? void 0 : _a2.length;
  });
  const otherTiers = Object.keys(grouped).filter(
    (t) => !TIER_ORDER.includes(t)
  );
  const allTiers = [...orderedTiers, ...otherTiers];
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
                    className: "mx-auto mb-6 flex h-18 w-18 items-center justify-center rounded-full",
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
                    label: "Gold",
                    value: (((_a = grouped.Gold) == null ? void 0 : _a.length) ?? 0).toString()
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
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display text-2xl font-bold uppercase tracking-widest",
                  style: {
                    color,
                    textShadow: `0 0 10px ${color.replace(")", " / 0.6)")}, 0 0 20px ${color.replace(")", " / 0.25)")}`
                  },
                  children: tier
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: tierGridCols(tier), children: grouped[tier].map((sponsor) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SponsorCard,
              {
                sponsor,
                tier
              },
              sponsor.id.toString()
            )) })
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

import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-LPyTcEuD.js";
import { T as Ticket, C as ComingSoonModal, u as useComingSoon, a as ChevronDown } from "./ComingSoonModal-Dg3YpuNs.js";
import { u as useTicketUrls, g as getSeasonLabel, a as getEventTypeLabel, i as isComingSoon, b as isSummer, c as isEDM, F as FestivalStatus, d as useFestivals } from "./useBackend-BcWpsFyz.js";
import { M as MapPin } from "./map-pin-CoGX7SXE.js";
import { C as Calendar, M as Music } from "./music-7du_IS34.js";
import { U as Users } from "./users-CoVV3g3Q.js";
import { S as Sparkles } from "./sparkles-Bn4HjTis.js";
import { S as Star } from "./star-Bp1z5Ab5.js";
import { G as Globe } from "./globe-BowZ4Syz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function FestivalCard({ festival }) {
  const [showModal, setShowModal] = reactExports.useState(false);
  const { data: ticketUrls = {} } = useTicketUrls();
  const seasonLabel = getSeasonLabel(festival.season);
  const eventTypeLabel = getEventTypeLabel(festival.eventType);
  const comingSoon = isComingSoon(festival.status);
  const summer = isSummer(festival.season);
  const edm = isEDM(festival.eventType);
  const ticketUrl = ticketUrls[festival.id.toString()];
  const isActive = festival.status === FestivalStatus.Active;
  const hasTicketLink = isActive && !!ticketUrl;
  function handleBuyTickets() {
    if (hasTicketLink) {
      window.open(ticketUrl, "_blank", "noopener,noreferrer");
    } else {
      setShowModal(true);
    }
  }
  const seasonColor = summer ? "oklch(0.65 0.2 180)" : "oklch(0.6 0.15 250)";
  const seasonBg = summer ? "oklch(0.65 0.2 180 / 0.1)" : "oklch(0.6 0.15 250 / 0.1)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: "group relative flex flex-col overflow-hidden rounded-2xl transition-smooth hover:-translate-y-1",
        style: {
          background: "oklch(0.1 0.02 260)",
          border: "1px solid oklch(0.25 0.05 180 / 0.4)",
          boxShadow: "0 4px 20px oklch(0 0 0 / 0.4)"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.boxShadow = "0 8px 40px oklch(0.65 0.2 180 / 0.2), 0 0 0 1px oklch(0.65 0.2 180 / 0.3)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.boxShadow = "0 4px 20px oklch(0 0 0 / 0.4)";
        },
        "data-ocid": "festival-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 overflow-hidden", children: [
            festival.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: festival.imageUrl,
                alt: festival.name,
                className: "h-full w-full object-cover transition-smooth group-hover:scale-105"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "h-full w-full",
                style: {
                  background: edm ? "linear-gradient(135deg, oklch(0.1 0.05 260) 0%, oklch(0.2 0.15 180) 50%, oklch(0.15 0.1 310) 100%)" : "linear-gradient(135deg, oklch(0.12 0.04 120) 0%, oklch(0.2 0.1 150) 50%, oklch(0.15 0.08 70) 100%)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 opacity-60",
                      style: {
                        background: edm ? "radial-gradient(ellipse at 30% 50%, oklch(0.65 0.2 180 / 0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, oklch(0.55 0.23 310 / 0.25) 0%, transparent 60%)" : "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.18 70 / 0.3) 0%, transparent 60%)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-center text-xs font-display font-bold uppercase tracking-widest opacity-30",
                      style: { color: "oklch(0.96 0 0)", maxWidth: "80%" },
                      children: festival.name
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider font-display",
                style: {
                  background: seasonBg,
                  border: `1px solid ${seasonColor}`,
                  color: seasonColor,
                  backdropFilter: "blur(8px)"
                },
                children: seasonLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider font-display",
                style: comingSoon ? {
                  background: "oklch(0.65 0.18 70 / 0.15)",
                  border: "1px solid oklch(0.65 0.18 70 / 0.6)",
                  color: "oklch(0.65 0.18 70)",
                  backdropFilter: "blur(8px)"
                } : {
                  background: "oklch(0.55 0.18 145 / 0.15)",
                  border: "1px solid oklch(0.55 0.18 145 / 0.6)",
                  color: "oklch(0.55 0.18 145)",
                  backdropFilter: "blur(8px)"
                },
                children: comingSoon ? "Coming Soon" : "Active"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-3 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rounded px-2 py-0.5 text-xs font-display font-bold uppercase tracking-wider",
                style: {
                  background: "oklch(0.55 0.23 310 / 0.1)",
                  border: "1px solid oklch(0.55 0.23 310 / 0.4)",
                  color: "oklch(0.55 0.23 310)"
                },
                children: eventTypeLabel
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "text-lg font-display font-bold leading-tight glow-cyan line-clamp-2",
                style: { color: "oklch(0.65 0.2 180)" },
                children: festival.name
              }
            ),
            festival.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm leading-relaxed line-clamp-2",
                style: { color: "oklch(0.65 0 0)" },
                children: festival.description
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-sm",
                  style: { color: "oklch(0.65 0 0)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MapPin,
                      {
                        size: 14,
                        className: "shrink-0",
                        style: { color: "oklch(0.65 0.2 180)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                      festival.location,
                      ", ",
                      festival.country
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-sm",
                  style: { color: "oklch(0.65 0 0)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Calendar,
                      {
                        size: 14,
                        className: "shrink-0",
                        style: { color: "oklch(0.65 0.2 180)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: festival.weekends })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-sm",
                  style: { color: "oklch(0.65 0 0)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Users,
                      {
                        size: 14,
                        className: "shrink-0",
                        style: { color: "oklch(0.65 0.2 180)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: festival.ageRestriction })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mt-3 flex items-center justify-between border-t pt-3",
                style: { borderColor: "oklch(0.25 0.02 260 / 0.4)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs uppercase tracking-wider",
                        style: { color: "oklch(0.5 0 0)" },
                        children: "From"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xl font-display font-bold",
                        style: { color: "oklch(0.65 0.18 70)" },
                        children: [
                          "£",
                          festival.ticketPriceMin.toString()
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: handleBuyTickets,
                      className: "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                      style: {
                        background: "oklch(0.65 0.2 180 / 0.15)",
                        border: "1px solid oklch(0.65 0.2 180 / 0.5)",
                        color: "oklch(0.65 0.2 180)",
                        boxShadow: "0 0 12px oklch(0.65 0.2 180 / 0.15)"
                      },
                      "data-ocid": "buy-tickets-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 14 }),
                        "Tickets"
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoonModal, { isOpen: showModal, onClose: () => setShowModal(false) })
  ] });
}
const STATS = [
  { value: "12", label: "Festivals Worldwide", color: "oklch(0.65 0.2 180)" },
  { value: "6", label: "Countries", color: "oklch(0.55 0.23 310)" },
  { value: "3", label: "Continents", color: "oklch(0.65 0.18 70)" },
  { value: "100,000+", label: "Fans", color: "oklch(0.65 0.2 180)" }
];
const EXPERIENCES = [
  {
    icon: Music,
    title: "World-Class Artists",
    desc: "The biggest names in EDM, live bands, and surprise headline acts every season.",
    color: "oklch(0.65 0.2 180)",
    glowClass: "glow-cyan"
  },
  {
    icon: Star,
    title: "Immersive Experiences",
    desc: "Laser shows, pyrotechnics, LED stages, and production that redefines what a festival can be.",
    color: "oklch(0.55 0.23 310)",
    glowClass: "glow-magenta"
  },
  {
    icon: Globe,
    title: "Global Community",
    desc: "Unite with fans from every corner of the world — one beat, one movement, one family.",
    color: "oklch(0.65 0.18 70)",
    glowClass: "glow-amber"
  }
];
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "animate-pulse rounded-2xl overflow-hidden",
      style: {
        background: "oklch(0.1 0.02 260)",
        border: "1px solid oklch(0.25 0.05 180 / 0.2)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48", style: { background: "oklch(0.14 0.02 260)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-4 w-24 rounded",
              style: { background: "oklch(0.18 0.02 260)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-5 w-3/4 rounded",
              style: { background: "oklch(0.18 0.02 260)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-4 w-full rounded",
              style: { background: "oklch(0.16 0.02 260)" }
            }
          )
        ] })
      ]
    }
  );
}
function HomePage() {
  const { isOpen, open, close } = useComingSoon();
  const { data: festivals, isLoading } = useFestivals();
  const [email, setEmail] = reactExports.useState("");
  const [notified, setNotified] = reactExports.useState(false);
  const featured = (festivals ?? []).slice(0, 6);
  function handleScrollDown() {
    var _a;
    (_a = document.getElementById("stats-strip")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }
  function handleNotify(e) {
    e.preventDefault();
    if (email.trim()) {
      setNotified(true);
      setEmail("");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden",
        "aria-label": "Hero",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute inset-0",
              style: {
                background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.65 0.2 180 / 0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 20% 80%, oklch(0.55 0.23 310 / 0.12) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 70%, oklch(0.65 0.18 70 / 0.08) 0%, transparent 50%)",
                animation: "aurora-shift 12s ease-in-out infinite alternate"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute inset-0 opacity-[0.03]",
              style: {
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.96 0 0) 2px, oklch(0.96 0 0) 4px)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-6 max-w-5xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "https://image2url.com/r2/default/images/1775683614327-346f8e28-9a02-4a59-8ff6-14dd1641405e.png",
                alt: "WE ARE ONE Festival Logo",
                className: "h-28 w-auto object-contain md:h-40 lg:h-48 drop-shadow-[0_0_40px_oklch(0.65_0.2_180_/_0.6)]",
                onError: (e) => {
                  e.target.style.display = "none";
                },
                "data-ocid": "hero-logo"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display text-sm font-black uppercase tracking-[0.5em] animate-pulse-glow glow-magenta md:text-base",
                style: { color: "oklch(0.55 0.23 310)" },
                children: "One World 2 Vibes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h1",
              {
                className: "font-display font-black leading-[0.95] tracking-tight text-5xl md:text-7xl lg:text-8xl",
                style: { color: "oklch(0.96 0 0)" },
                "data-ocid": "hero-headline",
                children: [
                  "WE ARE ONE",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "block glow-cyan mt-1",
                      style: { color: "oklch(0.65 0.2 180)" },
                      children: "Festivals"
                    }
                  ),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "block text-3xl md:text-4xl lg:text-5xl mt-2 font-bold",
                      style: { color: "oklch(0.75 0 0)" },
                      children: "Across the Globe"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "max-w-2xl text-base leading-relaxed md:text-lg lg:text-xl",
                style: { color: "oklch(0.62 0 0)" },
                children: "Experience the ultimate EDM & family festivals in the UK, Europe, Americas, Asia & beyond."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/festivals",
                  className: "flex items-center gap-2 rounded-2xl px-8 py-4 font-display font-bold uppercase tracking-wider text-sm transition-smooth hover:scale-105 active:scale-95",
                  style: {
                    background: "oklch(0.65 0.2 180 / 0.12)",
                    border: "2px solid oklch(0.65 0.2 180 / 0.5)",
                    color: "oklch(0.65 0.2 180)",
                    boxShadow: "0 0 20px oklch(0.65 0.2 180 / 0.2)"
                  },
                  "data-ocid": "hero-view-festivals",
                  children: [
                    "View Festivals",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: open,
                  className: "flex items-center gap-2 rounded-2xl px-8 py-4 font-display font-bold uppercase tracking-wider text-sm transition-smooth hover:scale-105 active:scale-95",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.65 0.2 180 / 0.95), oklch(0.55 0.23 310 / 0.95))",
                    color: "oklch(0.96 0 0)",
                    boxShadow: "0 0 30px oklch(0.65 0.2 180 / 0.45), 0 4px 20px oklch(0 0 0 / 0.3)"
                  },
                  "data-ocid": "hero-buy-tickets",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 18 }),
                    "Buy Tickets"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 mt-2",
                style: { color: "oklch(0.45 0 0)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12, style: { color: "oklch(0.65 0.18 70)" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs uppercase tracking-[0.3em]", children: "14+ for EDM · All Ages for Family Events" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12, style: { color: "oklch(0.65 0.18 70)" } })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleScrollDown,
              className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-smooth hover:opacity-80 focus:outline-none",
              style: { color: "oklch(0.45 0 0)" },
              "aria-label": "Scroll down",
              "data-ocid": "hero-scroll-down",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs uppercase tracking-widest", children: "Scroll" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    size: 20,
                    className: "animate-bounce",
                    style: { color: "oklch(0.65 0.2 180)" }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute bottom-0 left-0 right-0 h-40",
              style: {
                background: "linear-gradient(to bottom, transparent, oklch(0.06 0.01 260 / 0.9))"
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        id: "stats-strip",
        className: "relative py-10 px-4 overflow-hidden",
        style: {
          background: "oklch(0.1 0.02 260 / 0.6)",
          borderTop: "1px solid oklch(0.65 0.2 180 / 0.15)",
          borderBottom: "1px solid oklch(0.65 0.2 180 / 0.15)",
          backdropFilter: "blur(10px)"
        },
        "aria-label": "Stats",
        "data-ocid": "stats-strip",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute inset-0",
              style: {
                background: "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.65 0.2 180 / 0.04) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 container mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-6 sm:grid-cols-4", children: STATS.map(({ value, label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-1 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display font-black text-3xl md:text-4xl lg:text-5xl",
                    style: {
                      color,
                      textShadow: `0 0 20px ${color.replace(")", " / 0.5)")}`
                    },
                    children: value
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display text-xs uppercase tracking-widest",
                    style: { color: "oklch(0.5 0 0)" },
                    children: label
                  }
                )
              ]
            },
            label
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 px-4",
        style: { background: "oklch(0.07 0.01 260 / 0.5)" },
        "aria-label": "Featured Festivals",
        "data-ocid": "featured-festivals",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 flex flex-col items-center gap-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14, style: { color: "oklch(0.65 0.18 70)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display text-xs font-bold uppercase tracking-[0.35em]",
                  style: { color: "oklch(0.65 0.18 70)" },
                  children: "On the Horizon"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14, style: { color: "oklch(0.65 0.18 70)" } })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-black text-4xl md:text-5xl lg:text-6xl glow-cyan",
                style: { color: "oklch(0.65 0.2 180)" },
                children: "Upcoming Festivals"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "max-w-xl text-base",
                style: { color: "oklch(0.58 0 0)" },
                children: "Summer superclubs to winter wonderlands — discover your next WE ARE ONE experience."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: isLoading ? ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, id)) : featured.map((festival) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            FestivalCard,
            {
              festival
            },
            festival.id.toString()
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/festivals",
              className: "flex items-center gap-2 rounded-2xl px-8 py-3 font-display font-bold uppercase tracking-wider text-sm transition-smooth hover:scale-105",
              style: {
                border: "2px solid oklch(0.65 0.2 180 / 0.4)",
                color: "oklch(0.65 0.2 180)",
                boxShadow: "0 0 16px oklch(0.65 0.2 180 / 0.1)"
              },
              "data-ocid": "home-view-all-festivals",
              children: [
                "View All Festivals",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
              ]
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 px-4",
        "aria-label": "Experience highlights",
        "data-ocid": "experience-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-black text-4xl md:text-5xl glow-magenta",
                style: { color: "oklch(0.55 0.23 310)" },
                children: "The WE ARE ONE Experience"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "mt-3 text-base max-w-lg mx-auto",
                style: { color: "oklch(0.55 0 0)" },
                children: "More than a festival — a world unto itself."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-3", children: EXPERIENCES.map(
            ({ icon: Icon, title, desc, color, glowClass }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center gap-4 rounded-2xl p-8 text-center transition-smooth hover:-translate-y-1",
                style: {
                  background: "oklch(0.1 0.02 260 / 0.7)",
                  border: "1px solid oklch(0.25 0.05 180 / 0.3)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 24px oklch(0 0 0 / 0.3)"
                },
                "data-ocid": "experience-card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex items-center justify-center rounded-full",
                      style: {
                        width: "72px",
                        height: "72px",
                        background: `${color.replace(")", " / 0.1)")}`,
                        border: `2px solid ${color.replace(")", " / 0.4)")}`,
                        boxShadow: `0 0 20px ${color.replace(")", " / 0.2)")}`
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 30, className: glowClass, style: { color } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: `font-display font-bold text-xl ${glowClass}`,
                      style: { color },
                      children: title
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm leading-relaxed",
                      style: { color: "oklch(0.58 0 0)" },
                      children: desc
                    }
                  )
                ]
              },
              title
            )
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 px-4",
        style: { background: "oklch(0.07 0.01 260 / 0.4)" },
        "aria-label": "Stay notified",
        "data-ocid": "newsletter-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mx-auto mb-8 h-1 w-32 rounded-full",
              style: {
                background: "linear-gradient(90deg, transparent, oklch(0.65 0.2 180), oklch(0.55 0.23 310), transparent)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h2",
            {
              className: "font-display font-black text-4xl md:text-5xl glow-cyan mb-4",
              style: { color: "oklch(0.96 0 0)" },
              children: [
                "Join the",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "glow-magenta",
                    style: { color: "oklch(0.55 0.23 310)" },
                    children: "WE ARE ONE"
                  }
                ),
                " ",
                "Family"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mb-10 text-base md:text-lg leading-relaxed",
              style: { color: "oklch(0.58 0 0)" },
              children: "Be the first to know when tickets go live."
            }
          ),
          notified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "inline-flex items-center gap-3 rounded-2xl px-8 py-4",
              style: {
                background: "oklch(0.65 0.2 180 / 0.1)",
                border: "2px solid oklch(0.65 0.2 180 / 0.5)"
              },
              "data-ocid": "notify-success",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18, style: { color: "oklch(0.65 0.18 70)" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display font-bold text-sm uppercase tracking-wider glow-cyan",
                    style: { color: "oklch(0.65 0.2 180)" },
                    children: "You're on the list — see you on the dancefloor! 🎉"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleNotify,
              className: "flex flex-col items-center gap-3 sm:flex-row sm:gap-0",
              "aria-label": "Email notification form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "email",
                    required: true,
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    placeholder: "your@email.com",
                    className: "w-full flex-1 rounded-2xl px-5 py-4 font-body text-sm outline-none transition-smooth sm:rounded-r-none",
                    style: {
                      background: "oklch(0.12 0.02 260)",
                      border: "2px solid oklch(0.65 0.2 180 / 0.3)",
                      borderRight: "none",
                      color: "oklch(0.96 0 0)",
                      caretColor: "oklch(0.65 0.2 180)"
                    },
                    onFocus: (e) => {
                      e.target.style.borderColor = "oklch(0.65 0.2 180 / 0.7)";
                      e.target.style.boxShadow = "0 0 12px oklch(0.65 0.2 180 / 0.15)";
                    },
                    onBlur: (e) => {
                      e.target.style.borderColor = "oklch(0.65 0.2 180 / 0.3)";
                      e.target.style.boxShadow = "none";
                    },
                    "data-ocid": "newsletter-email-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    className: "w-full rounded-2xl px-7 py-4 font-display font-bold text-sm uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95 sm:w-auto sm:rounded-l-none",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.65 0.2 180), oklch(0.55 0.23 310))",
                      color: "oklch(0.96 0 0)",
                      boxShadow: "0 0 20px oklch(0.65 0.2 180 / 0.35)"
                    },
                    "data-ocid": "newsletter-submit",
                    children: "Notify Me"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-5 font-display text-xs uppercase tracking-widest",
              style: { color: "oklch(0.38 0 0)" },
              children: "No spam, ever. Unsubscribe anytime."
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoonModal, { isOpen, onClose: close }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes aurora-shift {
          0%   { opacity: 0.6; transform: scale(1) translateY(0); }
          33%  { opacity: 0.8; transform: scale(1.05) translateY(-20px); }
          66%  { opacity: 0.65; transform: scale(0.97) translateY(10px); }
          100% { opacity: 0.75; transform: scale(1.02) translateY(-10px); }
        }
      ` })
  ] });
}
export {
  HomePage as default
};

import { r as reactExports, j as jsxRuntimeExports, X, L as Link } from "./index-D9S6QrCw.js";
import { C as ComingSoonModal } from "./ComingSoonModal-BTwt7rub.js";
import { d as useFestivals, u as useTicketUrls, S as STATIC_FESTIVALS, b as isSummer, E as EventType, F as FestivalStatus, c as isEDM, i as isComingSoon, a as getEventTypeLabel, g as getSeasonLabel, e as useSponsorsByFestival, f as useSponsors } from "./useBackend-FFsO06Zm.js";
import { m as motion } from "./proxy-BFHUe8Yk.js";
import { M as Music } from "./music-CDX-G39I.js";
import { S as Search, D as DollarSign } from "./search-C5WNHwTh.js";
import { A as AnimatePresence } from "./index-_QF17UCb.js";
import { C as ChevronUp } from "./chevron-up-CuxRylLM.js";
import { C as ChevronDown, T as Ticket } from "./ticket-BDE0ZTUM.js";
import { M as MapPin } from "./map-pin-BGfKfQM8.js";
import { C as Calendar } from "./calendar-Dlxiwsf1.js";
import { U as Users } from "./users-CBK1l9L3.js";
import { B as Building2 } from "./building-2-BiQ_2hpy.js";
import { H as Headphones } from "./headphones-CkdrQ9hN.js";
import { G as Gem } from "./gem-D829NcsS.js";
import "./sparkles-CJWEwGWj.js";
const SEASON_FILTERS = ["All", "Summer", "Winter"];
const EVENT_FILTERS = [
  "All",
  "EDM",
  "Rave",
  "Club/Hotel",
  "Family"
];
function FestivalSkeleton() {
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
            className: "h-44 w-full",
            style: { background: "oklch(0.15 0.02 260)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-3 w-16 rounded",
              style: { background: "oklch(0.2 0.02 260)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-5 w-3/4 rounded",
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
              className: "h-3 w-5/6 rounded",
              style: { background: "oklch(0.18 0.02 260)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-7 w-16 rounded",
                style: { background: "oklch(0.2 0.02 260)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-9 w-24 rounded-xl",
                style: { background: "oklch(0.2 0.02 260)" }
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function FestivalSponsors({
  festivalId,
  accentColor
}) {
  const { data: festivalSponsors = [] } = useSponsorsByFestival(festivalId);
  const { data: allSponsors = [] } = useSponsors();
  const headlineSponsors = allSponsors.filter(
    (s) => s.tier.toLowerCase() === "headline"
  );
  const combined = [
    ...headlineSponsors,
    ...festivalSponsors.filter(
      (s) => !headlineSponsors.some((h) => h.id === s.id)
    )
  ];
  if (!combined.length) return null;
  const accentAlpha = (a) => accentColor.replace(")", ` / ${a})`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-4",
      style: {
        background: accentAlpha(0.05),
        border: `1px solid ${accentAlpha(0.15)}`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "mb-3 text-xs font-display font-bold uppercase tracking-widest",
            style: { color: accentColor },
            children: "Festival Sponsors"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          headlineSponsors.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: s.websiteUrl || void 0,
              target: "_blank",
              rel: "noopener noreferrer",
              title: s.name,
              className: "flex items-center gap-2 rounded-lg px-3 py-1.5 transition-smooth hover:scale-105",
              style: {
                background: "oklch(0.18 0.04 200 / 0.5)",
                border: "1px solid oklch(0.92 0.04 200 / 0.3)",
                textDecoration: "none"
              },
              children: [
                s.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: s.logoUrl,
                    alt: s.name,
                    className: "h-6 w-10 object-contain"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-display font-bold uppercase tracking-wider",
                    style: { color: "oklch(0.92 0.04 200)" },
                    children: s.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gem, { size: 10, style: { color: "oklch(0.92 0.04 200)" } })
              ]
            },
            s.id.toString()
          )),
          festivalSponsors.filter((s) => !headlineSponsors.some((h) => h.id === s.id)).map(
            (s) => s.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: s.websiteUrl || void 0,
                target: "_blank",
                rel: "noopener noreferrer",
                title: s.name,
                className: "flex h-9 w-14 items-center justify-center overflow-hidden rounded-lg transition-smooth hover:scale-105",
                style: {
                  background: "oklch(0.18 0.02 260)",
                  textDecoration: "none"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: s.logoUrl,
                    alt: s.name,
                    className: "h-full w-full object-contain p-1"
                  }
                )
              },
              s.id.toString()
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "flex h-9 items-center rounded-lg px-3 text-xs font-display font-bold uppercase tracking-wider",
                style: {
                  background: "oklch(0.18 0.02 260)",
                  color: accentColor
                },
                children: s.name
              },
              s.id.toString()
            )
          )
        ] })
      ]
    }
  );
}
function DetailPanel({ festival, onClose, onBuyTickets }) {
  const summer = isSummer(festival.season);
  const edm = isEDM(festival.eventType);
  const comingSoon = isComingSoon(festival.status);
  const eventTypeLabel = getEventTypeLabel(festival.eventType);
  const accentColor = summer ? "oklch(0.65 0.2 180)" : "oklch(0.6 0.18 250)";
  const accentAlpha = (a) => accentColor.replace(")", ` / ${a})`);
  const metaDetails = [
    {
      icon: MapPin,
      label: "Location",
      value: `${festival.location}, ${festival.country}`
    },
    { icon: Building2, label: "Organiser", value: festival.company },
    { icon: Calendar, label: "Dates", value: festival.weekends },
    { icon: Users, label: "Age Restriction", value: festival.ageRestriction },
    {
      icon: Ticket,
      label: "Ticket Prices",
      value: `£${festival.ticketPriceMin.toString()} – £${festival.ticketPriceMax.toString()}`
    },
    {
      icon: DollarSign,
      label: "Est. Revenue",
      value: `${festival.estimatedRevenueMin} – ${festival.estimatedRevenueMax}`
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.28 },
      className: "col-span-full rounded-2xl overflow-hidden",
      style: {
        background: "oklch(0.08 0.02 260)",
        border: `2px solid ${accentColor}`,
        boxShadow: `0 0 40px ${accentAlpha(0.15)}`
      },
      "data-ocid": "festival-detail-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-6 py-4",
            style: {
              background: `linear-gradient(90deg, ${accentAlpha(0.08)}, transparent)`,
              borderBottom: `1px solid ${accentAlpha(0.2)}`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                    style: {
                      background: accentAlpha(0.1),
                      border: `1px solid ${accentColor}`,
                      color: accentColor
                    },
                    children: [
                      getSeasonLabel(festival.season),
                      " · ",
                      eventTypeLabel
                    ]
                  }
                ),
                comingSoon && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-display font-bold uppercase tracking-wider px-3 py-1 rounded-full",
                    style: {
                      background: "oklch(0.65 0.18 70 / 0.1)",
                      border: "1px solid oklch(0.65 0.18 70 / 0.5)",
                      color: "oklch(0.65 0.18 70)"
                    },
                    children: "Coming Soon"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "rounded-full p-1.5 transition-smooth hover:scale-110",
                  style: { color: accentColor },
                  "aria-label": "Close detail panel",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 p-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "text-2xl font-display font-bold leading-tight",
                style: { color: accentColor },
                children: festival.name
              }
            ),
            festival.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "leading-relaxed text-sm",
                style: { color: "oklch(0.75 0 0)" },
                children: festival.description
              }
            ),
            festival.lineup && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-4 space-y-2",
                style: {
                  background: accentAlpha(0.06),
                  border: `1px solid ${accentAlpha(0.2)}`
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { size: 14, style: { color: accentColor } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-display font-bold uppercase tracking-widest",
                        style: { color: accentColor },
                        children: "Lineup"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: festival.lineup.split(",").map((artist) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-display px-2.5 py-1 rounded-full",
                      style: {
                        background: "oklch(0.12 0.02 260)",
                        border: `1px solid ${accentAlpha(0.3)}`,
                        color: "oklch(0.85 0 0)"
                      },
                      children: artist.trim()
                    },
                    artist.trim()
                  )) })
                ]
              }
            ),
            festival.specialNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 rounded-xl p-4",
                style: {
                  background: "oklch(0.65 0.18 70 / 0.07)",
                  border: "1px solid oklch(0.65 0.18 70 / 0.3)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Music,
                    {
                      size: 16,
                      className: "shrink-0 mt-0.5",
                      style: { color: "oklch(0.65 0.18 70)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-sm leading-relaxed",
                      style: { color: "oklch(0.75 0 0)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "font-bold",
                            style: { color: "oklch(0.65 0.18 70)" },
                            children: [
                              "Note:",
                              " "
                            ]
                          }
                        ),
                        festival.specialNotes
                      ]
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: metaDetails.map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-4",
                style: {
                  background: "oklch(0.12 0.02 260)",
                  border: "1px solid oklch(0.2 0.03 260 / 0.5)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 12, style: { color: accentColor } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs uppercase tracking-wider font-display",
                        style: { color: "oklch(0.5 0 0)" },
                        children: label
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm font-bold font-display",
                      style: { color: "oklch(0.9 0 0)" },
                      children: value
                    }
                  )
                ]
              },
              label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-3 flex items-center gap-2 text-sm",
                style: {
                  background: edm ? "oklch(0.55 0.23 310 / 0.06)" : "oklch(0.55 0.18 145 / 0.06)",
                  border: edm ? "1px solid oklch(0.55 0.23 310 / 0.3)" : "1px solid oklch(0.55 0.18 145 / 0.3)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Users,
                    {
                      size: 14,
                      style: {
                        color: edm ? "oklch(0.55 0.23 310)" : "oklch(0.55 0.18 145)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        color: edm ? "oklch(0.55 0.23 310)" : "oklch(0.55 0.18 145)"
                      },
                      children: edm ? "EDM events are 14+ only" : "All ages welcome — family-friendly event"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => onBuyTickets(festival),
                  className: "flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 px-6 font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                  style: {
                    background: accentAlpha(0.15),
                    border: `2px solid ${accentColor}`,
                    color: accentColor,
                    boxShadow: `0 0 20px ${accentAlpha(0.2)}`
                  },
                  "data-ocid": "detail-buy-tickets-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 16 }),
                    "Buy Tickets"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/festivals/$id/lineup",
                  params: { id: festival.id.toString() },
                  className: "flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95 text-sm",
                  style: {
                    background: "oklch(0.55 0.23 310 / 0.1)",
                    border: "1px solid oklch(0.55 0.23 310 / 0.5)",
                    color: "oklch(0.55 0.23 310)"
                  },
                  "data-ocid": "view-lineup-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 14 }),
                    "Lineup"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FestivalSponsors,
              {
                festivalId: festival.id,
                accentColor
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function GridCard({
  festival,
  isExpanded,
  onToggle,
  onBuyTickets
}) {
  const summer = isSummer(festival.season);
  const edm = isEDM(festival.eventType);
  const comingSoon = isComingSoon(festival.status);
  const eventTypeLabel = getEventTypeLabel(festival.eventType);
  const seasonLabel = getSeasonLabel(festival.season);
  const accentColor = summer ? "oklch(0.65 0.2 180)" : "oklch(0.6 0.18 250)";
  const accentAlpha = (a) => accentColor.replace(")", ` / ${a})`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group relative flex flex-col overflow-hidden rounded-2xl transition-smooth",
      style: {
        background: "oklch(0.1 0.02 260)",
        border: isExpanded ? `2px solid ${accentColor}` : "1px solid oklch(0.25 0.05 180 / 0.3)",
        boxShadow: isExpanded ? `0 0 30px ${accentAlpha(0.2)}` : "0 4px 20px oklch(0 0 0 / 0.4)"
      },
      "data-ocid": "festival-grid-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onToggle,
            className: "relative h-44 w-full overflow-hidden text-left",
            "aria-expanded": isExpanded,
            "aria-label": `${isExpanded ? "Collapse" : "Expand"} details for ${festival.name}`,
            children: [
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
                          background: edm ? "radial-gradient(ellipse at 30% 50%, oklch(0.65 0.2 180 / 0.35) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, oklch(0.55 0.23 310 / 0.25) 0%, transparent 60%)" : "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.18 70 / 0.3) 0%, transparent 60%)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-center text-xs font-display font-bold uppercase tracking-widest opacity-25",
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
                    background: accentAlpha(0.1),
                    border: `1px solid ${accentColor}`,
                    color: accentColor,
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
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-3 right-3 rounded-full p-1.5 transition-smooth",
                  style: {
                    background: "oklch(0.08 0.02 260 / 0.8)",
                    color: accentColor,
                    border: `1px solid ${accentAlpha(0.4)}`
                  },
                  children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14 })
                }
              )
            ]
          }
        ),
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
              className: "text-lg font-display font-bold leading-tight line-clamp-2",
              style: { color: accentColor },
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
                      style: { color: accentColor }
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
                      style: { color: accentColor }
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
                      style: { color: accentColor }
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
                    onClick: () => onBuyTickets(festival),
                    className: "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                    style: {
                      background: accentAlpha(0.15),
                      border: `1px solid ${accentAlpha(0.5)}`,
                      color: accentColor,
                      boxShadow: `0 0 12px ${accentAlpha(0.15)}`
                    },
                    "data-ocid": "buy-tickets-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 14 }),
                      "Tickets"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/festivals/$id/lineup",
                    params: { id: festival.id.toString() },
                    onClick: (e) => e.stopPropagation(),
                    className: "flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                    style: {
                      background: "oklch(0.55 0.23 310 / 0.1)",
                      border: "1px solid oklch(0.55 0.23 310 / 0.3)",
                      color: "oklch(0.55 0.23 310)"
                    },
                    "data-ocid": "lineup-link-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 12 }),
                      "Lineup"
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function FestivalSection({
  title,
  accentColor,
  festivals,
  expandedId,
  onToggleExpand,
  onBuyTickets
}) {
  if (festivals.length === 0) return null;
  const expandedFestival = festivals.find((f) => f.id === expandedId) ?? null;
  const accentAlpha = (a) => accentColor.replace(")", ` / ${a})`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", "data-ocid": "festival-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "text-2xl md:text-3xl font-display font-bold uppercase tracking-wider",
          style: {
            color: accentColor,
            textShadow: `0 0 10px ${accentAlpha(0.8)}, 0 0 20px ${accentAlpha(0.4)}`
          },
          children: title
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-px flex-1",
          style: {
            background: `linear-gradient(90deg, ${accentAlpha(0.4)}, transparent)`
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full",
          style: {
            background: accentAlpha(0.1),
            border: `1px solid ${accentAlpha(0.3)}`,
            color: accentColor
          },
          children: [
            festivals.length,
            " ",
            festivals.length === 1 ? "Event" : "Events"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: [
      festivals.map((festival) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        GridCard,
        {
          festival,
          isExpanded: expandedId === festival.id,
          onToggle: () => onToggleExpand(festival.id),
          onBuyTickets
        },
        festival.id.toString()
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expandedFestival && /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailPanel,
        {
          festival: expandedFestival,
          onClose: () => onToggleExpand(expandedFestival.id),
          onBuyTickets
        },
        `detail-${expandedFestival.id.toString()}`
      ) })
    ] })
  ] });
}
function FilterBar({
  seasonFilter,
  eventFilter,
  search,
  onSeasonChange,
  onEventChange,
  onSearchChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "sticky top-[64px] z-30 px-4 py-4",
      style: {
        background: "oklch(0.06 0.01 260 / 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid oklch(0.2 0.03 260 / 0.4)"
      },
      "data-ocid": "filter-bar",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 flex-wrap", children: SEASON_FILTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onSeasonChange(s),
            className: "px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105",
            style: seasonFilter === s ? {
              background: "oklch(0.65 0.2 180 / 0.2)",
              border: "1px solid oklch(0.65 0.2 180)",
              color: "oklch(0.65 0.2 180)"
            } : {
              background: "oklch(0.12 0.02 260)",
              border: "1px solid oklch(0.25 0.03 260 / 0.5)",
              color: "oklch(0.55 0 0)"
            },
            "data-ocid": `season-filter-${s.toLowerCase()}`,
            children: s
          },
          s
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "hidden sm:block h-6 w-px",
            style: { background: "oklch(0.25 0.02 260 / 0.5)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 flex-wrap", children: EVENT_FILTERS.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onEventChange(e),
            className: "px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105",
            style: eventFilter === e ? {
              background: "oklch(0.55 0.23 310 / 0.2)",
              border: "1px solid oklch(0.55 0.23 310)",
              color: "oklch(0.55 0.23 310)"
            } : {
              background: "oklch(0.12 0.02 260)",
              border: "1px solid oklch(0.25 0.03 260 / 0.5)",
              color: "oklch(0.55 0 0)"
            },
            "data-ocid": `event-filter-${e.toLowerCase().replace("/", "-")}`,
            children: e
          },
          e
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-0 sm:max-w-xs ml-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              size: 14,
              className: "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none",
              style: { color: "oklch(0.5 0 0)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search festivals...",
              value: search,
              onChange: (e) => onSearchChange(e.target.value),
              className: "w-full rounded-full py-2 pl-8 pr-8 text-sm font-body outline-none transition-smooth",
              style: {
                background: "oklch(0.12 0.02 260)",
                border: "1px solid oklch(0.25 0.03 260 / 0.5)",
                color: "oklch(0.9 0 0)"
              },
              onFocus: (e) => {
                e.currentTarget.style.borderColor = "oklch(0.65 0.2 180 / 0.8)";
                e.currentTarget.style.boxShadow = "0 0 0 2px oklch(0.65 0.2 180 / 0.15)";
              },
              onBlur: (e) => {
                e.currentTarget.style.borderColor = "oklch(0.25 0.03 260 / 0.5)";
                e.currentTarget.style.boxShadow = "none";
              },
              "data-ocid": "festival-search"
            }
          ),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onSearchChange(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 transition-smooth hover:scale-110",
              style: { color: "oklch(0.5 0 0)" },
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 })
            }
          )
        ] })
      ] })
    }
  );
}
function FestivalsPage() {
  const { data, isLoading } = useFestivals();
  const { data: ticketUrls = {} } = useTicketUrls();
  const festivals = data ?? STATIC_FESTIVALS;
  const [seasonFilter, setSeasonFilter] = reactExports.useState("All");
  const [eventFilter, setEventFilter] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [showModal, setShowModal] = reactExports.useState(false);
  function handleToggleExpand(id) {
    setExpandedId((prev) => prev === id ? null : id);
  }
  function handleBuyTickets(festival) {
    const ticketUrl = ticketUrls[festival.id.toString()];
    const isActive = festival.status === FestivalStatus.Active;
    if (isActive && ticketUrl) {
      window.open(ticketUrl, "_blank", "noopener,noreferrer");
    } else {
      setShowModal(true);
    }
  }
  const filtered = reactExports.useMemo(() => {
    return festivals.filter((f) => {
      if (seasonFilter === "Summer" && !isSummer(f.season)) return false;
      if (seasonFilter === "Winter" && isSummer(f.season)) return false;
      if (eventFilter === "EDM" && f.eventType !== EventType.EDM) return false;
      if (eventFilter === "Rave" && f.eventType !== EventType.Rave)
        return false;
      if (eventFilter === "Club/Hotel" && f.eventType !== EventType.ClubHotel)
        return false;
      if (eventFilter === "Family" && f.eventType !== EventType.Family)
        return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        return f.name.toLowerCase().includes(q) || f.location.toLowerCase().includes(q) || f.country.toLowerCase().includes(q);
      }
      return true;
    });
  }, [festivals, seasonFilter, eventFilter, search]);
  const summerFestivals = reactExports.useMemo(
    () => filtered.filter((f) => isSummer(f.season)),
    [filtered]
  );
  const winterFestivals = reactExports.useMemo(
    () => filtered.filter((f) => !isSummer(f.season)),
    [filtered]
  );
  const hasResults = filtered.length > 0;
  const isFiltered = seasonFilter !== "All" || eventFilter !== "All" || search.trim() !== "";
  const uniqueCountries = reactExports.useMemo(
    () => [...new Set(festivals.map((f) => f.country))].length,
    [festivals]
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
                  className: "absolute inset-0",
                  style: {
                    background: "radial-gradient(ellipse at 20% 50%, oklch(0.65 0.2 180 / 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, oklch(0.55 0.23 310 / 0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 0%, oklch(0.65 0.18 70 / 0.08) 0%, transparent 50%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-8 left-1/4 h-40 w-40 rounded-full animate-pulse pointer-events-none",
                  style: {
                    background: "oklch(0.65 0.2 180 / 0.12)",
                    filter: "blur(40px)",
                    animationDuration: "4s"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-4 right-1/3 h-32 w-32 rounded-full animate-pulse pointer-events-none",
                  style: {
                    background: "oklch(0.55 0.23 310 / 0.15)",
                    filter: "blur(30px)",
                    animationDuration: "6s",
                    animationDelay: "1s"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 opacity-[0.04] pointer-events-none",
                  style: {
                    backgroundImage: "linear-gradient(oklch(0.65 0.2 180) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.2 180) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-20 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                          children: "We Are One · Official Event Calendar"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h1",
                        {
                          className: "mb-4 text-5xl font-display font-black uppercase tracking-tight leading-none md:text-7xl",
                          style: {
                            color: "oklch(0.65 0.2 180)",
                            textShadow: "0 0 10px oklch(0.65 0.2 180 / 0.8), 0 0 20px oklch(0.65 0.2 180 / 0.4)"
                          },
                          children: "Global"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "mt-6 max-w-xl mx-auto text-base md:text-lg leading-relaxed",
                          style: { color: "oklch(0.65 0 0)" },
                          children: "Summer & Winter festivals across 6 continents — EDM, Rave, Club/Hotel and Family events"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: 0.2 },
                    className: "mt-10 flex flex-wrap items-center justify-center gap-8",
                    children: [
                      { label: "Festivals", value: festivals.length.toString() },
                      { label: "Countries", value: uniqueCountries.toString() },
                      { label: "Seasons", value: "2" },
                      { label: "Event Types", value: "4" }
                    ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-3xl font-display font-black",
                          style: {
                            color: "oklch(0.65 0.18 70)",
                            textShadow: "0 0 10px oklch(0.65 0.18 70 / 0.7), 0 0 20px oklch(0.65 0.18 70 / 0.3)"
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
                    ] }, label))
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterBar,
          {
            seasonFilter,
            eventFilter,
            search,
            onSeasonChange: setSeasonFilter,
            onEventChange: setEventFilter,
            onSearchChange: setSearch
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-4 py-12 space-y-16", children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-8 w-64 rounded animate-pulse",
                style: { background: "oklch(0.15 0.02 260)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FestivalSkeleton, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FestivalSkeleton, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FestivalSkeleton, {})
            ] })
          ] }) }),
          !isLoading && hasResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FestivalSection,
              {
                title: "Summer & International Festivals",
                accentColor: "oklch(0.65 0.2 180)",
                glowStyle: "glow-cyan",
                festivals: summerFestivals,
                expandedId,
                onToggleExpand: handleToggleExpand,
                onBuyTickets: handleBuyTickets
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FestivalSection,
              {
                title: "Winter Festivals",
                accentColor: "oklch(0.6 0.18 250)",
                glowStyle: "",
                festivals: winterFestivals,
                expandedId,
                onToggleExpand: handleToggleExpand,
                onBuyTickets: handleBuyTickets
              }
            )
          ] }),
          !isLoading && !hasResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "flex flex-col items-center justify-center py-24 text-center",
              "data-ocid": "empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mb-6 flex h-20 w-20 items-center justify-center rounded-full",
                    style: {
                      background: "oklch(0.65 0.2 180 / 0.1)",
                      border: "2px solid oklch(0.65 0.2 180 / 0.3)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 32, style: { color: "oklch(0.65 0.2 180)" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "mb-2 text-2xl font-display font-bold glow-cyan",
                    style: { color: "oklch(0.65 0.2 180)" },
                    children: "No Festivals Found"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 max-w-sm", style: { color: "oklch(0.55 0 0)" }, children: isFiltered ? "No festivals match your current filters. Try adjusting your search." : "There are no festivals to display right now." }),
                isFiltered && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setSeasonFilter("All");
                      setEventFilter("All");
                      setSearch("");
                    },
                    className: "rounded-xl px-6 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105",
                    style: {
                      background: "oklch(0.65 0.2 180 / 0.1)",
                      border: "1px solid oklch(0.65 0.2 180 / 0.5)",
                      color: "oklch(0.65 0.2 180)"
                    },
                    "data-ocid": "clear-filters-btn",
                    children: "Clear All Filters"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoonModal, { isOpen: showModal, onClose: () => setShowModal(false) })
      ]
    }
  );
}
export {
  FestivalsPage as default
};

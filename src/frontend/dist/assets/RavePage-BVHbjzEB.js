import { r as reactExports, j as jsxRuntimeExports } from "./index-0nFMWtCV.js";
import { T as useRaveEvents, d as useFestivals, p as useCategories, f as useSponsors } from "./useBackend-CmKShSiJ.js";
import { Z as Zap } from "./zap-BG2jZ3rv.js";
import { G as Gem } from "./gem-CqdvHjZj.js";
import { E as ExternalLink } from "./external-link-448rNXN1.js";
import { C as Calendar } from "./calendar-CsVSTz27.js";
import { M as MapPin } from "./map-pin-CeKh0Tv0.js";
import { M as Music2 } from "./music-2-CS9NuMWV.js";
import { T as Tag } from "./tag-CTlQCeDe.js";
function LaserBeams() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "pointer-events-none absolute inset-0 overflow-hidden",
      "aria-hidden": "true",
      children: [
        { deg: -35, color: "oklch(0.65 0.2 180)", delay: "0s", opacity: 0.07 },
        {
          deg: 15,
          color: "oklch(0.55 0.23 310)",
          delay: "0.6s",
          opacity: 0.06
        },
        {
          deg: -55,
          color: "oklch(0.65 0.18 70)",
          delay: "1.2s",
          opacity: 0.05
        },
        { deg: 45, color: "oklch(0.65 0.2 180)", delay: "0.3s", opacity: 0.06 }
      ].map((beam) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute",
          style: {
            top: "0",
            left: "50%",
            width: "3px",
            height: "100%",
            background: `linear-gradient(180deg, ${beam.color} 0%, transparent 70%)`,
            opacity: beam.opacity,
            transform: `rotate(${beam.deg}deg)`,
            transformOrigin: "top center",
            animation: "pulse 3s ease-in-out infinite",
            animationDelay: beam.delay
          }
        },
        beam.deg
      ))
    }
  );
}
function PulseRings() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      "aria-hidden": "true",
      children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute rounded-full",
          style: {
            width: `${i * 160}px`,
            height: `${i * 160}px`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: `1px solid oklch(0.65 0.2 180 / ${0.15 - i * 0.03})`,
            animation: `pulse ${2.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.25}s`
          }
        },
        i
      ))
    }
  );
}
function HeadlineSponsorStrip({ sponsors }) {
  if (!sponsors.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative overflow-hidden py-6",
      style: {
        background: "linear-gradient(90deg, oklch(0.09 0.04 200 / 0.6), oklch(0.07 0.03 220 / 0.8), oklch(0.09 0.04 200 / 0.6))",
        borderTop: "1px solid oklch(0.92 0.04 200 / 0.15)",
        borderBottom: "1px solid oklch(0.92 0.04 200 / 0.15)"
      },
      "data-ocid": "rave-headline-sponsors",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0",
            style: {
              background: "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.92 0.04 200 / 0.04) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container relative mx-auto max-w-6xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Gem,
              {
                size: 13,
                style: {
                  color: "oklch(0.92 0.04 200)",
                  filter: "drop-shadow(0 0 6px oklch(0.92 0.04 200 / 0.8))"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-display font-black uppercase tracking-[0.25em] whitespace-nowrap",
                style: {
                  color: "oklch(0.92 0.04 200)",
                  textShadow: "0 0 10px oklch(0.92 0.04 200 / 0.7)"
                },
                children: "Headline Sponsor"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Gem,
              {
                size: 13,
                style: {
                  color: "oklch(0.92 0.04 200)",
                  filter: "drop-shadow(0 0 6px oklch(0.92 0.04 200 / 0.8))"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "hidden sm:block h-px flex-shrink-0 w-6",
              style: { background: "oklch(0.92 0.04 200 / 0.3)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center gap-4", children: sponsors.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: s.websiteUrl || void 0,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group flex items-center gap-3 rounded-xl px-5 py-2.5 transition-smooth hover:scale-105",
              style: {
                background: "oklch(0.12 0.04 200 / 0.5)",
                border: "1px solid oklch(0.92 0.04 200 / 0.25)",
                textDecoration: "none"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.borderColor = "oklch(0.92 0.04 200 / 0.6)";
                e.currentTarget.style.boxShadow = "0 0 20px oklch(0.92 0.04 200 / 0.15)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.borderColor = "oklch(0.92 0.04 200 / 0.25)";
                e.currentTarget.style.boxShadow = "none";
              },
              "data-ocid": `rave-headline-sponsor-${s.id.toString()}`,
              children: [
                s.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: s.logoUrl,
                    alt: s.name,
                    className: "h-8 w-16 object-contain",
                    onError: (e) => {
                      e.target.style.display = "none";
                    }
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display font-black uppercase tracking-wider text-sm",
                    style: { color: "oklch(0.92 0.04 200)" },
                    children: s.name
                  }
                ),
                s.websiteUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ExternalLink,
                  {
                    size: 11,
                    className: "opacity-0 group-hover:opacity-100 transition-smooth",
                    style: { color: "oklch(0.92 0.04 200)" }
                  }
                )
              ]
            },
            s.id.toString()
          )) })
        ] }) })
      ]
    }
  );
}
function RaveEventCard({
  event,
  festivalName,
  categoryName
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "group flex flex-col overflow-hidden rounded-2xl transition-smooth",
      style: {
        background: "oklch(0.11 0.025 260)",
        border: "1px solid oklch(0.22 0.025 260 / 0.6)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = "oklch(0.65 0.2 180 / 0.55)";
        e.currentTarget.style.boxShadow = "0 0 30px oklch(0.65 0.2 180 / 0.12), 0 8px 32px oklch(0 0 0 / 0.4)";
        e.currentTarget.style.transform = "translateY(-2px)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = "oklch(0.22 0.025 260 / 0.6)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      },
      "data-ocid": `rave-card-${event.id.toString()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative h-52 w-full shrink-0 overflow-hidden",
            style: { background: "oklch(0.15 0.025 260)" },
            children: [
              event.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: event.imageUrl,
                  alt: event.name,
                  className: "h-full w-full object-cover transition-smooth group-hover:scale-105",
                  onError: (e) => {
                    e.target.style.display = "none";
                  }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 48, style: { color: "oklch(0.65 0.2 180 / 0.2)" } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    background: "linear-gradient(to top, oklch(0.11 0.025 260) 0%, transparent 50%)"
                  }
                }
              ),
              event.eventType && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-display font-bold uppercase tracking-wider",
                  style: {
                    background: "oklch(0.65 0.2 180 / 0.18)",
                    color: "oklch(0.65 0.2 180)",
                    border: "1px solid oklch(0.65 0.2 180 / 0.4)",
                    backdropFilter: "blur(8px)"
                  },
                  children: event.eventType
                }
              ),
              event.isStandalone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-display font-bold uppercase tracking-wider",
                  style: {
                    background: "oklch(0.55 0.23 310 / 0.18)",
                    color: "oklch(0.55 0.23 310)",
                    border: "1px solid oklch(0.55 0.23 310 / 0.4)",
                    backdropFilter: "blur(8px)"
                  },
                  children: "Standalone"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-3 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display font-bold uppercase tracking-wide leading-tight",
              style: { color: "oklch(0.92 0 0)" },
              children: event.name
            }
          ),
          event.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "line-clamp-2 font-body text-sm leading-relaxed",
              style: { color: "oklch(0.6 0 0)" },
              children: event.description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-col gap-2", children: [
            event.date && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-xs",
                style: { color: "oklch(0.65 0.2 180)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display uppercase tracking-wider", children: event.date })
                ]
              }
            ),
            event.location && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-xs",
                style: { color: "oklch(0.55 0 0)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body truncate", children: event.location })
                ]
              }
            ),
            festivalName && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-xs",
                style: { color: "oklch(0.65 0.18 70)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body truncate", children: festivalName })
                ]
              }
            ),
            categoryName && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-xs",
                style: { color: "oklch(0.55 0.23 310)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body truncate", children: categoryName })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "animate-pulse overflow-hidden rounded-2xl",
      style: { background: "oklch(0.11 0.025 260)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-52 w-full",
            style: { background: "oklch(0.16 0.025 260)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-5 w-3/4 rounded-lg",
              style: { background: "oklch(0.18 0.025 260)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-4 w-full rounded-lg",
              style: { background: "oklch(0.16 0.025 260)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-4 w-2/3 rounded-lg",
              style: { background: "oklch(0.16 0.025 260)" }
            }
          )
        ] })
      ]
    },
    id
  )) });
}
function RavePage() {
  const { data: events = [], isLoading } = useRaveEvents();
  const { data: festivals = [] } = useFestivals();
  const { data: categories = [] } = useCategories();
  const { data: allSponsors = [] } = useSponsors();
  const [filterFestival, setFilterFestival] = reactExports.useState("all");
  const headlineSponsors = allSponsors.filter(
    (s) => s.tier.toLowerCase() === "headline"
  );
  const festivalsWithRave = festivals.filter(
    (f) => events.some(
      (e) => e.festivalId !== void 0 && e.festivalId !== null && e.festivalId === f.id
    )
  );
  const filtered = filterFestival === "all" ? events : filterFestival === "standalone" ? events.filter((e) => e.isStandalone) : events.filter((e) => {
    var _a;
    return ((_a = e.festivalId) == null ? void 0 : _a.toString()) === filterFestival;
  });
  function getFestivalName(festivalId) {
    var _a;
    if (!festivalId) return void 0;
    return (_a = festivals.find((f) => f.id === festivalId)) == null ? void 0 : _a.name;
  }
  function getCategoryName(categoryId) {
    var _a;
    if (!categoryId) return void 0;
    return (_a = categories.find((c) => c.id === categoryId)) == null ? void 0 : _a.name;
  }
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
              background: "linear-gradient(180deg, oklch(0.11 0.045 285) 0%, oklch(0.08 0.02 260) 100%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LaserBeams, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "pointer-events-none absolute inset-0",
                  style: {
                    background: "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.65 0.2 180 / 0.2) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PulseRings, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container relative mx-auto max-w-3xl px-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full",
                    style: {
                      background: "oklch(0.65 0.2 180 / 0.1)",
                      border: "2px solid oklch(0.65 0.2 180 / 0.6)",
                      boxShadow: "0 0 40px oklch(0.65 0.2 180 / 0.35), 0 0 80px oklch(0.65 0.2 180 / 0.1)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Zap,
                      {
                        size: 36,
                        style: { color: "oklch(0.65 0.2 180)" },
                        className: "glow-cyan"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "mb-3 font-display text-7xl font-bold uppercase tracking-widest glow-cyan",
                    style: { color: "oklch(0.65 0.2 180)" },
                    children: "The Rave"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mb-5 font-display text-sm uppercase tracking-[0.4em]",
                    style: { color: "oklch(0.55 0.23 310)" },
                    children: "Pre-Festival Warmup Events"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mx-auto max-w-xl font-body text-lg leading-relaxed",
                    style: { color: "oklch(0.68 0 0)" },
                    children: "The party starts before the festival does. Hand-picked underground rave events that charge the atmosphere before the main stage ignites."
                  }
                ),
                !isLoading && events.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-8 flex items-center justify-center gap-8", children: [
                  { label: "Events", value: events.length },
                  {
                    label: "Standalone",
                    value: events.filter((e) => e.isStandalone).length
                  },
                  {
                    label: "Festival-linked",
                    value: events.filter((e) => !e.isStandalone).length
                  }
                ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "font-display text-3xl font-bold glow-cyan",
                      style: { color: "oklch(0.65 0.2 180)" },
                      children: value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "font-display text-xs uppercase tracking-widest",
                      style: { color: "oklch(0.45 0 0)" },
                      children: label
                    }
                  )
                ] }, label)) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeadlineSponsorStrip, { sponsors: headlineSponsors }),
        !isLoading && events.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "sticky top-0 z-10 border-b",
            style: {
              background: "oklch(0.09 0.02 260 / 0.95)",
              borderColor: "oklch(0.2 0.02 260)",
              backdropFilter: "blur(12px)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-6xl overflow-x-auto px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-max", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display text-xs uppercase tracking-wider mr-2",
                  style: { color: "oklch(0.4 0 0)" },
                  children: "Filter:"
                }
              ),
              [
                { value: "all", label: "All Events" },
                { value: "standalone", label: "Standalone" },
                ...festivalsWithRave.map((f) => ({
                  value: f.id.toString(),
                  label: f.name
                }))
              ].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setFilterFestival(opt.value),
                  className: "rounded-full px-4 py-1.5 text-xs font-display font-bold uppercase tracking-wider transition-smooth",
                  style: filterFestival === opt.value ? {
                    background: "oklch(0.65 0.2 180 / 0.2)",
                    color: "oklch(0.65 0.2 180)",
                    border: "1px solid oklch(0.65 0.2 180 / 0.5)"
                  } : {
                    background: "oklch(0.13 0.02 260)",
                    color: "oklch(0.5 0 0)",
                    border: "1px solid oklch(0.2 0.02 260)"
                  },
                  "data-ocid": `rave-filter-${opt.value}`,
                  children: opt.label
                },
                opt.value
              ))
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto max-w-6xl px-4 py-16", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}) : filtered.length === 0 && events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-5 rounded-2xl py-24 text-center",
            style: {
              background: "oklch(0.11 0.025 260)",
              border: "1px solid oklch(0.22 0.025 260 / 0.5)"
            },
            "data-ocid": "rave-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-20 w-20 items-center justify-center rounded-full",
                  style: {
                    background: "oklch(0.65 0.2 180 / 0.08)",
                    border: "1px solid oklch(0.65 0.2 180 / 0.2)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 36, style: { color: "oklch(0.65 0.2 180 / 0.5)" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mb-2 font-display text-xl font-bold uppercase tracking-widest",
                    style: { color: "oklch(0.65 0.2 180 / 0.7)" },
                    children: "Rave Events Coming Soon"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "max-w-sm font-body text-sm",
                    style: { color: "oklch(0.42 0 0)" },
                    children: "Pre-festival rave events will be announced in the lead-up to each WE ARE ONE festival. Stay tuned."
                  }
                )
              ] })
            ]
          }
        ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-16 text-center", "data-ocid": "rave-filter-empty", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-display text-sm uppercase tracking-widest",
            style: { color: "oklch(0.4 0 0)" },
            children: "No events match this filter"
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          RaveEventCard,
          {
            event,
            festivalName: getFestivalName(event.festivalId),
            categoryName: getCategoryName(event.categoryId)
          },
          event.id.toString()
        )) }) })
      ]
    }
  );
}
export {
  RavePage as default
};

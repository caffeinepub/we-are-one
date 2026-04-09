import { r as reactExports, j as jsxRuntimeExports } from "./index-By4FKbbO.js";
import { X as useNightclubEvents, d as useFestivals, p as useCategories, a0 as useNightclubSets } from "./useBackend-Dk2Ciwzx.js";
import { M as Moon } from "./moon-DQ1JiYwV.js";
import { H as Headphones } from "./headphones-C5_26o35.js";
import { C as Calendar } from "./calendar-DGMjqzem.js";
import { M as MapPin } from "./map-pin-CsV1Atov.js";
import { M as Music2 } from "./music-2-DB4Fbp_7.js";
import { T as Tag } from "./tag-B5CPRa17.js";
import { T as Ticket, C as ChevronDown } from "./ticket-DNucSM9d.js";
import { C as ChevronUp } from "./chevron-up-BRDCd6Qz.js";
import { Y as Youtube } from "./youtube-DcNJo60d.js";
function AmbientOrbs() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pointer-events-none absolute inset-0 overflow-hidden",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute",
            style: {
              width: "600px",
              height: "600px",
              top: "-200px",
              left: "20%",
              borderRadius: "50%",
              background: "radial-gradient(circle, oklch(0.55 0.23 310 / 0.08) 0%, transparent 70%)",
              animation: "pulse 6s ease-in-out infinite"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute",
            style: {
              width: "400px",
              height: "400px",
              top: "-100px",
              right: "15%",
              borderRadius: "50%",
              background: "radial-gradient(circle, oklch(0.65 0.2 180 / 0.06) 0%, transparent 70%)",
              animation: "pulse 8s ease-in-out infinite",
              animationDelay: "2s"
            }
          }
        ),
        [
          { deg: 20, color: "oklch(0.55 0.23 310)", delay: "0s" },
          { deg: -20, color: "oklch(0.65 0.2 180)", delay: "1s" },
          { deg: 50, color: "oklch(0.65 0.18 70)", delay: "2s" }
        ].map((beam) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute",
            style: {
              top: 0,
              left: "50%",
              width: "2px",
              height: "100%",
              background: `linear-gradient(180deg, ${beam.color} 0%, transparent 60%)`,
              opacity: 0.05,
              transform: `rotate(${beam.deg}deg)`,
              transformOrigin: "top center",
              animation: "pulse 4s ease-in-out infinite",
              animationDelay: beam.delay
            }
          },
          beam.deg
        ))
      ]
    }
  );
}
function NightclubLineup({ eventId }) {
  const { data: sets = [], isLoading } = useNightclubSets(eventId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-8 rounded-lg",
        style: { background: "oklch(0.18 0.03 300)" }
      },
      i
    )) }) });
  }
  if (sets.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs font-display uppercase tracking-wider text-center py-4",
        style: { color: "oklch(0.4 0 0)" },
        children: "Lineup to be announced"
      }
    ) });
  }
  const groups = sets.reduce((acc, set) => {
    const key = set.nightLabel || "Main Floor";
    if (!acc[key]) acc[key] = [];
    acc[key].push(set);
    return acc;
  }, {});
  for (const g of Object.values(groups)) {
    g.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 flex flex-col gap-4", children: Object.entries(groups).map(([label, groupSets]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mb-2 text-xs font-display font-bold uppercase tracking-widest",
        style: { color: "oklch(0.55 0.23 310)" },
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: groupSets.map((set) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 rounded-xl px-3 py-2",
        style: { background: "oklch(0.14 0.035 300 / 0.6)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-display font-bold text-sm truncate block",
                style: { color: "oklch(0.88 0 0)" },
                children: set.artistName
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-body",
                  style: { color: "oklch(0.55 0.23 310 / 0.8)" },
                  children: [
                    set.startTime,
                    "–",
                    set.endTime
                  ]
                }
              ),
              set.stage && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.35 0 0)" }, children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-body truncate",
                    style: { color: "oklch(0.5 0 0)" },
                    children: set.stage
                  }
                )
              ] })
            ] })
          ] }),
          set.youtubeUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: set.youtubeUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 shrink-0",
              style: {
                background: "oklch(0.55 0.22 25 / 0.15)",
                color: "oklch(0.72 0.2 25)",
                border: "1px solid oklch(0.55 0.22 25 / 0.3)"
              },
              "aria-label": `Watch ${set.artistName} on YouTube`,
              "data-ocid": `nc-set-youtube-${set.id.toString()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { size: 12 }),
                "Watch"
              ]
            }
          )
        ]
      },
      set.id.toString()
    )) })
  ] }, label)) });
}
function NightclubEventCard({
  event,
  festivalName,
  categoryName
}) {
  const [lineupOpen, setLineupOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "group flex flex-col overflow-hidden rounded-2xl transition-smooth",
      style: {
        background: "oklch(0.10 0.03 300)",
        border: "1px solid oklch(0.22 0.03 300 / 0.6)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = "oklch(0.55 0.23 310 / 0.55)";
        e.currentTarget.style.boxShadow = "0 0 30px oklch(0.55 0.23 310 / 0.14), 0 8px 32px oklch(0 0 0 / 0.4)";
        e.currentTarget.style.transform = "translateY(-2px)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = "oklch(0.22 0.03 300 / 0.6)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      },
      "data-ocid": `nightclub-card-${event.id.toString()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative h-52 w-full shrink-0 overflow-hidden",
            style: { background: "oklch(0.14 0.03 300)" },
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
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 48, style: { color: "oklch(0.55 0.23 310 / 0.2)" } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    background: "linear-gradient(to top, oklch(0.10 0.03 300) 0%, transparent 50%)"
                  }
                }
              ),
              event.isStandalone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-display font-bold uppercase tracking-wider",
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            event.date && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-xs",
                style: { color: "oklch(0.55 0.23 310)" },
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
                style: { color: "oklch(0.65 0.2 180)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body truncate", children: categoryName })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-col gap-2 pt-1", children: [
            event.ticketUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: event.ticketUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                style: {
                  background: "linear-gradient(135deg, oklch(0.55 0.23 310 / 0.9), oklch(0.45 0.22 330 / 0.9))",
                  color: "oklch(0.97 0 0)",
                  boxShadow: "0 0 20px oklch(0.55 0.23 310 / 0.3)",
                  textDecoration: "none"
                },
                "data-ocid": `nc-buy-tickets-${event.id.toString()}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 14 }),
                  "Buy Tickets"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-display font-bold uppercase tracking-wider",
                style: {
                  background: "oklch(0.14 0.03 300)",
                  color: "oklch(0.4 0 0)",
                  border: "1px solid oklch(0.22 0.03 300)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 14 }),
                  "Coming Soon"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setLineupOpen((o) => !o),
                className: "flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:opacity-80",
                style: {
                  background: "oklch(0.14 0.03 300)",
                  color: lineupOpen ? "oklch(0.55 0.23 310)" : "oklch(0.5 0 0)",
                  border: `1px solid ${lineupOpen ? "oklch(0.55 0.23 310 / 0.4)" : "oklch(0.22 0.03 300)"}`
                },
                "data-ocid": `nc-lineup-toggle-${event.id.toString()}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 12 }),
                  lineupOpen ? "Hide Lineup" : "View Lineup",
                  lineupOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 12 })
                ]
              }
            )
          ] })
        ] }),
        lineupOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { borderTop: "1px solid oklch(0.22 0.03 300 / 0.5)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(NightclubLineup, { eventId: event.id }) })
      ]
    }
  );
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "animate-pulse overflow-hidden rounded-2xl",
      style: { background: "oklch(0.10 0.03 300)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-52 w-full",
            style: { background: "oklch(0.15 0.03 300)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-5 w-3/4 rounded-lg",
              style: { background: "oklch(0.17 0.03 300)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-4 w-full rounded-lg",
              style: { background: "oklch(0.15 0.03 300)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-4 w-2/3 rounded-lg",
              style: { background: "oklch(0.15 0.03 300)" }
            }
          )
        ] })
      ]
    },
    id
  )) });
}
function NightclubPage() {
  const { data: events = [], isLoading } = useNightclubEvents();
  const { data: festivals = [] } = useFestivals();
  const { data: categories = [] } = useCategories();
  const [filterFestival, setFilterFestival] = reactExports.useState("all");
  const festivalsWithNightclub = festivals.filter(
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
      style: { background: "oklch(0.07 0.025 290)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "relative overflow-hidden py-28 text-center",
            style: {
              background: "linear-gradient(180deg, oklch(0.10 0.05 315) 0%, oklch(0.07 0.025 290) 100%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AmbientOrbs, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "pointer-events-none absolute inset-0",
                  style: {
                    background: "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.55 0.23 310 / 0.22) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container relative mx-auto max-w-3xl px-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full",
                    style: {
                      background: "oklch(0.55 0.23 310 / 0.1)",
                      border: "2px solid oklch(0.55 0.23 310 / 0.6)",
                      boxShadow: "0 0 40px oklch(0.55 0.23 310 / 0.35), 0 0 80px oklch(0.55 0.23 310 / 0.1)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Moon,
                      {
                        size: 36,
                        style: { color: "oklch(0.55 0.23 310)" },
                        className: "glow-magenta"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "mb-3 font-display text-7xl font-bold uppercase tracking-widest glow-magenta",
                    style: { color: "oklch(0.55 0.23 310)" },
                    children: "Nightclub"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mb-5 font-display text-sm uppercase tracking-[0.4em]",
                    style: { color: "oklch(0.65 0.18 70)" },
                    children: "After-Festival Afterparty Events"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mx-auto max-w-xl font-body text-lg leading-relaxed",
                    style: { color: "oklch(0.65 0 0)" },
                    children: "The festival ends — the night never does. Keep the energy going with exclusive after-party club nights at the finest venues around each WE ARE ONE festival."
                  }
                ),
                !isLoading && events.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-8 flex items-center justify-center gap-8", children: [
                  { label: "Events", value: events.length },
                  {
                    label: "Standalone",
                    value: events.filter((e) => e.isStandalone).length
                  },
                  {
                    label: "After-Festival",
                    value: events.filter((e) => !e.isStandalone).length
                  }
                ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "font-display text-3xl font-bold glow-magenta",
                      style: { color: "oklch(0.55 0.23 310)" },
                      children: value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "font-display text-xs uppercase tracking-widest",
                      style: { color: "oklch(0.4 0 0)" },
                      children: label
                    }
                  )
                ] }, label)) })
              ] })
            ]
          }
        ),
        !isLoading && events.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "sticky top-0 z-10 border-b",
            style: {
              background: "oklch(0.08 0.025 290 / 0.95)",
              borderColor: "oklch(0.18 0.03 290)",
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
                ...festivalsWithNightclub.map((f) => ({
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
                    background: "oklch(0.55 0.23 310 / 0.18)",
                    color: "oklch(0.55 0.23 310)",
                    border: "1px solid oklch(0.55 0.23 310 / 0.5)"
                  } : {
                    background: "oklch(0.12 0.03 300)",
                    color: "oklch(0.5 0 0)",
                    border: "1px solid oklch(0.18 0.03 300)"
                  },
                  "data-ocid": `nightclub-filter-${opt.value}`,
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
              background: "oklch(0.10 0.03 300)",
              border: "1px solid oklch(0.22 0.03 300 / 0.5)"
            },
            "data-ocid": "nightclub-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-20 w-20 items-center justify-center rounded-full",
                  style: {
                    background: "oklch(0.55 0.23 310 / 0.08)",
                    border: "1px solid oklch(0.55 0.23 310 / 0.2)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Headphones,
                    {
                      size: 36,
                      style: { color: "oklch(0.55 0.23 310 / 0.5)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mb-2 font-display text-xl font-bold uppercase tracking-widest",
                    style: { color: "oklch(0.55 0.23 310 / 0.7)" },
                    children: "Afterparty Events Coming Soon"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "max-w-sm font-body text-sm",
                    style: { color: "oklch(0.42 0 0)" },
                    children: "Official WE ARE ONE afterparty club nights will be announced alongside each festival. Keep an eye out."
                  }
                )
              ] })
            ]
          }
        ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-16 text-center", "data-ocid": "nightclub-filter-empty", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-display text-sm uppercase tracking-widest",
            style: { color: "oklch(0.4 0 0)" },
            children: "No events match this filter"
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          NightclubEventCard,
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
  NightclubPage as default
};

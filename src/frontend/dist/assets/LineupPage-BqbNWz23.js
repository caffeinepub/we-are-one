import { c as createLucideIcon, u as useParams, r as reactExports, j as jsxRuntimeExports } from "./index-D9S6QrCw.js";
import { d as useFestivals, H as useLineup } from "./useBackend-FFsO06Zm.js";
import { m as motion } from "./proxy-BFHUe8Yk.js";
import { M as Music } from "./music-CDX-G39I.js";
import { C as Clock } from "./clock-Bz6igdro.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
      key: "80a601"
    }
  ],
  [
    "path",
    {
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
      key: "j0ngtp"
    }
  ],
  ["circle", { cx: "16", cy: "7", r: "5", key: "d08jfb" }]
];
const MicVocal = createLucideIcon("mic-vocal", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["circle", { cx: "12", cy: "14", r: "4", key: "1jruaj" }],
  ["path", { d: "M12 14h.01", key: "1etili" }]
];
const Speaker = createLucideIcon("speaker", __iconNode);
const WEEKEND_ORDER = ["Weekend 1", "Weekend 2", "Both"];
const DAY_ORDER = ["Friday", "Saturday", "Sunday", "Monday"];
const WEEKEND_COLORS = {
  "Weekend 1": {
    primary: "oklch(0.65 0.2 180)",
    accent: "oklch(0.65 0.2 180 / 0.15)"
  },
  "Weekend 2": {
    primary: "oklch(0.65 0.23 310)",
    accent: "oklch(0.65 0.23 310 / 0.15)"
  },
  Both: {
    primary: "oklch(0.65 0.18 70)",
    accent: "oklch(0.65 0.18 70 / 0.15)"
  },
  "": { primary: "oklch(0.6 0.18 250)", accent: "oklch(0.6 0.18 250 / 0.12)" }
};
const DAY_COLORS = [
  "oklch(0.65 0.2 180)",
  "oklch(0.75 0.18 140)",
  "oklch(0.65 0.23 310)",
  "oklch(0.65 0.18 70)"
];
const STAGE_COLORS = [
  "oklch(0.65 0.2 180)",
  "oklch(0.55 0.23 310)",
  "oklch(0.65 0.18 70)",
  "oklch(0.6 0.18 250)",
  "oklch(0.55 0.18 145)"
];
function hasWeekendOrDay(entries) {
  return entries.some((e) => e.weekend || e.day);
}
function groupStructured(entries) {
  const weekendSet = new Set(entries.map((e) => e.weekend ?? ""));
  const orderedWeekends = [
    ...WEEKEND_ORDER.filter((w) => weekendSet.has(w)),
    ...weekendSet.has("") ? [""] : []
  ];
  return orderedWeekends.map((weekend) => {
    const weekendEntries = entries.filter((e) => (e.weekend ?? "") === weekend);
    const daySet = new Set(weekendEntries.map((e) => e.day ?? ""));
    const orderedDays = [
      ...DAY_ORDER.filter((d) => daySet.has(d)),
      ...daySet.has("") ? [""] : []
    ];
    const days = orderedDays.map((day) => {
      const dayEntries = weekendEntries.filter((e) => (e.day ?? "") === day);
      const stageMap = {};
      for (const e of dayEntries) {
        if (!stageMap[e.stage]) stageMap[e.stage] = [];
        stageMap[e.stage].push(e);
      }
      const stages = Object.entries(stageMap).sort(([a], [b]) => a.localeCompare(b)).map(([stage, ents]) => ({
        stage,
        entries: [...ents].sort(
          (a, b) => a.timeSlot.localeCompare(b.timeSlot)
        )
      }));
      return { day, stages };
    });
    return { weekend, days };
  });
}
function groupByStage(entries) {
  const map = {};
  for (const e of entries) {
    if (!map[e.stage]) map[e.stage] = [];
    map[e.stage].push(e);
  }
  for (const stage of Object.keys(map)) {
    map[stage].sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
  }
  return map;
}
function ArtistRow({ entry, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -16 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.07 },
      className: "flex items-center gap-4 rounded-xl px-4 py-3 transition-smooth",
      style: {
        background: "oklch(0.12 0.02 260)",
        border: "1px solid oklch(0.25 0.03 260 / 0.4)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = "oklch(0.65 0.2 180 / 0.4)";
        e.currentTarget.style.background = "oklch(0.14 0.04 260)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = "oklch(0.25 0.03 260 / 0.4)";
        e.currentTarget.style.background = "oklch(0.12 0.02 260)";
      },
      "data-ocid": "lineup-artist-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-7 shrink-0 text-xs font-display font-bold text-center",
            style: { color: "oklch(0.4 0 0)" },
            children: String(index + 1).padStart(2, "0")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
            style: {
              background: "oklch(0.65 0.2 180 / 0.08)",
              border: "1px solid oklch(0.65 0.2 180 / 0.3)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(MicVocal, { size: 14, style: { color: "oklch(0.65 0.2 180)" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-display font-bold truncate",
            style: { color: "oklch(0.9 0 0)" },
            children: entry.artistName
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1.5 shrink-0 rounded-full px-3 py-1 text-xs font-display font-bold",
            style: {
              background: "oklch(0.65 0.18 70 / 0.08)",
              border: "1px solid oklch(0.65 0.18 70 / 0.3)",
              color: "oklch(0.65 0.18 70)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
              entry.timeSlot
            ]
          }
        )
      ]
    }
  );
}
function StageCard({
  stage,
  entries,
  stageIndex
}) {
  const color = STAGE_COLORS[stageIndex % STAGE_COLORS.length];
  const alphaColor = (a) => color.replace(")", ` / ${a})`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: stageIndex * 0.1 },
      className: "flex flex-col gap-4",
      "data-ocid": "lineup-stage-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              style: {
                background: alphaColor(0.1),
                border: `1px solid ${alphaColor(0.4)}`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Speaker, { size: 18, style: { color } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-xl font-display font-bold uppercase tracking-wider",
              style: {
                color,
                textShadow: `0 0 10px ${alphaColor(0.7)}, 0 0 20px ${alphaColor(0.3)}`
              },
              children: stage
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-px flex-1",
              style: {
                background: `linear-gradient(90deg, ${alphaColor(0.4)}, transparent)`
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-xs font-display font-bold uppercase tracking-widest rounded-full px-3 py-1",
              style: {
                background: alphaColor(0.08),
                border: `1px solid ${alphaColor(0.3)}`,
                color
              },
              children: [
                entries.length,
                " artists"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: entries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistRow, { entry, index: i }, entry.id.toString())) })
      ]
    }
  );
}
function DaySection({
  day,
  stages,
  dayIndex
}) {
  const color = DAY_COLORS[dayIndex % DAY_COLORS.length];
  const label = day || "All Days";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 16 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { duration: 0.45, delay: dayIndex * 0.08 },
      className: "flex flex-col gap-6 pl-4",
      style: { borderLeft: `2px solid ${color.replace(")", " / 0.35)")}` },
      "data-ocid": "lineup-day-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 -ml-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-8 w-8 shrink-0 flex items-center justify-center rounded-full text-xs font-display font-black",
              style: {
                background: color.replace(")", " / 0.12)"),
                border: `1px solid ${color.replace(")", " / 0.4)")}`,
                color
              },
              children: label.slice(0, 2).toUpperCase()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "text-lg font-display font-bold uppercase tracking-widest",
              style: {
                color,
                textShadow: `0 0 8px ${color.replace(")", " / 0.6)")}`
              },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-px flex-1",
              style: {
                background: `linear-gradient(90deg, ${color.replace(")", " / 0.3)")}, transparent)`
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-10", children: stages.map(({ stage, entries }, si) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          StageCard,
          {
            stage,
            entries,
            stageIndex: si
          },
          stage
        )) })
      ]
    }
  );
}
function WeekendSection({
  weekend,
  days,
  weekendIndex
}) {
  const palette = WEEKEND_COLORS[weekend] ?? WEEKEND_COLORS[""];
  const label = weekend || "All Weekends";
  const totalArtists = days.reduce(
    (sum, d) => sum + d.stages.reduce((s, st) => s + st.entries.length, 0),
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6, delay: weekendIndex * 0.12 },
      className: "flex flex-col gap-8",
      "data-ocid": "lineup-weekend-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative overflow-hidden rounded-2xl px-6 py-5",
            style: {
              background: `linear-gradient(135deg, ${palette.accent}, oklch(0.08 0.02 260))`,
              border: `1px solid ${palette.primary.replace(")", " / 0.25)")}`,
              boxShadow: `0 0 40px ${palette.primary.replace(")", " / 0.1)")}`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute -right-12 -top-12 h-40 w-40 rounded-full pointer-events-none",
                  style: {
                    background: `radial-gradient(circle, ${palette.primary.replace(")", " / 0.15)")}, transparent 70%)`
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between flex-wrap gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-display font-bold uppercase tracking-[0.3em] mb-1",
                      style: { color: palette.primary.replace(")", " / 0.7)") },
                      children: "We Are One"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "text-3xl font-display font-black uppercase tracking-tight",
                      style: {
                        color: palette.primary,
                        textShadow: `0 0 16px ${palette.primary.replace(")", " / 0.7)")}, 0 0 30px ${palette.primary.replace(")", " / 0.3)")}`
                      },
                      children: label
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-display font-bold uppercase tracking-widest rounded-full px-4 py-2",
                    style: {
                      background: palette.primary.replace(")", " / 0.1)"),
                      border: `1px solid ${palette.primary.replace(")", " / 0.3)")}`,
                      color: palette.primary
                    },
                    children: [
                      totalArtists,
                      " artists"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-10", children: days.map(({ day, stages }, di) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DaySection,
          {
            day,
            stages,
            dayIndex: di
          },
          day || "__all__"
        )) })
      ]
    }
  );
}
function LineupPage() {
  const { id } = useParams({ from: "/festivals/$id/lineup" });
  const festivalId = BigInt(id);
  const { data: festivals = [] } = useFestivals();
  const { data: lineup = [], isLoading } = useLineup(festivalId);
  const festival = festivals.find((f) => f.id === festivalId);
  const useStructured = reactExports.useMemo(() => hasWeekendOrDay(lineup), [lineup]);
  const structured = reactExports.useMemo(() => groupStructured(lineup), [lineup]);
  const flatGrouped = reactExports.useMemo(() => groupByStage(lineup), [lineup]);
  const stages = Object.keys(flatGrouped);
  const totalArtists = lineup.length;
  const totalStages = useStructured ? new Set(lineup.map((e) => e.stage)).size : stages.length;
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
                    background: "radial-gradient(ellipse at 20% 50%, oklch(0.65 0.2 180 / 0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, oklch(0.55 0.23 310 / 0.1) 0%, transparent 55%)"
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
                        children: "We Are One · Artist Lineup"
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
                          festival ? festival.name : "Festival",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                color: "oklch(0.75 0.23 310)",
                                textShadow: "0 0 10px oklch(0.55 0.23 310 / 0.8), 0 0 20px oklch(0.55 0.23 310 / 0.4)"
                              },
                              children: "Lineup"
                            }
                          )
                        ]
                      }
                    ),
                    festival && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "mt-4 text-sm font-display uppercase tracking-widest",
                        style: { color: "oklch(0.55 0 0)" },
                        children: [
                          festival.location,
                          ", ",
                          festival.country,
                          " · ",
                          festival.weekends
                        ]
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-12 space-y-16", children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-10 w-10 animate-spin rounded-full",
                style: {
                  border: "2px solid oklch(0.25 0.02 260)",
                  borderTopColor: "oklch(0.65 0.2 180)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-display text-sm uppercase tracking-widest",
                style: { color: "oklch(0.65 0.2 180)" },
                children: "Loading lineup…"
              }
            )
          ] }),
          !isLoading && totalArtists > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-6 justify-center", children: [
              { label: "Artists", value: totalArtists.toString() },
              { label: "Stages", value: totalStages.toString() }
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
            ] }, label)) }),
            useStructured && structured.map(({ weekend, days }, wi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              WeekendSection,
              {
                weekend,
                days,
                weekendIndex: wi
              },
              weekend || "__none__"
            )),
            !useStructured && stages.map((stage, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              StageCard,
              {
                stage,
                entries: flatGrouped[stage],
                stageIndex: i
              },
              stage
            ))
          ] }),
          !isLoading && totalArtists === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "flex flex-col items-center justify-center py-32 text-center",
              "data-ocid": "lineup-empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mb-6 flex h-24 w-24 items-center justify-center rounded-full",
                    style: {
                      background: "oklch(0.65 0.2 180 / 0.1)",
                      border: "2px solid oklch(0.65 0.2 180 / 0.3)",
                      boxShadow: "0 0 40px oklch(0.65 0.2 180 / 0.15)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 40, style: { color: "oklch(0.65 0.2 180)" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "mb-3 text-3xl font-display font-bold glow-cyan uppercase tracking-wider",
                    style: { color: "oklch(0.65 0.2 180)" },
                    children: "Lineup Coming Soon"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "max-w-sm text-sm leading-relaxed",
                    style: { color: "oklch(0.55 0 0)" },
                    children: "We're finalising the artist lineup for this festival. Check back soon for the full announcement — it's going to be epic."
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
export {
  LineupPage as default
};

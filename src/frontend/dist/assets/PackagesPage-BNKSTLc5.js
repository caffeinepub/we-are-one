import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-0nFMWtCV.js";
import { u as useComingSoon, C as ComingSoonModal, T as Ticket, a as ChevronDown } from "./ComingSoonModal-DlULvB-v.js";
import { h as usePackages, j as getPackageTypeLabel } from "./useBackend-CmKShSiJ.js";
import { m as motion } from "./proxy-DXuid_f-.js";
import { A as AnimatePresence } from "./index-Y9vvdlaU.js";
import "./sparkles-BzQN9Sdp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
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
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
];
const Plane = createLucideIcon("plane", __iconNode);
const SECTION_DEFS = [
  {
    key: "entry",
    label: "Entry Tickets",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 22 }),
    types: ["Weekend1", "Weekend2", "FullWeekend"]
  },
  {
    key: "vip",
    label: "VIP Packages",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 22 }),
    types: ["VIP"]
  },
  {
    key: "travel",
    label: "Travel Packages",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plane, { size: 22 }),
    types: ["FlightPackage", "Transfer", "Accommodation"]
  }
];
function getPackageKey(pt) {
  return pt;
}
function getSectionForPackage(pkg) {
  const key = getPackageKey(pkg.packageType);
  for (const def of SECTION_DEFS) {
    if (def.types.includes(key)) return def.key;
  }
  return "entry";
}
function getBadgeStyle(key) {
  if (key === "vip")
    return {
      color: "oklch(0.65 0.18 70)",
      border: "1px solid oklch(0.65 0.18 70 / 0.5)",
      background: "oklch(0.65 0.18 70 / 0.1)"
    };
  if (key === "travel")
    return {
      color: "oklch(0.55 0.23 310)",
      border: "1px solid oklch(0.55 0.23 310 / 0.5)",
      background: "oklch(0.55 0.23 310 / 0.1)"
    };
  return {
    color: "oklch(0.65 0.2 180)",
    border: "1px solid oklch(0.65 0.2 180 / 0.5)",
    background: "oklch(0.65 0.2 180 / 0.1)"
  };
}
function getSectionBorderClass(key) {
  if (key === "vip") return "neon-border-amber";
  if (key === "travel") return "neon-border-magenta";
  return "neon-border-cyan";
}
function getSectionHeaderColor(key) {
  if (key === "vip") return "oklch(0.65 0.18 70)";
  if (key === "travel") return "oklch(0.55 0.23 310)";
  return "oklch(0.65 0.2 180)";
}
function getSectionGlowClass(key) {
  if (key === "vip") return "glow-amber";
  if (key === "travel") return "glow-magenta";
  return "glow-cyan";
}
const VIP_PERKS = [
  "Exclusive VIP lounge with premium bar",
  "Priority fast-track entry — skip all queues",
  "Meet & greet with headline DJs",
  "Exclusive limited-edition merchandise",
  "Premium viewing areas at main stages",
  "Dedicated VIP toilets & cloakroom",
  "Welcome drinks & complimentary first round"
];
const FAQS = [
  {
    id: "faq-availability",
    question: "When will tickets be available?",
    answer: "Tickets are not yet on sale — WE ARE ONE is currently in its launch phase. Sign up to our mailing list via the Contact page to be notified the moment tickets go live. Early-bird pricing will be available for registered fans."
  },
  {
    id: "faq-age",
    question: "Are there age restrictions?",
    answer: "EDM, Rave, and Club Hotel events are strictly 14+ — valid ID is required at entry. Family Festival events are open to all ages, with dedicated kid-friendly zones. Under-18s must be accompanied by an adult at all non-EDM events."
  },
  {
    id: "faq-refunds",
    question: "What is the refund & cancellation policy?",
    answer: "Full refunds are available up to 30 days before the event date. Between 14 and 30 days, a 50% credit will be issued for future events. Tickets are fully transferable up to 7 days before the event. Travel package refunds are subject to airline and accommodation provider policies."
  },
  {
    id: "faq-travel",
    question: "What is included in travel packages?",
    answer: "Travel packages vary by event but typically include return flights from major UK airports (Heathrow, Manchester, Birmingham, Edinburgh), dedicated airport-to-festival coach transfers, and a welcome pack. Accommodation packages add luxury glamping or partner hotel bookings near the festival site."
  }
];
function PackageCard({
  pkg,
  sectionKey,
  onBuyTickets,
  index
}) {
  const badgeStyle = getBadgeStyle(sectionKey);
  const borderClass = getSectionBorderClass(sectionKey);
  const headerColor = getSectionHeaderColor(sectionKey);
  const glowClass = getSectionGlowClass(sectionKey);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.45, delay: index * 0.08 },
      className: `glass-effect ${borderClass} flex flex-col rounded-2xl p-6 transition-smooth hover:scale-[1.02]`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: `font-display text-lg font-bold leading-tight ${glowClass}`,
              style: { color: headerColor },
              children: pkg.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "shrink-0 rounded-full px-2 py-0.5 text-xs font-display font-semibold uppercase tracking-wide",
              style: badgeStyle,
              children: getPackageTypeLabel(pkg.packageType)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-display text-4xl font-bold glow-amber",
              style: { color: "oklch(0.65 0.18 70)" },
              children: [
                "£",
                pkg.priceGBP.toString()
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-sm", style: { color: "oklch(0.6 0 0)" }, children: "per person" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "mb-5 text-sm leading-relaxed",
            style: { color: "oklch(0.7 0 0)" },
            children: pkg.description
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mb-2 text-xs font-display font-semibold uppercase tracking-widest",
              style: { color: "oklch(0.5 0 0)" },
              children: "What's Included"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: pkg.includes.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm",
              style: { color: "oklch(0.78 0 0)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    size: 15,
                    className: "mt-0.5 shrink-0",
                    style: { color: headerColor }
                  }
                ),
                item
              ]
            },
            item
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onBuyTickets,
            className: "w-full rounded-xl py-3 px-4 font-display font-bold text-sm uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
            style: {
              background: `oklch(from ${headerColor} l c h / 0.15)`,
              border: `2px solid ${headerColor}99`,
              color: headerColor,
              boxShadow: `0 0 15px ${headerColor}33`
            },
            "data-ocid": `buy-tickets-${pkg.id}`,
            children: "Buy Tickets"
          }
        )
      ]
    }
  );
}
function FaqItem({
  faq,
  isOpen,
  onToggle,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -20 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08 },
      className: "glass-effect overflow-hidden rounded-xl",
      style: { border: "1px solid oklch(0.25 0.02 260 / 0.5)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onToggle,
            className: "flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-smooth hover:bg-white/5",
            "aria-expanded": isOpen,
            "data-ocid": `faq-toggle-${faq.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display font-semibold text-sm",
                  style: { color: "oklch(0.88 0 0)" },
                  children: faq.question
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  size: 18,
                  className: "shrink-0 transition-transform duration-300",
                  style: {
                    color: "oklch(0.65 0.2 180)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.3, ease: "easeInOut" },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "px-6 pb-5 text-sm leading-relaxed",
                style: { color: "oklch(0.68 0 0)" },
                children: faq.answer
              }
            )
          },
          "answer"
        ) })
      ]
    }
  );
}
function PackagesPage() {
  const { isOpen, open, close } = useComingSoon();
  const { data: packages = [], isLoading } = usePackages();
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const grouped = {
    entry: [],
    vip: [],
    travel: []
  };
  for (const pkg of packages) {
    grouped[getSectionForPackage(pkg)].push(pkg);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: { background: "oklch(0.08 0 0)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative flex flex-col items-center justify-center overflow-hidden px-4 py-20 text-center",
        style: {
          background: "linear-gradient(180deg, oklch(0.12 0.03 260) 0%, oklch(0.08 0 0) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full opacity-20",
              style: {
                background: "radial-gradient(circle, oklch(0.65 0.2 180) 0%, transparent 70%)",
                filter: "blur(60px)"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute -bottom-20 right-1/4 h-80 w-80 rounded-full opacity-15",
              style: {
                background: "radial-gradient(circle, oklch(0.55 0.23 310) 0%, transparent 70%)",
                filter: "blur(60px)"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              className: "relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mb-3 font-display text-xs font-semibold uppercase tracking-[0.3em] glow-cyan",
                    style: { color: "oklch(0.65 0.2 180)" },
                    children: "WE ARE ONE"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "mb-4 font-display text-5xl font-bold leading-tight glow-cyan md:text-6xl lg:text-7xl",
                    style: { color: "oklch(0.95 0 0)" },
                    children: "Festival Packages"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mx-auto max-w-2xl text-lg leading-relaxed",
                    style: { color: "oklch(0.68 0 0)" },
                    children: "Everything you need for the ultimate festival experience"
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "glass-effect rounded-2xl px-8 py-8",
        style: { border: "1px solid oklch(0.25 0.02 260 / 0.4)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-base leading-relaxed",
            style: { color: "oklch(0.72 0 0)" },
            children: "From single-day passes to all-inclusive VIP experiences, WE ARE ONE offers curated packages for every type of festival-goer. Whether you're flying in from abroad, camping on-site, or arriving in VIP style — we have everything covered. All packages include official WE ARE ONE wristbands and access to world-class stages."
          }
        )
      }
    ) }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3, 4, 5, 6].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-effect h-64 animate-pulse rounded-2xl",
        style: { border: "1px solid oklch(0.25 0.02 260 / 0.3)" }
      },
      n
    )) }) }) }) : SECTION_DEFS.map((section) => {
      const sectionPackages = grouped[section.key];
      if (sectionPackages.length === 0) return null;
      const headerColor = getSectionHeaderColor(section.key);
      const glowClass = getSectionGlowClass(section.key);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.45 },
            className: "mb-8 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: headerColor }, children: section.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: `font-display text-2xl font-bold md:text-3xl ${glowClass}`,
                  style: { color: headerColor },
                  children: section.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-px flex-1",
                  style: {
                    background: `linear-gradient(90deg, ${headerColor}66, transparent)`
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: sectionPackages.map((pkg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PackageCard,
          {
            pkg,
            sectionKey: section.key,
            onBuyTickets: open,
            index: i
          },
          pkg.id.toString()
        )) })
      ] }) }, section.key);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "px-4 py-16",
        style: {
          background: "linear-gradient(180deg, oklch(0.08 0 0) 0%, oklch(0.11 0.02 290) 50%, oklch(0.08 0 0) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.96 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: { duration: 0.55 },
            className: "glass-effect neon-border-amber rounded-3xl px-8 py-10 md:px-12",
            style: {
              background: "oklch(0.1 0.02 60 / 0.4)",
              boxShadow: "0 0 60px oklch(0.65 0.18 70 / 0.12), inset 0 1px 0 oklch(0.65 0.18 70 / 0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col items-center gap-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex h-14 w-14 items-center justify-center rounded-full",
                    style: {
                      background: "oklch(0.65 0.18 70 / 0.15)",
                      border: "2px solid oklch(0.65 0.18 70 / 0.5)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 26, style: { color: "oklch(0.65 0.18 70)" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display text-3xl font-bold glow-amber md:text-4xl",
                    style: { color: "oklch(0.65 0.18 70)" },
                    children: "The VIP Experience"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "max-w-xl text-sm leading-relaxed",
                    style: { color: "oklch(0.68 0 0)" },
                    children: "Elevate your festival to another level. Our VIP packages are crafted for those who want more — more access, more exclusivity, more unforgettable moments."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: VIP_PERKS.map((perk, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: i % 2 === 0 ? -16 : 16 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: i * 0.07 },
                  className: "flex items-start gap-3 rounded-xl px-4 py-3",
                  style: {
                    background: "oklch(0.65 0.18 70 / 0.05)",
                    border: "1px solid oklch(0.65 0.18 70 / 0.2)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheck,
                      {
                        size: 16,
                        className: "mt-0.5 shrink-0",
                        style: { color: "oklch(0.65 0.18 70)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-sm",
                        style: { color: "oklch(0.78 0 0)" },
                        children: perk
                      }
                    )
                  ]
                },
                perk
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: open,
                  className: "rounded-xl px-8 py-3.5 font-display font-bold text-sm uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                  style: {
                    background: "oklch(0.65 0.18 70 / 0.15)",
                    border: "2px solid oklch(0.65 0.18 70 / 0.7)",
                    color: "oklch(0.65 0.18 70)",
                    boxShadow: "0 0 20px oklch(0.65 0.18 70 / 0.25)"
                  },
                  "data-ocid": "vip-buy-tickets",
                  children: "Get VIP Access"
                }
              ) })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.45 },
          className: "mb-10 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "mb-3 font-display text-3xl font-bold glow-cyan md:text-4xl",
                style: { color: "oklch(0.88 0 0)" },
                children: "Got Questions?"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.6 0 0)" }, children: "Everything you need to know before the festival" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "faq-list", children: FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        FaqItem,
        {
          faq,
          isOpen: openFaq === faq.id,
          onToggle: () => setOpenFaq(openFaq === faq.id ? null : faq.id),
          index: i
        },
        faq.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "px-4 py-16",
        style: {
          background: "linear-gradient(180deg, oklch(0.08 0 0) 0%, oklch(0.12 0.03 260) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-2xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "mb-3 font-display text-3xl font-bold glow-magenta md:text-4xl",
                  style: { color: "oklch(0.9 0 0)" },
                  children: "Ready to Join Us?"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "mb-8 text-sm leading-relaxed",
                  style: { color: "oklch(0.6 0 0)" },
                  children: "Tickets are coming soon. Register your interest and be the first to know when tickets drop — including exclusive early-bird pricing."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: open,
                  className: "rounded-xl px-10 py-4 font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.65 0.2 180 / 0.2), oklch(0.55 0.23 310 / 0.2))",
                    border: "2px solid oklch(0.65 0.2 180 / 0.7)",
                    color: "oklch(0.65 0.2 180)",
                    boxShadow: "0 0 30px oklch(0.65 0.2 180 / 0.2), 0 0 60px oklch(0.55 0.23 310 / 0.1)"
                  },
                  "data-ocid": "bottom-buy-tickets",
                  children: "Get Tickets"
                }
              )
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoonModal, { isOpen, onClose: close })
  ] });
}
export {
  PackagesPage as default
};

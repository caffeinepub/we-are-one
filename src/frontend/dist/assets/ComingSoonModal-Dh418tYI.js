import { c as createLucideIcon, j as jsxRuntimeExports, X, r as reactExports } from "./index-BVWgY9UC.js";
import { S as Sparkles } from "./sparkles-CiT5FWir.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$1);
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
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
];
const Ticket = createLucideIcon("ticket", __iconNode);
function useComingSoon() {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  };
}
function ComingSoonModal({
  isOpen,
  onClose
}) {
  if (!isOpen) return null;
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }
  function handleBackdropKeyDown(e) {
    if (e.key === "Escape") onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 m-0 w-full h-full max-w-full max-h-full bg-transparent",
      "aria-labelledby": "modal-title",
      onClick: handleBackdropClick,
      onKeyDown: handleBackdropKeyDown,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: "oklch(0.04 0 0 / 0.85)",
              backdropFilter: "blur(8px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative w-full max-w-md animate-slide-up rounded-2xl p-8 text-center",
            style: {
              background: "oklch(0.1 0.02 260)",
              border: "2px solid oklch(0.65 0.2 180 / 0.6)",
              boxShadow: "0 0 40px oklch(0.65 0.2 180 / 0.3), 0 0 80px oklch(0.55 0.23 310 / 0.15), inset 0 1px 0 oklch(0.65 0.2 180 / 0.2)"
            },
            "data-ocid": "coming-soon-modal",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "absolute top-4 right-4 rounded-full p-1.5 transition-smooth hover:scale-110",
                  style: { color: "oklch(0.65 0.2 180)" },
                  "aria-label": "Close modal",
                  "data-ocid": "modal-close",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative flex items-center justify-center",
                  style: {
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "oklch(0.65 0.2 180 / 0.1)",
                    border: "2px solid oklch(0.65 0.2 180 / 0.4)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Ticket,
                      {
                        size: 36,
                        className: "animate-pulse-glow",
                        style: { color: "oklch(0.65 0.2 180)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Sparkles,
                      {
                        size: 16,
                        className: "absolute -top-1 -right-1 animate-pulse-glow",
                        style: { color: "oklch(0.65 0.18 70)", animationDelay: "0.5s" }
                      }
                    )
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  id: "modal-title",
                  className: "mb-4 text-3xl font-display font-bold glow-cyan",
                  style: { color: "oklch(0.65 0.2 180)" },
                  children: "Tickets Coming Soon!"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "mb-6 leading-relaxed",
                  style: { color: "oklch(0.75 0 0)" },
                  children: "Tickets aren't available yet! This is a test/demo event. The Master Festival will launch soon."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mb-6 h-px w-full",
                  style: {
                    background: "linear-gradient(90deg, transparent, oklch(0.65 0.2 180 / 0.4), transparent)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "mb-6 text-sm font-display tracking-widest uppercase glow-magenta",
                  style: { color: "oklch(0.55 0.23 310)" },
                  children: "One World 2 Vibes"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-full rounded-xl py-3 px-6 font-display font-bold text-sm uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                  style: {
                    background: "oklch(0.65 0.2 180 / 0.15)",
                    border: "2px solid oklch(0.65 0.2 180 / 0.6)",
                    color: "oklch(0.65 0.2 180)",
                    boxShadow: "0 0 15px oklch(0.65 0.2 180 / 0.2)"
                  },
                  "data-ocid": "modal-dismiss",
                  children: "Got it, I'll wait!"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  ComingSoonModal as C,
  Ticket as T,
  ChevronDown as a,
  useComingSoon as u
};

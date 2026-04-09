import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, M as Mail, S as SiInstagram, a as SiX, b as SiFacebook, d as SiTiktok, e as SiYoutube } from "./index-D9S6QrCw.js";
import { G as Globe } from "./globe-DjUFvsDt.js";
import { B as Building2 } from "./building-2-BiQ_2hpy.js";
import { M as MapPin } from "./map-pin-BGfKfQM8.js";
import { H as Handshake } from "./handshake-jnEohfXn.js";
import { N as Newspaper } from "./newspaper-BN2EN_8W.js";
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const SOCIAL_LINKS = [
  {
    icon: SiInstagram,
    label: "Instagram",
    handle: "@weareone",
    href: "https://instagram.com/weareone"
  },
  {
    icon: SiX,
    label: "Twitter / X",
    handle: "@weareone",
    href: "https://x.com/weareone"
  },
  {
    icon: SiFacebook,
    label: "Facebook",
    handle: "WE ARE ONE",
    href: "https://facebook.com/weareone"
  },
  {
    icon: SiTiktok,
    label: "TikTok",
    handle: "@weareone",
    href: "https://tiktok.com/@weareone"
  },
  {
    icon: SiYoutube,
    label: "YouTube",
    handle: "WE ARE ONE",
    href: "https://youtube.com/@weareone"
  }
];
const INQUIRY_TYPES = [
  { value: "general", label: "General Inquiry" },
  { value: "sponsorship", label: "Sponsorship" },
  { value: "media", label: "Media Request" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" }
];
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!validateEmail(form.email))
    errors.email = "Enter a valid email address";
  if (!form.inquiryType) errors.inquiryType = "Please select an inquiry type";
  if (!form.message.trim()) errors.message = "Message is required";
  return errors;
}
const INPUT_BASE = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-smooth placeholder:opacity-40";
function StyledInput({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        type,
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        className: INPUT_BASE,
        style: {
          background: "oklch(0.07 0.02 260)",
          border: `1px solid ${error ? "oklch(0.55 0.22 25 / 0.8)" : "oklch(0.25 0.02 260 / 0.5)"}`,
          color: "oklch(0.9 0 0)"
        },
        onFocus: (e) => {
          if (!error) {
            e.target.style.borderColor = "oklch(0.65 0.2 180 / 0.6)";
            e.target.style.boxShadow = "0 0 12px oklch(0.65 0.2 180 / 0.1)";
          }
        },
        onBlur: (e) => {
          e.target.style.borderColor = error ? "oklch(0.55 0.22 25 / 0.8)" : "oklch(0.25 0.02 260 / 0.5)";
          e.target.style.boxShadow = "none";
        },
        "data-ocid": ocid
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs", style: { color: "oklch(0.65 0.2 25)" }, children: error })
  ] });
}
function ContactPage() {
  const formRef = reactExports.useRef(null);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    inquiryType: "general",
    message: ""
  });
  function setField(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: void 0 }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }
  function scrollToForm() {
    var _a;
    (_a = formRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative overflow-hidden py-20 text-center",
        style: {
          background: "linear-gradient(180deg, oklch(0.08 0.02 260) 0%, oklch(0.05 0.01 260) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute inset-0",
              "aria-hidden": "true",
              style: {
                background: "radial-gradient(ellipse 60% 40% at 30% 50%, oklch(0.65 0.2 180 / 0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 50%, oklch(0.55 0.23 310 / 0.08) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "mb-3 font-display text-xs font-bold uppercase tracking-widest",
                style: { color: "oklch(0.65 0.18 70)" },
                children: "WE ARE ONE"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "mb-4 font-display text-5xl font-black leading-tight glow-cyan md:text-6xl",
                style: { color: "oklch(0.65 0.2 180)" },
                children: "Get In Touch"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "mx-auto max-w-md text-base",
                style: { color: "oklch(0.6 0 0)" },
                children: "For inquiries, sponsorships, and media requests"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6",
            style: {
              background: "oklch(0.1 0.02 260)",
              border: "1px solid oklch(0.25 0.02 260 / 0.4)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15, style: { color: "oklch(0.65 0.2 180)" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display text-xs uppercase tracking-widest",
                    style: { color: "oklch(0.5 0 0)" },
                    children: "Email Us"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "mailto:contact@weareone.com",
                  className: "inline-block font-display text-base font-bold transition-smooth hover:opacity-80 glow-cyan",
                  style: { color: "oklch(0.65 0.2 180)" },
                  "data-ocid": "contact-email-link",
                  children: "contact@weareone.com"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs", style: { color: "oklch(0.5 0 0)" }, children: "We aim to respond within 48 hours" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6",
            style: {
              background: "oklch(0.1 0.02 260)",
              border: "1px solid oklch(0.25 0.02 260 / 0.4)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 15, style: { color: "oklch(0.65 0.2 180)" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display text-xs uppercase tracking-widest",
                    style: { color: "oklch(0.5 0 0)" },
                    children: "Follow Us"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: SOCIAL_LINKS.map(({ icon: Icon, label, handle, href }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center gap-3 rounded-xl px-3 py-2 transition-smooth hover:-translate-x-0.5",
                  style: {
                    background: "oklch(0.07 0.02 260 / 0.6)",
                    border: "1px solid oklch(0.2 0.02 260 / 0.5)",
                    color: "oklch(0.55 0 0)"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.color = "oklch(0.65 0.2 180)";
                    e.currentTarget.style.borderColor = "oklch(0.65 0.2 180 / 0.3)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.color = "oklch(0.55 0 0)";
                    e.currentTarget.style.borderColor = "oklch(0.2 0.02 260 / 0.5)";
                  },
                  "aria-label": label,
                  "data-ocid": "social-link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: "shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-display uppercase tracking-wider",
                        style: { color: "oklch(0.45 0 0)" },
                        children: label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs font-medium", children: handle })
                  ]
                },
                label
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6",
            style: {
              background: "oklch(0.1 0.02 260)",
              border: "1px solid oklch(0.25 0.02 260 / 0.4)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Building2,
                  {
                    size: 15,
                    style: { color: "oklch(0.55 0.23 310)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display text-xs uppercase tracking-widest",
                    style: { color: "oklch(0.5 0 0)" },
                    children: "Office"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-display text-sm font-semibold",
                  style: { color: "oklch(0.8 0 0)" },
                  children: "WE ARE ONE Ltd"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.5 0 0)" }, children: "Global Headquarters" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex h-48 items-center justify-center overflow-hidden rounded-2xl",
            style: {
              background: "radial-gradient(ellipse at center, oklch(0.12 0.03 220) 0%, oklch(0.08 0.02 260) 100%)",
              border: "1px solid oklch(0.25 0.02 260 / 0.4)"
            },
            "aria-label": "Map placeholder",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "pointer-events-none absolute inset-0 opacity-20",
                  "aria-hidden": "true",
                  style: {
                    backgroundImage: "linear-gradient(oklch(0.65 0.2 180 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.2 180 / 0.3) 1px, transparent 1px)",
                    backgroundSize: "30px 30px"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "pointer-events-none absolute inset-0",
                  "aria-hidden": "true",
                  style: {
                    background: "radial-gradient(circle 80px at center, oklch(0.65 0.2 180 / 0.15) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex h-12 w-12 items-center justify-center rounded-full",
                    style: {
                      background: "oklch(0.65 0.2 180 / 0.15)",
                      border: "2px solid oklch(0.65 0.2 180 / 0.5)",
                      boxShadow: "0 0 20px oklch(0.65 0.2 180 / 0.4)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MapPin,
                      {
                        size: 22,
                        style: { color: "oklch(0.65 0.2 180)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display text-xs uppercase tracking-widest",
                    style: { color: "oklch(0.5 0 0)" },
                    children: "Global HQ"
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: formRef, className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-2xl p-8",
          style: {
            background: "oklch(0.1 0.02 260)",
            border: "1px solid oklch(0.25 0.02 260 / 0.4)"
          },
          children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5 py-12 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-20 w-20 items-center justify-center rounded-full",
                style: {
                  background: "oklch(0.65 0.2 180 / 0.1)",
                  border: "2px solid oklch(0.65 0.2 180 / 0.5)",
                  boxShadow: "0 0 30px oklch(0.65 0.2 180 / 0.3)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Send,
                  {
                    size: 30,
                    style: { color: "oklch(0.65 0.2 180)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-2xl font-black glow-cyan",
                style: { color: "oklch(0.65 0.2 180)" },
                children: "Message Sent!"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "max-w-sm text-sm leading-relaxed",
                style: { color: "oklch(0.6 0 0)" },
                children: "Thank you! We'll be back in touch shortly."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    inquiryType: "general",
                    message: ""
                  });
                  setErrors({});
                },
                className: "rounded-xl px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wider transition-smooth hover:opacity-80",
                style: {
                  border: "1px solid oklch(0.65 0.2 180 / 0.4)",
                  color: "oklch(0.65 0.2 180)"
                },
                children: "Send Another Message"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "flex flex-col gap-5",
              noValidate: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display text-xl font-black",
                    style: { color: "oklch(0.9 0 0)" },
                    children: "Send Us a Message"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "contact-name",
                      className: "mb-1.5 block font-display text-xs uppercase tracking-wider",
                      style: { color: "oklch(0.55 0 0)" },
                      children: "Name *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StyledInput,
                    {
                      id: "contact-name",
                      value: form.name,
                      onChange: (v) => setField("name", v),
                      placeholder: "Your full name",
                      error: errors.name,
                      ocid: "contact-name"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "contact-email",
                      className: "mb-1.5 block font-display text-xs uppercase tracking-wider",
                      style: { color: "oklch(0.55 0 0)" },
                      children: "Email *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StyledInput,
                    {
                      id: "contact-email",
                      type: "email",
                      value: form.email,
                      onChange: (v) => setField("email", v),
                      placeholder: "your@email.com",
                      error: errors.email,
                      ocid: "contact-email"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "contact-inquiry",
                      className: "mb-1.5 block font-display text-xs uppercase tracking-wider",
                      style: { color: "oklch(0.55 0 0)" },
                      children: "Inquiry Type *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "contact-inquiry",
                      value: form.inquiryType,
                      onChange: (e) => setField(
                        "inquiryType",
                        e.target.value
                      ),
                      className: "w-full rounded-xl px-4 py-3 text-sm outline-none transition-smooth appearance-none cursor-pointer",
                      style: {
                        background: "oklch(0.07 0.02 260)",
                        border: `1px solid ${errors.inquiryType ? "oklch(0.55 0.22 25 / 0.8)" : "oklch(0.25 0.02 260 / 0.5)"}`,
                        color: "oklch(0.9 0 0)"
                      },
                      onFocus: (e) => {
                        e.target.style.borderColor = "oklch(0.65 0.2 180 / 0.6)";
                        e.target.style.boxShadow = "0 0 12px oklch(0.65 0.2 180 / 0.1)";
                      },
                      onBlur: (e) => {
                        e.target.style.borderColor = "oklch(0.25 0.02 260 / 0.5)";
                        e.target.style.boxShadow = "none";
                      },
                      "data-ocid": "contact-inquiry",
                      children: INQUIRY_TYPES.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "option",
                        {
                          value,
                          style: { background: "oklch(0.1 0.02 260)" },
                          children: label
                        },
                        value
                      ))
                    }
                  ),
                  errors.inquiryType && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "mt-1 text-xs",
                      style: { color: "oklch(0.65 0.2 25)" },
                      children: errors.inquiryType
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "contact-message",
                      className: "mb-1.5 block font-display text-xs uppercase tracking-wider",
                      style: { color: "oklch(0.55 0 0)" },
                      children: "Message *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "contact-message",
                      rows: 6,
                      value: form.message,
                      onChange: (e) => setField("message", e.target.value),
                      placeholder: "Tell us more about your inquiry...",
                      className: "w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-smooth placeholder:opacity-40",
                      style: {
                        background: "oklch(0.07 0.02 260)",
                        border: `1px solid ${errors.message ? "oklch(0.55 0.22 25 / 0.8)" : "oklch(0.25 0.02 260 / 0.5)"}`,
                        color: "oklch(0.9 0 0)"
                      },
                      onFocus: (e) => {
                        e.target.style.borderColor = "oklch(0.65 0.2 180 / 0.6)";
                        e.target.style.boxShadow = "0 0 12px oklch(0.65 0.2 180 / 0.1)";
                      },
                      onBlur: (e) => {
                        e.target.style.borderColor = errors.message ? "oklch(0.55 0.22 25 / 0.8)" : "oklch(0.25 0.02 260 / 0.5)";
                        e.target.style.boxShadow = "none";
                      },
                      "data-ocid": "contact-message"
                    }
                  ),
                  errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "mt-1 text-xs",
                      style: { color: "oklch(0.65 0.2 25)" },
                      children: errors.message
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    className: "flex items-center justify-center gap-2 rounded-xl py-3.5 font-display text-sm font-black uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.65 0.2 180), oklch(0.55 0.23 310))",
                      color: "oklch(0.96 0 0)",
                      boxShadow: "0 0 25px oklch(0.65 0.2 180 / 0.3)"
                    },
                    "data-ocid": "contact-submit",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 }),
                      "Send Message"
                    ]
                  }
                )
              ]
            }
          )
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "px-4 py-16",
        style: {
          background: "linear-gradient(180deg, oklch(0.06 0.02 260) 0%, oklch(0.08 0.02 260) 100%)",
          borderTop: "1px solid oklch(0.2 0.02 260 / 0.4)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "mb-2 font-display text-xs font-bold uppercase tracking-widest",
                style: { color: "oklch(0.65 0.18 70)" },
                children: "Partner With Us"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "mb-4 font-display text-3xl font-black glow-magenta md:text-4xl",
                style: { color: "oklch(0.55 0.23 310)" },
                children: "Sponsorship & Media"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "mx-auto max-w-2xl text-sm leading-relaxed md:text-base",
                style: { color: "oklch(0.6 0 0)" },
                children: "WE ARE ONE attracts tens of thousands of festival-goers across multiple events each year. Partner with us for unparalleled brand exposure, exclusive media access, and unforgettable experiences that resonate with a passionate global audience."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col gap-5 rounded-2xl p-7 transition-smooth hover:-translate-y-1",
                style: {
                  background: "oklch(0.1 0.02 260)",
                  border: "1px solid oklch(0.55 0.23 310 / 0.3)",
                  boxShadow: "0 0 20px oklch(0.55 0.23 310 / 0.05)"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.borderColor = "oklch(0.55 0.23 310 / 0.6)";
                  e.currentTarget.style.boxShadow = "0 10px 40px oklch(0.55 0.23 310 / 0.12)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.borderColor = "oklch(0.55 0.23 310 / 0.3)";
                  e.currentTarget.style.boxShadow = "0 0 20px oklch(0.55 0.23 310 / 0.05)";
                },
                "data-ocid": "sponsor-card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex h-12 w-12 items-center justify-center rounded-xl",
                      style: { background: "oklch(0.55 0.23 310 / 0.12)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Handshake,
                        {
                          size: 24,
                          style: { color: "oklch(0.55 0.23 310)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "mb-2 font-display text-xl font-black glow-magenta",
                        style: { color: "oklch(0.55 0.23 310)" },
                        children: "Become a Sponsor"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm leading-relaxed",
                        style: { color: "oklch(0.6 0 0)" },
                        children: "Align your brand with the world's most vibrant festival movement. We offer tailored sponsorship packages including stage naming rights, on-site activations, digital campaigns, and VIP access."
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: scrollToForm,
                      className: "mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                      style: {
                        background: "oklch(0.55 0.23 310 / 0.12)",
                        border: "1px solid oklch(0.55 0.23 310 / 0.4)",
                        color: "oklch(0.55 0.23 310)"
                      },
                      "data-ocid": "sponsor-cta",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 13 }),
                        "Get in Touch"
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col gap-5 rounded-2xl p-7 transition-smooth hover:-translate-y-1",
                style: {
                  background: "oklch(0.1 0.02 260)",
                  border: "1px solid oklch(0.65 0.18 70 / 0.3)",
                  boxShadow: "0 0 20px oklch(0.65 0.18 70 / 0.05)"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.borderColor = "oklch(0.65 0.18 70 / 0.6)";
                  e.currentTarget.style.boxShadow = "0 10px 40px oklch(0.65 0.18 70 / 0.12)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.borderColor = "oklch(0.65 0.18 70 / 0.3)";
                  e.currentTarget.style.boxShadow = "0 0 20px oklch(0.65 0.18 70 / 0.05)";
                },
                "data-ocid": "media-card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex h-12 w-12 items-center justify-center rounded-xl",
                      style: { background: "oklch(0.65 0.18 70 / 0.12)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { size: 24, style: { color: "oklch(0.65 0.18 70)" } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "mb-2 font-display text-xl font-black glow-amber",
                        style: { color: "oklch(0.65 0.18 70)" },
                        children: "Media & Press"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm leading-relaxed",
                        style: { color: "oklch(0.6 0 0)" },
                        children: "Press accreditation, artist interviews, backstage access, and exclusive content partnerships. Let's tell the WE ARE ONE story together and amplify the magic to audiences worldwide."
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: "mailto:contact@weareone.com?subject=Media%20%26%20Press%20Request",
                      className: "mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
                      style: {
                        background: "oklch(0.65 0.18 70 / 0.12)",
                        border: "1px solid oklch(0.65 0.18 70 / 0.4)",
                        color: "oklch(0.65 0.18 70)"
                      },
                      "data-ocid": "media-cta",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 13 }),
                        "Get in Touch"
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  ContactPage as default
};

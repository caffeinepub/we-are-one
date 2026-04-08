import {
  Building2,
  Globe,
  Handshake,
  Mail,
  MapPin,
  Newspaper,
  Send,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si";

const SOCIAL_LINKS = [
  {
    icon: SiInstagram,
    label: "Instagram",
    handle: "@weareone",
    href: "https://instagram.com/weareone",
  },
  {
    icon: SiX,
    label: "Twitter / X",
    handle: "@weareone",
    href: "https://x.com/weareone",
  },
  {
    icon: SiFacebook,
    label: "Facebook",
    handle: "WE ARE ONE",
    href: "https://facebook.com/weareone",
  },
  {
    icon: SiTiktok,
    label: "TikTok",
    handle: "@weareone",
    href: "https://tiktok.com/@weareone",
  },
  {
    icon: SiYoutube,
    label: "YouTube",
    handle: "WE ARE ONE",
    href: "https://youtube.com/@weareone",
  },
];

const INQUIRY_TYPES = [
  { value: "general", label: "General Inquiry" },
  { value: "sponsorship", label: "Sponsorship" },
  { value: "media", label: "Media Request" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
] as const;

type InquiryTypeValue = (typeof INQUIRY_TYPES)[number]["value"];

interface FormState {
  name: string;
  email: string;
  inquiryType: InquiryTypeValue;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!validateEmail(form.email))
    errors.email = "Enter a valid email address";
  if (!form.inquiryType) errors.inquiryType = "Please select an inquiry type";
  if (!form.message.trim()) errors.message = "Message is required";
  return errors;
}

const INPUT_BASE =
  "w-full rounded-xl px-4 py-3 text-sm outline-none transition-smooth placeholder:opacity-40";

function StyledInput({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  ocid,
}: {
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  ocid: string;
}) {
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={INPUT_BASE}
        style={{
          background: "oklch(0.07 0.02 260)",
          border: `1px solid ${error ? "oklch(0.55 0.22 25 / 0.8)" : "oklch(0.25 0.02 260 / 0.5)"}`,
          color: "oklch(0.9 0 0)",
        }}
        onFocus={(e) => {
          if (!error) {
            (e.target as HTMLElement).style.borderColor =
              "oklch(0.65 0.2 180 / 0.6)";
            (e.target as HTMLElement).style.boxShadow =
              "0 0 12px oklch(0.65 0.2 180 / 0.1)";
          }
        }}
        onBlur={(e) => {
          (e.target as HTMLElement).style.borderColor = error
            ? "oklch(0.55 0.22 25 / 0.8)"
            : "oklch(0.25 0.02 260 / 0.5)";
          (e.target as HTMLElement).style.boxShadow = "none";
        }}
        data-ocid={ocid}
      />
      {error && (
        <p className="mt-1 text-xs" style={{ color: "oklch(0.65 0.2 25)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    inquiryType: "general",
    message: "",
  });

  function setField<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen">
      {/* ── PAGE HEADER ── */}
      <div
        className="relative overflow-hidden py-20 text-center"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.08 0.02 260) 0%, oklch(0.05 0.01 260) 100%)",
        }}
      >
        {/* Ambient glow blobs */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 30% 50%, oklch(0.65 0.2 180 / 0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 50%, oklch(0.55 0.23 310 / 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 px-4">
          <p
            className="mb-3 font-display text-xs font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.65 0.18 70)" }}
          >
            WE ARE ONE
          </p>
          <h1
            className="mb-4 font-display text-5xl font-black leading-tight glow-cyan md:text-6xl"
            style={{ color: "oklch(0.65 0.2 180)" }}
          >
            Get In Touch
          </h1>
          <p
            className="mx-auto max-w-md text-base"
            style={{ color: "oklch(0.6 0 0)" }}
          >
            For inquiries, sponsorships, and media requests
          </p>
        </div>
      </div>

      {/* ── MAIN TWO-COLUMN LAYOUT ── */}
      <div className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* ── LEFT: Contact Info ── */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* Email */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "oklch(0.1 0.02 260)",
                  border: "1px solid oklch(0.25 0.02 260 / 0.4)",
                }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <Mail size={15} style={{ color: "oklch(0.65 0.2 180)" }} />
                  <span
                    className="font-display text-xs uppercase tracking-widest"
                    style={{ color: "oklch(0.5 0 0)" }}
                  >
                    Email Us
                  </span>
                </div>
                <a
                  href="mailto:contact@weareone.com"
                  className="inline-block font-display text-base font-bold transition-smooth hover:opacity-80 glow-cyan"
                  style={{ color: "oklch(0.65 0.2 180)" }}
                  data-ocid="contact-email-link"
                >
                  contact@weareone.com
                </a>
                <p className="mt-1 text-xs" style={{ color: "oklch(0.5 0 0)" }}>
                  We aim to respond within 48 hours
                </p>
              </div>

              {/* Social Media */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "oklch(0.1 0.02 260)",
                  border: "1px solid oklch(0.25 0.02 260 / 0.4)",
                }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <Globe size={15} style={{ color: "oklch(0.65 0.2 180)" }} />
                  <span
                    className="font-display text-xs uppercase tracking-widest"
                    style={{ color: "oklch(0.5 0 0)" }}
                  >
                    Follow Us
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {SOCIAL_LINKS.map(({ icon: Icon, label, handle, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl px-3 py-2 transition-smooth hover:-translate-x-0.5"
                      style={{
                        background: "oklch(0.07 0.02 260 / 0.6)",
                        border: "1px solid oklch(0.2 0.02 260 / 0.5)",
                        color: "oklch(0.55 0 0)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "oklch(0.65 0.2 180)";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "oklch(0.65 0.2 180 / 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "oklch(0.55 0 0)";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "oklch(0.2 0.02 260 / 0.5)";
                      }}
                      aria-label={label}
                      data-ocid="social-link"
                    >
                      <Icon size={16} className="shrink-0" />
                      <span
                        className="text-xs font-display uppercase tracking-wider"
                        style={{ color: "oklch(0.45 0 0)" }}
                      >
                        {label}
                      </span>
                      <span className="ml-auto text-xs font-medium">
                        {handle}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Office Address */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "oklch(0.1 0.02 260)",
                  border: "1px solid oklch(0.25 0.02 260 / 0.4)",
                }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Building2
                    size={15}
                    style={{ color: "oklch(0.55 0.23 310)" }}
                  />
                  <span
                    className="font-display text-xs uppercase tracking-widest"
                    style={{ color: "oklch(0.5 0 0)" }}
                  >
                    Office
                  </span>
                </div>
                <p
                  className="font-display text-sm font-semibold"
                  style={{ color: "oklch(0.8 0 0)" }}
                >
                  WE ARE ONE Ltd
                </p>
                <p className="text-xs" style={{ color: "oklch(0.5 0 0)" }}>
                  Global Headquarters
                </p>
              </div>

              {/* Map Placeholder */}
              <div
                className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.12 0.03 220) 0%, oklch(0.08 0.02 260) 100%)",
                  border: "1px solid oklch(0.25 0.02 260 / 0.4)",
                }}
                aria-label="Map placeholder"
              >
                {/* Grid lines */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "linear-gradient(oklch(0.65 0.2 180 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.2 180 / 0.3) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                {/* Radial glow */}
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(circle 80px at center, oklch(0.65 0.2 180 / 0.15) 0%, transparent 70%)",
                  }}
                />
                <div className="relative flex flex-col items-center gap-2">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      background: "oklch(0.65 0.2 180 / 0.15)",
                      border: "2px solid oklch(0.65 0.2 180 / 0.5)",
                      boxShadow: "0 0 20px oklch(0.65 0.2 180 / 0.4)",
                    }}
                  >
                    <MapPin
                      size={22}
                      style={{ color: "oklch(0.65 0.2 180)" }}
                    />
                  </div>
                  <span
                    className="font-display text-xs uppercase tracking-widest"
                    style={{ color: "oklch(0.5 0 0)" }}
                  >
                    Global HQ
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Contact Form ── */}
            <div ref={formRef} className="lg:col-span-3">
              <div
                className="rounded-2xl p-8"
                style={{
                  background: "oklch(0.1 0.02 260)",
                  border: "1px solid oklch(0.25 0.02 260 / 0.4)",
                }}
              >
                {submitted ? (
                  <div className="flex flex-col items-center gap-5 py-12 text-center">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-full"
                      style={{
                        background: "oklch(0.65 0.2 180 / 0.1)",
                        border: "2px solid oklch(0.65 0.2 180 / 0.5)",
                        boxShadow: "0 0 30px oklch(0.65 0.2 180 / 0.3)",
                      }}
                    >
                      <Send
                        size={30}
                        style={{ color: "oklch(0.65 0.2 180)" }}
                      />
                    </div>
                    <h2
                      className="font-display text-2xl font-black glow-cyan"
                      style={{ color: "oklch(0.65 0.2 180)" }}
                    >
                      Message Sent!
                    </h2>
                    <p
                      className="max-w-sm text-sm leading-relaxed"
                      style={{ color: "oklch(0.6 0 0)" }}
                    >
                      Thank you! We'll be back in touch shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          inquiryType: "general",
                          message: "",
                        });
                        setErrors({});
                      }}
                      className="rounded-xl px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wider transition-smooth hover:opacity-80"
                      style={{
                        border: "1px solid oklch(0.65 0.2 180 / 0.4)",
                        color: "oklch(0.65 0.2 180)",
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    <h2
                      className="font-display text-xl font-black"
                      style={{ color: "oklch(0.9 0 0)" }}
                    >
                      Send Us a Message
                    </h2>

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block font-display text-xs uppercase tracking-wider"
                        style={{ color: "oklch(0.55 0 0)" }}
                      >
                        Name *
                      </label>
                      <StyledInput
                        id="contact-name"
                        value={form.name}
                        onChange={(v) => setField("name", v)}
                        placeholder="Your full name"
                        error={errors.name}
                        ocid="contact-name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block font-display text-xs uppercase tracking-wider"
                        style={{ color: "oklch(0.55 0 0)" }}
                      >
                        Email *
                      </label>
                      <StyledInput
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(v) => setField("email", v)}
                        placeholder="your@email.com"
                        error={errors.email}
                        ocid="contact-email"
                      />
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label
                        htmlFor="contact-inquiry"
                        className="mb-1.5 block font-display text-xs uppercase tracking-wider"
                        style={{ color: "oklch(0.55 0 0)" }}
                      >
                        Inquiry Type *
                      </label>
                      <select
                        id="contact-inquiry"
                        value={form.inquiryType}
                        onChange={(e) =>
                          setField(
                            "inquiryType",
                            e.target.value as InquiryTypeValue,
                          )
                        }
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-smooth appearance-none cursor-pointer"
                        style={{
                          background: "oklch(0.07 0.02 260)",
                          border: `1px solid ${errors.inquiryType ? "oklch(0.55 0.22 25 / 0.8)" : "oklch(0.25 0.02 260 / 0.5)"}`,
                          color: "oklch(0.9 0 0)",
                        }}
                        onFocus={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "oklch(0.65 0.2 180 / 0.6)";
                          (e.target as HTMLElement).style.boxShadow =
                            "0 0 12px oklch(0.65 0.2 180 / 0.1)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "oklch(0.25 0.02 260 / 0.5)";
                          (e.target as HTMLElement).style.boxShadow = "none";
                        }}
                        data-ocid="contact-inquiry"
                      >
                        {INQUIRY_TYPES.map(({ value, label }) => (
                          <option
                            key={value}
                            value={value}
                            style={{ background: "oklch(0.1 0.02 260)" }}
                          >
                            {label}
                          </option>
                        ))}
                      </select>
                      {errors.inquiryType && (
                        <p
                          className="mt-1 text-xs"
                          style={{ color: "oklch(0.65 0.2 25)" }}
                        >
                          {errors.inquiryType}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block font-display text-xs uppercase tracking-wider"
                        style={{ color: "oklch(0.55 0 0)" }}
                      >
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={6}
                        value={form.message}
                        onChange={(e) => setField("message", e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-smooth placeholder:opacity-40"
                        style={{
                          background: "oklch(0.07 0.02 260)",
                          border: `1px solid ${errors.message ? "oklch(0.55 0.22 25 / 0.8)" : "oklch(0.25 0.02 260 / 0.5)"}`,
                          color: "oklch(0.9 0 0)",
                        }}
                        onFocus={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "oklch(0.65 0.2 180 / 0.6)";
                          (e.target as HTMLElement).style.boxShadow =
                            "0 0 12px oklch(0.65 0.2 180 / 0.1)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            errors.message
                              ? "oklch(0.55 0.22 25 / 0.8)"
                              : "oklch(0.25 0.02 260 / 0.5)";
                          (e.target as HTMLElement).style.boxShadow = "none";
                        }}
                        data-ocid="contact-message"
                      />
                      {errors.message && (
                        <p
                          className="mt-1 text-xs"
                          style={{ color: "oklch(0.65 0.2 25)" }}
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-xl py-3.5 font-display text-sm font-black uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.65 0.2 180), oklch(0.55 0.23 310))",
                        color: "oklch(0.96 0 0)",
                        boxShadow: "0 0 25px oklch(0.65 0.2 180 / 0.3)",
                      }}
                      data-ocid="contact-submit"
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SPONSORSHIP & MEDIA SECTION ── */}
      <div
        className="px-4 py-16"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0.02 260) 0%, oklch(0.08 0.02 260) 100%)",
          borderTop: "1px solid oklch(0.2 0.02 260 / 0.4)",
        }}
      >
        <div className="container mx-auto max-w-6xl">
          {/* Blurb */}
          <div className="mb-10 text-center">
            <p
              className="mb-2 font-display text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.65 0.18 70)" }}
            >
              Partner With Us
            </p>
            <h2
              className="mb-4 font-display text-3xl font-black glow-magenta md:text-4xl"
              style={{ color: "oklch(0.55 0.23 310)" }}
            >
              Sponsorship & Media
            </h2>
            <p
              className="mx-auto max-w-2xl text-sm leading-relaxed md:text-base"
              style={{ color: "oklch(0.6 0 0)" }}
            >
              WE ARE ONE attracts tens of thousands of festival-goers across
              multiple events each year. Partner with us for unparalleled brand
              exposure, exclusive media access, and unforgettable experiences
              that resonate with a passionate global audience.
            </p>
          </div>

          {/* Two cards */}
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {/* Sponsor Card */}
            <div
              className="flex flex-col gap-5 rounded-2xl p-7 transition-smooth hover:-translate-y-1"
              style={{
                background: "oklch(0.1 0.02 260)",
                border: "1px solid oklch(0.55 0.23 310 / 0.3)",
                boxShadow: "0 0 20px oklch(0.55 0.23 310 / 0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.55 0.23 310 / 0.6)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 10px 40px oklch(0.55 0.23 310 / 0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.55 0.23 310 / 0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 20px oklch(0.55 0.23 310 / 0.05)";
              }}
              data-ocid="sponsor-card"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "oklch(0.55 0.23 310 / 0.12)" }}
              >
                <Handshake
                  size={24}
                  style={{ color: "oklch(0.55 0.23 310)" }}
                />
              </div>
              <div>
                <h3
                  className="mb-2 font-display text-xl font-black glow-magenta"
                  style={{ color: "oklch(0.55 0.23 310)" }}
                >
                  Become a Sponsor
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.6 0 0)" }}
                >
                  Align your brand with the world's most vibrant festival
                  movement. We offer tailored sponsorship packages including
                  stage naming rights, on-site activations, digital campaigns,
                  and VIP access.
                </p>
              </div>
              <button
                type="button"
                onClick={scrollToForm}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
                style={{
                  background: "oklch(0.55 0.23 310 / 0.12)",
                  border: "1px solid oklch(0.55 0.23 310 / 0.4)",
                  color: "oklch(0.55 0.23 310)",
                }}
                data-ocid="sponsor-cta"
              >
                <Mail size={13} />
                Get in Touch
              </button>
            </div>

            {/* Media Card */}
            <div
              className="flex flex-col gap-5 rounded-2xl p-7 transition-smooth hover:-translate-y-1"
              style={{
                background: "oklch(0.1 0.02 260)",
                border: "1px solid oklch(0.65 0.18 70 / 0.3)",
                boxShadow: "0 0 20px oklch(0.65 0.18 70 / 0.05)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.65 0.18 70 / 0.6)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 10px 40px oklch(0.65 0.18 70 / 0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.65 0.18 70 / 0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 20px oklch(0.65 0.18 70 / 0.05)";
              }}
              data-ocid="media-card"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "oklch(0.65 0.18 70 / 0.12)" }}
              >
                <Newspaper size={24} style={{ color: "oklch(0.65 0.18 70)" }} />
              </div>
              <div>
                <h3
                  className="mb-2 font-display text-xl font-black glow-amber"
                  style={{ color: "oklch(0.65 0.18 70)" }}
                >
                  Media & Press
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.6 0 0)" }}
                >
                  Press accreditation, artist interviews, backstage access, and
                  exclusive content partnerships. Let's tell the WE ARE ONE
                  story together and amplify the magic to audiences worldwide.
                </p>
              </div>
              <a
                href="mailto:contact@weareone.com?subject=Media%20%26%20Press%20Request"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
                style={{
                  background: "oklch(0.65 0.18 70 / 0.12)",
                  border: "1px solid oklch(0.65 0.18 70 / 0.4)",
                  color: "oklch(0.65 0.18 70)",
                }}
                data-ocid="media-cta"
              >
                <Mail size={13} />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

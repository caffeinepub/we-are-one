import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Music,
  Sparkles,
  Star,
  Ticket,
} from "lucide-react";
import { useState } from "react";
import ComingSoonModal, { useComingSoon } from "../components/ComingSoonModal";
import FestivalCard from "../components/FestivalCard";
import { useFestivals } from "../hooks/useBackend";

// ─── Stats strip data ──────────────────────────────────────────────────────
const STATS = [
  { value: "24", label: "Festivals Worldwide", color: "oklch(0.65 0.2 180)" },
  { value: "6", label: "Countries", color: "oklch(0.55 0.23 310)" },
  { value: "3", label: "Continents", color: "oklch(0.65 0.18 70)" },
];

// ─── Experience highlights ─────────────────────────────────────────────────
const EXPERIENCES = [
  {
    icon: Music,
    title: "World-Class Artists",
    desc: "The biggest names in EDM, live bands, and surprise headline acts every season.",
    color: "oklch(0.65 0.2 180)",
    glowClass: "glow-cyan",
  },
  {
    icon: Star,
    title: "Immersive Experiences",
    desc: "Laser shows, pyrotechnics, LED stages, and production that redefines what a festival can be.",
    color: "oklch(0.55 0.23 310)",
    glowClass: "glow-magenta",
  },
  {
    icon: Globe,
    title: "Global Community",
    desc: "Unite with fans from every corner of the world — one beat, one movement, one family.",
    color: "oklch(0.65 0.18 70)",
    glowClass: "glow-amber",
  },
];

// ─── Skeleton card ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="animate-pulse rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.1 0.02 260)",
        border: "1px solid oklch(0.25 0.05 180 / 0.2)",
      }}
    >
      <div className="h-48" style={{ background: "oklch(0.14 0.02 260)" }} />
      <div className="p-5 space-y-3">
        <div
          className="h-4 w-24 rounded"
          style={{ background: "oklch(0.18 0.02 260)" }}
        />
        <div
          className="h-5 w-3/4 rounded"
          style={{ background: "oklch(0.18 0.02 260)" }}
        />
        <div
          className="h-4 w-full rounded"
          style={{ background: "oklch(0.16 0.02 260)" }}
        />
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function HomePage() {
  const { isOpen, open, close } = useComingSoon();
  const { data: festivals, isLoading } = useFestivals();
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  const featured = (festivals ?? []).slice(0, 6);

  function handleScrollDown() {
    document
      .getElementById("stats-strip")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setNotified(true);
      setEmail("");
    }
  }

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Aurora animated background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.65 0.2 180 / 0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 20% 80%, oklch(0.55 0.23 310 / 0.12) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 70%, oklch(0.65 0.18 70 / 0.08) 0%, transparent 50%)",
            animation: "aurora-shift 12s ease-in-out infinite alternate",
          }}
        />

        {/* Scanline overlay for Tomorrowland vibe */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.96 0 0) 2px, oklch(0.96 0 0) 4px)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-5xl">
          {/* Logo */}
          <img
            src="https://image2url.com/r2/default/images/1775683614327-346f8e28-9a02-4a59-8ff6-14dd1641405e.png"
            alt="WE ARE ONE Festival Logo"
            className="h-28 w-auto object-contain md:h-40 lg:h-48 drop-shadow-[0_0_40px_oklch(0.65_0.2_180_/_0.6)]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
            data-ocid="hero-logo"
          />

          {/* Slogan */}
          <p
            className="font-display text-sm font-black uppercase tracking-[0.5em] animate-pulse-glow glow-magenta md:text-base"
            style={{ color: "oklch(0.55 0.23 310)" }}
          >
            One World 2 Vibes
          </p>

          {/* Main headline */}
          <h1
            className="font-display font-black leading-[0.95] tracking-tight text-5xl md:text-7xl lg:text-8xl"
            style={{ color: "oklch(0.96 0 0)" }}
            data-ocid="hero-headline"
          >
            WE ARE ONE{" "}
            <span
              className="block glow-cyan mt-1"
              style={{ color: "oklch(0.65 0.2 180)" }}
            >
              Festivals
            </span>{" "}
            <span
              className="block text-3xl md:text-4xl lg:text-5xl mt-2 font-bold"
              style={{ color: "oklch(0.75 0 0)" }}
            >
              Across the Globe
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="max-w-2xl text-base leading-relaxed md:text-lg lg:text-xl"
            style={{ color: "oklch(0.62 0 0)" }}
          >
            Experience the ultimate EDM &amp; family festivals in the UK,
            Europe, Americas, Asia &amp; beyond.
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/festivals"
              className="flex items-center gap-2 rounded-2xl px-8 py-4 font-display font-bold uppercase tracking-wider text-sm transition-smooth hover:scale-105 active:scale-95"
              style={{
                background: "oklch(0.65 0.2 180 / 0.12)",
                border: "2px solid oklch(0.65 0.2 180 / 0.5)",
                color: "oklch(0.65 0.2 180)",
                boxShadow: "0 0 20px oklch(0.65 0.2 180 / 0.2)",
              }}
              data-ocid="hero-view-festivals"
            >
              View Festivals
              <ChevronRight size={16} />
            </Link>

            <button
              type="button"
              onClick={open}
              className="flex items-center gap-2 rounded-2xl px-8 py-4 font-display font-bold uppercase tracking-wider text-sm transition-smooth hover:scale-105 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.2 180 / 0.95), oklch(0.55 0.23 310 / 0.95))",
                color: "oklch(0.96 0 0)",
                boxShadow:
                  "0 0 30px oklch(0.65 0.2 180 / 0.45), 0 4px 20px oklch(0 0 0 / 0.3)",
              }}
              data-ocid="hero-buy-tickets"
            >
              <Ticket size={18} />
              Buy Tickets
            </button>
          </div>

          {/* Sparkle decoration */}
          <div
            className="flex items-center gap-3 mt-2"
            style={{ color: "oklch(0.45 0 0)" }}
          >
            <Sparkles size={12} style={{ color: "oklch(0.65 0.18 70)" }} />
            <span className="font-display text-xs uppercase tracking-[0.3em]">
              14+ for EDM · All Ages for Family Events
            </span>
            <Sparkles size={12} style={{ color: "oklch(0.65 0.18 70)" }} />
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-smooth hover:opacity-80 focus:outline-none"
          style={{ color: "oklch(0.45 0 0)" }}
          aria-label="Scroll down"
          data-ocid="hero-scroll-down"
        >
          <span className="font-display text-xs uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown
            size={20}
            className="animate-bounce"
            style={{ color: "oklch(0.65 0.2 180)" }}
          />
        </button>

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.06 0.01 260 / 0.9))",
          }}
        />
      </section>

      {/* ══ STATS STRIP ════════════════════════════════════════════════════ */}
      <section
        id="stats-strip"
        className="relative py-10 px-4 overflow-hidden"
        style={{
          background: "oklch(0.1 0.02 260 / 0.6)",
          borderTop: "1px solid oklch(0.65 0.2 180 / 0.15)",
          borderBottom: "1px solid oklch(0.65 0.2 180 / 0.15)",
          backdropFilter: "blur(10px)",
        }}
        aria-label="Stats"
        data-ocid="stats-strip"
      >
        {/* Subtle inner glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.65 0.2 180 / 0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 container mx-auto">
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-3">
            {STATS.map(({ value, label, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span
                  className="font-display font-black text-3xl md:text-4xl lg:text-5xl"
                  style={{
                    color,
                    textShadow: `0 0 20px ${color.replace(")", " / 0.5)")}`,
                  }}
                >
                  {value}
                </span>
                <span
                  className="font-display text-xs uppercase tracking-widest"
                  style={{ color: "oklch(0.5 0 0)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED FESTIVALS ═════════════════════════════════════════════ */}
      <section
        className="py-20 px-4"
        style={{ background: "oklch(0.07 0.01 260 / 0.5)" }}
        aria-label="Featured Festivals"
        data-ocid="featured-festivals"
      >
        <div className="container mx-auto">
          {/* Section header */}
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2">
              <Sparkles size={14} style={{ color: "oklch(0.65 0.18 70)" }} />
              <span
                className="font-display text-xs font-bold uppercase tracking-[0.35em]"
                style={{ color: "oklch(0.65 0.18 70)" }}
              >
                On the Horizon
              </span>
              <Sparkles size={14} style={{ color: "oklch(0.65 0.18 70)" }} />
            </div>
            <h2
              className="font-display font-black text-4xl md:text-5xl lg:text-6xl glow-cyan"
              style={{ color: "oklch(0.65 0.2 180)" }}
            >
              Upcoming Festivals
            </h2>
            <p
              className="max-w-xl text-base"
              style={{ color: "oklch(0.58 0 0)" }}
            >
              Summer superclubs to winter wonderlands — discover your next WE
              ARE ONE experience.
            </p>
          </div>

          {/* Festival grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((id) => (
                  <SkeletonCard key={id} />
                ))
              : featured.map((festival) => (
                  <FestivalCard
                    key={festival.id.toString()}
                    festival={festival}
                  />
                ))}
          </div>

          {/* View All CTA */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/festivals"
              className="flex items-center gap-2 rounded-2xl px-8 py-3 font-display font-bold uppercase tracking-wider text-sm transition-smooth hover:scale-105"
              style={{
                border: "2px solid oklch(0.65 0.2 180 / 0.4)",
                color: "oklch(0.65 0.2 180)",
                boxShadow: "0 0 16px oklch(0.65 0.2 180 / 0.1)",
              }}
              data-ocid="home-view-all-festivals"
            >
              View All Festivals
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE HIGHLIGHTS ══════════════════════════════════════════ */}
      <section
        className="py-20 px-4"
        aria-label="Experience highlights"
        data-ocid="experience-section"
      >
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2
              className="font-display font-black text-4xl md:text-5xl glow-magenta"
              style={{ color: "oklch(0.55 0.23 310)" }}
            >
              The WE ARE ONE Experience
            </h2>
            <p
              className="mt-3 text-base max-w-lg mx-auto"
              style={{ color: "oklch(0.55 0 0)" }}
            >
              More than a festival — a world unto itself.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {EXPERIENCES.map(
              ({ icon: Icon, title, desc, color, glowClass }) => (
                <div
                  key={title}
                  className="flex flex-col items-center gap-4 rounded-2xl p-8 text-center transition-smooth hover:-translate-y-1"
                  style={{
                    background: "oklch(0.1 0.02 260 / 0.7)",
                    border: "1px solid oklch(0.25 0.05 180 / 0.3)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 4px 24px oklch(0 0 0 / 0.3)",
                  }}
                  data-ocid="experience-card"
                >
                  {/* Icon ring */}
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: "72px",
                      height: "72px",
                      background: `${color.replace(")", " / 0.1)")}`,
                      border: `2px solid ${color.replace(")", " / 0.4)")}`,
                      boxShadow: `0 0 20px ${color.replace(")", " / 0.2)")}`,
                    }}
                  >
                    <Icon size={30} className={glowClass} style={{ color }} />
                  </div>
                  <h3
                    className={`font-display font-bold text-xl ${glowClass}`}
                    style={{ color }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.58 0 0)" }}
                  >
                    {desc}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER / NOTIFY CTA ════════════════════════════════════════ */}
      <section
        className="py-24 px-4"
        style={{ background: "oklch(0.07 0.01 260 / 0.4)" }}
        aria-label="Stay notified"
        data-ocid="newsletter-section"
      >
        <div className="container mx-auto max-w-2xl text-center">
          {/* Decorative top glow */}
          <div
            className="mx-auto mb-8 h-1 w-32 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.65 0.2 180), oklch(0.55 0.23 310), transparent)",
            }}
          />

          <h2
            className="font-display font-black text-4xl md:text-5xl glow-cyan mb-4"
            style={{ color: "oklch(0.96 0 0)" }}
          >
            Join the{" "}
            <span
              className="glow-magenta"
              style={{ color: "oklch(0.55 0.23 310)" }}
            >
              WE ARE ONE
            </span>{" "}
            Family
          </h2>
          <p
            className="mb-10 text-base md:text-lg leading-relaxed"
            style={{ color: "oklch(0.58 0 0)" }}
          >
            Be the first to know when tickets go live.
          </p>

          {notified ? (
            <div
              className="inline-flex items-center gap-3 rounded-2xl px-8 py-4"
              style={{
                background: "oklch(0.65 0.2 180 / 0.1)",
                border: "2px solid oklch(0.65 0.2 180 / 0.5)",
              }}
              data-ocid="notify-success"
            >
              <Sparkles size={18} style={{ color: "oklch(0.65 0.18 70)" }} />
              <span
                className="font-display font-bold text-sm uppercase tracking-wider glow-cyan"
                style={{ color: "oklch(0.65 0.2 180)" }}
              >
                You're on the list — see you on the dancefloor! 🎉
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleNotify}
              className="flex flex-col items-center gap-3 sm:flex-row sm:gap-0"
              aria-label="Email notification form"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full flex-1 rounded-2xl px-5 py-4 font-body text-sm outline-none transition-smooth sm:rounded-r-none"
                style={{
                  background: "oklch(0.12 0.02 260)",
                  border: "2px solid oklch(0.65 0.2 180 / 0.3)",
                  borderRight: "none",
                  color: "oklch(0.96 0 0)",
                  caretColor: "oklch(0.65 0.2 180)",
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    "oklch(0.65 0.2 180 / 0.7)";
                  (e.target as HTMLInputElement).style.boxShadow =
                    "0 0 12px oklch(0.65 0.2 180 / 0.15)";
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    "oklch(0.65 0.2 180 / 0.3)";
                  (e.target as HTMLInputElement).style.boxShadow = "none";
                }}
                data-ocid="newsletter-email-input"
              />
              <button
                type="submit"
                className="w-full rounded-2xl px-7 py-4 font-display font-bold text-sm uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95 sm:w-auto sm:rounded-l-none"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.2 180), oklch(0.55 0.23 310))",
                  color: "oklch(0.96 0 0)",
                  boxShadow: "0 0 20px oklch(0.65 0.2 180 / 0.35)",
                }}
                data-ocid="newsletter-submit"
              >
                Notify Me
              </button>
            </form>
          )}

          <p
            className="mt-5 font-display text-xs uppercase tracking-widest"
            style={{ color: "oklch(0.38 0 0)" }}
          >
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ══ Coming Soon Modal ══════════════════════════════════════════════ */}
      <ComingSoonModal isOpen={isOpen} onClose={close} />

      {/* ══ Aurora keyframe animation ══════════════════════════════════════ */}
      <style>{`
        @keyframes aurora-shift {
          0%   { opacity: 0.6; transform: scale(1) translateY(0); }
          33%  { opacity: 0.8; transform: scale(1.05) translateY(-20px); }
          66%  { opacity: 0.65; transform: scale(0.97) translateY(10px); }
          100% { opacity: 0.75; transform: scale(1.02) translateY(-10px); }
        }
      `}</style>
    </>
  );
}

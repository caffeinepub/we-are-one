import { CheckCircle2, ChevronDown, Crown, Plane, Ticket } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ComingSoonModal, { useComingSoon } from "../components/ComingSoonModal";
import { usePackages } from "../hooks/useBackend";
import type { Package, PackageType } from "../types/festival";
import { getPackageTypeLabel } from "../types/festival";

// ─── Type Grouping ────────────────────────────────────────────────────────────

type SectionKey = "entry" | "vip" | "travel";

const SECTION_DEFS: {
  key: SectionKey;
  label: string;
  icon: React.ReactNode;
  types: string[];
}[] = [
  {
    key: "entry",
    label: "Entry Tickets",
    icon: <Ticket size={22} />,
    types: ["Weekend1", "Weekend2", "FullWeekend"],
  },
  {
    key: "vip",
    label: "VIP Packages",
    icon: <Crown size={22} />,
    types: ["VIP"],
  },
  {
    key: "travel",
    label: "Travel Packages",
    icon: <Plane size={22} />,
    types: ["FlightPackage", "Transfer", "Accommodation"],
  },
];

function getPackageKey(pt: PackageType): string {
  return pt as string;
}

function getSectionForPackage(pkg: Package): SectionKey {
  const key = getPackageKey(pkg.packageType);
  for (const def of SECTION_DEFS) {
    if (def.types.includes(key)) return def.key;
  }
  return "entry";
}

function getBadgeStyle(key: SectionKey) {
  if (key === "vip")
    return {
      color: "oklch(0.65 0.18 70)",
      border: "1px solid oklch(0.65 0.18 70 / 0.5)",
      background: "oklch(0.65 0.18 70 / 0.1)",
    };
  if (key === "travel")
    return {
      color: "oklch(0.55 0.23 310)",
      border: "1px solid oklch(0.55 0.23 310 / 0.5)",
      background: "oklch(0.55 0.23 310 / 0.1)",
    };
  return {
    color: "oklch(0.65 0.2 180)",
    border: "1px solid oklch(0.65 0.2 180 / 0.5)",
    background: "oklch(0.65 0.2 180 / 0.1)",
  };
}

function getSectionBorderClass(key: SectionKey) {
  if (key === "vip") return "neon-border-amber";
  if (key === "travel") return "neon-border-magenta";
  return "neon-border-cyan";
}

function getSectionHeaderColor(key: SectionKey) {
  if (key === "vip") return "oklch(0.65 0.18 70)";
  if (key === "travel") return "oklch(0.55 0.23 310)";
  return "oklch(0.65 0.2 180)";
}

function getSectionGlowClass(key: SectionKey) {
  if (key === "vip") return "glow-amber";
  if (key === "travel") return "glow-magenta";
  return "glow-cyan";
}

// ─── VIP Perks ───────────────────────────────────────────────────────────────

const VIP_PERKS = [
  "Exclusive VIP lounge with premium bar",
  "Priority fast-track entry — skip all queues",
  "Meet & greet with headline DJs",
  "Exclusive limited-edition merchandise",
  "Premium viewing areas at main stages",
  "Dedicated VIP toilets & cloakroom",
  "Welcome drinks & complimentary first round",
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQS = [
  {
    id: "faq-availability",
    question: "When will tickets be available?",
    answer:
      "Tickets are not yet on sale — WE ARE ONE is currently in its launch phase. Sign up to our mailing list via the Contact page to be notified the moment tickets go live. Early-bird pricing will be available for registered fans.",
  },
  {
    id: "faq-age",
    question: "Are there age restrictions?",
    answer:
      "EDM, Rave, and Club Hotel events are strictly 14+ — valid ID is required at entry. Family Festival events are open to all ages, with dedicated kid-friendly zones. Under-18s must be accompanied by an adult at all non-EDM events.",
  },
  {
    id: "faq-refunds",
    question: "What is the refund & cancellation policy?",
    answer:
      "Full refunds are available up to 30 days before the event date. Between 14 and 30 days, a 50% credit will be issued for future events. Tickets are fully transferable up to 7 days before the event. Travel package refunds are subject to airline and accommodation provider policies.",
  },
  {
    id: "faq-travel",
    question: "What is included in travel packages?",
    answer:
      "Travel packages vary by event but typically include return flights from major UK airports (Heathrow, Manchester, Birmingham, Edinburgh), dedicated airport-to-festival coach transfers, and a welcome pack. Accommodation packages add luxury glamping or partner hotel bookings near the festival site.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PackageCard({
  pkg,
  sectionKey,
  onBuyTickets,
  index,
}: {
  pkg: Package;
  sectionKey: SectionKey;
  onBuyTickets: () => void;
  index: number;
}) {
  const badgeStyle = getBadgeStyle(sectionKey);
  const borderClass = getSectionBorderClass(sectionKey);
  const headerColor = getSectionHeaderColor(sectionKey);
  const glowClass = getSectionGlowClass(sectionKey);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`glass-effect ${borderClass} flex flex-col rounded-2xl p-6 transition-smooth hover:scale-[1.02]`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-2">
        <h3
          className={`font-display text-lg font-bold leading-tight ${glowClass}`}
          style={{ color: headerColor }}
        >
          {pkg.name}
        </h3>
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-xs font-display font-semibold uppercase tracking-wide"
          style={badgeStyle}
        >
          {getPackageTypeLabel(pkg.packageType)}
        </span>
      </div>

      {/* Price */}
      <div className="mb-4">
        <span
          className="font-display text-4xl font-bold glow-amber"
          style={{ color: "oklch(0.65 0.18 70)" }}
        >
          £{pkg.priceGBP.toString()}
        </span>
        <span className="ml-1 text-sm" style={{ color: "oklch(0.6 0 0)" }}>
          per person
        </span>
      </div>

      {/* Description */}
      <p
        className="mb-5 text-sm leading-relaxed"
        style={{ color: "oklch(0.7 0 0)" }}
      >
        {pkg.description}
      </p>

      {/* Includes */}
      <div className="mb-6 flex-1">
        <p
          className="mb-2 text-xs font-display font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.5 0 0)" }}
        >
          What&apos;s Included
        </p>
        <ul className="space-y-1.5">
          {pkg.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm"
              style={{ color: "oklch(0.78 0 0)" }}
            >
              <CheckCircle2
                size={15}
                className="mt-0.5 shrink-0"
                style={{ color: headerColor }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onBuyTickets}
        className="w-full rounded-xl py-3 px-4 font-display font-bold text-sm uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
        style={{
          background: `oklch(from ${headerColor} l c h / 0.15)`,
          border: `2px solid ${headerColor}99`,
          color: headerColor,
          boxShadow: `0 0 15px ${headerColor}33`,
        }}
        data-ocid={`buy-tickets-${pkg.id}`}
      >
        Buy Tickets
      </button>
    </motion.div>
  );
}

function FaqItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof FAQS)[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-effect overflow-hidden rounded-xl"
      style={{ border: "1px solid oklch(0.25 0.02 260 / 0.5)" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-smooth hover:bg-white/5"
        aria-expanded={isOpen}
        data-ocid={`faq-toggle-${faq.id}`}
      >
        <span
          className="font-display font-semibold text-sm"
          style={{ color: "oklch(0.88 0 0)" }}
        >
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform duration-300"
          style={{
            color: "oklch(0.65 0.2 180)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="px-6 pb-5 text-sm leading-relaxed"
              style={{ color: "oklch(0.68 0 0)" }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PackagesPage() {
  const { isOpen, open, close } = useComingSoon();
  const { data: packages = [], isLoading } = usePackages();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const grouped: Record<SectionKey, Package[]> = {
    entry: [],
    vip: [],
    travel: [],
  };
  for (const pkg of packages) {
    grouped[getSectionForPackage(pkg)].push(pkg);
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.08 0 0)" }}>
      {/* Hero Banner */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.03 260) 0%, oklch(0.08 0 0) 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.2 180) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 right-1/4 h-80 w-80 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.23 310) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <p
            className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.3em] glow-cyan"
            style={{ color: "oklch(0.65 0.2 180)" }}
          >
            WE ARE ONE
          </p>
          <h1
            className="mb-4 font-display text-5xl font-bold leading-tight glow-cyan md:text-6xl lg:text-7xl"
            style={{ color: "oklch(0.95 0 0)" }}
          >
            Festival Packages
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ color: "oklch(0.68 0 0)" }}
          >
            Everything you need for the ultimate festival experience
          </p>
        </motion.div>
      </section>

      {/* Intro */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-effect rounded-2xl px-8 py-8"
            style={{ border: "1px solid oklch(0.25 0.02 260 / 0.4)" }}
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: "oklch(0.72 0 0)" }}
            >
              From single-day passes to all-inclusive VIP experiences, WE ARE
              ONE offers curated packages for every type of festival-goer.
              Whether you&apos;re flying in from abroad, camping on-site, or
              arriving in VIP style — we have everything covered. All packages
              include official WE ARE ONE wristbands and access to world-class
              stages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Package Sections */}
      {isLoading ? (
        <section className="px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="glass-effect h-64 animate-pulse rounded-2xl"
                  style={{ border: "1px solid oklch(0.25 0.02 260 / 0.3)" }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        SECTION_DEFS.map((section) => {
          const sectionPackages = grouped[section.key];
          if (sectionPackages.length === 0) return null;
          const headerColor = getSectionHeaderColor(section.key);
          const glowClass = getSectionGlowClass(section.key);

          return (
            <section key={section.key} className="px-4 py-12">
              <div className="mx-auto max-w-6xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="mb-8 flex items-center gap-3"
                >
                  <span style={{ color: headerColor }}>{section.icon}</span>
                  <h2
                    className={`font-display text-2xl font-bold md:text-3xl ${glowClass}`}
                    style={{ color: headerColor }}
                  >
                    {section.label}
                  </h2>
                  <div
                    className="h-px flex-1"
                    style={{
                      background: `linear-gradient(90deg, ${headerColor}66, transparent)`,
                    }}
                  />
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sectionPackages.map((pkg, i) => (
                    <PackageCard
                      key={pkg.id.toString()}
                      pkg={pkg}
                      sectionKey={section.key}
                      onBuyTickets={open}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })
      )}

      {/* VIP Perks Highlight */}
      <section
        className="px-4 py-16"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.08 0 0) 0%, oklch(0.11 0.02 290) 50%, oklch(0.08 0 0) 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="glass-effect neon-border-amber rounded-3xl px-8 py-10 md:px-12"
            style={{
              background: "oklch(0.1 0.02 60 / 0.4)",
              boxShadow:
                "0 0 60px oklch(0.65 0.18 70 / 0.12), inset 0 1px 0 oklch(0.65 0.18 70 / 0.15)",
            }}
          >
            <div className="mb-8 flex flex-col items-center gap-3 text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  background: "oklch(0.65 0.18 70 / 0.15)",
                  border: "2px solid oklch(0.65 0.18 70 / 0.5)",
                }}
              >
                <Crown size={26} style={{ color: "oklch(0.65 0.18 70)" }} />
              </div>
              <h2
                className="font-display text-3xl font-bold glow-amber md:text-4xl"
                style={{ color: "oklch(0.65 0.18 70)" }}
              >
                The VIP Experience
              </h2>
              <p
                className="max-w-xl text-sm leading-relaxed"
                style={{ color: "oklch(0.68 0 0)" }}
              >
                Elevate your festival to another level. Our VIP packages are
                crafted for those who want more — more access, more exclusivity,
                more unforgettable moments.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {VIP_PERKS.map((perk, i) => (
                <motion.div
                  key={perk}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: "oklch(0.65 0.18 70 / 0.05)",
                    border: "1px solid oklch(0.65 0.18 70 / 0.2)",
                  }}
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: "oklch(0.65 0.18 70)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.78 0 0)" }}
                  >
                    {perk}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={open}
                className="rounded-xl px-8 py-3.5 font-display font-bold text-sm uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
                style={{
                  background: "oklch(0.65 0.18 70 / 0.15)",
                  border: "2px solid oklch(0.65 0.18 70 / 0.7)",
                  color: "oklch(0.65 0.18 70)",
                  boxShadow: "0 0 20px oklch(0.65 0.18 70 / 0.25)",
                }}
                data-ocid="vip-buy-tickets"
              >
                Get VIP Access
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-10 text-center"
          >
            <h2
              className="mb-3 font-display text-3xl font-bold glow-cyan md:text-4xl"
              style={{ color: "oklch(0.88 0 0)" }}
            >
              Got Questions?
            </h2>
            <p className="text-sm" style={{ color: "oklch(0.6 0 0)" }}>
              Everything you need to know before the festival
            </p>
          </motion.div>

          <div className="space-y-3" data-ocid="faq-list">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                isOpen={openFaq === faq.id}
                onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section
        className="px-4 py-16"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.08 0 0) 0%, oklch(0.12 0.03 260) 100%)",
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="mb-3 font-display text-3xl font-bold glow-magenta md:text-4xl"
              style={{ color: "oklch(0.9 0 0)" }}
            >
              Ready to Join Us?
            </h2>
            <p
              className="mb-8 text-sm leading-relaxed"
              style={{ color: "oklch(0.6 0 0)" }}
            >
              Tickets are coming soon. Register your interest and be the first
              to know when tickets drop — including exclusive early-bird
              pricing.
            </p>
            <button
              type="button"
              onClick={open}
              className="rounded-xl px-10 py-4 font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.2 180 / 0.2), oklch(0.55 0.23 310 / 0.2))",
                border: "2px solid oklch(0.65 0.2 180 / 0.7)",
                color: "oklch(0.65 0.2 180)",
                boxShadow:
                  "0 0 30px oklch(0.65 0.2 180 / 0.2), 0 0 60px oklch(0.55 0.23 310 / 0.1)",
              }}
              data-ocid="bottom-buy-tickets"
            >
              Get Tickets
            </button>
          </motion.div>
        </div>
      </section>

      <ComingSoonModal isOpen={isOpen} onClose={close} />
    </div>
  );
}

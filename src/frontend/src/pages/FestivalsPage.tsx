import { Link } from "@tanstack/react-router";
import {
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Headphones,
  MapPin,
  Music,
  Search,
  Ticket,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import ComingSoonModal from "../components/ComingSoonModal";
import {
  useFestivals,
  useSponsorsByFestival,
  useTicketUrls,
} from "../hooks/useBackend";
import type { Festival } from "../types/festival";
import {
  EventType,
  FestivalStatus,
  STATIC_FESTIVALS,
  getEventTypeLabel,
  getSeasonLabel,
  isComingSoon,
  isEDM,
  isSummer,
} from "../types/festival";

// ── Types ────────────────────────────────────────────────────────────────────

type SeasonFilter = "All" | "Summer" | "Winter";
type EventFilter = "All" | "EDM" | "Rave" | "Club/Hotel" | "Family";

const SEASON_FILTERS: SeasonFilter[] = ["All", "Summer", "Winter"];
const EVENT_FILTERS: EventFilter[] = [
  "All",
  "EDM",
  "Rave",
  "Club/Hotel",
  "Family",
];

// ── Skeleton ─────────────────────────────────────────────────────────────────

function FestivalSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.1 0.02 260)",
        border: "1px solid oklch(0.2 0.03 260 / 0.4)",
      }}
    >
      <div
        className="h-44 w-full"
        style={{ background: "oklch(0.15 0.02 260)" }}
      />
      <div className="p-5 space-y-3">
        <div
          className="h-3 w-16 rounded"
          style={{ background: "oklch(0.2 0.02 260)" }}
        />
        <div
          className="h-5 w-3/4 rounded"
          style={{ background: "oklch(0.2 0.02 260)" }}
        />
        <div
          className="h-3 w-full rounded"
          style={{ background: "oklch(0.18 0.02 260)" }}
        />
        <div
          className="h-3 w-5/6 rounded"
          style={{ background: "oklch(0.18 0.02 260)" }}
        />
        <div className="flex justify-between items-center pt-3">
          <div
            className="h-7 w-16 rounded"
            style={{ background: "oklch(0.2 0.02 260)" }}
          />
          <div
            className="h-9 w-24 rounded-xl"
            style={{ background: "oklch(0.2 0.02 260)" }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Festival Sponsors Strip ───────────────────────────────────────────────────

function FestivalSponsors({
  festivalId,
  accentColor,
}: { festivalId: bigint; accentColor: string }) {
  const { data: sponsors = [] } = useSponsorsByFestival(festivalId);
  if (!sponsors.length) return null;
  const accentAlpha = (a: number) => accentColor.replace(")", ` / ${a})`);
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: accentAlpha(0.05),
        border: `1px solid ${accentAlpha(0.15)}`,
      }}
    >
      <p
        className="mb-3 text-xs font-display font-bold uppercase tracking-widest"
        style={{ color: accentColor }}
      >
        Festival Sponsors
      </p>
      <div className="flex flex-wrap gap-3">
        {sponsors.map((s) =>
          s.logoUrl ? (
            <a
              key={s.id.toString()}
              href={s.websiteUrl || undefined}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              className="flex h-9 w-14 items-center justify-center overflow-hidden rounded-lg transition-smooth hover:scale-105"
              style={{
                background: "oklch(0.18 0.02 260)",
                textDecoration: "none",
              }}
            >
              <img
                src={s.logoUrl}
                alt={s.name}
                className="h-full w-full object-contain p-1"
              />
            </a>
          ) : (
            <span
              key={s.id.toString()}
              className="flex h-9 items-center rounded-lg px-3 text-xs font-display font-bold uppercase tracking-wider"
              style={{ background: "oklch(0.18 0.02 260)", color: accentColor }}
            >
              {s.name}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

// ── Expanded Detail Panel ─────────────────────────────────────────────────────

interface DetailPanelProps {
  festival: Festival;
  onClose: () => void;
  onBuyTickets: (festival: Festival) => void;
}

function DetailPanel({ festival, onClose, onBuyTickets }: DetailPanelProps) {
  const summer = isSummer(festival.season);
  const edm = isEDM(festival.eventType);
  const comingSoon = isComingSoon(festival.status);
  const eventTypeLabel = getEventTypeLabel(festival.eventType);
  const accentColor = summer ? "oklch(0.65 0.2 180)" : "oklch(0.6 0.18 250)";
  const accentAlpha = (a: number) => accentColor.replace(")", ` / ${a})`);

  const metaDetails = [
    {
      icon: MapPin,
      label: "Location",
      value: `${festival.location}, ${festival.country}`,
    },
    { icon: Building2, label: "Organiser", value: festival.company },
    { icon: Calendar, label: "Dates", value: festival.weekends },
    { icon: Users, label: "Age Restriction", value: festival.ageRestriction },
    {
      icon: Ticket,
      label: "Ticket Prices",
      value: `£${festival.ticketPriceMin.toString()} – £${festival.ticketPriceMax.toString()}`,
    },
    {
      icon: DollarSign,
      label: "Est. Revenue",
      value: `${festival.estimatedRevenueMin} – ${festival.estimatedRevenueMax}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28 }}
      className="col-span-full rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.08 0.02 260)",
        border: `2px solid ${accentColor}`,
        boxShadow: `0 0 40px ${accentAlpha(0.15)}`,
      }}
      data-ocid="festival-detail-panel"
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{
          background: `linear-gradient(90deg, ${accentAlpha(0.08)}, transparent)`,
          borderBottom: `1px solid ${accentAlpha(0.2)}`,
        }}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: accentAlpha(0.1),
              border: `1px solid ${accentColor}`,
              color: accentColor,
            }}
          >
            {getSeasonLabel(festival.season)} · {eventTypeLabel}
          </span>
          {comingSoon && (
            <span
              className="text-xs font-display font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                background: "oklch(0.65 0.18 70 / 0.1)",
                border: "1px solid oklch(0.65 0.18 70 / 0.5)",
                color: "oklch(0.65 0.18 70)",
              }}
            >
              Coming Soon
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1.5 transition-smooth hover:scale-110"
          style={{ color: accentColor }}
          aria-label="Close detail panel"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        {/* Left: description + lineup + notes */}
        <div className="space-y-4">
          <h3
            className="text-2xl font-display font-bold leading-tight"
            style={{ color: accentColor }}
          >
            {festival.name}
          </h3>

          {festival.description && (
            <p
              className="leading-relaxed text-sm"
              style={{ color: "oklch(0.75 0 0)" }}
            >
              {festival.description}
            </p>
          )}

          {festival.lineup && (
            <div
              className="rounded-xl p-4 space-y-2"
              style={{
                background: accentAlpha(0.06),
                border: `1px solid ${accentAlpha(0.2)}`,
              }}
            >
              <div className="flex items-center gap-2">
                <Headphones size={14} style={{ color: accentColor }} />
                <span
                  className="text-xs font-display font-bold uppercase tracking-widest"
                  style={{ color: accentColor }}
                >
                  Lineup
                </span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {festival.lineup.split(",").map((artist) => (
                  <span
                    key={artist.trim()}
                    className="text-xs font-display px-2.5 py-1 rounded-full"
                    style={{
                      background: "oklch(0.12 0.02 260)",
                      border: `1px solid ${accentAlpha(0.3)}`,
                      color: "oklch(0.85 0 0)",
                    }}
                  >
                    {artist.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {festival.specialNotes && (
            <div
              className="flex gap-3 rounded-xl p-4"
              style={{
                background: "oklch(0.65 0.18 70 / 0.07)",
                border: "1px solid oklch(0.65 0.18 70 / 0.3)",
              }}
            >
              <Music
                size={16}
                className="shrink-0 mt-0.5"
                style={{ color: "oklch(0.65 0.18 70)" }}
              />
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.75 0 0)" }}
              >
                <span
                  className="font-bold"
                  style={{ color: "oklch(0.65 0.18 70)" }}
                >
                  Note:{" "}
                </span>
                {festival.specialNotes}
              </p>
            </div>
          )}
        </div>

        {/* Right: meta grid + CTA */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {metaDetails.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl p-4"
                style={{
                  background: "oklch(0.12 0.02 260)",
                  border: "1px solid oklch(0.2 0.03 260 / 0.5)",
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={12} style={{ color: accentColor }} />
                  <span
                    className="text-xs uppercase tracking-wider font-display"
                    style={{ color: "oklch(0.5 0 0)" }}
                  >
                    {label}
                  </span>
                </div>
                <p
                  className="text-sm font-bold font-display"
                  style={{ color: "oklch(0.9 0 0)" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Age note */}
          <div
            className="rounded-xl p-3 flex items-center gap-2 text-sm"
            style={{
              background: edm
                ? "oklch(0.55 0.23 310 / 0.06)"
                : "oklch(0.55 0.18 145 / 0.06)",
              border: edm
                ? "1px solid oklch(0.55 0.23 310 / 0.3)"
                : "1px solid oklch(0.55 0.18 145 / 0.3)",
            }}
          >
            <Users
              size={14}
              style={{
                color: edm ? "oklch(0.55 0.23 310)" : "oklch(0.55 0.18 145)",
              }}
            />
            <span
              style={{
                color: edm ? "oklch(0.55 0.23 310)" : "oklch(0.55 0.18 145)",
              }}
            >
              {edm
                ? "EDM events are 14+ only"
                : "All ages welcome — family-friendly event"}
            </span>
          </div>

          {/* Buy tickets CTA */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => onBuyTickets(festival)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 px-6 font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
              style={{
                background: accentAlpha(0.15),
                border: `2px solid ${accentColor}`,
                color: accentColor,
                boxShadow: `0 0 20px ${accentAlpha(0.2)}`,
              }}
              data-ocid="detail-buy-tickets-btn"
            >
              <Ticket size={16} />
              Buy Tickets
            </button>
            <Link
              to="/festivals/$id/lineup"
              params={{ id: festival.id.toString() }}
              className="flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95 text-sm"
              style={{
                background: "oklch(0.55 0.23 310 / 0.1)",
                border: "1px solid oklch(0.55 0.23 310 / 0.5)",
                color: "oklch(0.55 0.23 310)",
              }}
              data-ocid="view-lineup-btn"
            >
              <Music size={14} />
              Lineup
            </Link>
          </div>

          {/* Festival Sponsors */}
          <FestivalSponsors
            festivalId={festival.id}
            accentColor={accentColor}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ── Grid Card ─────────────────────────────────────────────────────────────────

interface GridCardProps {
  festival: Festival;
  isExpanded: boolean;
  onToggle: () => void;
  onBuyTickets: (festival: Festival) => void;
}

function GridCard({
  festival,
  isExpanded,
  onToggle,
  onBuyTickets,
}: GridCardProps) {
  const summer = isSummer(festival.season);
  const edm = isEDM(festival.eventType);
  const comingSoon = isComingSoon(festival.status);
  const eventTypeLabel = getEventTypeLabel(festival.eventType);
  const seasonLabel = getSeasonLabel(festival.season);
  const accentColor = summer ? "oklch(0.65 0.2 180)" : "oklch(0.6 0.18 250)";
  const accentAlpha = (a: number) => accentColor.replace(")", ` / ${a})`);

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-smooth"
      style={{
        background: "oklch(0.1 0.02 260)",
        border: isExpanded
          ? `2px solid ${accentColor}`
          : "1px solid oklch(0.25 0.05 180 / 0.3)",
        boxShadow: isExpanded
          ? `0 0 30px ${accentAlpha(0.2)}`
          : "0 4px 20px oklch(0 0 0 / 0.4)",
      }}
      data-ocid="festival-grid-card"
    >
      {/* Banner — clickable toggle area */}
      <button
        type="button"
        onClick={onToggle}
        className="relative h-44 w-full overflow-hidden text-left"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} details for ${festival.name}`}
      >
        {festival.imageUrl ? (
          <img
            src={festival.imageUrl}
            alt={festival.name}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: edm
                ? "linear-gradient(135deg, oklch(0.1 0.05 260) 0%, oklch(0.2 0.15 180) 50%, oklch(0.15 0.1 310) 100%)"
                : "linear-gradient(135deg, oklch(0.12 0.04 120) 0%, oklch(0.2 0.1 150) 50%, oklch(0.15 0.08 70) 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: edm
                  ? "radial-gradient(ellipse at 30% 50%, oklch(0.65 0.2 180 / 0.35) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, oklch(0.55 0.23 310 / 0.25) 0%, transparent 60%)"
                  : "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.18 70 / 0.3) 0%, transparent 60%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-center text-xs font-display font-bold uppercase tracking-widest opacity-25"
                style={{ color: "oklch(0.96 0 0)", maxWidth: "80%" }}
              >
                {festival.name}
              </span>
            </div>
          </div>
        )}

        {/* Season badge */}
        <div
          className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider font-display"
          style={{
            background: accentAlpha(0.1),
            border: `1px solid ${accentColor}`,
            color: accentColor,
            backdropFilter: "blur(8px)",
          }}
        >
          {seasonLabel}
        </div>

        {/* Status badge */}
        <div
          className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider font-display"
          style={
            comingSoon
              ? {
                  background: "oklch(0.65 0.18 70 / 0.15)",
                  border: "1px solid oklch(0.65 0.18 70 / 0.6)",
                  color: "oklch(0.65 0.18 70)",
                  backdropFilter: "blur(8px)",
                }
              : {
                  background: "oklch(0.55 0.18 145 / 0.15)",
                  border: "1px solid oklch(0.55 0.18 145 / 0.6)",
                  color: "oklch(0.55 0.18 145)",
                  backdropFilter: "blur(8px)",
                }
          }
        >
          {comingSoon ? "Coming Soon" : "Active"}
        </div>

        {/* Expand indicator */}
        <div
          className="absolute bottom-3 right-3 rounded-full p-1.5 transition-smooth"
          style={{
            background: "oklch(0.08 0.02 260 / 0.8)",
            color: accentColor,
            border: `1px solid ${accentAlpha(0.4)}`,
          }}
        >
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {/* Card body — non-interactive info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <span
            className="rounded px-2 py-0.5 text-xs font-display font-bold uppercase tracking-wider"
            style={{
              background: "oklch(0.55 0.23 310 / 0.1)",
              border: "1px solid oklch(0.55 0.23 310 / 0.4)",
              color: "oklch(0.55 0.23 310)",
            }}
          >
            {eventTypeLabel}
          </span>
        </div>

        <h3
          className="text-lg font-display font-bold leading-tight line-clamp-2"
          style={{ color: accentColor }}
        >
          {festival.name}
        </h3>

        {festival.description && (
          <p
            className="text-sm leading-relaxed line-clamp-2"
            style={{ color: "oklch(0.65 0 0)" }}
          >
            {festival.description}
          </p>
        )}

        <div className="mt-auto space-y-1.5">
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: "oklch(0.65 0 0)" }}
          >
            <MapPin
              size={14}
              className="shrink-0"
              style={{ color: accentColor }}
            />
            <span className="truncate">
              {festival.location}, {festival.country}
            </span>
          </div>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: "oklch(0.65 0 0)" }}
          >
            <Calendar
              size={14}
              className="shrink-0"
              style={{ color: accentColor }}
            />
            <span className="truncate">{festival.weekends}</span>
          </div>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: "oklch(0.65 0 0)" }}
          >
            <Users
              size={14}
              className="shrink-0"
              style={{ color: accentColor }}
            />
            <span>{festival.ageRestriction}</span>
          </div>
        </div>

        <div
          className="mt-3 flex items-center justify-between border-t pt-3"
          style={{ borderColor: "oklch(0.25 0.02 260 / 0.4)" }}
        >
          <div>
            <span
              className="text-xs uppercase tracking-wider"
              style={{ color: "oklch(0.5 0 0)" }}
            >
              From
            </span>
            <p
              className="text-xl font-display font-bold"
              style={{ color: "oklch(0.65 0.18 70)" }}
            >
              £{festival.ticketPriceMin.toString()}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onBuyTickets(festival)}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
            style={{
              background: accentAlpha(0.15),
              border: `1px solid ${accentAlpha(0.5)}`,
              color: accentColor,
              boxShadow: `0 0 12px ${accentAlpha(0.15)}`,
            }}
            data-ocid="buy-tickets-btn"
          >
            <Ticket size={14} />
            Tickets
          </button>
          <Link
            to="/festivals/$id/lineup"
            params={{ id: festival.id.toString() }}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
            style={{
              background: "oklch(0.55 0.23 310 / 0.1)",
              border: "1px solid oklch(0.55 0.23 310 / 0.3)",
              color: "oklch(0.55 0.23 310)",
            }}
            data-ocid="lineup-link-btn"
          >
            <Music size={12} />
            Lineup
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Festival Section ──────────────────────────────────────────────────────────

interface FestivalSectionProps {
  title: string;
  accentColor: string;
  glowStyle: string;
  festivals: Festival[];
  expandedId: bigint | null;
  onToggleExpand: (id: bigint) => void;
  onBuyTickets: (festival: Festival) => void;
}

function FestivalSection({
  title,
  accentColor,
  festivals,
  expandedId,
  onToggleExpand,
  onBuyTickets,
}: FestivalSectionProps) {
  if (festivals.length === 0) return null;

  const expandedFestival = festivals.find((f) => f.id === expandedId) ?? null;
  const accentAlpha = (a: number) => accentColor.replace(")", ` / ${a})`);

  return (
    <section className="space-y-6" data-ocid="festival-section">
      {/* Section heading */}
      <div className="flex items-center gap-4">
        <h2
          className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider"
          style={{
            color: accentColor,
            textShadow: `0 0 10px ${accentAlpha(0.8)}, 0 0 20px ${accentAlpha(0.4)}`,
          }}
        >
          {title}
        </h2>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${accentAlpha(0.4)}, transparent)`,
          }}
        />
        <span
          className="text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            background: accentAlpha(0.1),
            border: `1px solid ${accentAlpha(0.3)}`,
            color: accentColor,
          }}
        >
          {festivals.length} {festivals.length === 1 ? "Event" : "Events"}
        </span>
      </div>

      {/* Grid with inline detail panel */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {festivals.map((festival) => (
          <GridCard
            key={festival.id.toString()}
            festival={festival}
            isExpanded={expandedId === festival.id}
            onToggle={() => onToggleExpand(festival.id)}
            onBuyTickets={onBuyTickets}
          />
        ))}

        <AnimatePresence>
          {expandedFestival && (
            <DetailPanel
              key={`detail-${expandedFestival.id.toString()}`}
              festival={expandedFestival}
              onClose={() => onToggleExpand(expandedFestival.id)}
              onBuyTickets={onBuyTickets}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── Filter Bar ────────────────────────────────────────────────────────────────

interface FilterBarProps {
  seasonFilter: SeasonFilter;
  eventFilter: EventFilter;
  search: string;
  onSeasonChange: (s: SeasonFilter) => void;
  onEventChange: (e: EventFilter) => void;
  onSearchChange: (v: string) => void;
}

function FilterBar({
  seasonFilter,
  eventFilter,
  search,
  onSeasonChange,
  onEventChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div
      className="sticky top-[64px] z-30 px-4 py-4"
      style={{
        background: "oklch(0.06 0.01 260 / 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid oklch(0.2 0.03 260 / 0.4)",
      }}
      data-ocid="filter-bar"
    >
      <div className="mx-auto max-w-7xl flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Season filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {SEASON_FILTERS.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => onSeasonChange(s)}
              className="px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105"
              style={
                seasonFilter === s
                  ? {
                      background: "oklch(0.65 0.2 180 / 0.2)",
                      border: "1px solid oklch(0.65 0.2 180)",
                      color: "oklch(0.65 0.2 180)",
                    }
                  : {
                      background: "oklch(0.12 0.02 260)",
                      border: "1px solid oklch(0.25 0.03 260 / 0.5)",
                      color: "oklch(0.55 0 0)",
                    }
              }
              data-ocid={`season-filter-${s.toLowerCase()}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div
          className="hidden sm:block h-6 w-px"
          style={{ background: "oklch(0.25 0.02 260 / 0.5)" }}
        />

        {/* Event type filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {EVENT_FILTERS.map((e) => (
            <button
              type="button"
              key={e}
              onClick={() => onEventChange(e)}
              className="px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105"
              style={
                eventFilter === e
                  ? {
                      background: "oklch(0.55 0.23 310 / 0.2)",
                      border: "1px solid oklch(0.55 0.23 310)",
                      color: "oklch(0.55 0.23 310)",
                    }
                  : {
                      background: "oklch(0.12 0.02 260)",
                      border: "1px solid oklch(0.25 0.03 260 / 0.5)",
                      color: "oklch(0.55 0 0)",
                    }
              }
              data-ocid={`event-filter-${e.toLowerCase().replace("/", "-")}`}
            >
              {e}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-0 sm:max-w-xs ml-auto">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "oklch(0.5 0 0)" }}
          />
          <input
            type="text"
            placeholder="Search festivals..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-full py-2 pl-8 pr-8 text-sm font-body outline-none transition-smooth"
            style={{
              background: "oklch(0.12 0.02 260)",
              border: "1px solid oklch(0.25 0.03 260 / 0.5)",
              color: "oklch(0.9 0 0)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.65 0.2 180 / 0.8)";
              e.currentTarget.style.boxShadow =
                "0 0 0 2px oklch(0.65 0.2 180 / 0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.25 0.03 260 / 0.5)";
              e.currentTarget.style.boxShadow = "none";
            }}
            data-ocid="festival-search"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-smooth hover:scale-110"
              style={{ color: "oklch(0.5 0 0)" }}
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FestivalsPage() {
  const { data, isLoading } = useFestivals();
  const { data: ticketUrls = {} } = useTicketUrls();
  const festivals = data ?? STATIC_FESTIVALS;

  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>("All");
  const [eventFilter, setEventFilter] = useState<EventFilter>("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<bigint | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleToggleExpand(id: bigint) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  function handleBuyTickets(festival: Festival) {
    const ticketUrl = ticketUrls[festival.id.toString()];
    const isActive = festival.status === FestivalStatus.Active;
    if (isActive && ticketUrl) {
      window.open(ticketUrl, "_blank", "noopener,noreferrer");
    } else {
      setShowModal(true);
    }
  }

  const filtered = useMemo(() => {
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
        return (
          f.name.toLowerCase().includes(q) ||
          f.location.toLowerCase().includes(q) ||
          f.country.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [festivals, seasonFilter, eventFilter, search]);

  const summerFestivals = useMemo(
    () => filtered.filter((f) => isSummer(f.season)),
    [filtered],
  );
  const winterFestivals = useMemo(
    () => filtered.filter((f) => !isSummer(f.season)),
    [filtered],
  );

  const hasResults = filtered.length > 0;
  const isFiltered =
    seasonFilter !== "All" || eventFilter !== "All" || search.trim() !== "";

  const uniqueCountries = useMemo(
    () => [...new Set(festivals.map((f) => f.country))].length,
    [festivals],
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.06 0.01 260)" }}
    >
      {/* ── Hero Banner ── */}
      <header
        className="relative overflow-hidden"
        style={{ background: "oklch(0.06 0.01 260)" }}
      >
        {/* Animated gradient bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, oklch(0.65 0.2 180 / 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, oklch(0.55 0.23 310 / 0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 0%, oklch(0.65 0.18 70 / 0.08) 0%, transparent 50%)",
          }}
        />
        {/* Animated orbs */}
        <div
          className="absolute top-8 left-1/4 h-40 w-40 rounded-full animate-pulse pointer-events-none"
          style={{
            background: "oklch(0.65 0.2 180 / 0.12)",
            filter: "blur(40px)",
            animationDuration: "4s",
          }}
        />
        <div
          className="absolute bottom-4 right-1/3 h-32 w-32 rounded-full animate-pulse pointer-events-none"
          style={{
            background: "oklch(0.55 0.23 310 / 0.15)",
            filter: "blur(30px)",
            animationDuration: "6s",
            animationDelay: "1s",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.65 0.2 180) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.2 180) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="mb-3 text-xs font-display font-bold uppercase tracking-[0.3em]"
              style={{ color: "oklch(0.55 0.23 310)" }}
            >
              We Are One · Official Event Calendar
            </p>
            <h1
              className="mb-4 text-5xl font-display font-black uppercase tracking-tight leading-none md:text-7xl"
              style={{
                color: "oklch(0.65 0.2 180)",
                textShadow:
                  "0 0 10px oklch(0.65 0.2 180 / 0.8), 0 0 20px oklch(0.65 0.2 180 / 0.4)",
              }}
            >
              Global
              <br />
              <span
                style={{
                  color: "oklch(0.75 0.23 310)",
                  textShadow:
                    "0 0 10px oklch(0.55 0.23 310 / 0.8), 0 0 20px oklch(0.55 0.23 310 / 0.4)",
                }}
              >
                Festivals
              </span>
            </h1>
            <p
              className="mt-6 max-w-xl mx-auto text-base md:text-lg leading-relaxed"
              style={{ color: "oklch(0.65 0 0)" }}
            >
              Summer &amp; Winter festivals across 6 continents — EDM, Rave,
              Club/Hotel and Family events
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { label: "Festivals", value: festivals.length.toString() },
              { label: "Countries", value: uniqueCountries.toString() },
              { label: "Seasons", value: "2" },
              { label: "Event Types", value: "4" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <span
                  className="text-3xl font-display font-black"
                  style={{
                    color: "oklch(0.65 0.18 70)",
                    textShadow:
                      "0 0 10px oklch(0.65 0.18 70 / 0.7), 0 0 20px oklch(0.65 0.18 70 / 0.3)",
                  }}
                >
                  {value}
                </span>
                <span
                  className="text-xs uppercase tracking-widest font-display"
                  style={{ color: "oklch(0.5 0 0)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* ── Filter Bar ── */}
      <FilterBar
        seasonFilter={seasonFilter}
        eventFilter={eventFilter}
        search={search}
        onSeasonChange={setSeasonFilter}
        onEventChange={setEventFilter}
        onSearchChange={setSearch}
      />

      {/* ── Content ── */}
      <main className="mx-auto max-w-7xl px-4 py-12 space-y-16">
        {/* Loading skeletons */}
        {isLoading && (
          <div className="space-y-12">
            <section className="space-y-6">
              <div
                className="h-8 w-64 rounded animate-pulse"
                style={{ background: "oklch(0.15 0.02 260)" }}
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <FestivalSkeleton />
                <FestivalSkeleton />
                <FestivalSkeleton />
              </div>
            </section>
            <section className="space-y-6">
              <div
                className="h-8 w-56 rounded animate-pulse"
                style={{ background: "oklch(0.15 0.02 260)" }}
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <FestivalSkeleton />
                <FestivalSkeleton />
              </div>
            </section>
          </div>
        )}

        {/* Festival sections */}
        {!isLoading && hasResults && (
          <>
            <FestivalSection
              title="Summer & International Festivals"
              accentColor="oklch(0.65 0.2 180)"
              glowStyle="glow-cyan"
              festivals={summerFestivals}
              expandedId={expandedId}
              onToggleExpand={handleToggleExpand}
              onBuyTickets={handleBuyTickets}
            />
            <FestivalSection
              title="Winter Festivals"
              accentColor="oklch(0.6 0.18 250)"
              glowStyle=""
              festivals={winterFestivals}
              expandedId={expandedId}
              onToggleExpand={handleToggleExpand}
              onBuyTickets={handleBuyTickets}
            />
          </>
        )}

        {/* Empty state */}
        {!isLoading && !hasResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="empty-state"
          >
            <div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: "oklch(0.65 0.2 180 / 0.1)",
                border: "2px solid oklch(0.65 0.2 180 / 0.3)",
              }}
            >
              <Music size={32} style={{ color: "oklch(0.65 0.2 180)" }} />
            </div>
            <h3
              className="mb-2 text-2xl font-display font-bold glow-cyan"
              style={{ color: "oklch(0.65 0.2 180)" }}
            >
              No Festivals Found
            </h3>
            <p className="mb-6 max-w-sm" style={{ color: "oklch(0.55 0 0)" }}>
              {isFiltered
                ? "No festivals match your current filters. Try adjusting your search."
                : "There are no festivals to display right now."}
            </p>
            {isFiltered && (
              <button
                type="button"
                onClick={() => {
                  setSeasonFilter("All");
                  setEventFilter("All");
                  setSearch("");
                }}
                className="rounded-xl px-6 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105"
                style={{
                  background: "oklch(0.65 0.2 180 / 0.1)",
                  border: "1px solid oklch(0.65 0.2 180 / 0.5)",
                  color: "oklch(0.65 0.2 180)",
                }}
                data-ocid="clear-filters-btn"
              >
                Clear All Filters
              </button>
            )}
          </motion.div>
        )}
      </main>

      <ComingSoonModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

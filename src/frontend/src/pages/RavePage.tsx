import {
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Gem,
  MapPin,
  Music2,
  Tag,
  Ticket,
  Youtube,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  useCategories,
  useFestivals,
  useRaveEvents,
  useRaveSets,
  useSponsors,
} from "../hooks/useBackend";
import type { RaveEvent, RaveSet, Sponsor } from "../types/festival";

// ── Laser beam decoration ────────────────────────────────────────────────────

function LaserBeams() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {[
        { deg: -35, color: "oklch(0.65 0.2 180)", delay: "0s", opacity: 0.07 },
        {
          deg: 15,
          color: "oklch(0.55 0.23 310)",
          delay: "0.6s",
          opacity: 0.06,
        },
        {
          deg: -55,
          color: "oklch(0.65 0.18 70)",
          delay: "1.2s",
          opacity: 0.05,
        },
        { deg: 45, color: "oklch(0.65 0.2 180)", delay: "0.3s", opacity: 0.06 },
      ].map((beam) => (
        <div
          key={beam.deg}
          className="absolute"
          style={{
            top: "0",
            left: "50%",
            width: "3px",
            height: "100%",
            background: `linear-gradient(180deg, ${beam.color} 0%, transparent 70%)`,
            opacity: beam.opacity,
            transform: `rotate(${beam.deg}deg)`,
            transformOrigin: "top center",
            animation: "pulse 3s ease-in-out infinite",
            animationDelay: beam.delay,
          }}
        />
      ))}
    </div>
  );
}

// ── Pulse rings ──────────────────────────────────────────────────────────────

function PulseRings() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${i * 160}px`,
            height: `${i * 160}px`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: `1px solid oklch(0.65 0.2 180 / ${0.15 - i * 0.03})`,
            animation: `pulse ${2.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Headline Sponsor Strip ────────────────────────────────────────────────────

function HeadlineSponsorStrip({ sponsors }: { sponsors: Sponsor[] }) {
  if (!sponsors.length) return null;
  return (
    <section
      className="relative overflow-hidden py-6"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.09 0.04 200 / 0.6), oklch(0.07 0.03 220 / 0.8), oklch(0.09 0.04 200 / 0.6))",
        borderTop: "1px solid oklch(0.92 0.04 200 / 0.15)",
        borderBottom: "1px solid oklch(0.92 0.04 200 / 0.15)",
      }}
      data-ocid="rave-headline-sponsors"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.92 0.04 200 / 0.04) 0%, transparent 70%)",
        }}
      />
      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <Gem
              size={13}
              style={{
                color: "oklch(0.92 0.04 200)",
                filter: "drop-shadow(0 0 6px oklch(0.92 0.04 200 / 0.8))",
              }}
            />
            <span
              className="text-xs font-display font-black uppercase tracking-[0.25em] whitespace-nowrap"
              style={{
                color: "oklch(0.92 0.04 200)",
                textShadow: "0 0 10px oklch(0.92 0.04 200 / 0.7)",
              }}
            >
              Headline Sponsor
            </span>
            <Gem
              size={13}
              style={{
                color: "oklch(0.92 0.04 200)",
                filter: "drop-shadow(0 0 6px oklch(0.92 0.04 200 / 0.8))",
              }}
            />
          </div>
          <div
            className="hidden sm:block h-px flex-shrink-0 w-6"
            style={{ background: "oklch(0.92 0.04 200 / 0.3)" }}
          />
          <div className="flex flex-wrap items-center justify-center gap-4">
            {sponsors.map((s) => (
              <a
                key={s.id.toString()}
                href={s.websiteUrl || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl px-5 py-2.5 transition-smooth hover:scale-105"
                style={{
                  background: "oklch(0.12 0.04 200 / 0.5)",
                  border: "1px solid oklch(0.92 0.04 200 / 0.25)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.92 0.04 200 / 0.6)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 20px oklch(0.92 0.04 200 / 0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.92 0.04 200 / 0.25)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
                data-ocid={`rave-headline-sponsor-${s.id.toString()}`}
              >
                {s.logoUrl ? (
                  <img
                    src={s.logoUrl}
                    alt={s.name}
                    className="h-8 w-16 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span
                    className="font-display font-black uppercase tracking-wider text-sm"
                    style={{ color: "oklch(0.92 0.04 200)" }}
                  >
                    {s.name}
                  </span>
                )}
                {s.websiteUrl && (
                  <ExternalLink
                    size={11}
                    className="opacity-0 group-hover:opacity-100 transition-smooth"
                    style={{ color: "oklch(0.92 0.04 200)" }}
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Lineup section (fetched per event) ───────────────────────────────────────

function RaveLineup({ eventId }: { eventId: bigint }) {
  const { data: sets = [], isLoading } = useRaveSets(eventId);

  if (isLoading) {
    return (
      <div className="px-5 pb-5">
        <div className="animate-pulse space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-8 rounded-lg"
              style={{ background: "oklch(0.18 0.025 260)" }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (sets.length === 0) {
    return (
      <div className="px-5 pb-5">
        <p
          className="text-xs font-display uppercase tracking-wider text-center py-4"
          style={{ color: "oklch(0.4 0 0)" }}
        >
          Lineup to be announced
        </p>
      </div>
    );
  }

  // Group by nightLabel, sort within group by startTime
  const groups = sets.reduce<Record<string, RaveSet[]>>((acc, set) => {
    const key = set.nightLabel || "Main Stage";
    if (!acc[key]) acc[key] = [];
    acc[key].push(set);
    return acc;
  }, {});
  for (const g of Object.values(groups)) {
    g.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  return (
    <div className="px-5 pb-5 flex flex-col gap-4">
      {Object.entries(groups).map(([label, groupSets]) => (
        <div key={label}>
          <div
            className="mb-2 text-xs font-display font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.65 0.2 180)" }}
          >
            {label}
          </div>
          <div className="flex flex-col gap-1">
            {groupSets.map((set) => (
              <div
                key={set.id.toString()}
                className="flex items-center gap-3 rounded-xl px-3 py-2"
                style={{ background: "oklch(0.14 0.025 260 / 0.6)" }}
              >
                <div className="flex-1 min-w-0">
                  <span
                    className="font-display font-bold text-sm truncate block"
                    style={{ color: "oklch(0.88 0 0)" }}
                  >
                    {set.artistName}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="text-xs font-body"
                      style={{ color: "oklch(0.65 0.2 180 / 0.8)" }}
                    >
                      {set.startTime}–{set.endTime}
                    </span>
                    {set.stage && (
                      <>
                        <span style={{ color: "oklch(0.35 0 0)" }}>·</span>
                        <span
                          className="text-xs font-body truncate"
                          style={{ color: "oklch(0.5 0 0)" }}
                        >
                          {set.stage}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {set.youtubeUrl && (
                  <a
                    href={set.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 shrink-0"
                    style={{
                      background: "oklch(0.55 0.22 25 / 0.15)",
                      color: "oklch(0.72 0.2 25)",
                      border: "1px solid oklch(0.55 0.22 25 / 0.3)",
                    }}
                    aria-label={`Watch ${set.artistName} on YouTube`}
                    data-ocid={`rave-set-youtube-${set.id.toString()}`}
                  >
                    <Youtube size={12} />
                    Watch
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Event Card ───────────────────────────────────────────────────────────────

interface RaveEventCardProps {
  event: RaveEvent;
  festivalName?: string;
  categoryName?: string;
}

function RaveEventCard({
  event,
  festivalName,
  categoryName,
}: RaveEventCardProps) {
  const [lineupOpen, setLineupOpen] = useState(false);

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl transition-smooth"
      style={{
        background: "oklch(0.11 0.025 260)",
        border: "1px solid oklch(0.22 0.025 260 / 0.6)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.65 0.2 180 / 0.55)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 30px oklch(0.65 0.2 180 / 0.12), 0 8px 32px oklch(0 0 0 / 0.4)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.22 0.025 260 / 0.6)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
      data-ocid={`rave-card-${event.id.toString()}`}
    >
      {/* Image */}
      <div
        className="relative h-52 w-full shrink-0 overflow-hidden"
        style={{ background: "oklch(0.15 0.025 260)" }}
      >
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.name}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Zap size={48} style={{ color: "oklch(0.65 0.2 180 / 0.2)" }} />
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.11 0.025 260) 0%, transparent 50%)",
          }}
        />
        {event.eventType && (
          <span
            className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-display font-bold uppercase tracking-wider"
            style={{
              background: "oklch(0.65 0.2 180 / 0.18)",
              color: "oklch(0.65 0.2 180)",
              border: "1px solid oklch(0.65 0.2 180 / 0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            {event.eventType}
          </span>
        )}
        {event.isStandalone && (
          <span
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-display font-bold uppercase tracking-wider"
            style={{
              background: "oklch(0.55 0.23 310 / 0.18)",
              color: "oklch(0.55 0.23 310)",
              border: "1px solid oklch(0.55 0.23 310 / 0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            Standalone
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3
          className="font-display font-bold uppercase tracking-wide leading-tight"
          style={{ color: "oklch(0.92 0 0)" }}
        >
          {event.name}
        </h3>
        {event.description && (
          <p
            className="line-clamp-2 font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.6 0 0)" }}
          >
            {event.description}
          </p>
        )}

        <div className="flex flex-col gap-2">
          {event.date && (
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "oklch(0.65 0.2 180)" }}
            >
              <Calendar size={12} />
              <span className="font-display uppercase tracking-wider">
                {event.date}
              </span>
            </div>
          )}
          {event.location && (
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "oklch(0.55 0 0)" }}
            >
              <MapPin size={12} />
              <span className="font-body truncate">{event.location}</span>
            </div>
          )}
          {festivalName && (
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "oklch(0.65 0.18 70)" }}
            >
              <Music2 size={12} />
              <span className="font-body truncate">{festivalName}</span>
            </div>
          )}
          {categoryName && (
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "oklch(0.55 0.23 310)" }}
            >
              <Tag size={12} />
              <span className="font-body truncate">{categoryName}</span>
            </div>
          )}
        </div>

        {/* Buy Tickets + Lineup toggle */}
        <div className="mt-auto flex flex-col gap-2 pt-1">
          {event.ticketUrl ? (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.2 180 / 0.9), oklch(0.55 0.2 200 / 0.9))",
                color: "oklch(0.08 0 0)",
                boxShadow: "0 0 20px oklch(0.65 0.2 180 / 0.3)",
                textDecoration: "none",
              }}
              data-ocid={`rave-buy-tickets-${event.id.toString()}`}
            >
              <Ticket size={14} />
              Buy Tickets
            </a>
          ) : (
            <div
              className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-display font-bold uppercase tracking-wider"
              style={{
                background: "oklch(0.15 0.02 260)",
                color: "oklch(0.4 0 0)",
                border: "1px solid oklch(0.22 0.02 260)",
              }}
            >
              <Ticket size={14} />
              Coming Soon
            </div>
          )}

          <button
            type="button"
            onClick={() => setLineupOpen((o) => !o)}
            className="flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:opacity-80"
            style={{
              background: "oklch(0.15 0.025 260)",
              color: lineupOpen ? "oklch(0.65 0.2 180)" : "oklch(0.5 0 0)",
              border: `1px solid ${lineupOpen ? "oklch(0.65 0.2 180 / 0.4)" : "oklch(0.22 0.02 260)"}`,
            }}
            data-ocid={`rave-lineup-toggle-${event.id.toString()}`}
          >
            <Music2 size={12} />
            {lineupOpen ? "Hide Lineup" : "View Lineup"}
            {lineupOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>

      {/* Lineup drawer */}
      {lineupOpen && (
        <div
          style={{
            borderTop: "1px solid oklch(0.22 0.025 260 / 0.5)",
          }}
        >
          <RaveLineup eventId={event.id} />
        </div>
      )}
    </article>
  );
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => (
        <div
          key={id}
          className="animate-pulse overflow-hidden rounded-2xl"
          style={{ background: "oklch(0.11 0.025 260)" }}
        >
          <div
            className="h-52 w-full"
            style={{ background: "oklch(0.16 0.025 260)" }}
          />
          <div className="p-5 flex flex-col gap-3">
            <div
              className="h-5 w-3/4 rounded-lg"
              style={{ background: "oklch(0.18 0.025 260)" }}
            />
            <div
              className="h-4 w-full rounded-lg"
              style={{ background: "oklch(0.16 0.025 260)" }}
            />
            <div
              className="h-4 w-2/3 rounded-lg"
              style={{ background: "oklch(0.16 0.025 260)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RavePage() {
  const { data: events = [], isLoading } = useRaveEvents();
  const { data: festivals = [] } = useFestivals();
  const { data: categories = [] } = useCategories();
  const { data: allSponsors = [] } = useSponsors();
  const [filterFestival, setFilterFestival] = useState<string>("all");

  const headlineSponsors = allSponsors.filter(
    (s: Sponsor) => s.tier.toLowerCase() === "headline",
  );

  const festivalsWithRave = festivals.filter((f) =>
    events.some(
      (e) =>
        e.festivalId !== undefined &&
        e.festivalId !== null &&
        e.festivalId === f.id,
    ),
  );

  const filtered =
    filterFestival === "all"
      ? events
      : filterFestival === "standalone"
        ? events.filter((e) => e.isStandalone)
        : events.filter((e) => e.festivalId?.toString() === filterFestival);

  function getFestivalName(festivalId?: bigint): string | undefined {
    if (!festivalId) return undefined;
    return festivals.find((f) => f.id === festivalId)?.name;
  }

  function getCategoryName(categoryId?: bigint): string | undefined {
    if (!categoryId) return undefined;
    return categories.find((c) => c.id === categoryId)?.name;
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.02 260)" }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden py-28 text-center"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.11 0.045 285) 0%, oklch(0.08 0.02 260) 100%)",
        }}
      >
        <LaserBeams />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.65 0.2 180 / 0.2) 0%, transparent 70%)",
          }}
        />
        <PulseRings />

        <div className="container relative mx-auto max-w-3xl px-4">
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: "oklch(0.65 0.2 180 / 0.1)",
              border: "2px solid oklch(0.65 0.2 180 / 0.6)",
              boxShadow:
                "0 0 40px oklch(0.65 0.2 180 / 0.35), 0 0 80px oklch(0.65 0.2 180 / 0.1)",
            }}
          >
            <Zap
              size={36}
              style={{ color: "oklch(0.65 0.2 180)" }}
              className="glow-cyan"
            />
          </div>

          <h1
            className="mb-3 font-display text-7xl font-bold uppercase tracking-widest glow-cyan"
            style={{ color: "oklch(0.65 0.2 180)" }}
          >
            The Rave
          </h1>
          <p
            className="mb-5 font-display text-sm uppercase tracking-[0.4em]"
            style={{ color: "oklch(0.55 0.23 310)" }}
          >
            Pre-Festival Warmup Events
          </p>
          <p
            className="mx-auto max-w-xl font-body text-lg leading-relaxed"
            style={{ color: "oklch(0.68 0 0)" }}
          >
            The party starts before the festival does. Hand-picked underground
            rave events that charge the atmosphere before the main stage
            ignites.
          </p>

          {!isLoading && events.length > 0 && (
            <div className="mx-auto mt-8 flex items-center justify-center gap-8">
              {[
                { label: "Events", value: events.length },
                {
                  label: "Standalone",
                  value: events.filter((e) => e.isStandalone).length,
                },
                {
                  label: "Festival-linked",
                  value: events.filter((e) => !e.isStandalone).length,
                },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div
                    className="font-display text-3xl font-bold glow-cyan"
                    style={{ color: "oklch(0.65 0.2 180)" }}
                  >
                    {value}
                  </div>
                  <div
                    className="font-display text-xs uppercase tracking-widest"
                    style={{ color: "oklch(0.45 0 0)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Headline Sponsor Strip */}
      <HeadlineSponsorStrip sponsors={headlineSponsors} />

      {/* Filter bar */}
      {!isLoading && events.length > 0 && (
        <section
          className="sticky top-0 z-10 border-b"
          style={{
            background: "oklch(0.09 0.02 260 / 0.95)",
            borderColor: "oklch(0.2 0.02 260)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="container mx-auto max-w-6xl overflow-x-auto px-4 py-3">
            <div className="flex items-center gap-2 min-w-max">
              <span
                className="font-display text-xs uppercase tracking-wider mr-2"
                style={{ color: "oklch(0.4 0 0)" }}
              >
                Filter:
              </span>
              {[
                { value: "all", label: "All Events" },
                { value: "standalone", label: "Standalone" },
                ...festivalsWithRave.map((f) => ({
                  value: f.id.toString(),
                  label: f.name,
                })),
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFilterFestival(opt.value)}
                  className="rounded-full px-4 py-1.5 text-xs font-display font-bold uppercase tracking-wider transition-smooth"
                  style={
                    filterFestival === opt.value
                      ? {
                          background: "oklch(0.65 0.2 180 / 0.2)",
                          color: "oklch(0.65 0.2 180)",
                          border: "1px solid oklch(0.65 0.2 180 / 0.5)",
                        }
                      : {
                          background: "oklch(0.13 0.02 260)",
                          color: "oklch(0.5 0 0)",
                          border: "1px solid oklch(0.2 0.02 260)",
                        }
                  }
                  data-ocid={`rave-filter-${opt.value}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events grid */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        {isLoading ? (
          <SkeletonGrid />
        ) : filtered.length === 0 && events.length === 0 ? (
          <div
            className="flex flex-col items-center gap-5 rounded-2xl py-24 text-center"
            style={{
              background: "oklch(0.11 0.025 260)",
              border: "1px solid oklch(0.22 0.025 260 / 0.5)",
            }}
            data-ocid="rave-empty"
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: "oklch(0.65 0.2 180 / 0.08)",
                border: "1px solid oklch(0.65 0.2 180 / 0.2)",
              }}
            >
              <Zap size={36} style={{ color: "oklch(0.65 0.2 180 / 0.5)" }} />
            </div>
            <div>
              <p
                className="mb-2 font-display text-xl font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.65 0.2 180 / 0.7)" }}
              >
                Rave Events Coming Soon
              </p>
              <p
                className="max-w-sm font-body text-sm"
                style={{ color: "oklch(0.42 0 0)" }}
              >
                Pre-festival rave events will be announced in the lead-up to
                each WE ARE ONE festival. Stay tuned.
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center" data-ocid="rave-filter-empty">
            <p
              className="font-display text-sm uppercase tracking-widest"
              style={{ color: "oklch(0.4 0 0)" }}
            >
              No events match this filter
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <RaveEventCard
                key={event.id.toString()}
                event={event}
                festivalName={getFestivalName(event.festivalId)}
                categoryName={getCategoryName(event.categoryId)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

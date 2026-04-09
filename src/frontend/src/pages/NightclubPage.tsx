import { Calendar, Headphones, MapPin, Moon, Music2, Tag } from "lucide-react";
import { useState } from "react";
import {
  useCategories,
  useFestivals,
  useNightclubEvents,
} from "../hooks/useBackend";
import type { NightclubEvent } from "../types/festival";

// ── Ambient orbs ─────────────────────────────────────────────────────────────

function AmbientOrbs() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{
          width: "600px",
          height: "600px",
          top: "-200px",
          left: "20%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.55 0.23 310 / 0.08) 0%, transparent 70%)",
          animation: "pulse 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "400px",
          height: "400px",
          top: "-100px",
          right: "15%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.65 0.2 180 / 0.06) 0%, transparent 70%)",
          animation: "pulse 8s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />
      {/* Club light sweeps */}
      {[
        { deg: 20, color: "oklch(0.55 0.23 310)", delay: "0s" },
        { deg: -20, color: "oklch(0.65 0.2 180)", delay: "1s" },
        { deg: 50, color: "oklch(0.65 0.18 70)", delay: "2s" },
      ].map((beam) => (
        <div
          key={beam.deg}
          className="absolute"
          style={{
            top: 0,
            left: "50%",
            width: "2px",
            height: "100%",
            background: `linear-gradient(180deg, ${beam.color} 0%, transparent 60%)`,
            opacity: 0.05,
            transform: `rotate(${beam.deg}deg)`,
            transformOrigin: "top center",
            animation: "pulse 4s ease-in-out infinite",
            animationDelay: beam.delay,
          }}
        />
      ))}
    </div>
  );
}

// ── Event Card ───────────────────────────────────────────────────────────────

interface NightclubEventCardProps {
  event: NightclubEvent;
  festivalName?: string;
  categoryName?: string;
}

function NightclubEventCard({
  event,
  festivalName,
  categoryName,
}: NightclubEventCardProps) {
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl transition-smooth"
      style={{
        background: "oklch(0.10 0.03 300)",
        border: "1px solid oklch(0.22 0.03 300 / 0.6)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.55 0.23 310 / 0.55)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 30px oklch(0.55 0.23 310 / 0.14), 0 8px 32px oklch(0 0 0 / 0.4)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.22 0.03 300 / 0.6)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
      data-ocid={`nightclub-card-${event.id.toString()}`}
    >
      {/* Image */}
      <div
        className="relative h-52 w-full shrink-0 overflow-hidden"
        style={{ background: "oklch(0.14 0.03 300)" }}
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
            <Moon size={48} style={{ color: "oklch(0.55 0.23 310 / 0.2)" }} />
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.10 0.03 300) 0%, transparent 50%)",
          }}
        />
        {event.isStandalone && (
          <span
            className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-display font-bold uppercase tracking-wider"
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

        <div className="mt-auto flex flex-col gap-2">
          {event.date && (
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "oklch(0.55 0.23 310)" }}
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
              style={{ color: "oklch(0.65 0.2 180)" }}
            >
              <Tag size={12} />
              <span className="font-body truncate">{categoryName}</span>
            </div>
          )}
        </div>
      </div>
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
          style={{ background: "oklch(0.10 0.03 300)" }}
        >
          <div
            className="h-52 w-full"
            style={{ background: "oklch(0.15 0.03 300)" }}
          />
          <div className="p-5 flex flex-col gap-3">
            <div
              className="h-5 w-3/4 rounded-lg"
              style={{ background: "oklch(0.17 0.03 300)" }}
            />
            <div
              className="h-4 w-full rounded-lg"
              style={{ background: "oklch(0.15 0.03 300)" }}
            />
            <div
              className="h-4 w-2/3 rounded-lg"
              style={{ background: "oklch(0.15 0.03 300)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NightclubPage() {
  const { data: events = [], isLoading } = useNightclubEvents();
  const { data: festivals = [] } = useFestivals();
  const { data: categories = [] } = useCategories();
  const [filterFestival, setFilterFestival] = useState<string>("all");

  const festivalsWithNightclub = festivals.filter((f) =>
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
      style={{ background: "oklch(0.07 0.025 290)" }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden py-28 text-center"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.10 0.05 315) 0%, oklch(0.07 0.025 290) 100%)",
        }}
      >
        <AmbientOrbs />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.55 0.23 310 / 0.22) 0%, transparent 70%)",
          }}
        />

        <div className="container relative mx-auto max-w-3xl px-4">
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: "oklch(0.55 0.23 310 / 0.1)",
              border: "2px solid oklch(0.55 0.23 310 / 0.6)",
              boxShadow:
                "0 0 40px oklch(0.55 0.23 310 / 0.35), 0 0 80px oklch(0.55 0.23 310 / 0.1)",
            }}
          >
            <Moon
              size={36}
              style={{ color: "oklch(0.55 0.23 310)" }}
              className="glow-magenta"
            />
          </div>

          <h1
            className="mb-3 font-display text-7xl font-bold uppercase tracking-widest glow-magenta"
            style={{ color: "oklch(0.55 0.23 310)" }}
          >
            Nightclub
          </h1>
          <p
            className="mb-5 font-display text-sm uppercase tracking-[0.4em]"
            style={{ color: "oklch(0.65 0.18 70)" }}
          >
            After-Festival Afterparty Events
          </p>
          <p
            className="mx-auto max-w-xl font-body text-lg leading-relaxed"
            style={{ color: "oklch(0.65 0 0)" }}
          >
            The festival ends — the night never does. Keep the energy going with
            exclusive after-party club nights at the finest venues around each
            WE ARE ONE festival.
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
                  label: "After-Festival",
                  value: events.filter((e) => !e.isStandalone).length,
                },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div
                    className="font-display text-3xl font-bold glow-magenta"
                    style={{ color: "oklch(0.55 0.23 310)" }}
                  >
                    {value}
                  </div>
                  <div
                    className="font-display text-xs uppercase tracking-widest"
                    style={{ color: "oklch(0.4 0 0)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Filter bar */}
      {!isLoading && events.length > 0 && (
        <section
          className="sticky top-0 z-10 border-b"
          style={{
            background: "oklch(0.08 0.025 290 / 0.95)",
            borderColor: "oklch(0.18 0.03 290)",
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
                ...festivalsWithNightclub.map((f) => ({
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
                          background: "oklch(0.55 0.23 310 / 0.18)",
                          color: "oklch(0.55 0.23 310)",
                          border: "1px solid oklch(0.55 0.23 310 / 0.5)",
                        }
                      : {
                          background: "oklch(0.12 0.03 300)",
                          color: "oklch(0.5 0 0)",
                          border: "1px solid oklch(0.18 0.03 300)",
                        }
                  }
                  data-ocid={`nightclub-filter-${opt.value}`}
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
              background: "oklch(0.10 0.03 300)",
              border: "1px solid oklch(0.22 0.03 300 / 0.5)",
            }}
            data-ocid="nightclub-empty"
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: "oklch(0.55 0.23 310 / 0.08)",
                border: "1px solid oklch(0.55 0.23 310 / 0.2)",
              }}
            >
              <Headphones
                size={36}
                style={{ color: "oklch(0.55 0.23 310 / 0.5)" }}
              />
            </div>
            <div>
              <p
                className="mb-2 font-display text-xl font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.55 0.23 310 / 0.7)" }}
              >
                Afterparty Events Coming Soon
              </p>
              <p
                className="max-w-sm font-body text-sm"
                style={{ color: "oklch(0.42 0 0)" }}
              >
                Official WE ARE ONE afterparty club nights will be announced
                alongside each festival. Keep an eye out.
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center" data-ocid="nightclub-filter-empty">
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
              <NightclubEventCard
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

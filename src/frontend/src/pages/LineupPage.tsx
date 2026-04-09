import { useParams } from "@tanstack/react-router";
import { Clock, Mic2, Music, Speaker } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { useFestivals, useLineup } from "../hooks/useBackend";
import type { LineupEntry } from "../types/festival";

// ── Constants ─────────────────────────────────────────────────────────────────

const WEEKEND_ORDER = ["Weekend 1", "Weekend 2", "Both"] as const;
const DAY_ORDER = ["Friday", "Saturday", "Sunday", "Monday"] as const;

// Colour palettes
const WEEKEND_COLORS: Record<string, { primary: string; accent: string }> = {
  "Weekend 1": {
    primary: "oklch(0.65 0.2 180)",
    accent: "oklch(0.65 0.2 180 / 0.15)",
  },
  "Weekend 2": {
    primary: "oklch(0.65 0.23 310)",
    accent: "oklch(0.65 0.23 310 / 0.15)",
  },
  Both: {
    primary: "oklch(0.65 0.18 70)",
    accent: "oklch(0.65 0.18 70 / 0.15)",
  },
  "": { primary: "oklch(0.6 0.18 250)", accent: "oklch(0.6 0.18 250 / 0.12)" },
};
const DAY_COLORS = [
  "oklch(0.65 0.2 180)",
  "oklch(0.75 0.18 140)",
  "oklch(0.65 0.23 310)",
  "oklch(0.65 0.18 70)",
];

const STAGE_COLORS = [
  "oklch(0.65 0.2 180)",
  "oklch(0.55 0.23 310)",
  "oklch(0.65 0.18 70)",
  "oklch(0.6 0.18 250)",
  "oklch(0.55 0.18 145)",
];

// ── Grouping helpers ──────────────────────────────────────────────────────────

interface StructuredLineup {
  weekend: string;
  days: { day: string; stages: { stage: string; entries: LineupEntry[] }[] }[];
}

function hasWeekendOrDay(entries: LineupEntry[]): boolean {
  return entries.some((e) => e.weekend || e.day);
}

function groupStructured(entries: LineupEntry[]): StructuredLineup[] {
  // Collect all weekend values
  const weekendSet = new Set(entries.map((e) => e.weekend ?? ""));
  const orderedWeekends = [
    ...WEEKEND_ORDER.filter((w) => weekendSet.has(w)),
    ...(weekendSet.has("") ? [""] : []),
  ];

  return orderedWeekends.map((weekend) => {
    const weekendEntries = entries.filter((e) => (e.weekend ?? "") === weekend);

    // Collect all day values within this weekend
    const daySet = new Set(weekendEntries.map((e) => e.day ?? ""));
    const orderedDays = [
      ...DAY_ORDER.filter((d) => daySet.has(d)),
      ...(daySet.has("") ? [""] : []),
    ];

    const days = orderedDays.map((day) => {
      const dayEntries = weekendEntries.filter((e) => (e.day ?? "") === day);
      const stageMap: Record<string, LineupEntry[]> = {};
      for (const e of dayEntries) {
        if (!stageMap[e.stage]) stageMap[e.stage] = [];
        stageMap[e.stage].push(e);
      }
      // Sort each stage by time
      const stages = Object.entries(stageMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([stage, ents]) => ({
          stage,
          entries: [...ents].sort((a, b) =>
            a.timeSlot.localeCompare(b.timeSlot),
          ),
        }));
      return { day, stages };
    });

    return { weekend, days };
  });
}

function groupByStage(entries: LineupEntry[]): Record<string, LineupEntry[]> {
  const map: Record<string, LineupEntry[]> = {};
  for (const e of entries) {
    if (!map[e.stage]) map[e.stage] = [];
    map[e.stage].push(e);
  }
  for (const stage of Object.keys(map)) {
    map[stage].sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
  }
  return map;
}

// ── Artist Row ────────────────────────────────────────────────────────────────

function ArtistRow({ entry, index }: { entry: LineupEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="flex items-center gap-4 rounded-xl px-4 py-3 transition-smooth"
      style={{
        background: "oklch(0.12 0.02 260)",
        border: "1px solid oklch(0.25 0.03 260 / 0.4)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.65 0.2 180 / 0.4)";
        (e.currentTarget as HTMLElement).style.background =
          "oklch(0.14 0.04 260)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.25 0.03 260 / 0.4)";
        (e.currentTarget as HTMLElement).style.background =
          "oklch(0.12 0.02 260)";
      }}
      data-ocid="lineup-artist-row"
    >
      <span
        className="w-7 shrink-0 text-xs font-display font-bold text-center"
        style={{ color: "oklch(0.4 0 0)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{
          background: "oklch(0.65 0.2 180 / 0.08)",
          border: "1px solid oklch(0.65 0.2 180 / 0.3)",
        }}
      >
        <Mic2 size={14} style={{ color: "oklch(0.65 0.2 180)" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="font-display font-bold truncate"
          style={{ color: "oklch(0.9 0 0)" }}
        >
          {entry.artistName}
        </p>
      </div>
      <div
        className="flex items-center gap-1.5 shrink-0 rounded-full px-3 py-1 text-xs font-display font-bold"
        style={{
          background: "oklch(0.65 0.18 70 / 0.08)",
          border: "1px solid oklch(0.65 0.18 70 / 0.3)",
          color: "oklch(0.65 0.18 70)",
        }}
      >
        <Clock size={11} />
        {entry.timeSlot}
      </div>
    </motion.div>
  );
}

// ── Stage Card ────────────────────────────────────────────────────────────────

function StageCard({
  stage,
  entries,
  stageIndex,
}: {
  stage: string;
  entries: LineupEntry[];
  stageIndex: number;
}) {
  const color = STAGE_COLORS[stageIndex % STAGE_COLORS.length];
  const alphaColor = (a: number) => color.replace(")", ` / ${a})`);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: stageIndex * 0.1 }}
      className="flex flex-col gap-4"
      data-ocid="lineup-stage-section"
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: alphaColor(0.1),
            border: `1px solid ${alphaColor(0.4)}`,
          }}
        >
          <Speaker size={18} style={{ color }} />
        </div>
        <h2
          className="text-xl font-display font-bold uppercase tracking-wider"
          style={{
            color,
            textShadow: `0 0 10px ${alphaColor(0.7)}, 0 0 20px ${alphaColor(0.3)}`,
          }}
        >
          {stage}
        </h2>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${alphaColor(0.4)}, transparent)`,
          }}
        />
        <span
          className="text-xs font-display font-bold uppercase tracking-widest rounded-full px-3 py-1"
          style={{
            background: alphaColor(0.08),
            border: `1px solid ${alphaColor(0.3)}`,
            color,
          }}
        >
          {entries.length} artists
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {entries.map((entry, i) => (
          <ArtistRow key={entry.id.toString()} entry={entry} index={i} />
        ))}
      </div>
    </motion.section>
  );
}

// ── Day Section ───────────────────────────────────────────────────────────────

function DaySection({
  day,
  stages,
  dayIndex,
}: {
  day: string;
  stages: { stage: string; entries: LineupEntry[] }[];
  dayIndex: number;
}) {
  const color = DAY_COLORS[dayIndex % DAY_COLORS.length];
  const label = day || "All Days";

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: dayIndex * 0.08 }}
      className="flex flex-col gap-6 pl-4"
      style={{ borderLeft: `2px solid ${color.replace(")", " / 0.35)")}` }}
      data-ocid="lineup-day-section"
    >
      {/* Day heading */}
      <div className="flex items-center gap-3 -ml-4">
        <div
          className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full text-xs font-display font-black"
          style={{
            background: color.replace(")", " / 0.12)"),
            border: `1px solid ${color.replace(")", " / 0.4)")}`,
            color,
          }}
        >
          {label.slice(0, 2).toUpperCase()}
        </div>
        <h3
          className="text-lg font-display font-bold uppercase tracking-widest"
          style={{
            color,
            textShadow: `0 0 8px ${color.replace(")", " / 0.6)")}`,
          }}
        >
          {label}
        </h3>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${color.replace(")", " / 0.3)")}, transparent)`,
          }}
        />
      </div>

      {/* Stages within day */}
      <div className="flex flex-col gap-10">
        {stages.map(({ stage, entries }, si) => (
          <StageCard
            key={stage}
            stage={stage}
            entries={entries}
            stageIndex={si}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Weekend Section ───────────────────────────────────────────────────────────

function WeekendSection({
  weekend,
  days,
  weekendIndex,
}: {
  weekend: string;
  days: { day: string; stages: { stage: string; entries: LineupEntry[] }[] }[];
  weekendIndex: number;
}) {
  const palette = WEEKEND_COLORS[weekend] ?? WEEKEND_COLORS[""];
  const label = weekend || "All Weekends";
  const totalArtists = days.reduce(
    (sum, d) => sum + d.stages.reduce((s, st) => s + st.entries.length, 0),
    0,
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: weekendIndex * 0.12 }}
      className="flex flex-col gap-8"
      data-ocid="lineup-weekend-section"
    >
      {/* Weekend banner */}
      <div
        className="relative overflow-hidden rounded-2xl px-6 py-5"
        style={{
          background: `linear-gradient(135deg, ${palette.accent}, oklch(0.08 0.02 260))`,
          border: `1px solid ${palette.primary.replace(")", " / 0.25)")}`,
          boxShadow: `0 0 40px ${palette.primary.replace(")", " / 0.1)")}`,
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute -right-12 -top-12 h-40 w-40 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${palette.primary.replace(")", " / 0.15)")}, transparent 70%)`,
          }}
        />
        <div className="relative flex items-center justify-between flex-wrap gap-3">
          <div>
            <p
              className="text-xs font-display font-bold uppercase tracking-[0.3em] mb-1"
              style={{ color: palette.primary.replace(")", " / 0.7)") }}
            >
              We Are One
            </p>
            <h2
              className="text-3xl font-display font-black uppercase tracking-tight"
              style={{
                color: palette.primary,
                textShadow: `0 0 16px ${palette.primary.replace(")", " / 0.7)")}, 0 0 30px ${palette.primary.replace(")", " / 0.3)")}`,
              }}
            >
              {label}
            </h2>
          </div>
          <span
            className="text-xs font-display font-bold uppercase tracking-widest rounded-full px-4 py-2"
            style={{
              background: palette.primary.replace(")", " / 0.1)"),
              border: `1px solid ${palette.primary.replace(")", " / 0.3)")}`,
              color: palette.primary,
            }}
          >
            {totalArtists} artists
          </span>
        </div>
      </div>

      {/* Days within weekend */}
      <div className="flex flex-col gap-10">
        {days.map(({ day, stages }, di) => (
          <DaySection
            key={day || "__all__"}
            day={day}
            stages={stages}
            dayIndex={di}
          />
        ))}
      </div>
    </motion.section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LineupPage() {
  const { id } = useParams({ from: "/festivals/$id/lineup" });
  const festivalId = BigInt(id);

  const { data: festivals = [] } = useFestivals();
  const { data: lineup = [], isLoading } = useLineup(festivalId);

  const festival = festivals.find((f) => f.id === festivalId);

  const useStructured = useMemo(() => hasWeekendOrDay(lineup), [lineup]);
  const structured = useMemo(() => groupStructured(lineup), [lineup]);
  const flatGrouped = useMemo(() => groupByStage(lineup), [lineup]);
  const stages = Object.keys(flatGrouped);

  const totalArtists = lineup.length;
  const totalStages = useStructured
    ? new Set(lineup.map((e) => e.stage)).size
    : stages.length;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.06 0.01 260)" }}
    >
      {/* ── Hero ── */}
      <header
        className="relative overflow-hidden"
        style={{ background: "oklch(0.06 0.01 260)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, oklch(0.65 0.2 180 / 0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, oklch(0.55 0.23 310 / 0.1) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
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
              We Are One · Artist Lineup
            </p>
            <h1
              className="mb-4 text-5xl font-display font-black uppercase tracking-tight leading-none md:text-7xl"
              style={{
                color: "oklch(0.65 0.2 180)",
                textShadow:
                  "0 0 10px oklch(0.65 0.2 180 / 0.8), 0 0 20px oklch(0.65 0.2 180 / 0.4)",
              }}
            >
              {festival ? festival.name : "Festival"}
              <br />
              <span
                style={{
                  color: "oklch(0.75 0.23 310)",
                  textShadow:
                    "0 0 10px oklch(0.55 0.23 310 / 0.8), 0 0 20px oklch(0.55 0.23 310 / 0.4)",
                }}
              >
                Lineup
              </span>
            </h1>
            {festival && (
              <p
                className="mt-4 text-sm font-display uppercase tracking-widest"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                {festival.location}, {festival.country} · {festival.weekends}
              </p>
            )}
          </motion.div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="mx-auto max-w-5xl px-4 py-12 space-y-16">
        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center gap-4 py-24">
            <div
              className="h-10 w-10 animate-spin rounded-full"
              style={{
                border: "2px solid oklch(0.25 0.02 260)",
                borderTopColor: "oklch(0.65 0.2 180)",
              }}
            />
            <span
              className="font-display text-sm uppercase tracking-widest"
              style={{ color: "oklch(0.65 0.2 180)" }}
            >
              Loading lineup…
            </span>
          </div>
        )}

        {/* Lineup — structured or flat */}
        {!isLoading && totalArtists > 0 && (
          <>
            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { label: "Artists", value: totalArtists.toString() },
                { label: "Stages", value: totalStages.toString() },
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
            </div>

            {/* Structured: weekend → day → stage */}
            {useStructured &&
              structured.map(({ weekend, days }, wi) => (
                <WeekendSection
                  key={weekend || "__none__"}
                  weekend={weekend}
                  days={days}
                  weekendIndex={wi}
                />
              ))}

            {/* Flat fallback: stage only */}
            {!useStructured &&
              stages.map((stage, i) => (
                <StageCard
                  key={stage}
                  stage={stage}
                  entries={flatGrouped[stage]}
                  stageIndex={i}
                />
              ))}
          </>
        )}

        {/* Empty state */}
        {!isLoading && totalArtists === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
            data-ocid="lineup-empty-state"
          >
            <div
              className="mb-6 flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                background: "oklch(0.65 0.2 180 / 0.1)",
                border: "2px solid oklch(0.65 0.2 180 / 0.3)",
                boxShadow: "0 0 40px oklch(0.65 0.2 180 / 0.15)",
              }}
            >
              <Music size={40} style={{ color: "oklch(0.65 0.2 180)" }} />
            </div>
            <h3
              className="mb-3 text-3xl font-display font-bold glow-cyan uppercase tracking-wider"
              style={{ color: "oklch(0.65 0.2 180)" }}
            >
              Lineup Coming Soon
            </h3>
            <p
              className="max-w-sm text-sm leading-relaxed"
              style={{ color: "oklch(0.55 0 0)" }}
            >
              We're finalising the artist lineup for this festival. Check back
              soon for the full announcement — it's going to be epic.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

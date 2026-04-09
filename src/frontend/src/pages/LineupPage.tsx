import { useParams } from "@tanstack/react-router";
import { Clock, Mic2, Music, Speaker } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { useFestivals, useLineup } from "../hooks/useBackend";
import type { LineupEntry } from "../types/festival";

// ── Group lineup by stage ─────────────────────────────────────────────────────

function groupByStage(entries: LineupEntry[]): Record<string, LineupEntry[]> {
  const map: Record<string, LineupEntry[]> = {};
  for (const e of entries) {
    if (!map[e.stage]) map[e.stage] = [];
    map[e.stage].push(e);
  }
  // Sort each stage's artists by timeSlot
  for (const stage of Object.keys(map)) {
    map[stage].sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
  }
  return map;
}

// ── Artist Row ────────────────────────────────────────────────────────────────

function ArtistRow({
  entry,
  index,
}: {
  entry: LineupEntry;
  index: number;
}) {
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
      {/* Index */}
      <span
        className="w-7 shrink-0 text-xs font-display font-bold text-center"
        style={{ color: "oklch(0.4 0 0)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Mic icon */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{
          background: "oklch(0.65 0.2 180 / 0.08)",
          border: "1px solid oklch(0.65 0.2 180 / 0.3)",
        }}
      >
        <Mic2 size={14} style={{ color: "oklch(0.65 0.2 180)" }} />
      </div>

      {/* Artist name */}
      <div className="flex-1 min-w-0">
        <p
          className="font-display font-bold truncate"
          style={{ color: "oklch(0.9 0 0)" }}
        >
          {entry.artistName}
        </p>
      </div>

      {/* Time slot */}
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
  const stageColors = [
    "oklch(0.65 0.2 180)",
    "oklch(0.55 0.23 310)",
    "oklch(0.65 0.18 70)",
    "oklch(0.6 0.18 250)",
    "oklch(0.55 0.18 145)",
  ];
  const color = stageColors[stageIndex % stageColors.length];
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
      {/* Stage heading */}
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

      {/* Artists */}
      <div className="flex flex-col gap-2">
        {entries.map((entry, i) => (
          <ArtistRow key={entry.id.toString()} entry={entry} index={i} />
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
  const grouped = useMemo(() => groupByStage(lineup), [lineup]);
  const stages = Object.keys(grouped);

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

        {/* Lineup by stage */}
        {!isLoading && stages.length > 0 && (
          <>
            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { label: "Artists", value: lineup.length.toString() },
                { label: "Stages", value: stages.length.toString() },
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

            {stages.map((stage, i) => (
              <StageCard
                key={stage}
                stage={stage}
                entries={grouped[stage]}
                stageIndex={i}
              />
            ))}
          </>
        )}

        {/* Coming soon / empty state */}
        {!isLoading && stages.length === 0 && (
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

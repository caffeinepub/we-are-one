import { ExternalLink, Heart, Sparkles, Target } from "lucide-react";
import { motion } from "motion/react";
import type { DonationGoal } from "../backend";
import { useDonationGoals, useFestivals } from "../hooks/useBackend";

// ── Helpers ───────────────────────────────────────────────────────────────────

function calcPct(current: bigint, target: bigint): number {
  if (target === 0n) return 0;
  return Math.min(100, Number((current * 100n) / target));
}

function fmt(amount: bigint): string {
  return Number(amount).toLocaleString("en-GB");
}

// ── Circular Progress ─────────────────────────────────────────────────────────

function CircularProgress({ pct, size = 96 }: { pct: number; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <svg
      width={size}
      height={size}
      className="rotate-[-90deg]"
      aria-hidden="true"
      role="presentation"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="oklch(0.2 0.02 260)"
        strokeWidth={8}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#prog-grad)"
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <defs>
        <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.55 0.23 310)" />
          <stop offset="100%" stopColor="oklch(0.65 0.2 180)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Goal Card ─────────────────────────────────────────────────────────────────

interface GoalCardProps {
  goal: DonationGoal;
  festivalName?: string;
  featured?: boolean;
}

function GoalCard({ goal, festivalName, featured }: GoalCardProps) {
  const pct = calcPct(goal.currentAmount, goal.targetAmount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col gap-5 rounded-2xl p-6 transition-all duration-300"
      style={{
        background: featured
          ? "linear-gradient(135deg, oklch(0.14 0.03 290), oklch(0.1 0.02 260))"
          : "oklch(0.13 0.02 260)",
        border: featured
          ? "1px solid oklch(0.55 0.23 310 / 0.35)"
          : "1px solid oklch(0.25 0.02 260 / 0.5)",
        boxShadow: featured ? "0 0 40px oklch(0.55 0.23 310 / 0.08)" : "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = featured
          ? "oklch(0.55 0.23 310 / 0.6)"
          : "oklch(0.65 0.2 180 / 0.4)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 30px oklch(0.65 0.2 180 / 0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = featured
          ? "oklch(0.55 0.23 310 / 0.35)"
          : "oklch(0.25 0.02 260 / 0.5)";
        (e.currentTarget as HTMLElement).style.boxShadow = featured
          ? "0 0 40px oklch(0.55 0.23 310 / 0.08)"
          : "none";
      }}
      data-ocid={`donation-goal-${goal.id.toString()}`}
    >
      {/* Top: circular + text */}
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <CircularProgress pct={pct} size={80} />
          <div
            className="absolute inset-0 flex items-center justify-center font-display font-bold"
            style={{ color: "oklch(0.85 0 0)", fontSize: "0.85rem" }}
          >
            {pct}%
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {festivalName && (
            <span
              className="mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-display uppercase tracking-wider"
              style={{
                background: "oklch(0.65 0.18 70 / 0.15)",
                color: "oklch(0.65 0.18 70)",
                border: "1px solid oklch(0.65 0.18 70 / 0.3)",
              }}
            >
              {festivalName}
            </span>
          )}
          {featured && !festivalName && (
            <span
              className="mb-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-display uppercase tracking-wider"
              style={{
                background: "oklch(0.55 0.23 310 / 0.15)",
                color: "oklch(0.55 0.23 310)",
                border: "1px solid oklch(0.55 0.23 310 / 0.3)",
              }}
            >
              <Sparkles size={10} />
              Global
            </span>
          )}
          <h3
            className="font-display font-bold uppercase tracking-wide leading-tight"
            style={{ color: "oklch(0.92 0 0)" }}
          >
            {goal.title}
          </h3>
          <p
            className="mt-1 line-clamp-2 font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.6 0 0)" }}
          >
            {goal.description}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <div
          className="h-2 w-full overflow-hidden rounded-full"
          style={{ background: "oklch(0.2 0.02 260)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background:
                "linear-gradient(90deg, oklch(0.55 0.23 310), oklch(0.65 0.2 180))",
              boxShadow: "0 0 8px oklch(0.55 0.23 310 / 0.5)",
            }}
          />
        </div>
        <div className="flex justify-between text-xs font-display">
          <span style={{ color: "oklch(0.55 0.23 310)" }}>
            £{fmt(goal.currentAmount)} raised
          </span>
          <span style={{ color: "oklch(0.45 0 0)" }}>
            £{fmt(goal.targetAmount)} goal
          </span>
        </div>
      </div>

      {/* Donate button */}
      {goal.donationUrl && (
        <a
          href={goal.donationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-display font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: featured
              ? "linear-gradient(135deg, oklch(0.55 0.23 310 / 0.9), oklch(0.65 0.2 180 / 0.9))"
              : "oklch(0.65 0.2 180 / 0.15)",
            color: featured ? "oklch(0.08 0 0)" : "oklch(0.65 0.2 180)",
            border: featured ? "none" : "1px solid oklch(0.65 0.2 180 / 0.4)",
            boxShadow: featured
              ? "0 0 20px oklch(0.55 0.23 310 / 0.3)"
              : "none",
          }}
          data-ocid={`donate-btn-${goal.id.toString()}`}
        >
          <Heart size={14} />
          Donate Now
          <ExternalLink size={12} />
        </a>
      )}
    </motion.div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      className="animate-pulse rounded-2xl p-6"
      style={{
        background: "oklch(0.13 0.02 260)",
        border: "1px solid oklch(0.2 0.02 260 / 0.4)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="h-20 w-20 flex-shrink-0 rounded-full"
          style={{ background: "oklch(0.18 0.02 260)" }}
        />
        <div className="flex-1 space-y-2">
          <div
            className="h-4 w-2/3 rounded"
            style={{ background: "oklch(0.18 0.02 260)" }}
          />
          <div
            className="h-3 w-full rounded"
            style={{ background: "oklch(0.18 0.02 260)" }}
          />
          <div
            className="h-3 w-4/5 rounded"
            style={{ background: "oklch(0.18 0.02 260)" }}
          />
        </div>
      </div>
      <div
        className="mt-4 h-2 w-full rounded-full"
        style={{ background: "oklch(0.18 0.02 260)" }}
      />
      <div
        className="mt-4 h-10 w-full rounded-xl"
        style={{ background: "oklch(0.18 0.02 260)" }}
      />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DonationsPage() {
  const { data: goals = [], isLoading } = useDonationGoals();
  const { data: festivals = [] } = useFestivals();

  const festivalMap = new Map(festivals.map((f) => [f.id.toString(), f.name]));
  const globalGoals = goals.filter((g) => g.isGlobal);
  const festivalGoals = goals.filter((g) => !g.isGlobal);

  function getFestivalName(goal: DonationGoal): string | undefined {
    if (goal.festivalId != null) {
      return festivalMap.get(goal.festivalId.toString());
    }
    return undefined;
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.02 260)" }}
    >
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-28 text-center"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.04 290) 0%, oklch(0.08 0.02 260) 100%)",
        }}
      >
        {/* Animated glow orbs */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, oklch(0.55 0.23 310 / 0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 animate-pulse-slow"
          style={{
            background:
              "radial-gradient(ellipse 40% 30% at 80% 60%, oklch(0.65 0.2 180 / 0.08) 0%, transparent 60%)",
          }}
        />

        <div className="container relative mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: "oklch(0.55 0.23 310 / 0.12)",
              border: "2px solid oklch(0.55 0.23 310 / 0.5)",
              boxShadow:
                "0 0 40px oklch(0.55 0.23 310 / 0.25), inset 0 0 20px oklch(0.55 0.23 310 / 0.05)",
            }}
          >
            <Heart size={36} style={{ color: "oklch(0.55 0.23 310)" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-4 font-display text-5xl font-bold uppercase tracking-widest"
            style={{
              color: "oklch(0.92 0 0)",
              textShadow:
                "0 0 30px oklch(0.55 0.23 310 / 0.4), 0 0 60px oklch(0.55 0.23 310 / 0.2)",
            }}
          >
            Support{" "}
            <span style={{ color: "oklch(0.55 0.23 310)" }}>WE ARE ONE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto max-w-xl font-body text-lg leading-relaxed"
            style={{ color: "oklch(0.65 0 0)" }}
          >
            Your generosity keeps the music alive. Every donation powers the
            festivals, communities, and causes that unite us all.
          </motion.p>
        </div>
      </section>

      {/* ── Goals ── */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : goals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 rounded-2xl py-24 text-center"
            style={{
              background: "oklch(0.13 0.02 260)",
              border: "1px solid oklch(0.25 0.02 260 / 0.5)",
            }}
            data-ocid="donations-empty"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: "oklch(0.65 0.2 180 / 0.1)",
                border: "2px solid oklch(0.65 0.2 180 / 0.3)",
              }}
            >
              <Target size={28} style={{ color: "oklch(0.65 0.2 180)" }} />
            </div>
            <div>
              <p
                className="font-display text-xl font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.65 0.2 180)" }}
              >
                Campaigns Coming Soon
              </p>
              <p
                className="mt-2 max-w-sm font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.45 0 0)" }}
              >
                Fundraising campaigns will launch before each festival season.
                Check back soon to be part of something extraordinary.
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Global Goals */}
            {globalGoals.length > 0 && (
              <div className="mb-14">
                <div className="mb-6 flex items-center gap-3">
                  <Sparkles
                    size={18}
                    style={{ color: "oklch(0.55 0.23 310)" }}
                  />
                  <h2
                    className="font-display text-2xl font-bold uppercase tracking-widest"
                    style={{
                      color: "oklch(0.92 0 0)",
                      textShadow: "0 0 20px oklch(0.55 0.23 310 / 0.3)",
                    }}
                  >
                    Global Campaigns
                  </h2>
                  <div
                    className="h-px flex-1"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.55 0.23 310 / 0.4), transparent)",
                    }}
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {globalGoals.map((goal, i) => (
                    <motion.div
                      key={goal.id.toString()}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <GoalCard goal={goal} featured />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Festival Goals */}
            {festivalGoals.length > 0 && (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <Heart size={18} style={{ color: "oklch(0.65 0.18 70)" }} />
                  <h2
                    className="font-display text-2xl font-bold uppercase tracking-widest"
                    style={{
                      color: "oklch(0.92 0 0)",
                      textShadow: "0 0 20px oklch(0.65 0.18 70 / 0.3)",
                    }}
                  >
                    Festival Campaigns
                  </h2>
                  <div
                    className="h-px flex-1"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.65 0.18 70 / 0.4), transparent)",
                    }}
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {festivalGoals.map((goal, i) => (
                    <motion.div
                      key={goal.id.toString()}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <GoalCard
                        goal={goal}
                        festivalName={getFestivalName(goal)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

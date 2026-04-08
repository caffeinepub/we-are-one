import {
  Briefcase,
  Globe,
  GraduationCap,
  HardHat,
  Mail,
  Megaphone,
  Music2,
  Sparkles,
  Star,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

type AccentColor = "cyan" | "magenta" | "amber";

const COLOR_TEXT: Record<AccentColor, string> = {
  cyan: "oklch(0.65 0.2 180)",
  magenta: "oklch(0.55 0.23 310)",
  amber: "oklch(0.65 0.18 70)",
};
const COLOR_BG_LIGHT: Record<AccentColor, string> = {
  cyan: "oklch(0.65 0.2 180 / 0.1)",
  magenta: "oklch(0.55 0.23 310 / 0.1)",
  amber: "oklch(0.65 0.18 70 / 0.1)",
};
const COLOR_BG_MED: Record<AccentColor, string> = {
  cyan: "oklch(0.65 0.2 180 / 0.12)",
  magenta: "oklch(0.55 0.23 310 / 0.12)",
  amber: "oklch(0.65 0.18 70 / 0.12)",
};
const COLOR_BORDER: Record<AccentColor, string> = {
  cyan: "oklch(0.65 0.2 180 / 0.4)",
  magenta: "oklch(0.55 0.23 310 / 0.4)",
  amber: "oklch(0.65 0.18 70 / 0.4)",
};
const COLOR_BORDER_30: Record<AccentColor, string> = {
  cyan: "oklch(0.65 0.2 180 / 0.3)",
  magenta: "oklch(0.55 0.23 310 / 0.3)",
  amber: "oklch(0.65 0.18 70 / 0.3)",
};
const COLOR_BG_APPLY: Record<AccentColor, string> = {
  cyan: "oklch(0.65 0.2 180 / 0.15)",
  magenta: "oklch(0.55 0.23 310 / 0.15)",
  amber: "oklch(0.65 0.18 70 / 0.15)",
};
const COLOR_SHADOW: Record<AccentColor, string> = {
  cyan: "0 0 20px oklch(0.65 0.2 180 / 0.25)",
  magenta: "0 0 20px oklch(0.55 0.23 310 / 0.25)",
  amber: "0 0 20px oklch(0.65 0.18 70 / 0.25)",
};

const PARTICLES: {
  id: string;
  left: number;
  top: number;
  size: number;
  color: string;
}[] = [
  { id: "p0", left: 0, top: 22, size: 4, color: "oklch(0.65 0.2 180 / 0.5)" },
  {
    id: "p1",
    left: 8.5,
    top: 29,
    size: 6,
    color: "oklch(0.55 0.23 310 / 0.5)",
  },
  { id: "p2", left: 17, top: 36, size: 8, color: "oklch(0.65 0.18 70 / 0.5)" },
  {
    id: "p3",
    left: 25.5,
    top: 43,
    size: 4,
    color: "oklch(0.65 0.2 180 / 0.5)",
  },
  { id: "p4", left: 34, top: 50, size: 6, color: "oklch(0.55 0.23 310 / 0.5)" },
  {
    id: "p5",
    left: 42.5,
    top: 57,
    size: 8,
    color: "oklch(0.65 0.18 70 / 0.5)",
  },
  { id: "p6", left: 51, top: 64, size: 4, color: "oklch(0.65 0.2 180 / 0.5)" },
  {
    id: "p7",
    left: 59.5,
    top: 71,
    size: 6,
    color: "oklch(0.55 0.23 310 / 0.5)",
  },
  { id: "p8", left: 68, top: 25, size: 8, color: "oklch(0.65 0.18 70 / 0.5)" },
  {
    id: "p9",
    left: 76.5,
    top: 32,
    size: 4,
    color: "oklch(0.65 0.2 180 / 0.5)",
  },
  {
    id: "p10",
    left: 85,
    top: 39,
    size: 6,
    color: "oklch(0.55 0.23 310 / 0.5)",
  },
  {
    id: "p11",
    left: 93.5,
    top: 46,
    size: 8,
    color: "oklch(0.65 0.18 70 / 0.5)",
  },
];

const ROLES: {
  icon: React.ElementType;
  title: string;
  type: string;
  description: string;
  color: AccentColor;
}[] = [
  {
    icon: HardHat,
    title: "Security",
    type: "Full-time / Contract",
    description:
      "Keep our events safe and enjoyable for all attendees. Patrol perimeters, manage crowd flow, and ensure a zero-incident environment across all stages.",
    color: "cyan",
  },
  {
    icon: Users,
    title: "Event Staff",
    type: "Contract",
    description:
      "Front-of-house operations, ticketing, wristbanding, crowd guidance, and guest services. The face of WE ARE ONE on event day.",
    color: "magenta",
  },
  {
    icon: Wrench,
    title: "Technicians",
    type: "Contract",
    description:
      "Sound, lighting, and staging technicians delivering world-class production. Keep the show running perfectly from soundcheck to final encore.",
    color: "amber",
  },
  {
    icon: Zap,
    title: "Stage Crew",
    type: "Contract",
    description:
      "Setup, teardown, and stage management throughout the festival. Physical and fast-paced work that keeps every performance on schedule.",
    color: "cyan",
  },
  {
    icon: Briefcase,
    title: "Production Assistants",
    type: "Contract / Apprenticeship",
    description:
      "Support the production team across all aspects of festival coordination — scheduling, logistics, supplier liaison, and day-of operations.",
    color: "magenta",
  },
  {
    icon: Music2,
    title: "DJs",
    type: "Performance Contract",
    description:
      "Emerging and established DJs to perform across our stages worldwide. Apprenticeships available — we love discovering new talent at any level.",
    color: "amber",
  },
  {
    icon: Megaphone,
    title: "Marketing & Social Media",
    type: "Full-time / Freelance",
    description:
      "Amplify the WE ARE ONE brand across digital channels. Create content, manage campaigns, and engage our global festival community.",
    color: "cyan",
  },
];

const BENEFITS: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: AccentColor;
}[] = [
  {
    icon: Globe,
    title: "Travel the World",
    description:
      "Work at festivals across the UK, Europe, and beyond. Every contract is a new adventure.",
    color: "cyan",
  },
  {
    icon: GraduationCap,
    title: "Gain Experience",
    description:
      "Learn from the best in live events. Mentorship, hands-on skills, and industry connections included.",
    color: "magenta",
  },
  {
    icon: Users,
    title: "Join a Community",
    description:
      "Become part of a passionate, global team united by music and a love of bringing people together.",
    color: "amber",
  },
  {
    icon: Star,
    title: "Work with Top Artists",
    description:
      "Get backstage access and collaborate alongside world-class DJs and performers every event.",
    color: "cyan",
  },
];

export default function JobsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden px-4 py-24 text-center"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -20%, oklch(0.65 0.2 180 / 0.15), transparent 60%), radial-gradient(ellipse 80% 60% at 80% 100%, oklch(0.55 0.23 310 / 0.12), transparent 50%), oklch(0.08 0.01 260)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          {PARTICLES.map(({ id, left, top, size, color }) => (
            <div
              key={id}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                background: color,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-3xl"
        >
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-display font-bold uppercase tracking-widest"
            style={{
              background: "oklch(0.65 0.18 70 / 0.12)",
              border: "1px solid oklch(0.65 0.18 70 / 0.4)",
              color: "oklch(0.65 0.18 70)",
            }}
          >
            <Sparkles size={12} />
            We're Hiring
          </div>

          <h1
            className="mb-5 font-display text-4xl font-black leading-tight sm:text-5xl md:text-6xl"
            style={{ color: "oklch(0.95 0 0)" }}
          >
            Work With{" "}
            <span
              className="glow-cyan"
              style={{ color: "oklch(0.65 0.2 180)" }}
            >
              WE ARE ONE
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl">
              – Join Our Team
            </span>
          </h1>

          <p
            className="mx-auto max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: "oklch(0.7 0 0)" }}
          >
            Be part of the world's most exciting festival experience. From
            security to staging, marketing to music — your journey starts here.
          </p>
        </motion.div>
      </section>

      {/* Age Eligibility Notice */}
      <section className="px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.18 70 / 0.1), oklch(0.65 0.2 180 / 0.08))",
              border: "2px solid oklch(0.65 0.18 70 / 0.5)",
              boxShadow:
                "0 0 30px oklch(0.65 0.18 70 / 0.15), inset 0 0 20px oklch(0.65 0.18 70 / 0.04)",
            }}
            data-ocid="age-eligibility-notice"
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "oklch(0.65 0.18 70 / 0.15)" }}
              >
                <GraduationCap
                  size={20}
                  style={{ color: "oklch(0.65 0.18 70)" }}
                />
              </div>
              <p
                className="text-sm font-medium leading-relaxed sm:text-base"
                style={{ color: "oklch(0.85 0 0)" }}
              >
                <strong
                  className="glow-amber"
                  style={{ color: "oklch(0.65 0.18 70)" }}
                >
                  Everyone is welcome!
                </strong>{" "}
                We accept work, apprenticeships, and people over{" "}
                <strong style={{ color: "oklch(0.65 0.18 70)" }}>14</strong> for
                all EDM events.{" "}
                <strong style={{ color: "oklch(0.65 0.2 180)" }}>
                  Family events are all ages welcome.
                </strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Roles */}
      <section
        className="px-4 py-16"
        style={{ background: "oklch(0.08 0.01 260)" }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2
              className="mb-3 font-display text-3xl font-black glow-cyan sm:text-4xl"
              style={{ color: "oklch(0.65 0.2 180)" }}
            >
              Open Roles
            </h2>
            <p
              className="mx-auto max-w-lg text-sm"
              style={{ color: "oklch(0.6 0 0)" }}
            >
              Browse our current openings across all WE ARE ONE events. New
              roles are added regularly.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ROLES.map(
              ({ icon: Icon, title, type, description, color }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="glass-effect flex flex-col gap-4 rounded-2xl p-6 transition-smooth hover:-translate-y-1"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      COLOR_TEXT[color];
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      COLOR_SHADOW[color];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                  data-ocid="job-role-card"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: COLOR_BG_LIGHT[color] }}
                  >
                    <Icon size={20} style={{ color: COLOR_TEXT[color] }} />
                  </div>

                  <div>
                    <h3
                      className="font-display text-lg font-bold"
                      style={{ color: "oklch(0.92 0 0)" }}
                    >
                      {title}
                    </h3>
                    <span
                      className="font-display text-xs uppercase tracking-wider"
                      style={{ color: COLOR_TEXT[color] }}
                    >
                      {type}
                    </span>
                  </div>

                  <p
                    className="flex-1 text-sm leading-relaxed"
                    style={{ color: "oklch(0.62 0 0)" }}
                  >
                    {description}
                  </p>

                  <a
                    href={`mailto:jobs@weareone.com?subject=Application: ${encodeURIComponent(title)}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-smooth hover:scale-105"
                    style={{
                      background: COLOR_BG_APPLY[color],
                      border: `1px solid ${COLOR_BORDER[color]}`,
                      color: COLOR_TEXT[color],
                    }}
                    data-ocid="job-apply-btn"
                  >
                    <Mail size={12} />
                    Apply Now
                  </a>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section
        className="px-4 py-16"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 30% 50%, oklch(0.55 0.23 310 / 0.06), transparent 60%), oklch(0.06 0.01 260)",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2
              className="mb-3 font-display text-3xl font-black glow-magenta sm:text-4xl"
              style={{ color: "oklch(0.55 0.23 310)" }}
            >
              Why Join Us?
            </h2>
            <p
              className="mx-auto max-w-lg text-sm"
              style={{ color: "oklch(0.6 0 0)" }}
            >
              More than a job — it's a lifestyle, a community, and a career in
              the world's biggest live music industry.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(
              ({ icon: Icon, title, description, color }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-6 text-center transition-smooth hover:-translate-y-1"
                  data-ocid="benefit-card"
                >
                  <div
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      background: COLOR_BG_MED[color],
                      border: `1px solid ${COLOR_BORDER_30[color]}`,
                    }}
                  >
                    <Icon size={22} style={{ color: COLOR_TEXT[color] }} />
                  </div>
                  <h3
                    className="mb-2 font-display text-base font-bold"
                    style={{ color: "oklch(0.9 0 0)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.6 0 0)" }}
                  >
                    {description}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section
        className="px-4 py-20"
        style={{ background: "oklch(0.08 0.01 260)" }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="mb-4 font-display text-3xl font-black glow-cyan sm:text-4xl"
              style={{ color: "oklch(0.65 0.2 180)" }}
            >
              How to Apply
            </h2>
            <p
              className="mb-6 text-base leading-relaxed"
              style={{ color: "oklch(0.65 0 0)" }}
            >
              Send your CV and a short cover letter — or a demo mix / portfolio
              if applying for a creative role — directly to our jobs team.
            </p>

            <a
              href="mailto:jobs@weareone.com"
              className="group mb-8 inline-flex items-center gap-3 font-display text-xl font-bold transition-smooth hover:scale-105 sm:text-2xl"
              style={{ color: "oklch(0.65 0.2 180)" }}
              data-ocid="jobs-email-link"
            >
              <Mail
                size={22}
                className="transition-smooth group-hover:scale-110"
              />
              <span className="glow-cyan">jobs@weareone.com</span>
            </a>

            <div
              className="mt-8 rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.2 180 / 0.06), oklch(0.55 0.23 310 / 0.06))",
                border: "1px solid oklch(0.65 0.2 180 / 0.2)",
              }}
              data-ocid="apply-notes"
            >
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-start gap-3 text-left">
                  <GraduationCap
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: "oklch(0.65 0.18 70)" }}
                  />
                  <p style={{ color: "oklch(0.7 0 0)" }}>
                    <strong style={{ color: "oklch(0.65 0.18 70)" }}>
                      Apprenticeships available
                    </strong>{" "}
                    for under 18s across production, DJing, and marketing roles.
                    We believe in nurturing the next generation of festival
                    talent.
                  </p>
                </div>
                <div
                  className="h-px w-full"
                  style={{ background: "oklch(0.25 0.02 260 / 0.4)" }}
                />
                <div className="flex items-start gap-3 text-left">
                  <Star
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: "oklch(0.65 0.2 180)" }}
                  />
                  <p style={{ color: "oklch(0.7 0 0)" }}>
                    <strong style={{ color: "oklch(0.65 0.2 180)" }}>
                      Age requirements:
                    </strong>{" "}
                    EDM events{" "}
                    <span
                      className="rounded px-1.5 py-0.5 font-bold"
                      style={{
                        background: "oklch(0.65 0.2 180 / 0.15)",
                        color: "oklch(0.65 0.2 180)",
                      }}
                    >
                      14+
                    </span>{" "}
                    | Family events{" "}
                    <span
                      className="rounded px-1.5 py-0.5 font-bold"
                      style={{
                        background: "oklch(0.65 0.18 70 / 0.15)",
                        color: "oklch(0.65 0.18 70)",
                      }}
                    >
                      All ages
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

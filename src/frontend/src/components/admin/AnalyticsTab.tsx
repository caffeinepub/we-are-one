import { BarChart3, TrendingUp, Users } from "lucide-react";
import { useAnalytics, useFestivals } from "../../hooks/useBackend";
import { isComingSoon } from "../../types/festival";

const S = {
  card: {
    background: "oklch(0.1 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.4)",
  } as React.CSSProperties,
};

function neonGlow(color: string): React.CSSProperties {
  return {
    color,
    textShadow: `0 0 12px ${color.replace(")", " / 0.5)")}`,
  };
}

export default function AnalyticsTab() {
  const { data: festivals = [] } = useFestivals();
  const { data: analytics = [] } = useAnalytics();

  const totalFestivals = festivals.length;
  const activeFestivals = festivals.filter(
    (f) => !isComingSoon(f.status),
  ).length;

  // Compute headline stats from analytics
  const totalRevenue = analytics.map((a) => a.estimatedRevenue).join(", ");

  const totalTickets = analytics.reduce(
    (acc, a) => acc + Number(a.ticketsSold),
    0,
  );

  const summaryCards = [
    {
      label: "Total Festivals",
      value: totalFestivals.toString(),
      icon: BarChart3,
      color: "oklch(0.65 0.2 180)",
    },
    {
      label: "Active Festivals",
      value: activeFestivals.toString(),
      icon: TrendingUp,
      color: "oklch(0.55 0.18 145)",
    },
    {
      label: "Tickets Sold",
      value: totalTickets.toLocaleString(),
      icon: Users,
      color: "oklch(0.65 0.18 70)",
    },
    {
      label: "Revenue Range",
      value: totalRevenue.length > 30 ? "See below" : totalRevenue,
      icon: TrendingUp,
      color: "oklch(0.55 0.23 310)",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Summary strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl p-5"
            style={{
              ...S.card,
              boxShadow: `0 0 20px ${color.replace(")", " / 0.06)")}`,
            }}
            data-ocid="admin-analytics-summary-card"
          >
            <div className="mb-3 flex items-center gap-2">
              <Icon size={14} style={{ color }} />
              <p
                className="text-xs font-display uppercase tracking-wider"
                style={{ color: "oklch(0.5 0 0)" }}
              >
                {label}
              </p>
            </div>
            <p
              className="text-3xl font-display font-black truncate"
              style={neonGlow(color)}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Per-festival analytics cards */}
      <div>
        <h3
          className="mb-4 font-display text-xs uppercase tracking-wider"
          style={{ color: "oklch(0.5 0 0)" }}
        >
          Per-Festival Breakdown
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {analytics.map((a) => {
            const festival = festivals.find((f) => f.id === a.festivalId);
            const name =
              festival?.name ?? `Festival #${a.festivalId.toString()}`;
            const active = festival ? !isComingSoon(festival.status) : false;

            return (
              <div
                key={a.festivalId.toString()}
                className="rounded-2xl p-5"
                style={{
                  background: "oklch(0.1 0.02 260)",
                  border: `1px solid oklch(0.25 0.02 260 / ${active ? "0.6" : "0.3"})`,
                  boxShadow: active
                    ? "0 0 20px oklch(0.55 0.18 145 / 0.08)"
                    : "none",
                }}
                data-ocid="admin-analytics-festival-card"
              >
                {/* Name + status */}
                <div className="mb-4 flex items-start justify-between gap-2">
                  <p
                    className="font-display text-sm font-bold leading-tight"
                    style={{ color: "oklch(0.85 0 0)" }}
                  >
                    {name}
                  </p>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-xs font-display font-bold uppercase tracking-wider"
                    style={
                      active
                        ? {
                            background: "oklch(0.55 0.18 145 / 0.1)",
                            color: "oklch(0.55 0.18 145)",
                          }
                        : {
                            background: "oklch(0.65 0.18 70 / 0.1)",
                            color: "oklch(0.65 0.18 70)",
                          }
                    }
                  >
                    {active ? "Active" : "Soon"}
                  </span>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p
                      className="text-xs font-display uppercase tracking-wider mb-1"
                      style={{ color: "oklch(0.45 0 0)" }}
                    >
                      Attendance
                    </p>
                    <p
                      className="font-display font-black text-lg"
                      style={neonGlow("oklch(0.65 0.2 180)")}
                    >
                      {Number(a.estimatedAttendance).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-display uppercase tracking-wider mb-1"
                      style={{ color: "oklch(0.45 0 0)" }}
                    >
                      Tickets
                    </p>
                    <p
                      className="font-display font-black text-lg"
                      style={neonGlow("oklch(0.65 0.18 70)")}
                    >
                      {Number(a.ticketsSold).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-display uppercase tracking-wider mb-1"
                      style={{ color: "oklch(0.45 0 0)" }}
                    >
                      Revenue
                    </p>
                    <p
                      className="font-display font-black text-base truncate"
                      style={neonGlow("oklch(0.55 0.18 145)")}
                    >
                      {a.estimatedRevenue}
                    </p>
                  </div>
                </div>

                {/* Progress bar — tickets sold as % of attendance */}
                <div className="mt-4">
                  <div
                    className="h-1.5 w-full rounded-full overflow-hidden"
                    style={{ background: "oklch(0.2 0.01 260)" }}
                  >
                    <div
                      className="h-full rounded-full transition-smooth"
                      style={{
                        width: `${Math.min(100, Math.round((Number(a.ticketsSold) / Number(a.estimatedAttendance)) * 100))}%`,
                        background: active
                          ? "linear-gradient(90deg, oklch(0.65 0.2 180), oklch(0.55 0.18 145))"
                          : "oklch(0.65 0.18 70)",
                      }}
                    />
                  </div>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "oklch(0.4 0 0)" }}
                  >
                    {Math.round(
                      (Number(a.ticketsSold) / Number(a.estimatedAttendance)) *
                        100,
                    )}
                    % sold
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {analytics.length === 0 && (
          <div
            className="rounded-2xl py-16 text-center"
            style={S.card}
            data-ocid="admin-analytics-empty"
          >
            <p
              className="font-display text-sm uppercase tracking-wider"
              style={{ color: "oklch(0.5 0 0)" }}
            >
              No analytics data yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

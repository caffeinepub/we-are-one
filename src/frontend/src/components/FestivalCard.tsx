import { Calendar, MapPin, Ticket, Users } from "lucide-react";
import { useState } from "react";
import { useTicketUrls } from "../hooks/useBackend";
import type { Festival } from "../types/festival";
import {
  FestivalStatus,
  getEventTypeLabel,
  getSeasonLabel,
  isComingSoon,
  isEDM,
  isSummer,
} from "../types/festival";
import ComingSoonModal from "./ComingSoonModal";

interface FestivalCardProps {
  festival: Festival;
}

export default function FestivalCard({ festival }: FestivalCardProps) {
  const [showModal, setShowModal] = useState(false);
  const { data: ticketUrls = {} } = useTicketUrls();

  const seasonLabel = getSeasonLabel(festival.season);
  const eventTypeLabel = getEventTypeLabel(festival.eventType);
  const comingSoon = isComingSoon(festival.status);
  const summer = isSummer(festival.season);
  const edm = isEDM(festival.eventType);

  const ticketUrl = ticketUrls[festival.id.toString()];
  const isActive = festival.status === FestivalStatus.Active;
  const hasTicketLink = isActive && !!ticketUrl;

  function handleBuyTickets() {
    if (hasTicketLink) {
      window.open(ticketUrl, "_blank", "noopener,noreferrer");
    } else {
      setShowModal(true);
    }
  }

  const seasonColor = summer
    ? "oklch(0.65 0.2 180)" // cyan for summer
    : "oklch(0.6 0.15 250)"; // blue for winter

  const seasonBg = summer
    ? "oklch(0.65 0.2 180 / 0.1)"
    : "oklch(0.6 0.15 250 / 0.1)";

  return (
    <>
      <article
        className="group relative flex flex-col overflow-hidden rounded-2xl transition-smooth hover:-translate-y-1"
        style={{
          background: "oklch(0.1 0.02 260)",
          border: "1px solid oklch(0.25 0.05 180 / 0.4)",
          boxShadow: "0 4px 20px oklch(0 0 0 / 0.4)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 8px 40px oklch(0.65 0.2 180 / 0.2), 0 0 0 1px oklch(0.65 0.2 180 / 0.3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 4px 20px oklch(0 0 0 / 0.4)";
        }}
        data-ocid="festival-card"
      >
        {/* Image / Gradient banner */}
        <div className="relative h-48 overflow-hidden">
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
              {/* Decorative glow */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: edm
                    ? "radial-gradient(ellipse at 30% 50%, oklch(0.65 0.2 180 / 0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, oklch(0.55 0.23 310 / 0.25) 0%, transparent 60%)"
                    : "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.18 70 / 0.3) 0%, transparent 60%)",
                }}
              />
              {/* Festival name watermark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-center text-xs font-display font-bold uppercase tracking-widest opacity-30"
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
              background: seasonBg,
              border: `1px solid ${seasonColor}`,
              color: seasonColor,
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
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          {/* Event type tag */}
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

          {/* Name */}
          <h3
            className="text-lg font-display font-bold leading-tight glow-cyan line-clamp-2"
            style={{ color: "oklch(0.65 0.2 180)" }}
          >
            {festival.name}
          </h3>

          {/* Description */}
          {festival.description && (
            <p
              className="text-sm leading-relaxed line-clamp-2"
              style={{ color: "oklch(0.65 0 0)" }}
            >
              {festival.description}
            </p>
          )}

          {/* Meta */}
          <div className="mt-auto space-y-1.5">
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "oklch(0.65 0 0)" }}
            >
              <MapPin
                size={14}
                className="shrink-0"
                style={{ color: "oklch(0.65 0.2 180)" }}
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
                style={{ color: "oklch(0.65 0.2 180)" }}
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
                style={{ color: "oklch(0.65 0.2 180)" }}
              />
              <span>{festival.ageRestriction}</span>
            </div>
          </div>

          {/* Price + CTA */}
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
              onClick={handleBuyTickets}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
              style={{
                background: "oklch(0.65 0.2 180 / 0.15)",
                border: "1px solid oklch(0.65 0.2 180 / 0.5)",
                color: "oklch(0.65 0.2 180)",
                boxShadow: "0 0 12px oklch(0.65 0.2 180 / 0.15)",
              }}
              data-ocid="buy-tickets-btn"
            >
              <Ticket size={14} />
              Tickets
            </button>
          </div>
        </div>
      </article>

      <ComingSoonModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

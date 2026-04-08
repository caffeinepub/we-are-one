import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getStoredTicketUrls,
  useSetFestivalTicketUrl,
} from "../../hooks/useBackend";
import {
  EventType,
  FestivalStatus,
  Season,
  getEventTypeLabel,
  getSeasonLabel,
} from "../../types/festival";
import type { Festival, FestivalInput } from "../../types/festival";

interface Props {
  festival?: Festival;
  onSave: (input: FestivalInput) => void;
  onClose: () => void;
  isPending: boolean;
}

type SeasonKey = "Summer" | "Winter";
type EventTypeKey = "EDM" | "Family" | "ClubHotel" | "Rave";
type StatusKey = "ComingSoon" | "Active";

const SEASON_OPTIONS: SeasonKey[] = ["Summer", "Winter"];
const EVENT_TYPES: EventTypeKey[] = ["EDM", "Family", "ClubHotel", "Rave"];
const STATUS_OPTIONS: StatusKey[] = ["ComingSoon", "Active"];

const S = {
  overlay: {
    background: "oklch(0 0 0 / 0.75)",
    backdropFilter: "blur(8px)",
  } as React.CSSProperties,
  modal: {
    background: "oklch(0.1 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.5)",
    boxShadow: "0 0 60px oklch(0.65 0.2 180 / 0.1)",
  } as React.CSSProperties,
  input: {
    background: "oklch(0.07 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.5)",
    color: "oklch(0.9 0 0)",
  } as React.CSSProperties,
  label: { color: "oklch(0.5 0 0)" } as React.CSSProperties,
};

export default function FestivalForm({
  festival,
  onSave,
  onClose,
  isPending,
}: Props) {
  const setTicketUrl = useSetFestivalTicketUrl();

  const [form, setForm] = useState({
    name: festival?.name ?? "",
    location: festival?.location ?? "",
    country: festival?.country ?? "",
    company: festival?.company ?? "",
    season: (festival
      ? getSeasonLabel(festival.season)
      : "Summer") as SeasonKey,
    eventType: (festival
      ? getEventTypeLabel(festival.eventType).replace(" ", "")
      : "EDM") as EventTypeKey,
    weekends: festival?.weekends ?? "",
    ticketPriceMin: festival ? festival.ticketPriceMin.toString() : "",
    ticketPriceMax: festival ? festival.ticketPriceMax.toString() : "",
    estimatedRevenueMin: festival?.estimatedRevenueMin ?? "",
    estimatedRevenueMax: festival?.estimatedRevenueMax ?? "",
    specialNotes: festival?.specialNotes ?? "",
    ageRestriction: festival?.ageRestriction ?? "14+",
    status: (festival
      ? festival.status === FestivalStatus.ComingSoon
        ? "ComingSoon"
        : "Active"
      : "ComingSoon") as StatusKey,
    description: festival?.description ?? "",
    lineup: festival?.lineup ?? "",
    imageUrl: festival?.imageUrl ?? "",
    ticketUrl: "",
  });

  // Load persisted ticket URL for this festival
  useEffect(() => {
    if (festival) {
      const stored = getStoredTicketUrls();
      setForm((f) => ({
        ...f,
        ticketUrl: stored[festival.id.toString()] ?? "",
      }));
    }
  }, [festival]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const eventTypeKey = form.eventType;
    const input: FestivalInput = {
      name: form.name,
      location: form.location,
      country: form.country,
      company: form.company,
      season: form.season === "Summer" ? Season.Summer : Season.Winter,
      eventType:
        eventTypeKey === "EDM"
          ? EventType.EDM
          : eventTypeKey === "Family"
            ? EventType.Family
            : eventTypeKey === "ClubHotel"
              ? EventType.ClubHotel
              : EventType.Rave,
      status:
        form.status === "ComingSoon"
          ? FestivalStatus.ComingSoon
          : FestivalStatus.Active,
      weekends: form.weekends,
      ticketPriceMin: BigInt(form.ticketPriceMin || "0"),
      ticketPriceMax: BigInt(form.ticketPriceMax || "0"),
      estimatedRevenueMin: form.estimatedRevenueMin,
      estimatedRevenueMax: form.estimatedRevenueMax,
      specialNotes: form.specialNotes || undefined,
      imageUrl: form.imageUrl || undefined,
      description: form.description || undefined,
      lineup: form.lineup || undefined,
      ageRestriction: form.ageRestriction,
    };
    // Save ticket URL separately (frontend-only)
    if (festival) {
      setTicketUrl.mutate({ id: festival.id, ticketUrl: form.ticketUrl });
    }
    onSave(input);
  }

  const inputClass =
    "w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-smooth";

  function field(id: string, label: string, node: React.ReactNode) {
    return (
      <div>
        <label
          htmlFor={id}
          className="mb-1 block text-xs font-display uppercase tracking-wider"
          style={S.label}
        >
          {label}
        </label>
        {node}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4"
      style={S.overlay}
    >
      <div
        className="relative my-8 w-full max-w-2xl rounded-2xl p-6"
        style={S.modal}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            className="font-display text-lg font-black uppercase tracking-wider"
            style={{ color: "oklch(0.65 0.2 180)" }}
          >
            {festival ? "Edit Festival" : "Add Festival"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 transition-smooth hover:opacity-70"
            style={{ color: "oklch(0.5 0 0)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {field(
            "f-name",
            "Festival Name *",
            <input
              id="f-name"
              required
              className={inputClass}
              style={S.input}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              data-ocid="festival-form-name"
            />,
          )}

          <div className="grid grid-cols-2 gap-4">
            {field(
              "f-location",
              "City / Location *",
              <input
                id="f-location"
                required
                className={inputClass}
                style={S.input}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />,
            )}
            {field(
              "f-country",
              "Country *",
              <input
                id="f-country"
                required
                className={inputClass}
                style={S.input}
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />,
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {field(
              "f-company",
              "Company *",
              <input
                id="f-company"
                required
                className={inputClass}
                style={S.input}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />,
            )}
            {field(
              "f-age",
              "Age Restriction *",
              <input
                id="f-age"
                required
                className={inputClass}
                style={S.input}
                placeholder="e.g. 14+ or All Ages"
                value={form.ageRestriction}
                onChange={(e) =>
                  setForm({ ...form, ageRestriction: e.target.value })
                }
              />,
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {field(
              "f-season",
              "Season",
              <select
                id="f-season"
                className={inputClass}
                style={S.input}
                value={form.season}
                onChange={(e) =>
                  setForm({ ...form, season: e.target.value as SeasonKey })
                }
              >
                {SEASON_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>,
            )}
            {field(
              "f-eventtype",
              "Event Type",
              <select
                id="f-eventtype"
                className={inputClass}
                style={S.input}
                value={form.eventType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    eventType: e.target.value as EventTypeKey,
                  })
                }
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {getEventTypeLabel(
                      t === "EDM"
                        ? EventType.EDM
                        : t === "Family"
                          ? EventType.Family
                          : t === "ClubHotel"
                            ? EventType.ClubHotel
                            : EventType.Rave,
                    )}
                  </option>
                ))}
              </select>,
            )}
            {field(
              "f-status",
              "Status",
              <select
                id="f-status"
                className={inputClass}
                style={S.input}
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as StatusKey })
                }
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s === "ComingSoon" ? "Coming Soon" : "Active"}
                  </option>
                ))}
              </select>,
            )}
          </div>

          {field(
            "f-weekends",
            "Weekends / Dates *",
            <input
              id="f-weekends"
              required
              className={inputClass}
              style={S.input}
              placeholder='e.g. "July 12–13 & July 19–20, 2025"'
              value={form.weekends}
              onChange={(e) => setForm({ ...form, weekends: e.target.value })}
            />,
          )}

          <div className="grid grid-cols-2 gap-4">
            {field(
              "f-price-min",
              "Ticket Price Min (pence) *",
              <input
                id="f-price-min"
                type="number"
                required
                min="0"
                className={inputClass}
                style={S.input}
                placeholder="e.g. 8900 = £89"
                value={form.ticketPriceMin}
                onChange={(e) =>
                  setForm({ ...form, ticketPriceMin: e.target.value })
                }
              />,
            )}
            {field(
              "f-price-max",
              "Ticket Price Max (pence) *",
              <input
                id="f-price-max"
                type="number"
                required
                min="0"
                className={inputClass}
                style={S.input}
                placeholder="e.g. 35000 = £350"
                value={form.ticketPriceMax}
                onChange={(e) =>
                  setForm({ ...form, ticketPriceMax: e.target.value })
                }
              />,
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {field(
              "f-rev-min",
              "Est. Revenue Min",
              <input
                id="f-rev-min"
                className={inputClass}
                style={S.input}
                placeholder="e.g. £500K"
                value={form.estimatedRevenueMin}
                onChange={(e) =>
                  setForm({ ...form, estimatedRevenueMin: e.target.value })
                }
              />,
            )}
            {field(
              "f-rev-max",
              "Est. Revenue Max",
              <input
                id="f-rev-max"
                className={inputClass}
                style={S.input}
                placeholder="e.g. £1.2M"
                value={form.estimatedRevenueMax}
                onChange={(e) =>
                  setForm({ ...form, estimatedRevenueMax: e.target.value })
                }
              />,
            )}
          </div>

          {field(
            "f-image",
            "Image URL",
            <input
              id="f-image"
              type="url"
              className={inputClass}
              style={S.input}
              placeholder="https://..."
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />,
          )}

          {field(
            "f-ticket-url",
            "Ticket Purchase URL",
            <input
              id="f-ticket-url"
              type="url"
              className={inputClass}
              style={S.input}
              placeholder="https://tickets.example.com (optional — only used when Active)"
              value={form.ticketUrl}
              onChange={(e) => setForm({ ...form, ticketUrl: e.target.value })}
              data-ocid="festival-form-ticket-url"
            />,
          )}

          {field(
            "f-notes",
            "Special Notes",
            <input
              id="f-notes"
              className={inputClass}
              style={S.input}
              placeholder="Optional"
              value={form.specialNotes}
              onChange={(e) =>
                setForm({ ...form, specialNotes: e.target.value })
              }
            />,
          )}

          {field(
            "f-desc",
            "Description",
            <textarea
              id="f-desc"
              rows={3}
              className={`${inputClass} resize-none`}
              style={S.input}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />,
          )}

          {field(
            "f-lineup",
            "Lineup",
            <textarea
              id="f-lineup"
              rows={2}
              className={`${inputClass} resize-none`}
              style={S.input}
              placeholder="Comma-separated artists"
              value={form.lineup}
              onChange={(e) => setForm({ ...form, lineup: e.target.value })}
            />,
          )}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-2.5 text-sm font-display uppercase tracking-wider transition-smooth hover:opacity-70"
              style={{
                border: "1px solid oklch(0.25 0.02 260 / 0.5)",
                color: "oklch(0.5 0 0)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl px-5 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.2 180 / 0.9), oklch(0.55 0.23 310 / 0.9))",
                color: "oklch(0.08 0 0)",
              }}
              data-ocid="festival-form-save-btn"
            >
              {isPending
                ? "Saving…"
                : festival
                  ? "Save Changes"
                  : "Add Festival"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

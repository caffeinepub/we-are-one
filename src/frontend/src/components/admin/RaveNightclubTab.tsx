import {
  Edit2,
  ListMusic,
  Moon,
  Plus,
  Trash2,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  useAddNightclubEvent,
  useAddNightclubSet,
  useAddRaveEvent,
  useAddRaveSet,
  useCategories,
  useDeleteNightclubEvent,
  useDeleteNightclubSet,
  useDeleteRaveEvent,
  useDeleteRaveSet,
  useFestivals,
  useNightclubEvents,
  useNightclubSets,
  useRaveEvents,
  useRaveSets,
  useUpdateNightclubEvent,
  useUpdateNightclubSet,
  useUpdateRaveEvent,
  useUpdateRaveSet,
} from "../../hooks/useBackend";
import type {
  NightclubEvent,
  NightclubEventInput,
  NightclubSet,
  NightclubSetInput,
  RaveEvent,
  RaveEventInput,
  RaveSet,
  RaveSetInput,
} from "../../types/festival";

// ── Shared styles ─────────────────────────────────────────────────────────────

const S = {
  card: {
    background: "oklch(0.1 0.02 260)",
    border: "1px solid oklch(0.22 0.02 260 / 0.4)",
  } as React.CSSProperties,
  th: { color: "oklch(0.5 0 0)" } as React.CSSProperties,
  td: { color: "oklch(0.85 0 0)" } as React.CSSProperties,
  tdMuted: { color: "oklch(0.6 0 0)" } as React.CSSProperties,
  rowBorder: {
    borderBottom: "1px solid oklch(0.15 0.01 260)",
  } as React.CSSProperties,
  input: {
    background: "oklch(0.07 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.5)",
    color: "oklch(0.9 0 0)",
    borderRadius: "0.75rem",
    padding: "0.625rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
  } as React.CSSProperties,
  label: {
    display: "block",
    marginBottom: "0.375rem",
    fontSize: "0.75rem",
    fontFamily: "var(--font-display)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "oklch(0.5 0 0)",
  } as React.CSSProperties,
};

// ── Tab segment button ────────────────────────────────────────────────────────

interface SegmentButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color: string;
}

function SegmentButton({
  active,
  onClick,
  icon,
  label,
  color,
}: SegmentButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth"
      style={
        active
          ? {
              background: `${color}20`,
              color,
              border: `1px solid ${color}60`,
              boxShadow: `0 0 20px ${color}18`,
            }
          : {
              background: "oklch(0.12 0.02 260)",
              color: "oklch(0.45 0 0)",
              border: "1px solid oklch(0.2 0.02 260)",
            }
      }
    >
      {icon}
      {label}
    </button>
  );
}

// ── Set form modal (shared for Rave & Nightclub) ──────────────────────────────

interface SetFormValues {
  nightLabel: string;
  artistName: string;
  startTime: string;
  endTime: string;
  stage: string;
  youtubeUrl: string;
}

interface SetFormModalProps {
  title: string;
  accentColor: string;
  set?: {
    nightLabel: string;
    artistName: string;
    startTime: string;
    endTime: string;
    stage: string;
    youtubeUrl?: string;
  };
  onSave: (v: SetFormValues) => void;
  onClose: () => void;
  isPending: boolean;
}

function SetFormModal({
  title,
  accentColor,
  set,
  onSave,
  onClose,
  isPending,
}: SetFormModalProps) {
  const [v, setV] = useState<SetFormValues>({
    nightLabel: set?.nightLabel ?? "",
    artistName: set?.artistName ?? "",
    startTime: set?.startTime ?? "",
    endTime: set?.endTime ?? "",
    stage: set?.stage ?? "",
    youtubeUrl: set?.youtubeUrl ?? "",
  });

  function field(key: keyof SetFormValues, value: string) {
    setV((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(v);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 0.8)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6"
        style={{
          background: "oklch(0.1 0.02 260)",
          border: `2px solid ${accentColor}50`,
          boxShadow: `0 0 60px ${accentColor}15`,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="font-display font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 transition-smooth hover:scale-110"
            style={{ color: "oklch(0.5 0 0)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="set-night-label" style={S.label}>
                Night / Day Label *
              </label>
              <input
                id="set-night-label"
                type="text"
                required
                value={v.nightLabel}
                onChange={(e) => field("nightLabel", e.target.value)}
                placeholder="e.g. Friday Night"
                style={S.input}
                data-ocid="set-form-night-label"
              />
            </div>
            <div>
              <label htmlFor="set-artist" style={S.label}>
                Artist Name *
              </label>
              <input
                id="set-artist"
                type="text"
                required
                value={v.artistName}
                onChange={(e) => field("artistName", e.target.value)}
                placeholder="DJ / artist name"
                style={S.input}
                data-ocid="set-form-artist"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="set-start" style={S.label}>
                Start Time *
              </label>
              <input
                id="set-start"
                type="text"
                required
                value={v.startTime}
                onChange={(e) => field("startTime", e.target.value)}
                placeholder="22:00"
                style={S.input}
                data-ocid="set-form-start"
              />
            </div>
            <div>
              <label htmlFor="set-end" style={S.label}>
                End Time *
              </label>
              <input
                id="set-end"
                type="text"
                required
                value={v.endTime}
                onChange={(e) => field("endTime", e.target.value)}
                placeholder="00:00"
                style={S.input}
                data-ocid="set-form-end"
              />
            </div>
            <div>
              <label htmlFor="set-stage" style={S.label}>
                Stage
              </label>
              <input
                id="set-stage"
                type="text"
                value={v.stage}
                onChange={(e) => field("stage", e.target.value)}
                placeholder="Main Stage"
                style={S.input}
                data-ocid="set-form-stage"
              />
            </div>
          </div>
          <div>
            <label htmlFor="set-youtube" style={S.label}>
              YouTube URL (optional)
            </label>
            <input
              id="set-youtube"
              type="url"
              value={v.youtubeUrl}
              onChange={(e) => field("youtubeUrl", e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              style={S.input}
              data-ocid="set-form-youtube"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl py-3 text-sm font-display font-medium uppercase tracking-wider transition-smooth hover:opacity-80"
              style={{
                background: "oklch(0.15 0.02 260)",
                border: "1px solid oklch(0.25 0.02 260 / 0.5)",
                color: "oklch(0.6 0 0)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-xl py-3 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                background: `linear-gradient(135deg, ${accentColor}e0, ${accentColor}a0)`,
                color: "oklch(0.08 0 0)",
                boxShadow: `0 0 20px ${accentColor}30`,
              }}
              data-ocid="set-form-save"
            >
              {isPending ? "Saving…" : "Save Set"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Sets sub-panel ────────────────────────────────────────────────────────────

type SetsPanelType = "rave" | "nightclub";

interface SetsPanelProps {
  type: SetsPanelType;
  eventId: bigint;
  eventName: string;
  accentColor: string;
  onClose: () => void;
}

function SetsPanel({
  type,
  eventId,
  eventName,
  accentColor,
  onClose,
}: SetsPanelProps) {
  const { data: raveSets = [] } = useRaveSets(type === "rave" ? eventId : 0n);
  const { data: ncSets = [] } = useNightclubSets(
    type === "nightclub" ? eventId : 0n,
  );
  const sets: (RaveSet | NightclubSet)[] = type === "rave" ? raveSets : ncSets;

  const addRaveSet = useAddRaveSet();
  const updateRaveSet = useUpdateRaveSet();
  const deleteRaveSet = useDeleteRaveSet();
  const addNcSet = useAddNightclubSet();
  const updateNcSet = useUpdateNightclubSet();
  const deleteNcSet = useDeleteNightclubSet();

  type SetModal =
    | { kind: "none" }
    | { kind: "add" }
    | { kind: "edit"; set: RaveSet | NightclubSet };

  const [modal, setModal] = useState<SetModal>({ kind: "none" });
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);

  const isPending =
    addRaveSet.isPending ||
    updateRaveSet.isPending ||
    addNcSet.isPending ||
    updateNcSet.isPending;

  function handleSave(v: SetFormValues) {
    const youtubeUrl = v.youtubeUrl.trim() || undefined;

    if (type === "rave") {
      const input: RaveSetInput = {
        raveEventId: eventId,
        nightLabel: v.nightLabel.trim(),
        artistName: v.artistName.trim(),
        startTime: v.startTime.trim(),
        endTime: v.endTime.trim(),
        stage: v.stage.trim(),
        youtubeUrl,
      };
      if (modal.kind === "add") {
        addRaveSet.mutate(input, {
          onSuccess: () => setModal({ kind: "none" }),
        });
      } else if (modal.kind === "edit") {
        updateRaveSet.mutate(
          { id: modal.set.id, input },
          { onSuccess: () => setModal({ kind: "none" }) },
        );
      }
    } else {
      const input: NightclubSetInput = {
        nightclubEventId: eventId,
        nightLabel: v.nightLabel.trim(),
        artistName: v.artistName.trim(),
        startTime: v.startTime.trim(),
        endTime: v.endTime.trim(),
        stage: v.stage.trim(),
        youtubeUrl,
      };
      if (modal.kind === "add") {
        addNcSet.mutate(input, { onSuccess: () => setModal({ kind: "none" }) });
      } else if (modal.kind === "edit") {
        updateNcSet.mutate(
          { id: modal.set.id, input },
          { onSuccess: () => setModal({ kind: "none" }) },
        );
      }
    }
  }

  function handleDelete(id: bigint) {
    if (type === "rave") {
      deleteRaveSet.mutate({ id, raveEventId: eventId });
    } else {
      deleteNcSet.mutate({ id, nightclubEventId: eventId });
    }
    setDeleteConfirm(null);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 0.75)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl flex flex-col"
        style={{
          background: "oklch(0.09 0.02 260)",
          border: `2px solid ${accentColor}40`,
          boxShadow: `0 0 80px ${accentColor}12`,
          maxHeight: "85vh",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5"
          style={{ borderBottom: "1px solid oklch(0.18 0.02 260)" }}
        >
          <div>
            <h2
              className="font-display font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Manage Sets
            </h2>
            <p
              className="mt-0.5 text-xs font-body"
              style={{ color: "oklch(0.5 0 0)" }}
            >
              {eventName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setModal({ kind: "add" })}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
              style={{
                background: `${accentColor}20`,
                color: accentColor,
                border: `1px solid ${accentColor}50`,
              }}
              data-ocid="add-set-btn"
            >
              <Plus size={12} />
              Add Set
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 transition-smooth hover:scale-110"
              style={{ color: "oklch(0.5 0 0)" }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid oklch(0.15 0.01 260)" }}>
                {[
                  "Night/Day",
                  "Artist",
                  "Time",
                  "Stage",
                  "YouTube",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-display uppercase tracking-wider whitespace-nowrap"
                    style={S.th}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sets.map((set) => (
                <tr
                  key={set.id.toString()}
                  style={S.rowBorder}
                  data-ocid="set-admin-row"
                >
                  <td className="px-4 py-3 text-xs max-w-[100px]" style={S.td}>
                    <span className="truncate block">{set.nightLabel}</span>
                  </td>
                  <td
                    className="px-4 py-3 font-medium max-w-[140px]"
                    style={S.td}
                  >
                    <span className="truncate block">{set.artistName}</span>
                  </td>
                  <td
                    className="px-4 py-3 text-xs whitespace-nowrap"
                    style={S.tdMuted}
                  >
                    {set.startTime}–{set.endTime}
                  </td>
                  <td
                    className="px-4 py-3 text-xs max-w-[100px]"
                    style={S.tdMuted}
                  >
                    <span className="truncate block">{set.stage || "—"}</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {set.youtubeUrl ? (
                      <a
                        href={set.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 transition-smooth hover:opacity-80"
                        style={{ color: "oklch(0.72 0.2 25)" }}
                        aria-label="YouTube link"
                      >
                        <Youtube size={13} />
                        Link
                      </a>
                    ) : (
                      <span style={{ color: "oklch(0.35 0 0)" }}>—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => setModal({ kind: "edit", set })}
                        className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                        style={{ color: "oklch(0.65 0.18 70)" }}
                        data-ocid="admin-edit-set-btn"
                      >
                        <Edit2 size={14} />
                      </button>
                      {deleteConfirm === set.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleDelete(set.id)}
                            className="rounded-lg px-2 py-1 text-xs font-bold transition-smooth"
                            style={{
                              background: "oklch(0.55 0.22 25 / 0.2)",
                              color: "oklch(0.55 0.22 25)",
                            }}
                            data-ocid="admin-confirm-delete-set"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirm(null)}
                            className="rounded-lg p-1"
                            style={{ color: "oklch(0.5 0 0)" }}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          title="Delete permanently"
                          onClick={() => setDeleteConfirm(set.id)}
                          className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                          style={{ color: "oklch(0.55 0.22 25)" }}
                          data-ocid="admin-delete-set-btn"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sets.length === 0 && (
            <div className="py-12 text-center" data-ocid="sets-admin-empty">
              <p
                className="font-display text-sm uppercase tracking-wider"
                style={S.th}
              >
                No sets yet. Add your first one.
              </p>
            </div>
          )}
        </div>
      </div>

      {(modal.kind === "add" || modal.kind === "edit") && (
        <SetFormModal
          title={modal.kind === "add" ? "Add Set" : "Edit Set"}
          accentColor={accentColor}
          set={modal.kind === "edit" ? modal.set : undefined}
          onSave={handleSave}
          onClose={() => setModal({ kind: "none" })}
          isPending={isPending}
        />
      )}
    </div>
  );
}

// ── Shared form modal ─────────────────────────────────────────────────────────

interface RaveFormValues {
  name: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  eventType: string;
  isStandalone: boolean;
  festivalId: string;
  categoryId: string;
  ticketUrl: string;
}

interface NightclubFormValues {
  name: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  isStandalone: boolean;
  festivalId: string;
  categoryId: string;
  ticketUrl: string;
}

interface RaveEventFormProps {
  event?: RaveEvent;
  festivals: { id: bigint; name: string }[];
  categories: { id: bigint; name: string }[];
  onSave: (input: RaveEventInput) => void;
  onClose: () => void;
  isPending: boolean;
}

function RaveEventForm({
  event,
  festivals,
  categories,
  onSave,
  onClose,
  isPending,
}: RaveEventFormProps) {
  const [v, setV] = useState<RaveFormValues>({
    name: event?.name ?? "",
    description: event?.description ?? "",
    date: event?.date ?? "",
    location: event?.location ?? "",
    imageUrl: event?.imageUrl ?? "",
    eventType: event?.eventType ?? "Underground",
    isStandalone: event?.isStandalone ?? true,
    festivalId: event?.festivalId?.toString() ?? "",
    categoryId: event?.categoryId?.toString() ?? "",
    ticketUrl: event?.ticketUrl ?? "",
  });

  function field(key: keyof RaveFormValues, value: string | boolean) {
    setV((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: RaveEventInput = {
      name: v.name.trim(),
      description: v.description.trim(),
      date: v.date.trim(),
      location: v.location.trim(),
      imageUrl: v.imageUrl.trim(),
      eventType: v.eventType.trim(),
      isStandalone: v.isStandalone,
      festivalId: v.festivalId ? BigInt(v.festivalId) : undefined,
      categoryId: v.categoryId ? BigInt(v.categoryId) : undefined,
      ticketUrl: v.ticketUrl.trim() || undefined,
    };
    onSave(input);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 0.75)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6"
        style={{
          background: "oklch(0.1 0.02 260)",
          border: "2px solid oklch(0.65 0.2 180 / 0.3)",
          boxShadow: "0 0 60px oklch(0.65 0.2 180 / 0.12)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="font-display font-bold uppercase tracking-wider"
            style={{ color: "oklch(0.65 0.2 180)" }}
          >
            {event ? "Edit Rave Event" : "Add Rave Event"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 transition-smooth hover:scale-110"
            style={{ color: "oklch(0.5 0 0)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="rave-name" style={S.label}>
              Name *
            </label>
            <input
              id="rave-name"
              type="text"
              required
              value={v.name}
              onChange={(e) => field("name", e.target.value)}
              placeholder="Event name"
              style={S.input}
              data-ocid="rave-form-name"
            />
          </div>
          <div>
            <label htmlFor="rave-desc" style={S.label}>
              Description
            </label>
            <textarea
              id="rave-desc"
              rows={3}
              value={v.description}
              onChange={(e) => field("description", e.target.value)}
              placeholder="Event description"
              style={{ ...S.input, resize: "vertical" }}
              data-ocid="rave-form-desc"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="rave-date" style={S.label}>
                Date
              </label>
              <input
                id="rave-date"
                type="text"
                value={v.date}
                onChange={(e) => field("date", e.target.value)}
                placeholder="e.g. 14 June 2025"
                style={S.input}
                data-ocid="rave-form-date"
              />
            </div>
            <div>
              <label htmlFor="rave-location" style={S.label}>
                Location
              </label>
              <input
                id="rave-location"
                type="text"
                value={v.location}
                onChange={(e) => field("location", e.target.value)}
                placeholder="Venue / city"
                style={S.input}
                data-ocid="rave-form-location"
              />
            </div>
          </div>
          <div>
            <label htmlFor="rave-image" style={S.label}>
              Image URL
            </label>
            <input
              id="rave-image"
              type="url"
              value={v.imageUrl}
              onChange={(e) => field("imageUrl", e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={S.input}
              data-ocid="rave-form-image"
            />
          </div>
          <div>
            <label htmlFor="rave-ticket" style={S.label}>
              Ticket URL (optional)
            </label>
            <input
              id="rave-ticket"
              type="url"
              value={v.ticketUrl}
              onChange={(e) => field("ticketUrl", e.target.value)}
              placeholder="https://tickets.example.com/rave"
              style={S.input}
              data-ocid="rave-form-ticket"
            />
          </div>
          <div>
            <label htmlFor="rave-type" style={S.label}>
              Event Type
            </label>
            <input
              id="rave-type"
              type="text"
              value={v.eventType}
              onChange={(e) => field("eventType", e.target.value)}
              placeholder="e.g. Underground, Techno, House"
              style={S.input}
              data-ocid="rave-form-type"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="rave-festival" style={S.label}>
                Festival (optional)
              </label>
              <select
                id="rave-festival"
                value={v.festivalId}
                onChange={(e) => field("festivalId", e.target.value)}
                style={{ ...S.input, colorScheme: "dark" }}
                data-ocid="rave-form-festival"
              >
                <option value="">— None —</option>
                {festivals.map((f) => (
                  <option key={f.id.toString()} value={f.id.toString()}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="rave-category" style={S.label}>
                Category (optional)
              </label>
              <select
                id="rave-category"
                value={v.categoryId}
                onChange={(e) => field("categoryId", e.target.value)}
                style={{ ...S.input, colorScheme: "dark" }}
                data-ocid="rave-form-category"
              >
                <option value="">— None —</option>
                {categories.map((c) => (
                  <option key={c.id.toString()} value={c.id.toString()}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Standalone toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={v.isStandalone}
              onClick={() => field("isStandalone", !v.isStandalone)}
              className="relative h-6 w-11 shrink-0 rounded-full transition-smooth"
              style={{
                background: v.isStandalone
                  ? "oklch(0.65 0.2 180 / 0.5)"
                  : "oklch(0.2 0.02 260)",
                border: `1px solid ${v.isStandalone ? "oklch(0.65 0.2 180 / 0.7)" : "oklch(0.3 0.02 260)"}`,
              }}
              data-ocid="rave-form-standalone"
            >
              <span
                className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-smooth"
                style={{
                  background: v.isStandalone
                    ? "oklch(0.65 0.2 180)"
                    : "oklch(0.4 0 0)",
                  transform: v.isStandalone
                    ? "translateX(20px)"
                    : "translateX(0)",
                }}
              />
            </button>
            <span
              className="font-display text-xs uppercase tracking-wider"
              style={{ color: "oklch(0.55 0 0)" }}
            >
              Standalone event
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl py-3 text-sm font-display font-medium uppercase tracking-wider transition-smooth hover:opacity-80"
              style={{
                background: "oklch(0.15 0.02 260)",
                border: "1px solid oklch(0.25 0.02 260 / 0.5)",
                color: "oklch(0.6 0 0)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-xl py-3 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.2 180 / 0.9), oklch(0.55 0.23 310 / 0.9))",
                color: "oklch(0.08 0 0)",
                boxShadow: "0 0 20px oklch(0.65 0.2 180 / 0.25)",
              }}
              data-ocid="rave-form-save"
            >
              {isPending ? "Saving…" : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface NightclubEventFormProps {
  event?: NightclubEvent;
  festivals: { id: bigint; name: string }[];
  categories: { id: bigint; name: string }[];
  onSave: (input: NightclubEventInput) => void;
  onClose: () => void;
  isPending: boolean;
}

function NightclubEventForm({
  event,
  festivals,
  categories,
  onSave,
  onClose,
  isPending,
}: NightclubEventFormProps) {
  const [v, setV] = useState<NightclubFormValues>({
    name: event?.name ?? "",
    description: event?.description ?? "",
    date: event?.date ?? "",
    location: event?.location ?? "",
    imageUrl: event?.imageUrl ?? "",
    isStandalone: event?.isStandalone ?? true,
    festivalId: event?.festivalId?.toString() ?? "",
    categoryId: event?.categoryId?.toString() ?? "",
    ticketUrl: event?.ticketUrl ?? "",
  });

  function field(key: keyof NightclubFormValues, value: string | boolean) {
    setV((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: NightclubEventInput = {
      name: v.name.trim(),
      description: v.description.trim(),
      date: v.date.trim(),
      location: v.location.trim(),
      imageUrl: v.imageUrl.trim(),
      isStandalone: v.isStandalone,
      festivalId: v.festivalId ? BigInt(v.festivalId) : undefined,
      categoryId: v.categoryId ? BigInt(v.categoryId) : undefined,
      ticketUrl: v.ticketUrl.trim() || undefined,
    };
    onSave(input);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 0.75)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6"
        style={{
          background: "oklch(0.1 0.02 260)",
          border: "2px solid oklch(0.55 0.23 310 / 0.3)",
          boxShadow: "0 0 60px oklch(0.55 0.23 310 / 0.12)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="font-display font-bold uppercase tracking-wider"
            style={{ color: "oklch(0.55 0.23 310)" }}
          >
            {event ? "Edit Nightclub Event" : "Add Nightclub Event"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 transition-smooth hover:scale-110"
            style={{ color: "oklch(0.5 0 0)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="nc-name" style={S.label}>
              Name *
            </label>
            <input
              id="nc-name"
              type="text"
              required
              value={v.name}
              onChange={(e) => field("name", e.target.value)}
              placeholder="Event name"
              style={S.input}
              data-ocid="nc-form-name"
            />
          </div>
          <div>
            <label htmlFor="nc-desc" style={S.label}>
              Description
            </label>
            <textarea
              id="nc-desc"
              rows={3}
              value={v.description}
              onChange={(e) => field("description", e.target.value)}
              placeholder="Event description"
              style={{ ...S.input, resize: "vertical" }}
              data-ocid="nc-form-desc"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="nc-date" style={S.label}>
                Date
              </label>
              <input
                id="nc-date"
                type="text"
                value={v.date}
                onChange={(e) => field("date", e.target.value)}
                placeholder="e.g. 20 July 2025"
                style={S.input}
                data-ocid="nc-form-date"
              />
            </div>
            <div>
              <label htmlFor="nc-location" style={S.label}>
                Location
              </label>
              <input
                id="nc-location"
                type="text"
                value={v.location}
                onChange={(e) => field("location", e.target.value)}
                placeholder="Club / venue / city"
                style={S.input}
                data-ocid="nc-form-location"
              />
            </div>
          </div>
          <div>
            <label htmlFor="nc-image" style={S.label}>
              Image URL
            </label>
            <input
              id="nc-image"
              type="url"
              value={v.imageUrl}
              onChange={(e) => field("imageUrl", e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={S.input}
              data-ocid="nc-form-image"
            />
          </div>
          <div>
            <label htmlFor="nc-ticket" style={S.label}>
              Ticket URL (optional)
            </label>
            <input
              id="nc-ticket"
              type="url"
              value={v.ticketUrl}
              onChange={(e) => field("ticketUrl", e.target.value)}
              placeholder="https://tickets.example.com/nightclub"
              style={S.input}
              data-ocid="nc-form-ticket"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="nc-festival" style={S.label}>
                Festival (optional)
              </label>
              <select
                id="nc-festival"
                value={v.festivalId}
                onChange={(e) => field("festivalId", e.target.value)}
                style={{ ...S.input, colorScheme: "dark" }}
                data-ocid="nc-form-festival"
              >
                <option value="">— None —</option>
                {festivals.map((f) => (
                  <option key={f.id.toString()} value={f.id.toString()}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="nc-category" style={S.label}>
                Category (optional)
              </label>
              <select
                id="nc-category"
                value={v.categoryId}
                onChange={(e) => field("categoryId", e.target.value)}
                style={{ ...S.input, colorScheme: "dark" }}
                data-ocid="nc-form-category"
              >
                <option value="">— None —</option>
                {categories.map((c) => (
                  <option key={c.id.toString()} value={c.id.toString()}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Standalone toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={v.isStandalone}
              onClick={() => field("isStandalone", !v.isStandalone)}
              className="relative h-6 w-11 shrink-0 rounded-full transition-smooth"
              style={{
                background: v.isStandalone
                  ? "oklch(0.55 0.23 310 / 0.5)"
                  : "oklch(0.2 0.02 260)",
                border: `1px solid ${v.isStandalone ? "oklch(0.55 0.23 310 / 0.7)" : "oklch(0.3 0.02 260)"}`,
              }}
              data-ocid="nc-form-standalone"
            >
              <span
                className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-smooth"
                style={{
                  background: v.isStandalone
                    ? "oklch(0.55 0.23 310)"
                    : "oklch(0.4 0 0)",
                  transform: v.isStandalone
                    ? "translateX(20px)"
                    : "translateX(0)",
                }}
              />
            </button>
            <span
              className="font-display text-xs uppercase tracking-wider"
              style={{ color: "oklch(0.55 0 0)" }}
            >
              Standalone event
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl py-3 text-sm font-display font-medium uppercase tracking-wider transition-smooth hover:opacity-80"
              style={{
                background: "oklch(0.15 0.02 260)",
                border: "1px solid oklch(0.25 0.02 260 / 0.5)",
                color: "oklch(0.6 0 0)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-xl py-3 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.23 310 / 0.9), oklch(0.65 0.18 70 / 0.9))",
                color: "oklch(0.08 0 0)",
                boxShadow: "0 0 20px oklch(0.55 0.23 310 / 0.25)",
              }}
              data-ocid="nc-form-save"
            >
              {isPending ? "Saving…" : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Rave events section ───────────────────────────────────────────────────────

type RaveModal =
  | { type: "none" }
  | { type: "add" }
  | { type: "edit"; event: RaveEvent };

type ManageSetsState = { eventId: bigint; eventName: string } | null;

function RaveSection() {
  const { data: events = [] } = useRaveEvents();
  const { data: festivals = [] } = useFestivals();
  const { data: categories = [] } = useCategories();
  const addRave = useAddRaveEvent();
  const updateRave = useUpdateRaveEvent();
  const deleteRave = useDeleteRaveEvent();
  const [modal, setModal] = useState<RaveModal>({ type: "none" });
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);
  const [manageSets, setManageSets] = useState<ManageSetsState>(null);

  function handleSave(input: RaveEventInput) {
    if (modal.type === "add") {
      addRave.mutate(input, { onSuccess: () => setModal({ type: "none" }) });
    } else if (modal.type === "edit") {
      updateRave.mutate(
        { id: modal.event.id, input },
        { onSuccess: () => setModal({ type: "none" }) },
      );
    }
  }

  function getFestivalName(festivalId?: bigint) {
    if (!festivalId) return "—";
    return festivals.find((f) => f.id === festivalId)?.name ?? "—";
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-display uppercase tracking-wider"
          style={S.th}
        >
          {events.length} Rave Event{events.length !== 1 ? "s" : ""}
        </p>
        <button
          type="button"
          onClick={() => setModal({ type: "add" })}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.2 180 / 0.9), oklch(0.55 0.23 310 / 0.9))",
            color: "oklch(0.08 0 0)",
            boxShadow: "0 0 20px oklch(0.65 0.2 180 / 0.25)",
          }}
          data-ocid="admin-add-rave-btn"
        >
          <Plus size={14} />
          Add Rave Event
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl" style={S.card}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid oklch(0.18 0.01 260)" }}>
              {["Name", "Date", "Location", "Type", "Festival", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-display uppercase tracking-wider whitespace-nowrap"
                    style={S.th}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr
                key={ev.id.toString()}
                style={S.rowBorder}
                data-ocid="rave-admin-row"
              >
                <td
                  className="px-4 py-3 font-medium max-w-[180px]"
                  style={S.td}
                >
                  <span className="truncate block">{ev.name}</span>
                </td>
                <td
                  className="px-4 py-3 text-xs whitespace-nowrap"
                  style={S.tdMuted}
                >
                  {ev.date || "—"}
                </td>
                <td
                  className="px-4 py-3 text-xs max-w-[140px]"
                  style={S.tdMuted}
                >
                  <span className="truncate block">{ev.location || "—"}</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  {ev.eventType ? (
                    <span
                      className="rounded-full px-2.5 py-0.5 font-display text-xs uppercase tracking-wider"
                      style={{
                        background: "oklch(0.65 0.2 180 / 0.12)",
                        color: "oklch(0.65 0.2 180)",
                      }}
                    >
                      {ev.eventType}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td
                  className="px-4 py-3 text-xs max-w-[140px]"
                  style={S.tdMuted}
                >
                  <span className="truncate block">
                    {getFestivalName(ev.festivalId)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Manage Sets"
                      onClick={() =>
                        setManageSets({ eventId: ev.id, eventName: ev.name })
                      }
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.65 0.2 180)" }}
                      data-ocid="admin-manage-sets-rave-btn"
                    >
                      <ListMusic size={16} />
                    </button>
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => setModal({ type: "edit", event: ev })}
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.65 0.18 70)" }}
                      data-ocid="admin-edit-rave-btn"
                    >
                      <Edit2 size={16} />
                    </button>
                    {deleteConfirm === ev.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deleteRave.mutate(ev.id);
                            setDeleteConfirm(null);
                          }}
                          className="rounded-lg px-2 py-1 text-xs font-bold transition-smooth"
                          style={{
                            background: "oklch(0.55 0.22 25 / 0.2)",
                            color: "oklch(0.55 0.22 25)",
                          }}
                          data-ocid="admin-confirm-delete-rave"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirm(null)}
                          className="rounded-lg p-1"
                          style={{ color: "oklch(0.5 0 0)" }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        title="Delete permanently"
                        onClick={() => setDeleteConfirm(ev.id)}
                        className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                        data-ocid="admin-delete-rave-btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <div className="py-16 text-center" data-ocid="rave-admin-empty">
            <p
              className="font-display text-sm uppercase tracking-wider"
              style={S.th}
            >
              No rave events yet. Add your first one.
            </p>
          </div>
        )}
      </div>

      {(modal.type === "add" || modal.type === "edit") && (
        <RaveEventForm
          event={modal.type === "edit" ? modal.event : undefined}
          festivals={festivals}
          categories={categories}
          onSave={handleSave}
          onClose={() => setModal({ type: "none" })}
          isPending={addRave.isPending || updateRave.isPending}
        />
      )}

      {manageSets && (
        <SetsPanel
          type="rave"
          eventId={manageSets.eventId}
          eventName={manageSets.eventName}
          accentColor="oklch(0.65 0.2 180)"
          onClose={() => setManageSets(null)}
        />
      )}
    </div>
  );
}

// ── Nightclub events section ──────────────────────────────────────────────────

type NightclubModal =
  | { type: "none" }
  | { type: "add" }
  | { type: "edit"; event: NightclubEvent };

function NightclubSection() {
  const { data: events = [] } = useNightclubEvents();
  const { data: festivals = [] } = useFestivals();
  const { data: categories = [] } = useCategories();
  const addNC = useAddNightclubEvent();
  const updateNC = useUpdateNightclubEvent();
  const deleteNC = useDeleteNightclubEvent();
  const [modal, setModal] = useState<NightclubModal>({ type: "none" });
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);
  const [manageSets, setManageSets] = useState<ManageSetsState>(null);

  function handleSave(input: NightclubEventInput) {
    if (modal.type === "add") {
      addNC.mutate(input, { onSuccess: () => setModal({ type: "none" }) });
    } else if (modal.type === "edit") {
      updateNC.mutate(
        { id: modal.event.id, input },
        { onSuccess: () => setModal({ type: "none" }) },
      );
    }
  }

  function getFestivalName(festivalId?: bigint) {
    if (!festivalId) return "—";
    return festivals.find((f) => f.id === festivalId)?.name ?? "—";
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-display uppercase tracking-wider"
          style={S.th}
        >
          {events.length} Nightclub Event{events.length !== 1 ? "s" : ""}
        </p>
        <button
          type="button"
          onClick={() => setModal({ type: "add" })}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.23 310 / 0.9), oklch(0.65 0.18 70 / 0.9))",
            color: "oklch(0.08 0 0)",
            boxShadow: "0 0 20px oklch(0.55 0.23 310 / 0.25)",
          }}
          data-ocid="admin-add-nc-btn"
        >
          <Plus size={14} />
          Add Nightclub Event
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl" style={S.card}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid oklch(0.18 0.01 260)" }}>
              {[
                "Name",
                "Date",
                "Location",
                "Standalone",
                "Festival",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-display uppercase tracking-wider whitespace-nowrap"
                  style={S.th}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr
                key={ev.id.toString()}
                style={S.rowBorder}
                data-ocid="nc-admin-row"
              >
                <td
                  className="px-4 py-3 font-medium max-w-[180px]"
                  style={S.td}
                >
                  <span className="truncate block">{ev.name}</span>
                </td>
                <td
                  className="px-4 py-3 text-xs whitespace-nowrap"
                  style={S.tdMuted}
                >
                  {ev.date || "—"}
                </td>
                <td
                  className="px-4 py-3 text-xs max-w-[140px]"
                  style={S.tdMuted}
                >
                  <span className="truncate block">{ev.location || "—"}</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span
                    className="rounded-full px-2.5 py-0.5 font-display text-xs uppercase tracking-wider"
                    style={
                      ev.isStandalone
                        ? {
                            background: "oklch(0.55 0.23 310 / 0.12)",
                            color: "oklch(0.55 0.23 310)",
                          }
                        : {
                            background: "oklch(0.65 0.18 70 / 0.12)",
                            color: "oklch(0.65 0.18 70)",
                          }
                    }
                  >
                    {ev.isStandalone ? "Yes" : "No"}
                  </span>
                </td>
                <td
                  className="px-4 py-3 text-xs max-w-[140px]"
                  style={S.tdMuted}
                >
                  <span className="truncate block">
                    {getFestivalName(ev.festivalId)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Manage Sets"
                      onClick={() =>
                        setManageSets({ eventId: ev.id, eventName: ev.name })
                      }
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.55 0.23 310)" }}
                      data-ocid="admin-manage-sets-nc-btn"
                    >
                      <ListMusic size={16} />
                    </button>
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => setModal({ type: "edit", event: ev })}
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.65 0.18 70)" }}
                      data-ocid="admin-edit-nc-btn"
                    >
                      <Edit2 size={16} />
                    </button>
                    {deleteConfirm === ev.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deleteNC.mutate(ev.id);
                            setDeleteConfirm(null);
                          }}
                          className="rounded-lg px-2 py-1 text-xs font-bold transition-smooth"
                          style={{
                            background: "oklch(0.55 0.22 25 / 0.2)",
                            color: "oklch(0.55 0.22 25)",
                          }}
                          data-ocid="admin-confirm-delete-nc"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirm(null)}
                          className="rounded-lg p-1"
                          style={{ color: "oklch(0.5 0 0)" }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        title="Delete permanently"
                        onClick={() => setDeleteConfirm(ev.id)}
                        className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                        data-ocid="admin-delete-nc-btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <div className="py-16 text-center" data-ocid="nc-admin-empty">
            <p
              className="font-display text-sm uppercase tracking-wider"
              style={S.th}
            >
              No nightclub events yet. Add your first one.
            </p>
          </div>
        )}
      </div>

      {(modal.type === "add" || modal.type === "edit") && (
        <NightclubEventForm
          event={modal.type === "edit" ? modal.event : undefined}
          festivals={festivals}
          categories={categories}
          onSave={handleSave}
          onClose={() => setModal({ type: "none" })}
          isPending={addNC.isPending || updateNC.isPending}
        />
      )}

      {manageSets && (
        <SetsPanel
          type="nightclub"
          eventId={manageSets.eventId}
          eventName={manageSets.eventName}
          accentColor="oklch(0.55 0.23 310)"
          onClose={() => setManageSets(null)}
        />
      )}
    </div>
  );
}

// ── Combined Tab ──────────────────────────────────────────────────────────────

type Section = "rave" | "nightclub";

export default function RaveNightclubTab() {
  const [section, setSection] = useState<Section>("rave");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3" data-ocid="rave-nightclub-tabs">
        <SegmentButton
          active={section === "rave"}
          onClick={() => setSection("rave")}
          icon={<Zap size={14} />}
          label="Rave Events"
          color="oklch(0.65 0.2 180)"
        />
        <SegmentButton
          active={section === "nightclub"}
          onClick={() => setSection("nightclub")}
          icon={<Moon size={14} />}
          label="Nightclub Events"
          color="oklch(0.55 0.23 310)"
        />
      </div>

      <div style={{ height: "1px", background: "oklch(0.18 0.02 260)" }} />

      {section === "rave" ? <RaveSection /> : <NightclubSection />}
    </div>
  );
}

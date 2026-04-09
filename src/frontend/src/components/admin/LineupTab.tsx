import { Edit2, Music, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  useAddLineupEntry,
  useDeleteLineupEntry,
  useFestivals,
  useLineup,
  useUpdateLineupEntry,
} from "../../hooks/useBackend";
import type { LineupEntry, LineupInput } from "../../types/festival";

// ── Styles ────────────────────────────────────────────────────────────────────

const S = {
  card: {
    background: "oklch(0.1 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.4)",
  } as React.CSSProperties,
  th: { color: "oklch(0.5 0 0)" } as React.CSSProperties,
  td: { color: "oklch(0.85 0 0)" } as React.CSSProperties,
  tdMuted: { color: "oklch(0.6 0 0)" } as React.CSSProperties,
  rowBorder: {
    borderBottom: "1px solid oklch(0.15 0.01 260)",
  } as React.CSSProperties,
};

// ── Modal Form ────────────────────────────────────────────────────────────────

interface LineupFormProps {
  festivalId: bigint;
  entry?: LineupEntry;
  onSave: (input: LineupInput) => void;
  onClose: () => void;
  isPending: boolean;
}

function LineupForm({
  festivalId,
  entry,
  onSave,
  onClose,
  isPending,
}: LineupFormProps) {
  const [artistName, setArtistName] = useState(entry?.artistName ?? "");
  const [stage, setStage] = useState(entry?.stage ?? "");
  const [timeSlot, setTimeSlot] = useState(entry?.timeSlot ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      festivalId,
      artistName: artistName.trim(),
      stage: stage.trim(),
      timeSlot: timeSlot.trim(),
    });
  }

  const inputStyle: React.CSSProperties = {
    background: "oklch(0.07 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.5)",
    color: "oklch(0.9 0 0)",
    borderRadius: "0.75rem",
    padding: "0.625rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.375rem",
    fontSize: "0.75rem",
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "oklch(0.5 0 0)",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 0.7)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          background: "oklch(0.1 0.02 260)",
          border: "2px solid oklch(0.65 0.2 180 / 0.3)",
          boxShadow: "0 0 60px oklch(0.65 0.2 180 / 0.1)",
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="font-display font-bold uppercase tracking-wider"
            style={{ color: "oklch(0.65 0.2 180)" }}
          >
            {entry ? "Edit Artist" : "Add Artist"}
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
            <label htmlFor="lineup-artist" style={labelStyle}>
              Artist Name *
            </label>
            <input
              id="lineup-artist"
              type="text"
              required
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="e.g. Martin Garrix"
              style={inputStyle}
              data-ocid="lineup-form-artist"
            />
          </div>

          <div>
            <label htmlFor="lineup-stage" style={labelStyle}>
              Stage *
            </label>
            <input
              id="lineup-stage"
              type="text"
              required
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              placeholder="e.g. Main Stage, Mainstage, Freedom Stage"
              style={inputStyle}
              data-ocid="lineup-form-stage"
            />
          </div>

          <div>
            <label htmlFor="lineup-timeslot" style={labelStyle}>
              Time Slot *
            </label>
            <input
              id="lineup-timeslot"
              type="text"
              required
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              placeholder="e.g. 22:00 – 23:30"
              style={inputStyle}
              data-ocid="lineup-form-timeslot"
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
                background:
                  "linear-gradient(135deg, oklch(0.65 0.2 180 / 0.9), oklch(0.55 0.23 310 / 0.9))",
                color: "oklch(0.08 0 0)",
                boxShadow: "0 0 20px oklch(0.65 0.2 180 / 0.25)",
              }}
              data-ocid="lineup-form-save-btn"
            >
              {isPending ? "Saving…" : "Save Artist"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────────

type ModalState =
  | { type: "none" }
  | { type: "add" }
  | { type: "edit"; entry: LineupEntry };

export default function LineupTab() {
  const { data: festivals = [] } = useFestivals();
  const [selectedFestivalId, setSelectedFestivalId] = useState<bigint | null>(
    festivals.length > 0 ? festivals[0].id : null,
  );

  const activeFestivalId = selectedFestivalId ?? festivals[0]?.id ?? 0n;
  const { data: lineup = [] } = useLineup(activeFestivalId);

  const addEntry = useAddLineupEntry();
  const updateEntry = useUpdateLineupEntry();
  const deleteEntry = useDeleteLineupEntry();

  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);

  const sorted = [...lineup].sort(
    (a, b) =>
      a.stage.localeCompare(b.stage) || a.timeSlot.localeCompare(b.timeSlot),
  );

  function handleSave(input: LineupInput) {
    if (modal.type === "add") {
      addEntry.mutate(input, { onSuccess: () => setModal({ type: "none" }) });
    } else if (modal.type === "edit") {
      updateEntry.mutate(
        { id: modal.entry.id, input },
        { onSuccess: () => setModal({ type: "none" }) },
      );
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Festival selector */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <label
          htmlFor="lineup-festival-select"
          className="text-xs font-display uppercase tracking-wider shrink-0"
          style={S.th}
        >
          Festival:
        </label>
        <select
          id="lineup-festival-select"
          value={activeFestivalId.toString()}
          onChange={(e) => setSelectedFestivalId(BigInt(e.target.value))}
          className="flex-1 rounded-xl px-4 py-2.5 text-sm font-display outline-none transition-smooth"
          style={{
            background: "oklch(0.1 0.02 260)",
            border: "1px solid oklch(0.25 0.02 260 / 0.5)",
            color: "oklch(0.85 0 0)",
          }}
          data-ocid="lineup-festival-select"
        >
          {festivals.map((f) => (
            <option key={f.id.toString()} value={f.id.toString()}>
              {f.name}
            </option>
          ))}
        </select>

        {festivals.length > 0 && (
          <button
            type="button"
            onClick={() => setModal({ type: "add" })}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95 shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.2 180 / 0.9), oklch(0.55 0.23 310 / 0.9))",
              color: "oklch(0.08 0 0)",
              boxShadow: "0 0 20px oklch(0.65 0.2 180 / 0.25)",
            }}
            data-ocid="admin-add-lineup-btn"
          >
            <Plus size={14} />
            Add Artist
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl" style={S.card}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid oklch(0.2 0.01 260)" }}>
              {["Artist", "Stage", "Time Slot", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-display uppercase tracking-wider"
                  style={S.th}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((entry) => (
              <tr
                key={entry.id.toString()}
                style={S.rowBorder}
                data-ocid="lineup-row"
              >
                <td className="px-4 py-3 font-medium" style={S.td}>
                  <div className="flex items-center gap-2">
                    <Music size={14} style={{ color: "oklch(0.65 0.2 180)" }} />
                    {entry.artistName}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs" style={S.tdMuted}>
                  {entry.stage}
                </td>
                <td
                  className="px-4 py-3 font-mono text-xs"
                  style={{ color: "oklch(0.65 0.18 70)" }}
                >
                  {entry.timeSlot}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => setModal({ type: "edit", entry })}
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.65 0.18 70)" }}
                      data-ocid="admin-edit-lineup-btn"
                    >
                      <Edit2 size={16} />
                    </button>
                    {deleteConfirm === entry.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deleteEntry.mutate({
                              id: entry.id,
                              festivalId: activeFestivalId,
                            });
                            setDeleteConfirm(null);
                          }}
                          className="rounded-lg px-2 py-1 text-xs font-bold transition-smooth"
                          style={{
                            background: "oklch(0.55 0.22 25 / 0.2)",
                            color: "oklch(0.55 0.22 25)",
                          }}
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
                        title="Delete"
                        onClick={() => setDeleteConfirm(entry.id)}
                        className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                        data-ocid="admin-delete-lineup-btn"
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
        {sorted.length === 0 && (
          <div className="py-16 text-center" data-ocid="lineup-empty">
            <p
              className="font-display text-sm uppercase tracking-wider"
              style={S.th}
            >
              No artists yet. Add the first artist to this festival's lineup.
            </p>
          </div>
        )}
      </div>

      {(modal.type === "add" || modal.type === "edit") && (
        <LineupForm
          festivalId={activeFestivalId}
          entry={modal.type === "edit" ? modal.entry : undefined}
          onSave={handleSave}
          onClose={() => setModal({ type: "none" })}
          isPending={addEntry.isPending || updateEntry.isPending}
        />
      )}
    </div>
  );
}

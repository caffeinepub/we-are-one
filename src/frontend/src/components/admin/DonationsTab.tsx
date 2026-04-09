import { Edit2, Heart, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { DonationGoal, DonationGoalInput } from "../../backend";
import {
  useAddDonationGoal,
  useDeleteDonationGoal,
  useDonationGoals,
  useFestivals,
  useUpdateDonationGoal,
} from "../../hooks/useBackend";

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

// ── Form ──────────────────────────────────────────────────────────────────────

interface GoalFormProps {
  goal?: DonationGoal;
  festivalOptions: { id: bigint; name: string }[];
  onSave: (input: DonationGoalInput) => void;
  onClose: () => void;
  isPending: boolean;
}

function GoalForm({
  goal,
  festivalOptions,
  onSave,
  onClose,
  isPending,
}: GoalFormProps) {
  const [title, setTitle] = useState(goal?.title ?? "");
  const [description, setDescription] = useState(goal?.description ?? "");
  const [targetAmount, setTargetAmount] = useState(
    goal ? goal.targetAmount.toString() : "",
  );
  const [currentAmount, setCurrentAmount] = useState(
    goal ? goal.currentAmount.toString() : "0",
  );
  const [donationUrl, setDonationUrl] = useState(goal?.donationUrl ?? "");
  const [isGlobal, setIsGlobal] = useState(goal?.isGlobal ?? false);
  const [festivalId, setFestivalId] = useState<string>(
    goal?.festivalId != null ? goal.festivalId.toString() : "",
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: DonationGoalInput = {
      title: title.trim(),
      description: description.trim(),
      targetAmount: BigInt(targetAmount || "0"),
      currentAmount: BigInt(currentAmount || "0"),
      donationUrl: donationUrl.trim(),
      isGlobal,
      festivalId: festivalId ? BigInt(festivalId) : undefined,
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
          boxShadow: "0 0 60px oklch(0.55 0.23 310 / 0.1)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="font-display font-bold uppercase tracking-wider"
            style={{ color: "oklch(0.55 0.23 310)" }}
          >
            {goal ? "Edit Goal" : "Add Donation Goal"}
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
            <label htmlFor="dg-title" style={labelStyle}>
              Title *
            </label>
            <input
              id="dg-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Campaign name"
              style={inputStyle}
              data-ocid="dg-form-title"
            />
          </div>

          <div>
            <label htmlFor="dg-desc" style={labelStyle}>
              Description *
            </label>
            <textarea
              id="dg-desc"
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will this fundraise support?"
              style={{ ...inputStyle, resize: "vertical" }}
              data-ocid="dg-form-description"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="dg-target" style={labelStyle}>
                Target Amount (£) *
              </label>
              <input
                id="dg-target"
                type="number"
                required
                min={0}
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="10000"
                style={inputStyle}
                data-ocid="dg-form-target"
              />
            </div>
            <div>
              <label htmlFor="dg-current" style={labelStyle}>
                Current Amount (£)
              </label>
              <input
                id="dg-current"
                type="number"
                min={0}
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                placeholder="0"
                style={inputStyle}
                data-ocid="dg-form-current"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dg-url" style={labelStyle}>
              Donation URL
            </label>
            <input
              id="dg-url"
              type="url"
              value={donationUrl}
              onChange={(e) => setDonationUrl(e.target.value)}
              placeholder="https://donate.example.com"
              style={inputStyle}
              data-ocid="dg-form-url"
            />
          </div>

          {/* Global toggle */}
          <div
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{
              background: "oklch(0.08 0.02 260)",
              border: "1px solid oklch(0.2 0.02 260 / 0.4)",
            }}
          >
            <div>
              <p
                className="font-display text-sm font-bold uppercase tracking-wider"
                style={{ color: "oklch(0.8 0 0)" }}
              >
                Global Goal
              </p>
              <p
                className="font-body text-xs"
                style={{ color: "oklch(0.5 0 0)" }}
              >
                Show on the main Donations page as a featured campaign
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsGlobal(!isGlobal)}
              className="relative flex-shrink-0 rounded-full transition-all duration-200"
              style={{
                width: "44px",
                height: "24px",
                background: isGlobal
                  ? "oklch(0.55 0.23 310)"
                  : "oklch(0.22 0.02 260)",
                border: isGlobal
                  ? "1px solid oklch(0.55 0.23 310 / 0.6)"
                  : "1px solid oklch(0.3 0.02 260)",
                boxShadow: isGlobal
                  ? "0 0 12px oklch(0.55 0.23 310 / 0.4)"
                  : "none",
              }}
              aria-label="Toggle global"
              data-ocid="dg-form-isglobal"
            >
              <span
                className="absolute top-0.5 block h-4 w-4 rounded-full transition-transform duration-200"
                style={{
                  left: "2px",
                  background: "oklch(0.9 0 0)",
                  transform: isGlobal ? "translateX(20px)" : "translateX(0)",
                }}
              />
            </button>
          </div>

          {/* Festival selector */}
          {!isGlobal && (
            <div>
              <label htmlFor="dg-festival" style={labelStyle}>
                Festival (optional)
              </label>
              <select
                id="dg-festival"
                value={festivalId}
                onChange={(e) => setFestivalId(e.target.value)}
                style={{ ...inputStyle, colorScheme: "dark" }}
                data-ocid="dg-form-festival"
              >
                <option value="">— No specific festival —</option>
                {festivalOptions.map((f) => (
                  <option key={f.id.toString()} value={f.id.toString()}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          )}

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
                  "linear-gradient(135deg, oklch(0.55 0.23 310 / 0.9), oklch(0.65 0.2 180 / 0.9))",
                color: "oklch(0.08 0 0)",
                boxShadow: "0 0 20px oklch(0.55 0.23 310 / 0.25)",
              }}
              data-ocid="dg-form-save-btn"
            >
              {isPending ? "Saving…" : goal ? "Save Changes" : "Add Goal"}
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
  | { type: "edit"; goal: DonationGoal };

export default function DonationsTab() {
  const { data: goals = [] } = useDonationGoals();
  const { data: festivals = [] } = useFestivals();
  const addGoal = useAddDonationGoal();
  const updateGoal = useUpdateDonationGoal();
  const deleteGoal = useDeleteDonationGoal();

  const [modal, setModal] = useState<ModalState>({ type: "none" });

  const festivalOptions = festivals.map((f) => ({ id: f.id, name: f.name }));

  function handleSave(input: DonationGoalInput) {
    if (modal.type === "add") {
      addGoal.mutate(input, { onSuccess: () => setModal({ type: "none" }) });
    } else if (modal.type === "edit") {
      updateGoal.mutate(
        { id: modal.goal.id, input },
        { onSuccess: () => setModal({ type: "none" }) },
      );
    }
  }

  function getFestivalName(goal: DonationGoal): string {
    if (goal.festivalId == null) return "—";
    const f = festivals.find((x) => x.id === goal.festivalId);
    return f?.name ?? "—";
  }

  function pct(goal: DonationGoal): string {
    if (goal.targetAmount === 0n) return "0%";
    return `${Math.min(100, Number((goal.currentAmount * 100n) / goal.targetAmount))}%`;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-display uppercase tracking-wider"
          style={S.th}
        >
          {goals.length} Goal{goals.length !== 1 ? "s" : ""}
        </p>
        <button
          type="button"
          onClick={() => setModal({ type: "add" })}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.23 310 / 0.9), oklch(0.65 0.2 180 / 0.9))",
            color: "oklch(0.08 0 0)",
            boxShadow: "0 0 20px oklch(0.55 0.23 310 / 0.25)",
          }}
          data-ocid="admin-add-goal-btn"
        >
          <Plus size={14} />
          Add Goal
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl" style={S.card}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid oklch(0.2 0.01 260)" }}>
              {["Title", "Festival", "Progress", "Type", "Actions"].map((h) => (
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
            {goals.map((goal) => (
              <tr
                key={goal.id.toString()}
                style={S.rowBorder}
                data-ocid="goal-row"
              >
                <td
                  className="px-4 py-3 font-medium max-w-[180px]"
                  style={S.td}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Heart
                      size={13}
                      style={{ color: "oklch(0.55 0.23 310)", flexShrink: 0 }}
                    />
                    <span className="truncate">{goal.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs" style={S.tdMuted}>
                  {getFestivalName(goal)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <div
                      className="h-1.5 w-20 overflow-hidden rounded-full"
                      style={{ background: "oklch(0.2 0.02 260)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: pct(goal),
                          background:
                            "linear-gradient(90deg, oklch(0.55 0.23 310), oklch(0.65 0.2 180))",
                        }}
                      />
                    </div>
                    <span
                      className="text-xs font-display"
                      style={{ color: "oklch(0.55 0.23 310)" }}
                    >
                      {pct(goal)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-display uppercase tracking-wider"
                    style={
                      goal.isGlobal
                        ? {
                            background: "oklch(0.55 0.23 310 / 0.12)",
                            color: "oklch(0.55 0.23 310)",
                            border: "1px solid oklch(0.55 0.23 310 / 0.3)",
                          }
                        : {
                            background: "oklch(0.65 0.18 70 / 0.12)",
                            color: "oklch(0.65 0.18 70)",
                            border: "1px solid oklch(0.65 0.18 70 / 0.3)",
                          }
                    }
                  >
                    {goal.isGlobal ? "Global" : "Festival"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => setModal({ type: "edit", goal })}
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.65 0.18 70)" }}
                      data-ocid="admin-edit-goal-btn"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => deleteGoal.mutate(goal.id)}
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.55 0.22 25)" }}
                      data-ocid="admin-delete-goal-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {goals.length === 0 && (
          <div className="py-16 text-center" data-ocid="goals-empty">
            <p
              className="font-display text-sm uppercase tracking-wider"
              style={S.th}
            >
              No donation goals yet. Add your first campaign.
            </p>
          </div>
        )}
      </div>

      {(modal.type === "add" || modal.type === "edit") && (
        <GoalForm
          goal={modal.type === "edit" ? modal.goal : undefined}
          festivalOptions={festivalOptions}
          onSave={handleSave}
          onClose={() => setModal({ type: "none" })}
          isPending={addGoal.isPending || updateGoal.isPending}
        />
      )}
    </div>
  );
}

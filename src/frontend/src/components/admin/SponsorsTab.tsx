import { Edit2, Handshake, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  useAddSponsor,
  useDeleteSponsor,
  useFestivals,
  useSponsors,
  useUpdateSponsor,
} from "../../hooks/useBackend";
import { useAdminError } from "../../pages/AdminPage";
import type { Sponsor, SponsorInput } from "../../types/festival";

// ── Styles ────────────────────────────────────────────────────────────────────

const S = {
  card: {
    background: "oklch(0.1 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.4)",
  } as React.CSSProperties,
  th: { color: "oklch(0.5 0 0)" } as React.CSSProperties,
  td: { color: "oklch(0.85 0 0)" } as React.CSSProperties,
  tdMuted: { color: "oklch(0.6 0 0)" } as React.CSSProperties,
  amber: { color: "oklch(0.65 0.18 70)" } as React.CSSProperties,
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

// Headline is first — site-wide coverage, no festival selection needed
const TIERS = ["Headline", "Gold", "Silver", "Bronze", "Partner"];

function tierBadgeStyle(tier: string) {
  switch (tier.toLowerCase()) {
    case "headline":
      return {
        background: "oklch(0.92 0.04 200 / 0.12)",
        border: "1px solid oklch(0.92 0.04 200 / 0.5)",
        color: "oklch(0.92 0.04 200)",
      };
    case "gold":
      return {
        background: "oklch(0.65 0.18 70 / 0.15)",
        border: "1px solid oklch(0.65 0.18 70 / 0.5)",
        color: "oklch(0.65 0.18 70)",
      };
    case "silver":
      return {
        background: "oklch(0.7 0.02 210 / 0.15)",
        border: "1px solid oklch(0.7 0.02 210 / 0.4)",
        color: "oklch(0.75 0.02 210)",
      };
    case "bronze":
      return {
        background: "oklch(0.55 0.12 50 / 0.15)",
        border: "1px solid oklch(0.55 0.12 50 / 0.4)",
        color: "oklch(0.65 0.12 50)",
      };
    default:
      return {
        background: "oklch(0.55 0.23 310 / 0.1)",
        border: "1px solid oklch(0.55 0.23 310 / 0.4)",
        color: "oklch(0.65 0.23 310)",
      };
  }
}

// ── Sponsor Form ──────────────────────────────────────────────────────────────

interface SponsorFormProps {
  sponsor?: Sponsor;
  onSave: (input: SponsorInput) => void;
  onClose: () => void;
  isPending: boolean;
}

function SponsorForm({
  sponsor,
  onSave,
  onClose,
  isPending,
}: SponsorFormProps) {
  const { data: festivals = [] } = useFestivals();
  const [name, setName] = useState(sponsor?.name ?? "");
  const [logoUrl, setLogoUrl] = useState(sponsor?.logoUrl ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(sponsor?.websiteUrl ?? "");
  const [tier, setTier] = useState(sponsor?.tier ?? "Gold");
  const [selectedFestivalIds, setSelectedFestivalIds] = useState<bigint[]>(
    sponsor?.festivalIds ?? [],
  );

  const isHeadline = tier.toLowerCase() === "headline";

  function toggleFestival(id: bigint) {
    setSelectedFestivalIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      name: name.trim(),
      logoUrl: logoUrl.trim(),
      websiteUrl: websiteUrl.trim(),
      tier: tier.trim(),
      // Headline sponsors are site-wide — send empty array, handled by tier check on frontend
      festivalIds: isHeadline ? [] : selectedFestivalIds,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 0.7)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6"
        style={{
          background: "oklch(0.1 0.02 260)",
          border: "2px solid oklch(0.65 0.18 70 / 0.3)",
          boxShadow: "0 0 60px oklch(0.65 0.18 70 / 0.1)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="font-display font-bold uppercase tracking-wider"
            style={{ color: "oklch(0.65 0.18 70)" }}
          >
            {sponsor ? "Edit Sponsor" : "Add Sponsor"}
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
            <label htmlFor="sp-name" style={S.label}>
              Name *
            </label>
            <input
              id="sp-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Company or brand name"
              style={S.input}
              data-ocid="sponsor-form-name"
            />
          </div>

          <div>
            <label htmlFor="sp-tier" style={S.label}>
              Tier
            </label>
            <select
              id="sp-tier"
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              style={{ ...S.input, colorScheme: "dark" }}
              data-ocid="sponsor-form-tier"
            >
              {TIERS.map((t) => (
                <option key={t} value={t}>
                  {t === "Headline" ? "Headline (All Events)" : t}
                </option>
              ))}
            </select>
          </div>

          {/* Headline info note */}
          {isHeadline && (
            <div
              className="rounded-xl px-4 py-3 text-sm font-body"
              style={{
                background: "oklch(0.92 0.04 200 / 0.06)",
                border: "1px solid oklch(0.92 0.04 200 / 0.25)",
                color: "oklch(0.75 0.03 200)",
              }}
            >
              <strong style={{ color: "oklch(0.92 0.04 200)" }}>
                Headline sponsors
              </strong>{" "}
              are automatically associated with all WE ARE ONE events —
              festivals, raves and nightclub events. No festival selection is
              needed.
            </div>
          )}

          <div>
            <label htmlFor="sp-logo" style={S.label}>
              Logo URL
            </label>
            <input
              id="sp-logo"
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
              style={S.input}
              data-ocid="sponsor-form-logo-url"
            />
          </div>

          <div>
            <label htmlFor="sp-website" style={S.label}>
              Website URL
            </label>
            <input
              id="sp-website"
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              style={S.input}
              data-ocid="sponsor-form-website-url"
            />
          </div>

          {/* Festival associations — hidden for Headline tier */}
          {!isHeadline && festivals.length > 0 && (
            <div>
              <span style={S.label}>Associated Festivals</span>
              <div
                className="flex flex-col gap-1.5 rounded-xl p-3 max-h-40 overflow-y-auto"
                style={{
                  background: "oklch(0.07 0.02 260)",
                  border: "1px solid oklch(0.2 0.02 260 / 0.5)",
                }}
              >
                {festivals.map((f) => {
                  const checked = selectedFestivalIds.includes(f.id);
                  return (
                    <label
                      key={f.id.toString()}
                      className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-1 transition-smooth hover:opacity-80"
                      style={
                        checked
                          ? { background: "oklch(0.65 0.18 70 / 0.08)" }
                          : {}
                      }
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFestival(f.id)}
                        className="rounded accent-amber-400"
                        data-ocid={`sponsor-festival-check-${f.id.toString()}`}
                      />
                      <span
                        className="text-sm font-body truncate"
                        style={{
                          color: checked
                            ? "oklch(0.65 0.18 70)"
                            : "oklch(0.7 0 0)",
                        }}
                      >
                        {f.name}
                      </span>
                    </label>
                  );
                })}
              </div>
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
                  "linear-gradient(135deg, oklch(0.65 0.18 70 / 0.9), oklch(0.55 0.23 310 / 0.9))",
                color: "oklch(0.08 0 0)",
                boxShadow: "0 0 20px oklch(0.65 0.18 70 / 0.25)",
              }}
              data-ocid="sponsor-form-save-btn"
            >
              {isPending ? "Saving…" : "Save Sponsor"}
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
  | { type: "edit"; sponsor: Sponsor };

const TIER_SORT_ORDER = ["Headline", "Gold", "Silver", "Bronze", "Partner"];

export default function SponsorsTab() {
  const { data: sponsors = [] } = useSponsors();
  const { data: festivals = [] } = useFestivals();
  const addSponsor = useAddSponsor();
  const updateSponsor = useUpdateSponsor();
  const deleteSponsor = useDeleteSponsor();
  const { showError } = useAdminError();

  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);

  const sorted = [...sponsors].sort((a, b) => {
    const ai = TIER_SORT_ORDER.indexOf(a.tier);
    const bi = TIER_SORT_ORDER.indexOf(b.tier);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  function festivalNames(ids: bigint[]): string {
    if (!ids?.length) return "—";
    return ids
      .map((id) => festivals.find((f) => f.id === id)?.name ?? id.toString())
      .join(", ");
  }

  function handleSave(input: SponsorInput) {
    if (modal.type === "add") {
      addSponsor.mutate(input, {
        onSuccess: () => setModal({ type: "none" }),
        onError: (e) => showError(e.message),
      });
    } else if (modal.type === "edit") {
      updateSponsor.mutate(
        { id: modal.sponsor.id, input },
        {
          onSuccess: () => setModal({ type: "none" }),
          onError: (e) => showError(e.message),
        },
      );
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-display uppercase tracking-wider"
          style={S.th}
        >
          {sorted.length} Sponsor{sorted.length !== 1 ? "s" : ""}
        </p>
        <button
          type="button"
          onClick={() => setModal({ type: "add" })}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.18 70 / 0.9), oklch(0.55 0.23 310 / 0.9))",
            color: "oklch(0.08 0 0)",
            boxShadow: "0 0 20px oklch(0.65 0.18 70 / 0.25)",
          }}
          data-ocid="admin-add-sponsor-btn"
        >
          <Plus size={14} />
          Add Sponsor
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl" style={S.card}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid oklch(0.2 0.01 260)" }}>
              {["Logo", "Name", "Tier", "Website", "Festivals", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-display uppercase tracking-wider"
                    style={S.th}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {sorted.map((sponsor) => (
              <tr
                key={sponsor.id.toString()}
                style={S.rowBorder}
                data-ocid="sponsor-row"
              >
                <td className="px-4 py-3">
                  {sponsor.logoUrl ? (
                    <img
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      className="h-9 w-12 rounded-lg object-contain"
                      style={{ background: "oklch(0.18 0.02 260)" }}
                    />
                  ) : (
                    <div
                      className="flex h-9 w-12 items-center justify-center rounded-lg font-display text-sm font-bold"
                      style={{
                        background: "oklch(0.18 0.02 260)",
                        color: "oklch(0.65 0.18 70)",
                      }}
                    >
                      {sponsor.name.charAt(0)}
                    </div>
                  )}
                </td>
                <td
                  className="px-4 py-3 font-medium max-w-[160px]"
                  style={S.td}
                >
                  <span className="truncate block">{sponsor.name}</span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-display font-bold uppercase tracking-wider"
                    style={tierBadgeStyle(sponsor.tier)}
                  >
                    {sponsor.tier}
                  </span>
                </td>
                <td className="px-4 py-3 max-w-[140px]" style={S.tdMuted}>
                  {sponsor.websiteUrl ? (
                    <a
                      href={sponsor.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate block text-xs hover:opacity-80"
                      style={{ color: "oklch(0.65 0.2 180)" }}
                    >
                      {sponsor.websiteUrl.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    <span className="text-xs">—</span>
                  )}
                </td>
                <td
                  className="px-4 py-3 text-xs max-w-[180px]"
                  style={S.tdMuted}
                >
                  <span className="line-clamp-2">
                    {sponsor.tier.toLowerCase() === "headline"
                      ? "All Events"
                      : festivalNames(sponsor.festivalIds)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => setModal({ type: "edit", sponsor })}
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.65 0.18 70)" }}
                      data-ocid="admin-edit-sponsor-btn"
                    >
                      <Edit2 size={16} />
                    </button>
                    {deleteConfirm === sponsor.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deleteSponsor.mutate(sponsor.id, {
                              onError: (e) => showError(e.message),
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
                        title="Delete permanently"
                        onClick={() => setDeleteConfirm(sponsor.id)}
                        className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                        data-ocid="admin-delete-sponsor-btn"
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
          <div className="py-16 text-center" data-ocid="sponsors-admin-empty">
            <Handshake
              size={32}
              className="mx-auto mb-3"
              style={{ color: "oklch(0.3 0 0)" }}
            />
            <p
              className="font-display text-sm uppercase tracking-wider"
              style={S.th}
            >
              No sponsors yet. Add your first sponsor.
            </p>
          </div>
        )}
      </div>

      {(modal.type === "add" || modal.type === "edit") && (
        <SponsorForm
          sponsor={modal.type === "edit" ? modal.sponsor : undefined}
          onSave={handleSave}
          onClose={() => setModal({ type: "none" })}
          isPending={addSponsor.isPending || updateSponsor.isPending}
        />
      )}
    </div>
  );
}

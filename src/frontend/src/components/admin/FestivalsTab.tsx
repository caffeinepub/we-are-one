import {
  Edit2,
  Image,
  Plus,
  ToggleLeft,
  ToggleRight,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  useAddFestival,
  useDeleteFestival,
  useFestivals,
  useSetFestivalImage,
  useToggleFestivalStatus,
  useUpdateFestival,
} from "../../hooks/useBackend";
import type { Festival, FestivalInput } from "../../types/festival";
import {
  getEventTypeLabel,
  getSeasonLabel,
  isComingSoon,
} from "../../types/festival";
import FestivalForm from "./FestivalForm";
import ImageModal from "./ImageModal";

type ModalState =
  | { type: "none" }
  | { type: "add" }
  | { type: "edit"; festival: Festival }
  | { type: "image"; festival: Festival };

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
};

export default function FestivalsTab() {
  const { data: festivals = [] } = useFestivals();
  const addFestival = useAddFestival();
  const updateFestival = useUpdateFestival();
  const deleteFestival = useDeleteFestival();
  const toggleStatus = useToggleFestivalStatus();
  const setImage = useSetFestivalImage();

  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);

  function handleSave(input: FestivalInput) {
    if (modal.type === "add") {
      addFestival.mutate(input, {
        onSuccess: () => setModal({ type: "none" }),
      });
    } else if (modal.type === "edit") {
      updateFestival.mutate(
        { id: modal.festival.id, input },
        { onSuccess: () => setModal({ type: "none" }) },
      );
    }
  }

  function handleSetImage(id: bigint, imageUrl: string) {
    setImage.mutate(
      { id, imageUrl },
      { onSuccess: () => setModal({ type: "none" }) },
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-display uppercase tracking-wider"
          style={S.th}
        >
          {festivals.length} Festival{festivals.length !== 1 ? "s" : ""}
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
          data-ocid="admin-add-festival-btn"
        >
          <Plus size={14} />
          Add Festival
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl" style={S.card}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid oklch(0.2 0.01 260)" }}>
              {[
                "Name",
                "Location",
                "Season / Type",
                "Price Range",
                "Age",
                "Status",
                "Actions",
              ].map((h) => (
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
            {festivals.map((f) => (
              <tr
                key={f.id.toString()}
                style={S.rowBorder}
                data-ocid="admin-festival-row"
              >
                <td className="px-4 py-3 font-medium" style={S.td}>
                  <div className="flex items-center gap-2">
                    {f.imageUrl && (
                      <img
                        src={f.imageUrl}
                        alt=""
                        className="h-7 w-7 rounded-lg object-cover"
                      />
                    )}
                    <span className="truncate max-w-[160px]">{f.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3" style={S.tdMuted}>
                  {f.location}, {f.country}
                </td>
                <td className="px-4 py-3" style={S.tdMuted}>
                  <span>{getSeasonLabel(f.season)}</span>
                  <span className="block text-xs opacity-60">
                    {getEventTypeLabel(f.eventType)}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs" style={S.amber}>
                  £{f.ticketPriceMin.toString()}–£{f.ticketPriceMax.toString()}
                </td>
                <td className="px-4 py-3 text-xs" style={S.tdMuted}>
                  {f.ageRestriction}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-display font-bold uppercase tracking-wider"
                    style={
                      isComingSoon(f.status)
                        ? {
                            background: "oklch(0.65 0.18 70 / 0.1)",
                            color: "oklch(0.65 0.18 70)",
                          }
                        : {
                            background: "oklch(0.55 0.18 145 / 0.1)",
                            color: "oklch(0.55 0.18 145)",
                          }
                    }
                  >
                    {isComingSoon(f.status) ? "Coming Soon" : "Active"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {/* Toggle Status */}
                    <button
                      type="button"
                      title={
                        isComingSoon(f.status)
                          ? "Set Active"
                          : "Set Coming Soon"
                      }
                      onClick={() => toggleStatus.mutate(f.id)}
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{
                        color: isComingSoon(f.status)
                          ? "oklch(0.5 0 0)"
                          : "oklch(0.55 0.18 145)",
                      }}
                      data-ocid="admin-toggle-status-btn"
                    >
                      {isComingSoon(f.status) ? (
                        <ToggleLeft size={16} />
                      ) : (
                        <ToggleRight size={16} />
                      )}
                    </button>
                    {/* Set Image */}
                    <button
                      type="button"
                      title="Set Image URL"
                      onClick={() => setModal({ type: "image", festival: f })}
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.65 0.2 180)" }}
                      data-ocid="admin-set-image-btn"
                    >
                      <Image size={16} />
                    </button>
                    {/* Edit */}
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => setModal({ type: "edit", festival: f })}
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.65 0.18 70)" }}
                      data-ocid="admin-edit-festival-btn"
                    >
                      <Edit2 size={16} />
                    </button>
                    {/* Delete */}
                    {deleteConfirm === f.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deleteFestival.mutate(f.id);
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
                        onClick={() => setDeleteConfirm(f.id)}
                        className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                        data-ocid="admin-delete-festival-btn"
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
        {festivals.length === 0 && (
          <div className="py-16 text-center" data-ocid="admin-festivals-empty">
            <p
              className="font-display text-sm uppercase tracking-wider"
              style={S.th}
            >
              No festivals yet. Add your first festival above.
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {(modal.type === "add" || modal.type === "edit") && (
        <FestivalForm
          festival={modal.type === "edit" ? modal.festival : undefined}
          onSave={handleSave}
          onClose={() => setModal({ type: "none" })}
          isPending={addFestival.isPending || updateFestival.isPending}
        />
      )}

      {/* Image URL Modal */}
      {modal.type === "image" && (
        <ImageModal
          festival={modal.festival}
          onSave={handleSetImage}
          onClose={() => setModal({ type: "none" })}
          isPending={setImage.isPending}
        />
      )}
    </div>
  );
}

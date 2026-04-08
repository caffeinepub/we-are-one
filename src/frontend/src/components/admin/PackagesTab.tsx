import { Edit2, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  useAddPackage,
  useDeletePackage,
  usePackages,
  useUpdatePackage,
} from "../../hooks/useBackend";
import type { Package, PackageInput } from "../../types/festival";
import { getPackageTypeLabel } from "../../types/festival";
import PackageForm from "./PackageForm";

type ModalState =
  | { type: "none" }
  | { type: "add" }
  | { type: "edit"; pkg: Package };

const S = {
  card: {
    background: "oklch(0.1 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.4)",
  } as React.CSSProperties,
  th: { color: "oklch(0.5 0 0)" } as React.CSSProperties,
  td: { color: "oklch(0.85 0 0)" } as React.CSSProperties,
  tdMuted: { color: "oklch(0.6 0 0)" } as React.CSSProperties,
  cyan: { color: "oklch(0.65 0.2 180)" } as React.CSSProperties,
  rowBorder: {
    borderBottom: "1px solid oklch(0.15 0.01 260)",
  } as React.CSSProperties,
};

export default function PackagesTab() {
  const { data: packages = [] } = usePackages();
  const addPackage = useAddPackage();
  const updatePackage = useUpdatePackage();
  const deletePackage = useDeletePackage();

  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);

  function handleSave(input: PackageInput) {
    if (modal.type === "add") {
      addPackage.mutate(input, { onSuccess: () => setModal({ type: "none" }) });
    } else if (modal.type === "edit") {
      updatePackage.mutate(
        { id: modal.pkg.id, input },
        { onSuccess: () => setModal({ type: "none" }) },
      );
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-display uppercase tracking-wider"
          style={S.th}
        >
          {packages.length} Package{packages.length !== 1 ? "s" : ""}
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
          data-ocid="admin-add-package-btn"
        >
          <Plus size={14} />
          Add Package
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl" style={S.card}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid oklch(0.2 0.01 260)" }}>
              {["Name", "Type", "Price", "Includes", "Actions"].map((h) => (
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
            {packages.map((pkg) => (
              <tr
                key={pkg.id.toString()}
                style={S.rowBorder}
                data-ocid="admin-package-row"
              >
                <td className="px-4 py-3 font-medium" style={S.td}>
                  <div>
                    <p>{pkg.name}</p>
                    <p className="text-xs opacity-60">{pkg.description}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-display font-bold uppercase tracking-wider"
                    style={{
                      background: "oklch(0.65 0.2 180 / 0.1)",
                      color: "oklch(0.65 0.2 180)",
                    }}
                  >
                    {getPackageTypeLabel(pkg.packageType)}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs" style={S.cyan}>
                  £{pkg.priceGBP.toString()}
                </td>
                <td className="px-4 py-3 max-w-[240px]">
                  <div className="flex flex-wrap gap-1">
                    {pkg.includes.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="rounded px-1.5 py-0.5 text-xs"
                        style={{
                          background: "oklch(0.15 0.01 260)",
                          color: "oklch(0.6 0 0)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                    {pkg.includes.length > 3 && (
                      <span
                        className="rounded px-1.5 py-0.5 text-xs"
                        style={{ color: "oklch(0.5 0 0)" }}
                      >
                        +{pkg.includes.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => setModal({ type: "edit", pkg })}
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.65 0.18 70)" }}
                      data-ocid="admin-edit-package-btn"
                    >
                      <Edit2 size={16} />
                    </button>
                    {deleteConfirm === pkg.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deletePackage.mutate(pkg.id);
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
                        onClick={() => setDeleteConfirm(pkg.id)}
                        className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                        data-ocid="admin-delete-package-btn"
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
        {packages.length === 0 && (
          <div className="py-16 text-center" data-ocid="admin-packages-empty">
            <p
              className="font-display text-sm uppercase tracking-wider"
              style={S.th}
            >
              No packages yet. Add your first package above.
            </p>
          </div>
        )}
      </div>

      {(modal.type === "add" || modal.type === "edit") && (
        <PackageForm
          pkg={modal.type === "edit" ? modal.pkg : undefined}
          onSave={handleSave}
          onClose={() => setModal({ type: "none" })}
          isPending={addPackage.isPending || updatePackage.isPending}
        />
      )}
    </div>
  );
}

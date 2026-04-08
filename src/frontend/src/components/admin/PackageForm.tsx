import { X } from "lucide-react";
import { useState } from "react";
import { useFestivals } from "../../hooks/useBackend";
import { getPackageTypeLabel } from "../../types/festival";
import type { Package, PackageInput, PackageType } from "../../types/festival";
interface Props {
  pkg?: Package;
  onSave: (input: PackageInput) => void;
  onClose: () => void;
  isPending: boolean;
}

type PackageTypeKey =
  | "Weekend1"
  | "Weekend2"
  | "FullWeekend"
  | "VIP"
  | "FlightPackage"
  | "Transfer"
  | "Accommodation";

const PKG_TYPES: PackageTypeKey[] = [
  "Weekend1",
  "Weekend2",
  "FullWeekend",
  "VIP",
  "FlightPackage",
  "Transfer",
  "Accommodation",
];

const S = {
  overlay: {
    background: "oklch(0 0 0 / 0.75)",
    backdropFilter: "blur(8px)",
  } as React.CSSProperties,
  modal: {
    background: "oklch(0.1 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.5)",
    boxShadow: "0 0 60px oklch(0.55 0.23 310 / 0.1)",
  } as React.CSSProperties,
  input: {
    background: "oklch(0.07 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.5)",
    color: "oklch(0.9 0 0)",
  } as React.CSSProperties,
  label: { color: "oklch(0.5 0 0)" } as React.CSSProperties,
};

function getCurrentPkgType(pkg: Package): PackageTypeKey {
  return pkg.packageType as PackageTypeKey;
}

export default function PackageForm({
  pkg,
  onSave,
  onClose,
  isPending,
}: Props) {
  const { data: festivals = [] } = useFestivals();
  const [form, setForm] = useState({
    name: pkg?.name ?? "",
    description: pkg?.description ?? "",
    priceGBP: pkg ? pkg.priceGBP.toString() : "",
    packageType: pkg
      ? getCurrentPkgType(pkg)
      : ("FullWeekend" as PackageTypeKey),
    festivalId: pkg?.festivalId?.toString() ?? "",
    includesText: pkg ? pkg.includes.join(", ") : "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: PackageInput = {
      name: form.name,
      description: form.description,
      priceGBP: BigInt(form.priceGBP || "0"),
      includes: form.includesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      packageType: form.packageType as PackageType,
      festivalId: form.festivalId ? BigInt(form.festivalId) : undefined,
    };
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={S.overlay}
    >
      <div className="relative w-full max-w-lg rounded-2xl p-6" style={S.modal}>
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="font-display text-lg font-black uppercase tracking-wider"
            style={{ color: "oklch(0.55 0.23 310)" }}
          >
            {pkg ? "Edit Package" : "Add Package"}
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
            "p-name",
            "Package Name *",
            <input
              id="p-name"
              required
              className={inputClass}
              style={S.input}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              data-ocid="package-form-name"
            />,
          )}

          {field(
            "p-desc",
            "Description",
            <textarea
              id="p-desc"
              rows={2}
              className={`${inputClass} resize-none`}
              style={S.input}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />,
          )}

          <div className="grid grid-cols-2 gap-4">
            {field(
              "p-price",
              "Price (£) *",
              <input
                id="p-price"
                type="number"
                required
                min="0"
                className={inputClass}
                style={S.input}
                placeholder="e.g. 149"
                value={form.priceGBP}
                onChange={(e) => setForm({ ...form, priceGBP: e.target.value })}
              />,
            )}
            {field(
              "p-type",
              "Package Type",
              <select
                id="p-type"
                className={inputClass}
                style={S.input}
                value={form.packageType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    packageType: e.target.value as PackageTypeKey,
                  })
                }
              >
                {PKG_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {getPackageTypeLabel(t as PackageType)}
                  </option>
                ))}
              </select>,
            )}
          </div>

          {field(
            "p-festival",
            "Festival (optional)",
            <select
              id="p-festival"
              className={inputClass}
              style={S.input}
              value={form.festivalId}
              onChange={(e) => setForm({ ...form, festivalId: e.target.value })}
            >
              <option value="">— Any festival —</option>
              {festivals.map((f) => (
                <option key={f.id.toString()} value={f.id.toString()}>
                  {f.name}
                </option>
              ))}
            </select>,
          )}

          {field(
            "p-includes",
            "Includes (comma-separated)",
            <textarea
              id="p-includes"
              rows={3}
              className={`${inputClass} resize-none`}
              style={S.input}
              placeholder="e.g. Weekend access, Wristband, Festival guide"
              value={form.includesText}
              onChange={(e) =>
                setForm({ ...form, includesText: e.target.value })
              }
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
                  "linear-gradient(135deg, oklch(0.55 0.23 310 / 0.9), oklch(0.65 0.2 180 / 0.9))",
                color: "oklch(0.08 0 0)",
              }}
              data-ocid="package-form-save-btn"
            >
              {isPending ? "Saving…" : pkg ? "Save Changes" : "Add Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { Image, X } from "lucide-react";
import { useState } from "react";
import type { Festival } from "../../types/festival";

interface Props {
  festival: Festival;
  onSave: (id: bigint, imageUrl: string) => void;
  onClose: () => void;
  isPending: boolean;
}

const S = {
  overlay: {
    background: "oklch(0 0 0 / 0.75)",
    backdropFilter: "blur(8px)",
  } as React.CSSProperties,
  modal: {
    background: "oklch(0.1 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.5)",
    boxShadow: "0 0 60px oklch(0.65 0.18 70 / 0.15)",
  } as React.CSSProperties,
  input: {
    background: "oklch(0.07 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.5)",
    color: "oklch(0.9 0 0)",
  } as React.CSSProperties,
};

export default function ImageModal({
  festival,
  onSave,
  onClose,
  isPending,
}: Props) {
  const [url, setUrl] = useState(festival.imageUrl ?? "");
  const [preview, setPreview] = useState(festival.imageUrl ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(festival.id, url);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={S.overlay}
    >
      <div className="relative w-full max-w-md rounded-2xl p-6" style={S.modal}>
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="font-display text-base font-black uppercase tracking-wider"
            style={{ color: "oklch(0.65 0.18 70)" }}
          >
            Set Festival Image
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

        <p className="mb-4 text-xs" style={{ color: "oklch(0.6 0 0)" }}>
          {festival.name}
        </p>

        {/* Preview */}
        <div
          className="mb-4 flex h-36 w-full items-center justify-center overflow-hidden rounded-xl"
          style={{
            background: "oklch(0.07 0.02 260)",
            border: "1px dashed oklch(0.25 0.02 260)",
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={() => setPreview("")}
            />
          ) : (
            <Image size={32} style={{ color: "oklch(0.3 0.01 260)" }} />
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="img-url"
              className="mb-1 block text-xs font-display uppercase tracking-wider"
              style={{ color: "oklch(0.5 0 0)" }}
            >
              Image URL
            </label>
            <input
              id="img-url"
              type="url"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-smooth"
              style={S.input}
              placeholder="https://..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setPreview(e.target.value);
              }}
              data-ocid="admin-image-url-input"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-display uppercase tracking-wider transition-smooth hover:opacity-70"
              style={{
                border: "1px solid oklch(0.25 0.02 260 / 0.5)",
                color: "oklch(0.5 0 0)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !url}
              className="rounded-xl px-4 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.18 70 / 0.9), oklch(0.6 0.15 45 / 0.9))",
                color: "oklch(0.08 0 0)",
              }}
              data-ocid="admin-image-save-btn"
            >
              {isPending ? "Saving…" : "Set Image"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

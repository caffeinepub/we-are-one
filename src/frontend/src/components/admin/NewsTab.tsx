import { Edit2, Newspaper, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  useAddNews,
  useDeleteNews,
  useNews,
  useUpdateNews,
} from "../../hooks/useBackend";
import type { NewsArticle, NewsInput } from "../../types/festival";

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
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function toDateInput(ts: bigint): string {
  const ms = Number(ts) < 1e12 ? Number(ts) * 1000 : Number(ts) / 1_000_000;
  return new Date(ms).toISOString().slice(0, 10);
}

function fromDateInput(dateStr: string): bigint {
  return BigInt(new Date(dateStr).getTime()) * 1_000_000n;
}

// ── Modal Form ────────────────────────────────────────────────────────────────

interface NewsFormProps {
  article?: NewsArticle;
  onSave: (input: NewsInput) => void;
  onClose: () => void;
  isPending: boolean;
}

function NewsForm({ article, onSave, onClose, isPending }: NewsFormProps) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [imageUrl, setImageUrl] = useState(article?.imageUrl ?? "");
  const [publishDate, setPublishDate] = useState(
    article
      ? toDateInput(article.publishDate)
      : new Date().toISOString().slice(0, 10),
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim(),
      publishDate: fromDateInput(publishDate),
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
        className="w-full max-w-lg rounded-2xl p-6"
        style={{
          background: "oklch(0.1 0.02 260)",
          border: "2px solid oklch(0.65 0.2 180 / 0.3)",
          boxShadow: "0 0 60px oklch(0.65 0.2 180 / 0.1)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="font-display font-bold uppercase tracking-wider"
            style={{ color: "oklch(0.65 0.2 180)" }}
          >
            {article ? "Edit Article" : "Add News Article"}
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
            <label htmlFor="news-title" style={labelStyle}>
              Title *
            </label>
            <input
              id="news-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article headline"
              style={inputStyle}
              data-ocid="news-form-title"
            />
          </div>

          <div>
            <label htmlFor="news-content" style={labelStyle}>
              Content *
            </label>
            <textarea
              id="news-content"
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full article content here…"
              style={{ ...inputStyle, resize: "vertical" }}
              data-ocid="news-form-content"
            />
          </div>

          <div>
            <label htmlFor="news-image-url" style={labelStyle}>
              Image URL
            </label>
            <input
              id="news-image-url"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={inputStyle}
              data-ocid="news-form-image-url"
            />
          </div>

          <div>
            <label htmlFor="news-date" style={labelStyle}>
              Publish Date *
            </label>
            <input
              id="news-date"
              type="date"
              required
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              style={{ ...inputStyle, colorScheme: "dark" }}
              data-ocid="news-form-date"
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
              data-ocid="news-form-save-btn"
            >
              {isPending ? "Saving…" : "Save Article"}
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
  | { type: "edit"; article: NewsArticle };

export default function NewsTab() {
  const { data: articles = [] } = useNews();
  const addNews = useAddNews();
  const updateNews = useUpdateNews();
  const deleteNews = useDeleteNews();

  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);

  const sorted = [...articles].sort(
    (a, b) => Number(b.publishDate) - Number(a.publishDate),
  );

  function handleSave(input: NewsInput) {
    if (modal.type === "add") {
      addNews.mutate(input, { onSuccess: () => setModal({ type: "none" }) });
    } else if (modal.type === "edit") {
      updateNews.mutate(
        { id: modal.article.id, input },
        { onSuccess: () => setModal({ type: "none" }) },
      );
    }
  }

  function formatDate(ts: bigint): string {
    const ms = Number(ts) < 1e12 ? Number(ts) * 1000 : Number(ts) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-display uppercase tracking-wider"
          style={S.th}
        >
          {sorted.length} Article{sorted.length !== 1 ? "s" : ""}
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
          data-ocid="admin-add-news-btn"
        >
          <Plus size={14} />
          Add Article
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl" style={S.card}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid oklch(0.2 0.01 260)" }}>
              {["Title", "Date", "Image", "Actions"].map((h) => (
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
            {sorted.map((article) => (
              <tr
                key={article.id.toString()}
                style={S.rowBorder}
                data-ocid="news-row"
              >
                <td
                  className="px-4 py-3 font-medium max-w-[240px]"
                  style={S.td}
                >
                  <span className="truncate block">{article.title}</span>
                </td>
                <td className="px-4 py-3 text-xs" style={S.tdMuted}>
                  {formatDate(article.publishDate)}
                </td>
                <td className="px-4 py-3">
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt=""
                      className="h-8 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    <Newspaper size={16} style={{ color: "oklch(0.35 0 0)" }} />
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => setModal({ type: "edit", article })}
                      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                      style={{ color: "oklch(0.65 0.18 70)" }}
                      data-ocid="admin-edit-news-btn"
                    >
                      <Edit2 size={16} />
                    </button>
                    {deleteConfirm === article.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deleteNews.mutate(article.id);
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
                        onClick={() => setDeleteConfirm(article.id)}
                        className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                        data-ocid="admin-delete-news-btn"
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
          <div className="py-16 text-center" data-ocid="news-empty">
            <p
              className="font-display text-sm uppercase tracking-wider"
              style={S.th}
            >
              No articles yet. Add your first news article.
            </p>
          </div>
        )}
      </div>

      {(modal.type === "add" || modal.type === "edit") && (
        <NewsForm
          article={modal.type === "edit" ? modal.article : undefined}
          onSave={handleSave}
          onClose={() => setModal({ type: "none" })}
          isPending={addNews.isPending || updateNews.isPending}
        />
      )}
    </div>
  );
}

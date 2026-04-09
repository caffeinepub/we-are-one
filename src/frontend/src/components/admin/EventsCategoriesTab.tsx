import { Edit2, FolderOpen, Plus, Trash2, X, Zap } from "lucide-react";
import { useState } from "react";
import {
  useAddCategory,
  useAddSiteEvent,
  useCategories,
  useDeleteCategory,
  useDeleteSiteEvent,
  useFestivals,
  useSiteEvents,
  useUpdateCategory,
  useUpdateSiteEvent,
} from "../../hooks/useBackend";
import type {
  CategoryInput,
  EventCategory,
  Festival,
  SiteEvent,
  SiteEventInput,
} from "../../types/festival";

// ── Shared styles ─────────────────────────────────────────────────────────────

const S = {
  card: {
    background: "oklch(0.1 0.02 260)",
    border: "1px solid oklch(0.25 0.02 260 / 0.4)",
  } as React.CSSProperties,
  th: { color: "oklch(0.5 0 0)" } as React.CSSProperties,
  td: { color: "oklch(0.85 0 0)" } as React.CSSProperties,
  tdMuted: { color: "oklch(0.6 0 0)" } as React.CSSProperties,
  amber: { color: "oklch(0.65 0.18 70)" } as React.CSSProperties,
  cyan: { color: "oklch(0.65 0.2 180)" } as React.CSSProperties,
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

// ── Delete confirm button ──────────────────────────────────────────────────────

function DeleteConfirm({
  id,
  deleteConfirm,
  setDeleteConfirm,
  onDelete,
}: {
  id: bigint;
  deleteConfirm: bigint | null;
  setDeleteConfirm: (id: bigint | null) => void;
  onDelete: (id: bigint) => void;
}) {
  if (deleteConfirm === id) {
    return (
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => {
            onDelete(id);
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
    );
  }
  return (
    <button
      type="button"
      title="Delete permanently"
      onClick={() => setDeleteConfirm(id)}
      className="rounded-lg p-1.5 transition-smooth hover:scale-110"
      style={{ color: "oklch(0.55 0.22 25)" }}
      data-ocid="admin-delete-btn"
    >
      <Trash2 size={16} />
    </button>
  );
}

// ── Category Form Modal ───────────────────────────────────────────────────────

interface CategoryFormProps {
  category?: EventCategory;
  onSave: (input: CategoryInput) => void;
  onClose: () => void;
  isPending: boolean;
}

function CategoryForm({
  category,
  onSave,
  onClose,
  isPending,
}: CategoryFormProps) {
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ name: name.trim(), description: description.trim() });
  }

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
            style={S.cyan}
          >
            {category ? "Edit Category" : "Add Category"}
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
            <label htmlFor="cat-name" style={S.label}>
              Name *
            </label>
            <input
              id="cat-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              style={S.input}
              data-ocid="category-form-name"
            />
          </div>
          <div>
            <label htmlFor="cat-desc" style={S.label}>
              Description
            </label>
            <textarea
              id="cat-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of this category"
              style={{ ...S.input, resize: "vertical" }}
              data-ocid="category-form-desc"
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
              data-ocid="category-form-save-btn"
            >
              {isPending ? "Saving…" : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Site Event Form Modal ─────────────────────────────────────────────────────

interface SiteEventFormProps {
  event?: SiteEvent;
  categories: EventCategory[];
  festivals: Festival[];
  onSave: (input: SiteEventInput) => void;
  onClose: () => void;
  isPending: boolean;
}

function SiteEventForm({
  event,
  categories,
  festivals,
  onSave,
  onClose,
  isPending,
}: SiteEventFormProps) {
  const [name, setName] = useState(event?.name ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [imageUrl, setImageUrl] = useState(event?.imageUrl ?? "");
  const [categoryId, setCategoryId] = useState<string>(
    event?.categoryId?.[0]?.toString() ?? "",
  );
  const [festivalId, setFestivalId] = useState<string>(
    event?.festivalId?.[0]?.toString() ?? "",
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: SiteEventInput = {
      name: name.trim(),
      description: description.trim(),
      date: date.trim(),
      location: location.trim(),
      imageUrl: imageUrl.trim(),
      categoryId: categoryId ? BigInt(categoryId) : undefined,
      festivalId: festivalId ? BigInt(festivalId) : undefined,
    };
    onSave(input);
  }

  const selectStyle: React.CSSProperties = {
    ...S.input,
    colorScheme: "dark",
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
          border: "2px solid oklch(0.65 0.18 70 / 0.3)",
          boxShadow: "0 0 60px oklch(0.65 0.18 70 / 0.1)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="font-display font-bold uppercase tracking-wider"
            style={S.amber}
          >
            {event ? "Edit Site Event" : "Add Site Event"}
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
            <label htmlFor="se-name" style={S.label}>
              Name *
            </label>
            <input
              id="se-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Event name"
              style={S.input}
              data-ocid="siteevent-form-name"
            />
          </div>
          <div>
            <label htmlFor="se-desc" style={S.label}>
              Description
            </label>
            <textarea
              id="se-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event description"
              style={{ ...S.input, resize: "vertical" }}
              data-ocid="siteevent-form-desc"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="se-date" style={S.label}>
                Date
              </label>
              <input
                id="se-date"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 15 Jul 2025"
                style={S.input}
                data-ocid="siteevent-form-date"
              />
            </div>
            <div>
              <label htmlFor="se-location" style={S.label}>
                Location
              </label>
              <input
                id="se-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or venue"
                style={S.input}
                data-ocid="siteevent-form-location"
              />
            </div>
          </div>
          <div>
            <label htmlFor="se-image" style={S.label}>
              Image URL
            </label>
            <input
              id="se-image"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={S.input}
              data-ocid="siteevent-form-image"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="se-category" style={S.label}>
                Category (optional)
              </label>
              <select
                id="se-category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                style={selectStyle}
                data-ocid="siteevent-form-category"
              >
                <option value="">— None —</option>
                {categories.map((c) => (
                  <option key={c.id.toString()} value={c.id.toString()}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="se-festival" style={S.label}>
                Festival (optional)
              </label>
              <select
                id="se-festival"
                value={festivalId}
                onChange={(e) => setFestivalId(e.target.value)}
                style={selectStyle}
                data-ocid="siteevent-form-festival"
              >
                <option value="">— None —</option>
                {festivals.map((f) => (
                  <option key={f.id.toString()} value={f.id.toString()}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
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
                  "linear-gradient(135deg, oklch(0.65 0.18 70 / 0.9), oklch(0.6 0.15 45 / 0.9))",
                color: "oklch(0.08 0 0)",
                boxShadow: "0 0 20px oklch(0.65 0.18 70 / 0.3)",
              }}
              data-ocid="siteevent-form-save-btn"
            >
              {isPending ? "Saving…" : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  count,
  onAdd,
  addLabel,
  accentColor,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  onAdd: () => void;
  addLabel: string;
  accentColor: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span style={{ color: accentColor }}>{icon}</span>
        <h3
          className="font-display font-bold uppercase tracking-wider text-sm"
          style={{ color: accentColor }}
        >
          {title}
        </h3>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-display font-bold"
          style={{ background: `${accentColor}1a`, color: accentColor }}
        >
          {count}
        </span>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${accentColor}e6, ${accentColor}99)`,
          color: "oklch(0.08 0 0)",
          boxShadow: `0 0 20px ${accentColor}40`,
        }}
        data-ocid={`admin-add-${addLabel.toLowerCase().replace(/\s/g, "-")}-btn`}
      >
        <Plus size={14} />
        {addLabel}
      </button>
    </div>
  );
}

// ── Main Tab ──────────────────────────────────────────────────────────────────

type CatModal =
  | { type: "none" }
  | { type: "add" }
  | { type: "edit"; category: EventCategory };
type EventModal =
  | { type: "none" }
  | { type: "add" }
  | { type: "edit"; event: SiteEvent };

export default function EventsCategoriesTab() {
  const { data: categories = [] } = useCategories();
  const { data: siteEvents = [] } = useSiteEvents();
  const { data: festivals = [] } = useFestivals();

  const addCat = useAddCategory();
  const updateCat = useUpdateCategory();
  const deleteCat = useDeleteCategory();

  const addEvent = useAddSiteEvent();
  const updateEvent = useUpdateSiteEvent();
  const deleteEvent = useDeleteSiteEvent();

  const [catModal, setCatModal] = useState<CatModal>({ type: "none" });
  const [eventModal, setEventModal] = useState<EventModal>({ type: "none" });
  const [catDeleteConfirm, setCatDeleteConfirm] = useState<bigint | null>(null);
  const [eventDeleteConfirm, setEventDeleteConfirm] = useState<bigint | null>(
    null,
  );

  function handleSaveCategory(input: CategoryInput) {
    if (catModal.type === "add") {
      addCat.mutate(input, { onSuccess: () => setCatModal({ type: "none" }) });
    } else if (catModal.type === "edit") {
      updateCat.mutate(
        { id: catModal.category.id, input },
        { onSuccess: () => setCatModal({ type: "none" }) },
      );
    }
  }

  function handleSaveEvent(input: SiteEventInput) {
    if (eventModal.type === "add") {
      addEvent.mutate(input, {
        onSuccess: () => setEventModal({ type: "none" }),
      });
    } else if (eventModal.type === "edit") {
      updateEvent.mutate(
        { id: eventModal.event.id, input },
        { onSuccess: () => setEventModal({ type: "none" }) },
      );
    }
  }

  function getCategoryName(id: bigint | undefined): string {
    if (!id) return "—";
    return categories.find((c) => c.id === id)?.name ?? "—";
  }

  function getFestivalName(id: bigint | undefined): string {
    if (!id) return "—";
    return festivals.find((f) => f.id === id)?.name ?? "—";
  }

  return (
    <div className="flex flex-col gap-10">
      {/* ── Event Categories ── */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          icon={<FolderOpen size={16} />}
          title="Event Categories"
          count={categories.length}
          onAdd={() => setCatModal({ type: "add" })}
          addLabel="Add Category"
          accentColor="oklch(0.65 0.2 180)"
        />

        <div className="overflow-x-auto rounded-2xl" style={S.card}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid oklch(0.2 0.01 260)" }}>
                {["Name", "Description", "Actions"].map((h) => (
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
              {categories.map((cat) => (
                <tr
                  key={cat.id.toString()}
                  style={S.rowBorder}
                  data-ocid="admin-category-row"
                >
                  <td className="px-4 py-3 font-medium" style={S.td}>
                    {cat.name}
                  </td>
                  <td className="px-4 py-3 max-w-xs" style={S.tdMuted}>
                    <span className="line-clamp-2">
                      {cat.description || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Edit"
                        onClick={() =>
                          setCatModal({ type: "edit", category: cat })
                        }
                        className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                        style={S.amber}
                        data-ocid="admin-edit-category-btn"
                      >
                        <Edit2 size={16} />
                      </button>
                      <DeleteConfirm
                        id={cat.id}
                        deleteConfirm={catDeleteConfirm}
                        setDeleteConfirm={setCatDeleteConfirm}
                        onDelete={(id) => deleteCat.mutate(id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && (
            <div className="py-12 text-center" data-ocid="categories-empty">
              <p
                className="font-display text-sm uppercase tracking-wider"
                style={S.th}
              >
                No categories yet. Add your first category above.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Site Events ── */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          icon={<Zap size={16} />}
          title="Site Events"
          count={siteEvents.length}
          onAdd={() => setEventModal({ type: "add" })}
          addLabel="Add Event"
          accentColor="oklch(0.65 0.18 70)"
        />

        <div className="overflow-x-auto rounded-2xl" style={S.card}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid oklch(0.2 0.01 260)" }}>
                {[
                  "Name",
                  "Date",
                  "Location",
                  "Category",
                  "Festival",
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
              {siteEvents.map((ev) => (
                <tr
                  key={ev.id.toString()}
                  style={S.rowBorder}
                  data-ocid="admin-siteevent-row"
                >
                  <td
                    className="px-4 py-3 font-medium max-w-[180px]"
                    style={S.td}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {ev.imageUrl && (
                        <img
                          src={ev.imageUrl}
                          alt=""
                          className="h-7 w-7 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <span className="truncate">{ev.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={S.tdMuted}>
                    {ev.date || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs" style={S.tdMuted}>
                    {ev.location || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs" style={S.cyan}>
                    {getCategoryName(ev.categoryId?.[0])}
                  </td>
                  <td
                    className="px-4 py-3 text-xs max-w-[140px]"
                    style={S.tdMuted}
                  >
                    <span className="truncate block">
                      {getFestivalName(ev.festivalId?.[0])}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Edit"
                        onClick={() =>
                          setEventModal({ type: "edit", event: ev })
                        }
                        className="rounded-lg p-1.5 transition-smooth hover:scale-110"
                        style={S.amber}
                        data-ocid="admin-edit-siteevent-btn"
                      >
                        <Edit2 size={16} />
                      </button>
                      <DeleteConfirm
                        id={ev.id}
                        deleteConfirm={eventDeleteConfirm}
                        setDeleteConfirm={setEventDeleteConfirm}
                        onDelete={(id) => deleteEvent.mutate(id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {siteEvents.length === 0 && (
            <div className="py-12 text-center" data-ocid="siteevents-empty">
              <p
                className="font-display text-sm uppercase tracking-wider"
                style={S.th}
              >
                No site events yet. Add your first event above.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Modals ── */}
      {(catModal.type === "add" || catModal.type === "edit") && (
        <CategoryForm
          category={catModal.type === "edit" ? catModal.category : undefined}
          onSave={handleSaveCategory}
          onClose={() => setCatModal({ type: "none" })}
          isPending={addCat.isPending || updateCat.isPending}
        />
      )}

      {(eventModal.type === "add" || eventModal.type === "edit") && (
        <SiteEventForm
          event={eventModal.type === "edit" ? eventModal.event : undefined}
          categories={categories}
          festivals={festivals}
          onSave={handleSaveEvent}
          onClose={() => setEventModal({ type: "none" })}
          isPending={addEvent.isPending || updateEvent.isPending}
        />
      )}
    </div>
  );
}

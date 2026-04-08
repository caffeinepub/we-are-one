import { Sparkles, Ticket, X } from "lucide-react";
import { useState } from "react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function useComingSoon() {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}

export default function ComingSoonModal({
  isOpen,
  onClose,
}: ComingSoonModalProps) {
  if (!isOpen) return null;

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) onClose();
  }
  function handleBackdropKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "Escape") onClose();
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 m-0 w-full h-full max-w-full max-h-full bg-transparent"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "oklch(0.04 0 0 / 0.85)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md animate-slide-up rounded-2xl p-8 text-center"
        style={{
          background: "oklch(0.1 0.02 260)",
          border: "2px solid oklch(0.65 0.2 180 / 0.6)",
          boxShadow:
            "0 0 40px oklch(0.65 0.2 180 / 0.3), 0 0 80px oklch(0.55 0.23 310 / 0.15), inset 0 1px 0 oklch(0.65 0.2 180 / 0.2)",
        }}
        data-ocid="coming-soon-modal"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 transition-smooth hover:scale-110"
          style={{ color: "oklch(0.65 0.2 180)" }}
          aria-label="Close modal"
          data-ocid="modal-close"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div
            className="relative flex items-center justify-center"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "oklch(0.65 0.2 180 / 0.1)",
              border: "2px solid oklch(0.65 0.2 180 / 0.4)",
            }}
          >
            <Ticket
              size={36}
              className="animate-pulse-glow"
              style={{ color: "oklch(0.65 0.2 180)" }}
            />
            <Sparkles
              size={16}
              className="absolute -top-1 -right-1 animate-pulse-glow"
              style={{ color: "oklch(0.65 0.18 70)", animationDelay: "0.5s" }}
            />
          </div>
        </div>

        {/* Title */}
        <h2
          id="modal-title"
          className="mb-4 text-3xl font-display font-bold glow-cyan"
          style={{ color: "oklch(0.65 0.2 180)" }}
        >
          Tickets Coming Soon!
        </h2>

        {/* Body */}
        <p
          className="mb-6 leading-relaxed"
          style={{ color: "oklch(0.75 0 0)" }}
        >
          Tickets aren't available yet! This is a test/demo event. The Master
          Festival will launch soon.
        </p>

        {/* Divider */}
        <div
          className="mb-6 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.65 0.2 180 / 0.4), transparent)",
          }}
        />

        {/* Slogan */}
        <p
          className="mb-6 text-sm font-display tracking-widest uppercase glow-magenta"
          style={{ color: "oklch(0.55 0.23 310)" }}
        >
          One World 2 Vibes
        </p>

        {/* Close CTA */}
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl py-3 px-6 font-display font-bold text-sm uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
          style={{
            background: "oklch(0.65 0.2 180 / 0.15)",
            border: "2px solid oklch(0.65 0.2 180 / 0.6)",
            color: "oklch(0.65 0.2 180)",
            boxShadow: "0 0 15px oklch(0.65 0.2 180 / 0.2)",
          }}
          data-ocid="modal-dismiss"
        >
          Got it, I'll wait!
        </button>
      </div>
    </dialog>
  );
}

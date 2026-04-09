import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  DollarSign,
  Eye,
  EyeOff,
  FolderOpen,
  List,
  Loader2,
  LogIn,
  Music,
  Newspaper,
  Package,
  Shield,
  Star,
  X,
  Zap,
} from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { createActor } from "../backend";
import AnalyticsTab from "../components/admin/AnalyticsTab";
import DonationsTab from "../components/admin/DonationsTab";
import EventsCategoriesTab from "../components/admin/EventsCategoriesTab";
import FestivalsTab from "../components/admin/FestivalsTab";
import LineupTab from "../components/admin/LineupTab";
import NewsTab from "../components/admin/NewsTab";
import PackagesTab from "../components/admin/PackagesTab";
import RaveNightclubTab from "../components/admin/RaveNightclubTab";
import SponsorsTab from "../components/admin/SponsorsTab";
import { useAdminLogin } from "../hooks/useBackend";

const LOGO_URL =
  "https://image2url.com/r2/default/images/1775683614327-346f8e28-9a02-4a59-8ff6-14dd1641405e.png";

// ── Admin error context (provides showError to tab components) ─────────────────

interface AdminErrorContextValue {
  showError: (message: string) => void;
}

const AdminErrorContext = createContext<AdminErrorContextValue>({
  showError: () => undefined,
});

export function useAdminError() {
  return useContext(AdminErrorContext);
}

// ── Error toast ────────────────────────────────────────────────────────────────

interface AdminErrorToastProps {
  message: string;
  onDismiss: () => void;
}

function AdminErrorToast({ message, onDismiss }: AdminErrorToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 8000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-start gap-3 rounded-2xl px-5 py-4 max-w-sm w-full shadow-2xl"
      style={{
        background: "oklch(0.1 0.02 260)",
        border: "1px solid oklch(0.55 0.22 25 / 0.6)",
        boxShadow: "0 0 40px oklch(0.55 0.22 25 / 0.15)",
      }}
      role="alert"
      data-ocid="admin-error-toast"
    >
      <AlertTriangle
        size={18}
        className="shrink-0 mt-0.5"
        style={{ color: "oklch(0.65 0.22 25)" }}
      />
      <div className="flex-1 min-w-0">
        <p
          className="font-display text-xs font-bold uppercase tracking-wider"
          style={{ color: "oklch(0.65 0.22 25)" }}
        >
          Action Failed
        </p>
        <p
          className="mt-0.5 text-xs font-body break-words"
          style={{ color: "oklch(0.65 0 0)" }}
        >
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 rounded-lg p-1 transition-smooth hover:opacity-70"
        style={{ color: "oklch(0.45 0 0)" }}
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ── Connection status banner ───────────────────────────────────────────────────

function ConnectionBanner() {
  const { actor, isFetching } = useActor(createActor);
  const isReady = !!actor && !isFetching;

  if (isReady) return null;

  return (
    <div
      className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-6 text-sm"
      style={{
        background: "oklch(0.65 0.18 70 / 0.06)",
        border: "1px solid oklch(0.65 0.18 70 / 0.3)",
        color: "oklch(0.65 0.18 70)",
      }}
      data-ocid="admin-connection-banner"
    >
      <Loader2 size={14} className="animate-spin shrink-0" />
      <span className="font-display text-xs uppercase tracking-wider">
        Connecting to backend… buttons will be enabled when ready.
      </span>
    </div>
  );
}

type Tab =
  | "festivals"
  | "packages"
  | "news"
  | "lineup"
  | "analytics"
  | "donations"
  | "sponsors"
  | "rave-nightclub"
  | "events"
  | "categories";

const TABS: { id: Tab; label: string; icon: typeof List }[] = [
  { id: "festivals", label: "Festivals", icon: List },
  { id: "packages", label: "Packages", icon: Package },
  { id: "news", label: "News", icon: Newspaper },
  { id: "lineup", label: "Lineup", icon: Music },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "donations", label: "Donations", icon: DollarSign },
  { id: "sponsors", label: "Sponsors", icon: Star },
  { id: "rave-nightclub", label: "Rave & Nightclub", icon: Zap },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "categories", label: "Categories", icon: FolderOpen },
];

// ── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const loginMutation = useAdminLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    loginMutation.mutate(password, {
      onSuccess: (result) => {
        if (result) {
          sessionStorage.setItem("adminToken", result);
          onLogin(result);
        } else {
          setError("Invalid password. Please try again.");
        }
      },
      onError: () => setError("Login failed. Please try again."),
    });
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{
          background: "oklch(0.1 0.02 260)",
          border: "2px solid oklch(0.65 0.18 70 / 0.35)",
          boxShadow: "0 0 60px oklch(0.65 0.18 70 / 0.08)",
        }}
      >
        {/* Logo + title */}
        <div className="mb-7 flex flex-col items-center gap-4 text-center">
          <img
            src={LOGO_URL}
            alt="WE ARE ONE"
            className="h-16 w-auto object-contain"
          />
          <div>
            <h1
              className="font-display text-2xl font-black uppercase tracking-wider glow-amber"
              style={{ color: "oklch(0.65 0.18 70)" }}
            >
              Admin Panel
            </h1>
            <p
              className="mt-1 text-xs font-display uppercase tracking-widest"
              style={{ color: "oklch(0.45 0 0)" }}
            >
              WE ARE ONE Festival Management
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-xs font-display uppercase tracking-wider"
              style={{ color: "oklch(0.5 0 0)" }}
            >
              Admin Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-smooth"
                style={{
                  background: "oklch(0.07 0.02 260)",
                  border: `1px solid ${error ? "oklch(0.55 0.22 25 / 0.6)" : "oklch(0.25 0.02 260 / 0.5)"}`,
                  color: "oklch(0.9 0 0)",
                }}
                data-ocid="admin-password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-smooth hover:opacity-70"
                style={{ color: "oklch(0.45 0 0)" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p
                className="mt-1.5 text-xs"
                style={{ color: "oklch(0.65 0.22 25)" }}
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-display font-bold uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.18 70 / 0.9), oklch(0.6 0.15 45 / 0.9))",
              color: "oklch(0.08 0 0)",
              boxShadow: "0 0 25px oklch(0.65 0.18 70 / 0.3)",
            }}
            data-ocid="admin-login-btn"
          >
            <LogIn size={16} />
            {loginMutation.isPending ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("festivals");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function showError(message: string) {
    setErrorMsg(message);
  }

  return (
    <AdminErrorContext.Provider value={{ showError }}>
      <section className="min-h-screen">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 px-4 py-3"
          style={{
            background: "oklch(0.08 0.02 260 / 0.92)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid oklch(0.25 0.02 260 / 0.4)",
          }}
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="WE ARE ONE"
                className="h-8 w-auto object-contain"
              />
              <div>
                <span
                  className="hidden font-display text-sm font-black uppercase tracking-wider sm:inline glow-amber"
                  style={{ color: "oklch(0.65 0.18 70)" }}
                >
                  Admin Dashboard
                </span>
                <Shield
                  size={16}
                  className="inline sm:hidden"
                  style={{ color: "oklch(0.65 0.18 70)" }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl px-4 py-2 text-xs font-display font-medium uppercase tracking-wider transition-smooth hover:opacity-80"
              style={{
                border: "1px solid oklch(0.55 0.22 25 / 0.4)",
                color: "oklch(0.55 0.22 25)",
              }}
              data-ocid="admin-logout-btn"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Connection status */}
          <ConnectionBanner />

          {/* Tab bar */}
          <div
            className="mb-8 flex overflow-x-auto rounded-2xl w-fit max-w-full"
            style={{ border: "1px solid oklch(0.25 0.02 260 / 0.4)" }}
          >
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className="flex items-center gap-2 px-5 py-3 text-sm font-display font-medium uppercase tracking-wider transition-smooth whitespace-nowrap"
                style={
                  activeTab === id
                    ? {
                        background: "oklch(0.65 0.2 180 / 0.12)",
                        color: "oklch(0.65 0.2 180)",
                        borderBottom: "2px solid oklch(0.65 0.2 180)",
                      }
                    : { background: "transparent", color: "oklch(0.5 0 0)" }
                }
                data-ocid={`admin-tab-${id}`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "festivals" && <FestivalsTab />}
          {activeTab === "packages" && <PackagesTab />}
          {activeTab === "news" && <NewsTab />}
          {activeTab === "lineup" && <LineupTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "donations" && <DonationsTab />}
          {activeTab === "sponsors" && <SponsorsTab />}
          {activeTab === "rave-nightclub" && <RaveNightclubTab />}
          {activeTab === "events" && <EventsCategoriesTab />}
          {activeTab === "categories" && <EventsCategoriesTab />}
        </div>
      </section>

      {/* Error toast */}
      {errorMsg && (
        <AdminErrorToast
          message={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
      )}
    </AdminErrorContext.Provider>
  );
}

// ── Page export ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem("adminToken"),
  );

  function handleLogout() {
    sessionStorage.removeItem("adminToken");
    setToken(null);
  }

  if (!token) {
    return <LoginScreen onLogin={setToken} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}

import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/festivals", label: "Festivals" },
  { to: "/packages", label: "Packages" },
  { to: "/jobs", label: "Jobs" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (to: string) =>
    to === "/" ? currentPath === "/" : currentPath.startsWith(to);

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: "oklch(0.08 0.02 260 / 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid oklch(0.65 0.2 180 / 0.25)",
        boxShadow: "0 0 30px oklch(0.65 0.2 180 / 0.08)",
      }}
      data-ocid="navbar"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src="https://image2url.com/r2/default/images/1775683614327-346f8e28-9a02-4a59-8ff6-14dd1641405e.png"
            alt="WE ARE ONE"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span
            className="hidden sm:block font-display font-bold text-sm uppercase tracking-widest glow-cyan"
            style={{ color: "oklch(0.65 0.2 180)" }}
          >
            WE ARE ONE
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="relative px-4 py-2 text-sm font-display font-medium uppercase tracking-wider transition-smooth rounded-lg"
              style={
                isActive(to)
                  ? {
                      color: "oklch(0.65 0.2 180)",
                      textShadow:
                        "0 0 10px oklch(0.65 0.2 180 / 0.8), 0 0 20px oklch(0.65 0.2 180 / 0.4)",
                      background: "oklch(0.65 0.2 180 / 0.08)",
                    }
                  : { color: "oklch(0.7 0 0)" }
              }
              onMouseEnter={(e) => {
                if (!isActive(to)) {
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(0.9 0 0)";
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.65 0.2 180 / 0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(to)) {
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(0.7 0 0)";
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }
              }}
              data-ocid={`nav-${label.toLowerCase()}`}
            >
              {label}
              {isActive(to) && (
                <span
                  className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full"
                  style={{ background: "oklch(0.65 0.2 180)" }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="hidden md:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-display font-medium uppercase tracking-wider transition-smooth"
            style={{
              color: "oklch(0.55 0 0)",
              border: "1px solid oklch(0.25 0.02 260 / 0.5)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "oklch(0.65 0.18 70)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(0.65 0.18 70 / 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "oklch(0.55 0 0)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(0.25 0.02 260 / 0.5)";
            }}
            data-ocid="nav-admin"
          >
            <Shield size={12} />
            Admin
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-lg p-2 transition-smooth"
            style={{ color: "oklch(0.65 0.2 180)" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-ocid="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="md:hidden border-t animate-fade-in"
          style={{
            borderColor: "oklch(0.65 0.2 180 / 0.2)",
            background: "oklch(0.07 0.02 260 / 0.95)",
            backdropFilter: "blur(16px)",
          }}
          data-ocid="mobile-nav"
        >
          <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-display font-medium uppercase tracking-wider transition-smooth"
                style={
                  isActive(to)
                    ? {
                        color: "oklch(0.65 0.2 180)",
                        background: "oklch(0.65 0.2 180 / 0.08)",
                        textShadow: "0 0 10px oklch(0.65 0.2 180 / 0.6)",
                      }
                    : { color: "oklch(0.7 0 0)" }
                }
                data-ocid={`mobile-nav-${label.toLowerCase()}`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-display font-medium uppercase tracking-wider transition-smooth"
              style={{ color: "oklch(0.5 0 0)" }}
              data-ocid="mobile-nav-admin"
            >
              <Shield size={14} />
              Admin
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

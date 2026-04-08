import { Mail } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si";

const SOCIAL_LINKS = [
  { icon: SiX, label: "X (Twitter)", href: "#" },
  { icon: SiInstagram, label: "Instagram", href: "#" },
  { icon: SiFacebook, label: "Facebook", href: "#" },
  { icon: SiTiktok, label: "TikTok", href: "#" },
  { icon: SiYoutube, label: "YouTube", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="w-full"
      style={{
        background: "oklch(0.07 0.02 260)",
        borderTop: "1px solid oklch(0.65 0.2 180 / 0.2)",
      }}
      data-ocid="footer"
    >
      {/* Glow line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.65 0.2 180 / 0.6) 30%, oklch(0.55 0.23 310 / 0.6) 70%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 py-10">
        {/* Top row: Logo + slogan + social */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <img
              src="https://image2url.com/r2/default/images/1775683614327-346f8e28-9a02-4a59-8ff6-14dd1641405e.png"
              alt="WE ARE ONE"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <p
              className="font-display text-xs font-bold uppercase tracking-widest glow-magenta"
              style={{ color: "oklch(0.55 0.23 310)" }}
            >
              One World 2 Vibes
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center justify-center rounded-full p-2.5 transition-smooth hover:scale-110"
                style={{
                  background: "oklch(0.12 0.02 260)",
                  border: "1px solid oklch(0.25 0.02 260 / 0.5)",
                  color: "oklch(0.55 0 0)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(0.65 0.2 180)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.65 0.2 180 / 0.5)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 12px oklch(0.65 0.2 180 / 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(0.55 0 0)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.25 0.02 260 / 0.5)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Contact */}
          <a
            href="mailto:contact@weareone.com"
            className="flex items-center gap-2 text-sm transition-smooth"
            style={{ color: "oklch(0.55 0 0)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "oklch(0.65 0.2 180)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "oklch(0.55 0 0)";
            }}
          >
            <Mail size={14} style={{ color: "oklch(0.65 0.2 180)" }} />
            contact@weareone.com
          </a>
        </div>

        {/* Divider */}
        <div
          className="my-6 h-px w-full"
          style={{ background: "oklch(0.2 0.01 260)" }}
        />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-xs" style={{ color: "oklch(0.4 0 0)" }}>
            © {year} WE ARE ONE Ltd. All rights reserved.
          </p>

          <div
            className="flex items-center gap-4 text-xs"
            style={{ color: "oklch(0.4 0 0)" }}
          >
            <a
              href="/#"
              className="transition-smooth hover:opacity-80"
              style={{ color: "oklch(0.5 0 0)" }}
            >
              Privacy Policy
            </a>
            <span style={{ color: "oklch(0.25 0 0)" }}>|</span>
            <a
              href="/#"
              className="transition-smooth hover:opacity-80"
              style={{ color: "oklch(0.5 0 0)" }}
            >
              Legal
            </a>
            <span style={{ color: "oklch(0.25 0 0)" }}>|</span>
            <a
              href="/#"
              className="transition-smooth hover:opacity-80"
              style={{ color: "oklch(0.5 0 0)" }}
            >
              Terms of Service
            </a>
          </div>

          <p className="text-xs" style={{ color: "oklch(0.35 0 0)" }}>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth"
              style={{ color: "oklch(0.55 0.15 180)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(0.65 0.2 180)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(0.55 0.15 180)";
              }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

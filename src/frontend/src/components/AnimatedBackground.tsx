export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      style={{ background: "oklch(0.06 0.01 260)" }}
    >
      {/* Deep void base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 40%, oklch(0.15 0.08 180 / 0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, oklch(0.12 0.08 310 / 0.2) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 50% 10%, oklch(0.1 0.06 260 / 0.15) 0%, transparent 50%)",
        }}
      />

      {/* Aurora top sweep */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.2 0.12 180 / 0.12) 0%, transparent 100%)",
          animation: "aurora-shift 8s ease-in-out infinite alternate",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute rounded-full"
        style={{
          width: "600px",
          height: "600px",
          top: "-150px",
          left: "-100px",
          background:
            "radial-gradient(circle, oklch(0.65 0.2 180 / 0.06) 0%, transparent 70%)",
          animation: "float-orb 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "500px",
          height: "500px",
          bottom: "-100px",
          right: "-80px",
          background:
            "radial-gradient(circle, oklch(0.55 0.23 310 / 0.07) 0%, transparent 70%)",
          animation: "float-orb 15s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "300px",
          height: "300px",
          top: "40%",
          left: "55%",
          background:
            "radial-gradient(circle, oklch(0.65 0.18 70 / 0.05) 0%, transparent 70%)",
          animation: "float-orb 10s ease-in-out infinite 3s",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.65 0.2 180 / 0.03) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.2 180 / 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particle dots */}
      {[
        "p0",
        "p1",
        "p2",
        "p3",
        "p4",
        "p5",
        "p6",
        "p7",
        "p8",
        "p9",
        "p10",
        "p11",
        "p12",
        "p13",
        "p14",
        "p15",
        "p16",
        "p17",
        "p18",
        "p19",
      ].map((pid, i) => (
        <div
          key={pid}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            top: `${5 + ((i * 37) % 88)}%`,
            left: `${3 + ((i * 53) % 94)}%`,
            background:
              i % 3 === 0
                ? "oklch(0.65 0.2 180 / 0.7)"
                : i % 3 === 1
                  ? "oklch(0.55 0.23 310 / 0.6)"
                  : "oklch(0.65 0.18 70 / 0.5)",
            animation: `twinkle ${3 + (i % 4)}s ease-in-out infinite ${i * 0.4}s`,
            boxShadow:
              i % 3 === 0
                ? "0 0 6px oklch(0.65 0.2 180 / 0.8)"
                : i % 3 === 1
                  ? "0 0 6px oklch(0.55 0.23 310 / 0.7)"
                  : "0 0 6px oklch(0.65 0.18 70 / 0.6)",
          }}
        />
      ))}

      <style>{`
        @keyframes aurora-shift {
          0% { opacity: 0.8; transform: translateX(-5%) scaleX(1.1); }
          100% { opacity: 0.4; transform: translateX(5%) scaleX(0.95); }
        }
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.97); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}

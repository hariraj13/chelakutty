interface AmbientDecorProps {
  variant?: "dawn" | "night";
  parallax?: { x: number; y: number };
}

export function AmbientDecor({ variant = "dawn", parallax }: AmbientDecorProps) {
  const stars = [
    { t: "8%", l: "12%", s: 4, d: "0s" },
    { t: "14%", l: "78%", s: 3, d: "0.6s" },
    { t: "22%", l: "44%", s: 5, d: "1.1s" },
    { t: "30%", l: "88%", s: 3, d: "0.3s" },
    { t: "48%", l: "8%", s: 4, d: "1.4s" },
    { t: "62%", l: "72%", s: 3, d: "0.9s" },
    { t: "18%", l: "28%", s: 2, d: "1.8s" },
    { t: "70%", l: "18%", s: 4, d: "0.4s" },
  ];

  const shift = parallax
    ? { transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)` }
    : undefined;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className={`absolute inset-0 ${
          variant === "night"
            ? "bg-[radial-gradient(circle_at_20%_10%,#5a3d6a_0%,transparent_42%),linear-gradient(180deg,#2d2244_0%,#50334d_48%,#8a5478_100%)]"
            : "bg-[radial-gradient(circle_at_80%_0%,#e6dfff_0%,transparent_40%),linear-gradient(180deg,#ffd6e7_0%,#fff9f5_48%,#ffe4d6_100%)]"
        }`}
      />
      <div className="absolute -left-10 top-16 h-40 w-56 rounded-full bg-white/50 blur-2xl animate-drift" />
      <div className="absolute right-[-40px] top-28 h-32 w-48 rounded-full bg-lavender/70 blur-2xl animate-floaty" />
      <div className="absolute bottom-10 left-1/4 h-24 w-40 rounded-full bg-white/40 blur-xl animate-drift" style={{ animationDelay: "1.4s" }} />
      <div style={shift} className="absolute inset-0">
        {stars.map((star) => (
          <span
            key={`${star.t}-${star.l}`}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: star.t,
              left: star.l,
              width: star.s,
              height: star.s,
              animationDelay: star.d,
              boxShadow: variant === "night" ? "0 0 8px #fff" : "0 0 6px #fff",
            }}
          />
        ))}
        <span className="absolute left-[18%] top-[38%] text-rose/80 animate-floaty">♥</span>
        <span className="absolute right-[16%] top-[24%] text-berry/50 animate-floaty" style={{ animationDelay: "1s" }}>
          ♥
        </span>
        <span className="absolute right-[30%] bottom-[22%] text-rose/70 animate-drift">✦</span>
      </div>
    </div>
  );
}

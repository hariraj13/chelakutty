import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, useEffect } from "react";
import { loveStory } from "../config/loveStory";

/* ── star positions ── */
const STAR_LAYOUT = [
  { x: 18, y: 28 },
  { x: 38, y: 18 },
  { x: 58, y: 30 },
  { x: 76, y: 16 },
  { x: 84, y: 42 },
  { x: 62, y: 58 },
  { x: 40, y: 48 },
  { x: 22, y: 62 },
];

/* ── tiny background twinkle dots ── */
const BG_STARS = Array.from({ length: 38 }, (_, i) => ({
  id: i,
  x: Math.round(((i * 37 + 11) % 97) + 1),
  y: Math.round(((i * 53 + 7) % 88) + 4),
  size: i % 3 === 0 ? 2.5 : 1.5,
  delay: (i * 0.19) % 3.2,
  dur: 2.2 + (i % 4) * 0.4,
}));

/* ── shooting stars ── */
const SHOOTING = [
  { x1: 85, y1: 8,  x2: 60, y2: 28, delay: 2.5 },
  { x1: 70, y1: 5,  x2: 42, y2: 22, delay: 6.8 },
  { x1: 92, y1: 18, x2: 68, y2: 38, delay: 11.2 },
  { x1: 78, y1: 3,  x2: 50, y2: 18, delay: 16.0 },
];

/* ── heart constellation anchors ── */
const HEART_POINTS = [
  { x: 50, y: 5 },
  { x: 62, y: 3 },
  { x: 68, y: 8 },
  { x: 65, y: 14 },
  { x: 50, y: 22 },
  { x: 35, y: 14 },
  { x: 32, y: 8 },
  { x: 38, y: 3 },
];

function ShootingStar({ x1, y1, x2, y2, delay }: typeof SHOOTING[0]) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const start = window.setTimeout(() => {
      setVisible(true);
      window.setTimeout(() => setVisible(false), 900);
    }, delay * 1000);

    const loop = window.setInterval(() => {
      setVisible(true);
      window.setTimeout(() => setVisible(false), 900);
    }, 18000 + delay * 400);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(loop);
    };
  }, [delay]);

  if (!visible) return null;

  return (
    <motion.line
      x1={`${x1}%`} y1={`${y1}%`}
      x2={`${x2}%`} y2={`${y2}%`}
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0.9 }}
      animate={{ pathLength: 1, opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    />
  );
}

export function StarrySky() {
  const [found, setFound] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [allFound, setAllFound] = useState(false);

  const stars = useMemo(
    () =>
      STAR_LAYOUT.map((pos, index) => ({
        ...pos,
        message: loveStory.starMessages[index % loveStory.starMessages.length],
      })),
    [],
  );

  function discover(index: number) {
    setActive(index);
    const next = found.includes(index) ? found : [...found, index];
    setFound(next);
    if (next.length === stars.length) setAllFound(true);
  }

  /* constellation line points from found stars */
  const points = found
    .slice()
    .sort((a, b) => a - b)
    .map((i) => `${STAR_LAYOUT[i].x},${STAR_LAYOUT[i].y}`)
    .join(" ");

  /* photo to show when all stars found */
  const rewardPhoto = loveStory.photos[6] ?? null;

  return (
    <section
      id="chapter-universe"
      className="relative scroll-mt-8 overflow-hidden px-5 py-20"
    >
      {/* Deep sky gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0d0820_0%,#1e1040_30%,#3d1f5c_65%,#7a3070_100%)]" />

      {/* Nebula blobs */}
      <div className="pointer-events-none absolute left-[5%] top-[20%] h-56 w-56 rounded-full bg-[#6b3fa0]/20 blur-[60px]" />
      <div className="pointer-events-none absolute right-[8%] top-[35%] h-40 w-40 rounded-full bg-[#d94680]/15 blur-[50px]" />
      <div className="pointer-events-none absolute bottom-[10%] left-[40%] h-48 w-48 rounded-full bg-[#4a1878]/25 blur-[55px]" />

      {/* SVG sky layer — bg stars + shooting stars + constellations */}
      <svg
        viewBox="0 0 100 90"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Tiny twinkling background stars */}
        {BG_STARS.map((s) => (
          <motion.circle
            key={s.id}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.size * 0.18}
            fill="white"
            animate={{ opacity: [0.15, 0.9, 0.15], r: [s.size * 0.15, s.size * 0.22, s.size * 0.15] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Heart constellation lines (always visible, subtle) */}
        {HEART_POINTS.map((pt, i) => {
          const next = HEART_POINTS[(i + 1) % HEART_POINTS.length];
          return (
            <line
              key={i}
              x1={`${pt.x}%`} y1={`${pt.y}%`}
              x2={`${next.x}%`} y2={`${next.y}%`}
              stroke="rgba(244,166,193,0.18)"
              strokeWidth="0.35"
            />
          );
        })}
        {/* Heart constellation dots */}
        {HEART_POINTS.map((pt, i) => (
          <motion.circle
            key={`hc-${i}`}
            cx={`${pt.x}%`} cy={`${pt.y}%`} r="0.6"
            fill="rgba(244,166,193,0.6)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          />
        ))}

        {/* Discovered constellation */}
        {found.length > 1 && (
          <motion.polyline
            fill="none"
            stroke="rgba(255,214,231,0.55)"
            strokeWidth="0.5"
            points={points}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {/* Shooting stars */}
        {SHOOTING.map((s, i) => (
          <ShootingStar key={i} {...s} />
        ))}
      </svg>

      {/* Moon */}
      <div className="absolute left-[10%] top-[10%] h-16 w-16">
        <div className="h-full w-full rounded-full bg-[#ffe9c4] shadow-[0_0_40px_#ffe9c4,0_0_80px_rgba(255,233,196,0.4)]" />
        <div className="absolute left-5 top-1 h-14 w-14 rounded-full bg-[#0d0820]" />
        {/* Moon glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ boxShadow: ["0 0 20px #ffe9c4", "0 0 50px #ffe9c4", "0 0 20px #ffe9c4"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Saturn-like planet (small cute detail) */}
      <div className="absolute right-[12%] top-[18%]">
        <div className="relative h-8 w-8">
          <div className="h-full w-full rounded-full bg-[#c8b4e8]" />
          <div
            className="absolute top-1/2 left-1/2 h-[6px] w-[52px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e6dfff]/60 bg-transparent"
            style={{ transform: "translate(-50%, -50%) rotate(-20deg)" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center text-cream">
        <p className="text-xs uppercase tracking-[0.28em] text-rose">
          {loveStory.chapters.universe.navLabel}
        </p>
        <h2 className="mt-3 font-serif text-3xl sm:text-5xl">
          {loveStory.chapters.universe.title}
        </h2>
        <p className="mt-3 text-sm text-cream/70">
          Tap each star — they hold little messages just for you ✨
        </p>

        {/* Progress hearts */}
        <div className="mt-4 flex justify-center gap-2" aria-label={`${found.length} of ${stars.length} stars found`}>
          {stars.map((_, i) => (
            <motion.span
              key={i}
              className="text-sm"
              animate={{ scale: found.includes(i) ? [1, 1.4, 1] : 1 }}
              transition={{ duration: 0.4 }}
            >
              {found.includes(i) ? "💗" : "🤍"}
            </motion.span>
          ))}
        </div>

        {/* Star field */}
        <div className="relative mx-auto mt-6 h-[380px] w-full max-w-3xl">
          {/* Centre glowing heart */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-berry/90"
            animate={{
              boxShadow: [
                "0 0 20px rgba(217,70,128,0.6), 0 0 40px rgba(217,70,128,0.3)",
                "0 0 40px rgba(217,70,128,0.9), 0 0 80px rgba(217,70,128,0.5)",
                "0 0 20px rgba(217,70,128,0.6), 0 0 40px rgba(217,70,128,0.3)",
              ],
              scale: [1, 1.06, 1],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="grid h-full w-full place-items-center text-2xl">♥</span>
          </motion.div>

          {/* Clickable stars */}
          {stars.map((star, index) => {
            const isFound = found.includes(index);
            const isActive = active === index;
            return (
              <motion.button
                key={`${star.x}-${star.y}`}
                type="button"
                onClick={() => discover(index)}
                className="absolute min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Star ${index + 1}${isFound ? " — revealed" : ""}`}
              >
                {isFound ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, -10, 0] }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="block text-xl"
                  >
                    ⭐
                  </motion.span>
                ) : (
                  <motion.span
                    className="block h-3 w-3 rounded-full bg-cream shadow-[0_0_10px_white,0_0_20px_rgba(255,255,255,0.5)]"
                    animate={{
                      scale: isActive ? [1, 1.6, 1] : [0.8, 1.1, 0.8],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Message bubble */}
        <div className="mx-auto mt-4 min-h-24 max-w-md">
          <AnimatePresence mode="wait">
            {active !== null ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm backdrop-blur-md"
              >
                {/* Cute sparkle corners */}
                <span className="absolute -left-1 -top-1 text-xs text-rose">✦</span>
                <span className="absolute -right-1 -top-1 text-xs text-rose">✦</span>
                <p className="font-serif text-base text-cream">
                  {stars[active].message}
                </p>
                <p className="mt-2 text-xs text-rose/80">— star {active + 1} of {stars.length} ✨</p>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-cream/50"
              >
                ✦ tap a star to reveal a message ✦
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* All-stars reward */}
        <AnimatePresence>
          {allFound && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.3 }}
              className="mx-auto mt-8 max-w-sm overflow-hidden rounded-3xl border border-rose/30 bg-white/10 backdrop-blur-md"
            >
              <div className="px-5 py-4 text-center">
                <p className="font-serif text-lg text-cream">
                  You found all the stars! 🌟
                </p>
                <p className="mt-1 text-xs text-rose/80">
                  Unakkaga dhaan indha sky ellam, Chella Kutty 💗
                </p>
              </div>
              {rewardPhoto && (
                <img
                  src={rewardPhoto.src}
                  alt={rewardPhoto.alt}
                  className="w-full max-h-52 object-cover"
                />
              )}
              {rewardPhoto && (
                <p className="py-3 text-center font-script text-xl text-cream">
                  {rewardPhoto.caption}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

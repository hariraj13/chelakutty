import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { loveStory } from "../config/loveStory";

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

export function StarrySky() {
  const [found, setFound] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);

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
    setFound((current) => (current.includes(index) ? current : [...current, index]));
  }

  const points = found
    .slice()
    .sort((a, b) => a - b)
    .map((i) => `${STAR_LAYOUT[i].x},${STAR_LAYOUT[i].y}`)
    .join(" ");

  return (
    <section id="chapter-universe" className="relative scroll-mt-8 overflow-hidden px-5 py-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#2c2144_0%,#50334d_55%,#8d5b82_100%)]" />
      <div className="relative z-10 mx-auto max-w-4xl text-center text-cream">
        <p className="text-xs uppercase tracking-[0.28em] text-rose">{loveStory.chapters.universe.navLabel}</p>
        <h2 className="mt-3 font-serif text-3xl sm:text-5xl">{loveStory.chapters.universe.title}</h2>
        <p className="mt-3 text-sm text-cream/80">Tap a star. Each one holds a little reminder.</p>

        <div className="relative mx-auto mt-10 h-[420px] w-full max-w-3xl">
          <div className="absolute left-[12%] top-[12%] h-20 w-20 rounded-full bg-[#ffe9c4] shadow-[0_0_40px_#ffe9c4]">
            <div className="absolute left-6 top-1 h-16 w-16 rounded-full bg-[#3a2a52]" />
          </div>
          <div className="absolute right-[8%] top-[22%] h-16 w-28 rounded-full bg-[#e6dfff]/40 blur-[1px]" />
          <div className="absolute left-[20%] bottom-[18%] h-12 w-24 rounded-full bg-blush/30 blur-[1px]" />
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-berry/80 shadow-[0_0_30px_#d94680] animate-glow" />

          <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {found.length > 1 ? (
              <polyline
                fill="none"
                stroke="rgba(255,214,231,0.65)"
                strokeWidth="0.4"
                points={points}
              />
            ) : null}
          </svg>

          {stars.map((star, index) => (
            <button
              key={`${star.x}-${star.y}`}
              type="button"
              onClick={() => discover(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  discover(index);
                }
              }}
              className="absolute min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 rounded-full text-cream"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              aria-label={`Star ${index + 1}: ${found.includes(index) ? "message revealed" : "reveal a message"}`}
            >
              <span
                className={`mx-auto block h-3 w-3 rounded-full bg-cream shadow-[0_0_10px_white] ${
                  found.includes(index) ? "scale-125" : "animate-twinkle"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="mx-auto mt-4 min-h-20 max-w-md">
          <AnimatePresence mode="wait">
            {active !== null ? (
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl bg-white/10 px-5 py-4 text-sm backdrop-blur"
              >
                {stars[active].message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

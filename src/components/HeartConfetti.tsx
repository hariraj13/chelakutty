import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";

interface HeartConfettiProps {
  burstKey: number;
  reducedMotion: boolean;
  count?: number;
}

export function HeartConfetti({
  burstKey,
  reducedMotion,
  count = 16,
}: HeartConfettiProps) {
  const pieces = useMemo(() => {
    if (!burstKey) return [];
    const n = reducedMotion ? Math.min(6, count) : count;
    return Array.from({ length: n }, (_, i) => ({
      id: `${burstKey}-${i}`,
      left: `${12 + ((i * 47) % 76)}%`,
      x: ((i * 37) % 160) - 80,
      rotate: ((i * 53) % 80) - 40,
      delay: (i % 5) * 0.05,
      duration: 1.5 + (i % 4) * 0.2,
    }));
  }, [burstKey, count, reducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.span
            key={piece.id}
            className="absolute top-[40%] text-lg text-berry"
            style={{ left: piece.left }}
            initial={{ opacity: 0, y: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: reducedMotion ? -40 : -160,
              x: piece.x,
              rotate: piece.rotate,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: piece.duration, delay: piece.delay, ease: "easeOut" }}
          >
            ♥
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

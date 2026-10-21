import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { loveStory } from "../config/loveStory";
import { AmbientDecor } from "./AmbientDecor";

interface EnvelopeIntroProps {
  reducedMotion: boolean;
  onComplete: () => void;
}

const FLOATING_HEARTS = [
  { emoji: "♥", style: { left: "8%", top: "18%", fontSize: 22 }, delay: 0 },
  { emoji: "✦", style: { left: "85%", top: "25%", fontSize: 16 }, delay: 0.6 },
  { emoji: "♥", style: { left: "15%", top: "72%", fontSize: 14 }, delay: 1.1 },
  { emoji: "❀", style: { left: "78%", top: "68%", fontSize: 18 }, delay: 0.3 },
  { emoji: "♥", style: { left: "50%", top: "88%", fontSize: 12 }, delay: 0.9 },
  { emoji: "✦", style: { left: "30%", top: "10%", fontSize: 14 }, delay: 1.4 },
  { emoji: "❀", style: { left: "65%", top: "14%", fontSize: 16 }, delay: 0.5 },
];

export function EnvelopeIntro({ reducedMotion, onComplete }: EnvelopeIntroProps) {
  const [opening, setOpening] = useState(false);
  const [sealGlow, setSealGlow] = useState(false);

  function openSurprise() {
    if (opening) return;
    setSealGlow(true);
    setOpening(true);
    window.setTimeout(onComplete, reducedMotion ? 280 : 1600);
  }

  // Photo shown OUTSIDE the envelope after opening
  const peekPhoto = loveStory.photos[4] ?? null;

  return (
    <section className="relative min-h-dvh overflow-hidden px-5 py-10">
      <AmbientDecor variant="dawn" />

      {/* Floating ambient hearts */}
      {!reducedMotion &&
        FLOATING_HEARTS.map((h, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute select-none text-berry/40"
            style={h.style}
            animate={{ y: [0, -14, 0], rotate: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: h.delay,
            }}
            aria-hidden="true"
          >
            {h.emoji}
          </motion.span>
        ))}

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-2.5rem)] max-w-lg flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-serif text-4xl leading-tight text-plum sm:text-5xl"
        >
          {loveStory.openingGreeting}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 max-w-sm text-base text-plum/80 sm:text-lg"
        >
          {loveStory.openingSubtitle}
        </motion.p>

        {/* ── ENVELOPE + PHOTO WRAPPER ── */}
        <motion.div
          className="relative mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {/* Photo slides UP from below the envelope, fully outside */}
          <AnimatePresence>
            {opening && peekPhoto && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-[130px] z-[0] w-[200px] overflow-hidden rounded-2xl shadow-2xl"
                initial={{ y: 60, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : 0.7,
                  delay: reducedMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img
                  src={peekPhoto.src}
                  alt={peekPhoto.alt}
                  className="h-[160px] w-full object-cover"
                />
                <div className="bg-white px-3 py-2">
                  <p className="font-script text-base text-plum text-center">
                    {peekPhoto.caption}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope — sits on top (z higher than photo) */}
          <motion.button
            type="button"
            className="relative z-[10] cursor-pointer border-0 bg-transparent p-0"
            onMouseEnter={() => setSealGlow(true)}
            onMouseLeave={() => { if (!opening) setSealGlow(false); }}
            onClick={openSurprise}
            aria-label={loveStory.openingButton}
            whileHover={reducedMotion ? {} : { scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Envelope moves UP when opening to reveal photo below */}
            <motion.div
              className="animate-floaty"
              style={{ perspective: 900 }}
              animate={opening ? { y: reducedMotion ? -10 : -120 } : { y: 0 }}
              transition={{
                duration: reducedMotion ? 0.2 : 0.8,
                delay: reducedMotion ? 0 : 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative h-[190px] w-[260px]">
                {/* Envelope body */}
                <div className="absolute inset-x-0 bottom-0 h-[138px] rounded-md bg-[#f3b7cb] shadow-[0_18px_40px_rgba(80,51,77,0.22)]" />

                {/* Flap — opens upward */}
                <motion.div
                  className="absolute left-0 top-0 z-[3] h-[92px] w-full origin-top"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(180deg, #f7c4d4 0%, #e892b0 100%)",
                  }}
                  animate={{ rotateX: opening ? 180 : 0 }}
                  transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: "easeInOut" }}
                />

                {/* Bottom flap chevron */}
                <div
                  className="absolute inset-x-0 bottom-0 z-[4] h-[138px] rounded-md"
                  style={{
                    clipPath: "polygon(0 42%, 50% 78%, 100% 42%, 100% 100%, 0 100%)",
                    background: "linear-gradient(180deg, #f4a6c1 0%, #e989ad 100%)",
                  }}
                />

                {/* Heart seal — hides after opening */}
                <AnimatePresence>
                  {!opening && (
                    <motion.div
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-[100px] z-[5] grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-berry text-lg text-white"
                      animate={{
                        scale: sealGlow ? 1.1 : 1,
                        boxShadow: sealGlow
                          ? "0 0 0 10px rgba(217,70,128,0.2), 0 0 32px rgba(217,70,128,0.5)"
                          : "0 6px 16px rgba(80,51,77,0.2)",
                      }}
                    >
                      ♥
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.button>
        </motion.div>

        <motion.button
          type="button"
          onClick={openSurprise}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={reducedMotion ? {} : { scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 rounded-full bg-berry px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-berry/25 transition hover:brightness-105"
        >
          {loveStory.openingButton}
        </motion.button>

        <AnimatePresence>
          {opening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none mt-4 flex gap-3 text-berry"
              aria-hidden="true"
            >
              {["♥", "✦", "♥", "❀", "♥"].map((s, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -20, 0], opacity: [0.8, 1, 0] }}
                  transition={{ duration: 1.3, delay: i * 0.12, ease: "easeOut" }}
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={onComplete}
          className="relative z-10 mt-8 min-h-11 px-4 text-sm text-plum/60 underline-offset-4 hover:text-plum hover:underline"
        >
          {loveStory.skipIntroLabel}
        </button>
      </div>
    </section>
  );
}

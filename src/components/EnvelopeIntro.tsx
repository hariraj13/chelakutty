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
    window.setTimeout(onComplete, reducedMotion ? 280 : 1400);
  }

  // Pick a sweet photo to peek from the envelope
  const peekPhoto = loveStory.photos[4] ?? null; // the cosy cafe selfie

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

        <motion.button
          type="button"
          className="mt-10 cursor-pointer border-0 bg-transparent p-0"
          onMouseEnter={() => setSealGlow(true)}
          onMouseLeave={() => {
            if (!opening) setSealGlow(false);
          }}
          onClick={openSurprise}
          aria-label={loveStory.openingButton}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          whileHover={reducedMotion ? {} : { scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="animate-floaty" style={{ perspective: 900 }}>
            <div className="relative h-[190px] w-[260px]">
              <div className="absolute inset-x-0 bottom-0 h-[138px] rounded-md bg-[#f3b7cb] shadow-[0_18px_40px_rgba(80,51,77,0.22)]" />

              {/* Letter / photo peeking out */}
              <motion.div
                className="absolute left-1/2 top-[38px] z-[1] h-[120px] w-[200px] -translate-x-1/2 overflow-hidden rounded-sm shadow-md"
                initial={{ y: 36, opacity: 0 }}
                animate={
                  opening
                    ? { y: reducedMotion ? -8 : -80, opacity: 1 }
                    : { y: 36, opacity: 0 }
                }
                transition={{
                  duration: reducedMotion ? 0.2 : 0.75,
                  ease: "easeOut",
                  delay: reducedMotion ? 0 : 0.18,
                }}
              >
                {peekPhoto ? (
                  <img
                    src={peekPhoto.src}
                    alt={peekPhoto.alt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="paper-grain h-full w-full px-4 py-3 text-left">
                    <p className="font-script text-xl text-berry">For you,</p>
                    <p className="mt-1 text-sm text-plum/80">{loveStory.nickname}</p>
                  </div>
                )}
              </motion.div>

              {/* Envelope flap */}
              <motion.div
                className="absolute left-0 top-0 z-[3] h-[92px] w-full origin-top"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background:
                    "linear-gradient(180deg, #f7c4d4 0%, #e892b0 100%)",
                }}
                animate={{ rotateX: opening ? 180 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : 0.65,
                  ease: "easeInOut",
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 z-[4] h-[138px] rounded-md"
                style={{
                  clipPath: "polygon(0 42%, 50% 78%, 100% 42%, 100% 100%, 0 100%)",
                  background:
                    "linear-gradient(180deg, #f4a6c1 0%, #e989ad 100%)",
                }}
              />
              {/* Heart seal */}
              <motion.div
                className="absolute left-1/2 top-[100px] z-[5] grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-berry text-lg text-white"
                animate={{
                  scale: sealGlow ? 1.1 : 1,
                  boxShadow: sealGlow
                    ? "0 0 0 10px rgba(217,70,128,0.2), 0 0 32px rgba(217,70,128,0.5)"
                    : "0 6px 16px rgba(80,51,77,0.2)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                ♥
              </motion.div>
            </div>
          </div>
        </motion.button>

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
                  animate={{ y: [0, -16, 0], opacity: [0.7, 1, 0] }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
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

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { loveStory } from "../config/loveStory";
import { HeartConfetti } from "./HeartConfetti";

interface FinalSurpriseProps {
  reducedMotion: boolean;
  onRestart: () => void;
}

export function FinalSurprise({ reducedMotion, onRestart }: FinalSurpriseProps) {
  const [lineCount, setLineCount] = useState(
    reducedMotion ? loveStory.finaleLines.length : 0,
  );
  const [showFinal, setShowFinal] = useState(reducedMotion);
  const [loved, setLoved] = useState(false);
  const [burst, setBurst] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "0px 0px -120px 0px" });

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setLineCount(loveStory.finaleLines.length);
      setShowFinal(true);
      return;
    }
    setLineCount(0);
    setShowFinal(false);
    let current = 0;
    const id = window.setInterval(() => {
      current += 1;
      if (current <= loveStory.finaleLines.length) {
        setLineCount(current);
      } else {
        window.clearInterval(id);
        window.setTimeout(() => setShowFinal(true), 700);
      }
    }, 1700);
    return () => window.clearInterval(id);
  }, [reducedMotion, inView]);

  function sendLove() {
    setLoved(true);
    setBurst((n) => n + 1);
  }

  // Pick a few photos for the strip at the bottom
  const stripPhotos = loveStory.photos.slice(0, 5);

  return (
    <section
      id="chapter-finale"
      ref={sectionRef}
      className="relative scroll-mt-8 overflow-hidden px-5 py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#241833_0%,#50334d_50%,#d94680_140%)]" />
      <div className="absolute left-[12%] top-[14%] h-16 w-16 rounded-full bg-[#ffe9c4] shadow-[0_0_30px_#ffe9c4]">
        <div className="absolute left-5 top-1 h-14 w-14 rounded-full bg-[#241833]" />
      </div>
      <span
        className="absolute right-[18%] top-[22%] text-blush animate-floaty"
        aria-hidden="true"
      >
        ❀
      </span>
      <span
        className="absolute left-[22%] bottom-[18%] text-rose animate-drift"
        aria-hidden="true"
      >
        ❀
      </span>
      <HeartConfetti burstKey={burst} reducedMotion={reducedMotion} count={20} />

      <div className="relative z-10 mx-auto max-w-2xl text-center text-cream">
        <p className="text-xs uppercase tracking-[0.28em] text-rose">
          {loveStory.chapters.finale.navLabel}
        </p>

        <div className="mt-8 space-y-5">
          {loveStory.finaleLines.slice(0, lineCount).map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reducedMotion ? 0 : i * 0.05 }}
              className="font-serif text-2xl sm:text-3xl"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {showFinal && (
          <motion.p
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 20 }}
            className="mt-10 font-serif text-3xl leading-snug text-blush sm:text-4xl"
          >
            {loveStory.finaleMessage}
          </motion.p>
        )}

        <motion.div
          className="mx-auto mt-8 grid h-16 w-16 place-items-center rounded-full bg-berry text-2xl text-white shadow-[0_0_30px_#d94680]"
          animate={loved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          ♥
        </motion.div>

        {showFinal && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <button
              type="button"
              onClick={sendLove}
              className="min-h-12 rounded-full bg-berry px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 hover:scale-105"
            >
              {loveStory.finaleButton}
            </button>
            {loved && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md text-sm text-cream/90"
              >
                {loveStory.finaleReply}
              </motion.p>
            )}
            <button
              type="button"
              onClick={onRestart}
              className="text-sm text-cream/70 underline-offset-4 hover:underline"
            >
              {loveStory.readAgainLabel}
            </button>
          </motion.div>
        )}

        {/* Photo strip */}
        {stripPhotos.length > 0 && showFinal && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-16"
          >
            <p className="mb-4 text-xs uppercase tracking-widest text-rose/80">
              our little moments 💗
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none justify-center flex-wrap">
              {stripPhotos.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  initial={{ opacity: 0, scale: 0.85, rotate: (i % 2 === 0 ? -3 : 3) }}
                  animate={{ opacity: 1, scale: 1, rotate: (i % 2 === 0 ? -2 : 2) }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
                  className="shrink-0 rounded-sm bg-white p-1.5 pb-6 shadow-lg"
                  style={{ width: 100 }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="aspect-square w-full rounded-sm object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

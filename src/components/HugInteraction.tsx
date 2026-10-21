import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { loveStory } from "../config/loveStory";
import { HeartConfetti } from "./HeartConfetti";

interface HugInteractionProps {
  reducedMotion: boolean;
}

export function HugInteraction({ reducedMotion }: HugInteractionProps) {
  const [hugging, setHugging] = useState(false);
  const [burst, setBurst] = useState(0);

  // The hugging photo — the warm restaurant hug photo
  const hugPhoto = loveStory.photos[5] ?? null;

  function hug() {
    setHugging(true);
    setBurst((n) => n + 1);
  }

  return (
    <section className="px-5 py-20">
      <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] bg-blush/70 px-6 py-12 text-center shadow-inner">
        <HeartConfetti burstKey={burst} reducedMotion={reducedMotion} />
        <h2 className="font-serif text-3xl text-plum sm:text-4xl">
          {loveStory.hugPrompt}
        </h2>

        {/* Animated hug figures */}
        <div className="relative mx-auto mt-10 h-36 w-64">
          <motion.div
            className="absolute left-4 top-8 h-20 w-16 rounded-[2rem] bg-rose"
            animate={{ x: hugging ? 28 : 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 12 }}
          >
            <div className="absolute left-3 top-4 h-6 w-6 rounded-full bg-peach" />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-10 h-14 w-14 -translate-x-1/2 rounded-full bg-berry shadow-[0_0_24px_rgba(217,70,128,0.45)]"
            animate={{ scale: hugging ? [1, 1.25, 1] : 1 }}
            transition={{ duration: 0.9, type: "spring" }}
          />

          <motion.div
            className="absolute right-4 top-8 h-20 w-16 rounded-[2rem] bg-lavender"
            animate={{ x: hugging ? -28 : 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 12 }}
          >
            <div className="absolute right-3 top-4 h-6 w-6 rounded-full bg-peach" />
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={hug}
          whileHover={reducedMotion ? {} : { scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="mt-4 min-h-12 rounded-full bg-berry px-6 py-3 text-sm font-semibold text-white shadow-lg transition"
        >
          {loveStory.hugButton}
        </motion.button>

        <AnimatePresence>
          {hugging && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mt-6 text-base text-plum">{loveStory.hugMessage}</p>

              {/* Sweet photo after hug */}
              {hugPhoto && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 20 }}
                  className="mx-auto mt-6 max-w-xs"
                >
                  <div className="rounded-2xl bg-white p-2 shadow-xl">
                    <img
                      src={hugPhoto.src}
                      alt={hugPhoto.alt}
                      className="w-full rounded-xl object-cover max-h-72"
                    />
                    <p className="mt-2 text-center font-script text-lg text-plum pb-1">
                      {hugPhoto.caption}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

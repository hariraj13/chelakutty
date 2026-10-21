import { motion } from "motion/react";
import { useState } from "react";
import { loveStory } from "../config/loveStory";
import { HeartConfetti } from "./HeartConfetti";

interface HugInteractionProps {
  reducedMotion: boolean;
}

export function HugInteraction({ reducedMotion }: HugInteractionProps) {
  const [hugging, setHugging] = useState(false);
  const [burst, setBurst] = useState(0);

  function hug() {
    setHugging(true);
    setBurst((n) => n + 1);
  }

  return (
    <section className="px-5 py-20">
      <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] bg-blush/70 px-6 py-12 text-center shadow-inner">
        <HeartConfetti burstKey={burst} reducedMotion={reducedMotion} />
        <h2 className="font-serif text-3xl text-plum sm:text-4xl">{loveStory.hugPrompt}</h2>
        <div className="relative mx-auto mt-10 h-36 w-64">
          <motion.div
            className="absolute left-4 top-8 h-20 w-16 rounded-[2rem] bg-rose"
            animate={{ x: hugging ? 28 : 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <div className="absolute left-3 top-4 h-6 w-6 rounded-full bg-peach" />
          </motion.div>
          <motion.div
            className="absolute left-1/2 top-10 h-14 w-14 -translate-x-1/2 rounded-full bg-berry shadow-[0_0_24px_rgba(217,70,128,0.45)]"
            animate={{ scale: hugging ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="absolute right-4 top-8 h-20 w-16 rounded-[2rem] bg-lavender"
            animate={{ x: hugging ? -28 : 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <div className="absolute right-3 top-4 h-6 w-6 rounded-full bg-peach" />
          </motion.div>
        </div>
        <button
          type="button"
          onClick={hug}
          className="mt-4 min-h-12 rounded-full bg-berry px-6 py-3 text-sm font-semibold text-white shadow-lg"
        >
          {loveStory.hugButton}
        </button>
        {hugging ? (
          <p className="mt-6 text-base text-plum">{loveStory.hugMessage}</p>
        ) : null}
      </div>
    </section>
  );
}

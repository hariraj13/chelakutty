import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { loveStory } from "../config/loveStory";
import { HeartConfetti } from "./HeartConfetti";

interface FinalSurpriseProps {
  reducedMotion: boolean;
  onRestart: () => void;
}

export function FinalSurprise({ reducedMotion, onRestart }: FinalSurpriseProps) {
  const [lineCount, setLineCount] = useState(reducedMotion ? loveStory.finaleLines.length : 0);
  const [showFinal, setShowFinal] = useState(reducedMotion);
  const [loved, setLoved] = useState(false);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
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
  }, [reducedMotion]);

  function sendLove() {
    setLoved(true);
    setBurst((n) => n + 1);
  }

  return (
    <section id="chapter-finale" className="relative scroll-mt-8 overflow-hidden px-5 py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#241833_0%,#50334d_50%,#d94680_140%)]" />
      <div className="absolute left-[12%] top-[14%] h-16 w-16 rounded-full bg-[#ffe9c4] shadow-[0_0_30px_#ffe9c4]">
        <div className="absolute left-5 top-1 h-14 w-14 rounded-full bg-[#241833]" />
      </div>
      <span className="absolute right-[18%] top-[22%] text-blush animate-floaty" aria-hidden="true">❀</span>
      <span className="absolute left-[22%] bottom-[18%] text-rose animate-drift" aria-hidden="true">❀</span>
      <HeartConfetti burstKey={burst} reducedMotion={reducedMotion} count={20} />

      <div className="relative z-10 mx-auto max-w-2xl text-center text-cream">
        <p className="text-xs uppercase tracking-[0.28em] text-rose">
          {loveStory.chapters.finale.navLabel}
        </p>
        <div className="mt-8 space-y-5">
          {loveStory.finaleLines.slice(0, lineCount).map((line) => (
            <motion.p
              key={line}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-2xl sm:text-3xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
        {showFinal ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 font-serif text-3xl leading-snug text-blush sm:text-4xl"
          >
            {loveStory.finaleMessage}
          </motion.p>
        ) : null}
        <motion.div
          className="mx-auto mt-8 grid h-16 w-16 place-items-center rounded-full bg-berry text-2xl text-white shadow-[0_0_30px_#d94680]"
          animate={{ scale: loved ? 1.12 : 1 }}
          aria-hidden="true"
        >
          ♥
        </motion.div>
        {showFinal ? (
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={sendLove}
              className="min-h-12 rounded-full bg-berry px-6 py-3 text-sm font-semibold text-white"
            >
              {loveStory.finaleButton}
            </button>
            {loved ? <p className="max-w-md text-sm text-cream/90">{loveStory.finaleReply}</p> : null}
            <button
              type="button"
              onClick={onRestart}
              className="text-sm text-cream/70 underline-offset-4 hover:underline"
            >
              {loveStory.readAgainLabel}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

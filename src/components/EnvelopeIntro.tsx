import { motion } from "motion/react";
import { useState } from "react";
import { loveStory } from "../config/loveStory";
import { AmbientDecor } from "./AmbientDecor";

interface EnvelopeIntroProps {
  reducedMotion: boolean;
  onComplete: () => void;
}

export function EnvelopeIntro({ reducedMotion, onComplete }: EnvelopeIntroProps) {
  const [opening, setOpening] = useState(false);
  const [sealGlow, setSealGlow] = useState(false);

  function openSurprise() {
    if (opening) return;
    setSealGlow(true);
    setOpening(true);
    window.setTimeout(onComplete, reducedMotion ? 280 : 1400);
  }

  return (
    <section className="relative min-h-dvh overflow-hidden px-5 py-10">
      <AmbientDecor variant="dawn" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-2.5rem)] max-w-lg flex-col items-center justify-center text-center">
        <p className="font-serif text-4xl leading-tight text-plum sm:text-5xl">
          {loveStory.openingGreeting}
        </p>
        <p className="mt-4 max-w-sm text-base text-plum/80 sm:text-lg">
          {loveStory.openingSubtitle}
        </p>

        <button
          type="button"
          className="mt-10 cursor-pointer border-0 bg-transparent p-0"
          onMouseEnter={() => setSealGlow(true)}
          onMouseLeave={() => {
            if (!opening) setSealGlow(false);
          }}
          onClick={openSurprise}
          aria-label={loveStory.openingButton}
        >
          <div className="animate-floaty" style={{ perspective: 900 }}>
            <div className="relative h-[170px] w-[250px]">
              <div className="absolute inset-x-0 bottom-0 h-[128px] rounded-md bg-[#f3b7cb] shadow-[0_18px_40px_rgba(80,51,77,0.18)]" />
              <motion.div
                className="paper-grain absolute left-1/2 top-[38px] z-[1] h-[110px] w-[190px] -translate-x-1/2 rounded-sm px-4 py-3 text-left shadow-md"
                initial={{ y: 36, opacity: 0 }}
                animate={opening ? { y: reducedMotion ? -8 : -72, opacity: 1 } : { y: 36, opacity: 0 }}
                transition={{ duration: reducedMotion ? 0.2 : 0.7, ease: "easeOut", delay: reducedMotion ? 0 : 0.18 }}
              >
                <p className="font-script text-xl text-berry">For you,</p>
                <p className="mt-1 text-sm text-plum/80">{loveStory.nickname}</p>
              </motion.div>
              <motion.div
                className="absolute left-0 top-0 z-[3] h-[86px] w-full origin-top"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(180deg, #f7c4d4 0%, #e892b0 100%)",
                }}
                animate={{ rotateX: opening ? 180 : 0 }}
                transition={{ duration: reducedMotion ? 0.2 : 0.65, ease: "easeInOut" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 z-[4] h-[128px] rounded-md"
                style={{
                  clipPath: "polygon(0 42%, 50% 78%, 100% 42%, 100% 100%, 0 100%)",
                  background: "linear-gradient(180deg, #f4a6c1 0%, #e989ad 100%)",
                }}
              />
              <motion.div
                className="absolute left-1/2 top-[92px] z-[5] grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-berry text-lg text-white"
                animate={{
                  scale: sealGlow ? 1.08 : 1,
                  boxShadow: sealGlow
                    ? "0 0 0 8px rgba(217,70,128,0.22), 0 0 28px rgba(217,70,128,0.45)"
                    : "0 6px 16px rgba(80,51,77,0.2)",
                }}
              >
                ♥
              </motion.div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={openSurprise}
          className="mt-8 rounded-full bg-berry px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-berry/25 transition hover:brightness-105"
        >
          {loveStory.openingButton}
        </button>

        {opening ? (
          <div className="pointer-events-none mt-4 flex gap-2 text-berry" aria-hidden="true">
            <span className="animate-floaty">♥</span>
            <span className="animate-drift">✦</span>
            <span className="animate-floaty" style={{ animationDelay: "0.4s" }}>♥</span>
          </div>
        ) : null}

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

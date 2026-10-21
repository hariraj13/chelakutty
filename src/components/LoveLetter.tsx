import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { loveStory } from "../config/loveStory";

interface LoveLetterProps {
  reducedMotion: boolean;
}

export function LoveLetter({ reducedMotion }: LoveLetterProps) {
  const [opened, setOpened] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!opened) {
      setVisibleLines(0);
      return;
    }
    if (reducedMotion) {
      setVisibleLines(loveStory.loveLetter.length);
      return;
    }
    setVisibleLines(1);
    const id = window.setInterval(() => {
      setVisibleLines((count) => {
        if (count >= loveStory.loveLetter.length) {
          window.clearInterval(id);
          return count;
        }
        return count + 1;
      });
    }, 420);
    return () => window.clearInterval(id);
  }, [opened, reducedMotion]);

  function replay() {
    setOpened(false);
    window.setTimeout(() => setOpened(true), 80);
  }

  return (
    <section id="chapter-letter" className="scroll-mt-8 px-5 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-berry/80">
          {loveStory.chapters.letter.navLabel}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-plum sm:text-5xl">
          {loveStory.chapters.letter.title}
        </h2>

        <button
          type="button"
          className="relative mx-auto mt-10 block w-full max-w-md border-0 bg-transparent p-0"
          onClick={() => setOpened(true)}
          aria-expanded={opened}
        >
          <div className="relative mx-auto h-[220px] w-full max-w-[320px]" style={{ perspective: 900 }}>
            <div className="absolute inset-x-4 bottom-0 h-[150px] rounded-md bg-[#efb0c6] shadow-[0_20px_40px_rgba(80,51,77,0.16)]" />
            <motion.div
              className="paper-grain absolute left-1/2 top-8 z-[1] h-[280px] w-[86%] max-w-[270px] -translate-x-1/2 overflow-hidden rounded-sm p-4 text-left shadow-lg"
              animate={opened ? { y: -118 } : { y: 48 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.8, ease: "easeOut" }}
            >
              <div className="space-y-2">
                {loveStory.loveLetter.slice(0, Math.max(visibleLines, opened ? 1 : 0)).map((line) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: reducedMotion ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[13px] leading-relaxed text-plum/90"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="absolute inset-x-4 top-6 z-[2] h-[88px] origin-top"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg,#f8c9d8,#e892b0)",
              }}
              animate={{ rotateX: opened ? 172 : 0 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.7 }}
            />
            <div
              className="absolute inset-x-4 bottom-0 z-[3] h-[150px]"
              style={{
                clipPath: "polygon(0 38%, 50% 78%, 100% 38%, 100% 100%, 0 100%)",
                background: "linear-gradient(180deg,#f4a6c1,#e07a9f)",
              }}
            />
            <div className="absolute left-1/2 top-[118px] z-[4] grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-berry text-white shadow">
              ♥
            </div>
          </div>
          <span className="sr-only">Open the love letter</span>
        </button>

        {opened ? (
          <article className="paper-grain relative mx-auto mt-8 max-w-xl rounded-3xl px-6 py-8 text-left shadow-xl">
            {opened ? (
              <div className="pointer-events-none absolute -right-2 -top-3 text-berry animate-floaty" aria-hidden="true">
                ♥
              </div>
            ) : null}
            <div className="space-y-4">
              {loveStory.loveLetter.slice(0, visibleLines).map((line) => (
                <p key={line} className="text-[15px] leading-relaxed text-plum">
                  {line}
                </p>
              ))}
            </div>
            {visibleLines >= loveStory.loveLetter.length ? (
              <p className="mt-8 font-script text-2xl text-berry">{loveStory.senderName} 💗</p>
            ) : null}
            <button
              type="button"
              onClick={replay}
              className="mt-6 text-sm text-plum/60 underline-offset-4 hover:underline"
            >
              {loveStory.letterReplayLabel}
            </button>
          </article>
        ) : (
          <p className="mt-6 text-sm text-plum/60">Tap the envelope to open your letter.</p>
        )}
      </div>
    </section>
  );
}

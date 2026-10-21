import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { loveStory } from "../config/loveStory";
import { AmbientDecor } from "./AmbientDecor";

interface StoryHeroProps {
  reducedMotion: boolean;
}

export function StoryHero({ reducedMotion }: StoryHeroProps) {
  const [note, setNote] = useState<string | null>(null);
  const [noteIndex, setNoteIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const notes = loveStory.heroSecretNotes;

  function revealSecret() {
    const next = notes[noteIndex % notes.length] ?? "You're special.";
    setNote(next);
    setNoteIndex((i) => i + 1);
  }

  const heartTransition = useMemo(
    () =>
      reducedMotion
        ? { duration: 0 }
        : { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const },
    [reducedMotion],
  );

  return (
    <section
      className="relative overflow-hidden px-5 pb-20 pt-16 sm:pt-24"
      onMouseMove={(event) => {
        if (reducedMotion) return;
        const { innerWidth, innerHeight } = window;
        setParallax({
          x: ((event.clientX / innerWidth) - 0.5) * 16,
          y: ((event.clientY / innerHeight) - 0.5) * 10,
        });
      }}
    >
      <AmbientDecor variant="dawn" parallax={reducedMotion ? undefined : parallax} />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl leading-tight text-plum sm:text-6xl">
          {loveStory.heroHeadline}
        </h1>
        <motion.div
          className="mx-auto my-6 grid h-12 w-12 place-items-center rounded-full bg-berry text-xl text-white shadow-lg"
          animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.08, 1] }}
          transition={heartTransition}
          aria-hidden="true"
        >
          ♥
        </motion.div>
        <p className="text-base text-plum/80 sm:text-lg">{loveStory.heroSupporting}</p>
        <p className="mt-4 font-serif text-xl italic text-plum sm:text-2xl">
          {loveStory.heroRomanticLine}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#chapter-beginning"
            className="inline-flex min-h-12 items-center rounded-full bg-berry px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-berry/20"
          >
            {loveStory.heroPrimaryButton}
          </a>
          <button
            type="button"
            onClick={revealSecret}
            className="inline-flex min-h-12 items-center rounded-full border border-rose bg-white/70 px-6 py-3 text-sm font-semibold text-plum backdrop-blur"
          >
            {loveStory.heroSecondaryButton}
          </button>
        </div>
        <div className="relative mx-auto mt-6 min-h-16 max-w-md">
          <AnimatePresence>
            {note ? (
              <motion.aside
                key={note}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                className="paper-grain rounded-2xl px-5 py-4 text-sm text-plum shadow-lg"
              >
                {note}
              </motion.aside>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

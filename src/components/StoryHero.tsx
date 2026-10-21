import { AnimatePresence, motion, useInView } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { loveStory } from "../config/loveStory";
import { AmbientDecor } from "./AmbientDecor";

interface StoryHeroProps {
  reducedMotion: boolean;
}

export function StoryHero({ reducedMotion }: StoryHeroProps) {
  const [note, setNote] = useState<string | null>(null);
  const [noteIndex, setNoteIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true });

  const notes = loveStory.heroSecretNotes;
  const heroPhoto = loveStory.photos[6] ?? loveStory.photos[0] ?? null; // prefer the warm last photo

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
      ref={sectionRef}
      className="relative overflow-hidden px-5 pb-24 pt-16 sm:pt-28"
      onMouseMove={(event) => {
        if (reducedMotion) return;
        const { innerWidth, innerHeight } = window;
        setParallax({
          x: (event.clientX / innerWidth - 0.5) * 16,
          y: (event.clientY / innerHeight - 0.5) * 10,
        });
      }}
    >
      <AmbientDecor variant="dawn" parallax={reducedMotion ? undefined : parallax} />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Hero photo */}
        {heroPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mb-8 h-56 w-56 sm:h-72 sm:w-72"
          >
            {/* Glowing ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={
                reducedMotion
                  ? {}
                  : {
                      boxShadow: [
                        "0 0 0 6px rgba(217,70,128,0.15), 0 0 40px rgba(217,70,128,0.2)",
                        "0 0 0 12px rgba(217,70,128,0.08), 0 0 60px rgba(217,70,128,0.3)",
                        "0 0 0 6px rgba(217,70,128,0.15), 0 0 40px rgba(217,70,128,0.2)",
                      ],
                    }
              }
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <img
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              className="h-full w-full rounded-full object-cover shadow-2xl ring-4 ring-rose/60"
            />
            {/* Floating hearts around photo */}
            {!reducedMotion && (
              <>
                <motion.span
                  className="absolute -right-3 top-6 text-berry text-xl"
                  animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                >
                  ♥
                </motion.span>
                <motion.span
                  className="absolute -left-4 bottom-10 text-rose text-lg"
                  animate={{ y: [0, 10, 0], rotate: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                  aria-hidden="true"
                >
                  ♥
                </motion.span>
                <motion.span
                  className="absolute right-2 bottom-4 text-blush text-sm"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                  aria-hidden="true"
                >
                  ✦
                </motion.span>
              </>
            )}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-4xl leading-tight text-plum sm:text-6xl"
        >
          {loveStory.heroHeadline}
        </motion.h1>

        <motion.div
          className="mx-auto my-6 grid h-12 w-12 place-items-center rounded-full bg-berry text-xl text-white shadow-lg"
          animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.08, 1] }}
          transition={heartTransition}
          aria-hidden="true"
        >
          ♥
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base text-plum/80 sm:text-lg"
        >
          {loveStory.heroSupporting}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 font-serif text-xl italic text-plum sm:text-2xl"
        >
          {loveStory.heroRomanticLine}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#chapter-beginning"
            className="inline-flex min-h-12 items-center rounded-full bg-berry px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-berry/20 transition hover:brightness-105 hover:scale-105"
          >
            {loveStory.heroPrimaryButton}
          </a>
          <button
            type="button"
            onClick={revealSecret}
            className="inline-flex min-h-12 items-center rounded-full border border-rose bg-white/70 px-6 py-3 text-sm font-semibold text-plum backdrop-blur transition hover:bg-rose/20 hover:scale-105"
          >
            {loveStory.heroSecondaryButton}
          </button>
        </motion.div>

        <div className="relative mx-auto mt-6 min-h-16 max-w-md">
          <AnimatePresence>
            {note ? (
              <motion.aside
                key={note}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
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

import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { loveStory } from "../config/loveStory";

const OBJECTS = [
  { id: "heart", label: "A sweet compliment", note: loveStory.beginningNotes.heart, glyph: "♥" },
  { id: "star", label: "A reassuring message", note: loveStory.beginningNotes.star, glyph: "✦" },
  { id: "envelope", label: "A secret note", note: loveStory.beginningNotes.envelope, glyph: "✉" },
] as const;

export function ChapterBeginning() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = OBJECTS.find((item) => item.id === openId);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  // Use a soft background photo
  const bgPhoto = loveStory.photos[7] ?? loveStory.photos[0] ?? null;

  return (
    <section
      id="chapter-beginning"
      ref={ref}
      className="relative scroll-mt-8 px-5 py-20 overflow-hidden"
    >
      {/* Soft background photo */}
      {bgPhoto && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={bgPhoto.src}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-[0.07] blur-sm scale-105"
          />
        </div>
      )}

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.28em] text-berry/80">
            {loveStory.chapters.beginning.navLabel}
          </p>
          <h2 className="mt-3 font-serif text-3xl text-plum sm:text-5xl">
            {loveStory.chapters.beginning.title}
          </h2>
          <p className="mt-4 text-lg text-plum/80">
            {loveStory.chapters.beginning.body}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto mt-12 h-64 max-w-lg"
        >
          <div className="absolute left-1/2 top-10 h-28 w-52 -translate-x-1/2 rounded-[50%] bg-blush/90 blur-[1px]" />
          <div className="absolute left-1/2 top-6 h-16 w-16 -translate-x-1/2 rounded-full bg-peach shadow-inner">
            <div className="absolute left-2 top-3 h-10 w-10 rounded-full bg-cream/40" />
          </div>
          <span className="absolute left-[18%] top-8 text-rose animate-floaty">❀</span>
          <span className="absolute right-[16%] top-16 text-berry/70 animate-drift">❀</span>
          <span className="absolute left-1/2 top-24 -translate-x-1/2 text-2xl text-berry animate-floaty">
            ♥
          </span>

          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-4">
            {OBJECTS.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                aria-expanded={openId === item.id}
                aria-controls="beginning-note"
                onClick={() =>
                  setOpenId((current) => (current === item.id ? null : item.id))
                }
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.12, rotate: openId === item.id ? 0 : 5 }}
                whileTap={{ scale: 0.92 }}
                className={`grid h-14 w-14 place-items-center rounded-full text-xl text-berry shadow-md backdrop-blur transition ${
                  openId === item.id
                    ? "bg-berry text-white shadow-berry/30 shadow-lg"
                    : "bg-white/80"
                }`}
              >
                <span className="sr-only">{item.label}</span>
                <span aria-hidden="true">{item.glyph}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div id="beginning-note" className="mx-auto mt-6 min-h-20 max-w-md">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.p
                key={active.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="paper-grain rounded-2xl px-5 py-4 text-base text-plum shadow"
              >
                {active.note}
              </motion.p>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-plum/50"
              >
                Tap a heart, a star, or an envelope.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

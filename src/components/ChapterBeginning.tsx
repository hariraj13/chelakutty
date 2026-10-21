import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { loveStory } from "../config/loveStory";

const OBJECTS = [
  { id: "heart", label: "A sweet compliment", note: loveStory.beginningNotes.heart, glyph: "♥" },
  { id: "star", label: "A reassuring message", note: loveStory.beginningNotes.star, glyph: "✦" },
  { id: "envelope", label: "A secret note", note: loveStory.beginningNotes.envelope, glyph: "✉" },
] as const;

export function ChapterBeginning() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = OBJECTS.find((item) => item.id === openId);

  return (
    <section id="chapter-beginning" className="relative scroll-mt-8 px-5 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-berry/80">
          {loveStory.chapters.beginning.navLabel}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-plum sm:text-5xl">
          {loveStory.chapters.beginning.title}
        </h2>
        <p className="mt-4 text-lg text-plum/80">{loveStory.chapters.beginning.body}</p>

        <div className="relative mx-auto mt-12 h-64 max-w-lg">
          <div className="absolute left-1/2 top-10 h-28 w-52 -translate-x-1/2 rounded-[50%] bg-blush/90 blur-[1px]" />
          <div className="absolute left-1/2 top-6 h-16 w-16 -translate-x-1/2 rounded-full bg-peach shadow-inner">
            <div className="absolute left-2 top-3 h-10 w-10 rounded-full bg-cream/40" />
          </div>
          <span className="absolute left-[18%] top-8 text-rose animate-floaty">❀</span>
          <span className="absolute right-[16%] top-16 text-berry/70 animate-drift">❀</span>
          <span className="absolute left-1/2 top-24 -translate-x-1/2 text-2xl text-berry animate-floaty">♥</span>

          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-4">
            {OBJECTS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-expanded={openId === item.id}
                aria-controls="beginning-note"
                onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                className="grid h-14 w-14 place-items-center rounded-full bg-white/80 text-xl text-berry shadow-md backdrop-blur transition hover:scale-105"
              >
                <span className="sr-only">{item.label}</span>
                <span aria-hidden="true">{item.glyph}</span>
              </button>
            ))}
          </div>
        </div>

        <div id="beginning-note" className="mx-auto mt-6 min-h-20 max-w-md">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.p
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="paper-grain rounded-2xl px-5 py-4 text-base text-plum shadow"
              >
                {active.note}
              </motion.p>
            ) : (
              <p className="text-sm text-plum/50">Tap a heart, a star, or an envelope.</p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

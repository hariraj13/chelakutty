import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { loveStory } from "../config/loveStory";

interface ReasonCard {
  id: string;
  text: string;
}

export function ReasonsGrid() {
  const initial = useMemo<ReasonCard[]>(
    () => loveStory.reasons.map((text, index) => ({ id: `reason-${index}`, text })),
    [],
  );
  const [cards, setCards] = useState(initial);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [extraIndex, setExtraIndex] = useState(0);

  function toggle(id: string) {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addReason() {
    const nextText = loveStory.extraReasons[extraIndex];
    if (!nextText) return;
    const id = `extra-${extraIndex}`;
    setCards((current) => [...current, { id, text: nextText }]);
    setOpenIds((current) => new Set(current).add(id));
    setExtraIndex((i) => i + 1);
  }

  const exhausted = extraIndex >= loveStory.extraReasons.length;

  return (
    <section id="chapter-reasons" className="scroll-mt-8 bg-lavender/35 px-5 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-berry/80">
          {loveStory.chapters.reasons.navLabel}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-plum sm:text-5xl">
          {loveStory.chapters.reasons.title}
        </h2>
        <p className="mt-4 text-lg text-plum/80">{loveStory.chapters.reasons.subtitle}</p>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const open = openIds.has(card.id);
            const rotation = ((index % 5) - 2) * 1.2;
            return (
              <li key={card.id} style={{ transform: `rotate(${rotation}deg)` }}>
                <button
                  type="button"
                  onClick={() => toggle(card.id)}
                  aria-expanded={open}
                  className="paper-grain relative min-h-36 w-full rounded-2xl p-5 text-left shadow-md transition hover:-translate-y-1"
                >
                  <span
                    className="absolute right-4 top-3 text-rose"
                    style={{ transform: `rotate(${index * 18}deg)` }}
                    aria-hidden="true"
                  >
                    ✿
                  </span>
                  <p className="pr-6 text-sm text-plum/90 sm:text-base">
                    {open ? card.text : `${card.text.slice(0, 42)}${card.text.length > 42 ? "..." : ""}`}
                  </p>
                  <AnimatePresence>
                    {open ? (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 inline-block text-berry"
                        aria-hidden="true"
                      >
                        ♥
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={addReason}
          disabled={exhausted}
          className="mt-10 min-h-12 rounded-full bg-berry px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {exhausted ? loveStory.reasonsExhausted : loveStory.reasonsButton}
        </button>
      </div>
    </section>
  );
}

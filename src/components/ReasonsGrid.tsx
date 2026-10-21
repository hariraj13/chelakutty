import { AnimatePresence, motion, useInView } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { loveStory } from "../config/loveStory";

interface ReasonCard {
  id: string;
  text: string;
}

function ReasonCardItem({
  card,
  index,
  open,
  onToggle,
}: {
  card: ReasonCard;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const rotation = ((index % 5) - 2) * 1.2;

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 32, rotate: rotation - 2 }}
      animate={inView ? { opacity: 1, y: 0, rotate: rotation } : {}}
      transition={{ duration: 0.55, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        whileHover={{ scale: 1.03, rotate: 0, zIndex: 5 }}
        whileTap={{ scale: 0.97 }}
        className="paper-grain relative min-h-36 w-full rounded-2xl p-5 text-left shadow-md transition"
      >
        <motion.span
          className="absolute right-4 top-3 text-rose"
          style={{ rotate: index * 18 }}
          animate={open ? { scale: [1, 1.4, 1], color: ["#f4a6c1", "#d94680", "#f4a6c1"] } : {}}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          ✿
        </motion.span>
        <p className="pr-6 text-sm text-plum/90 sm:text-base">
          {open ? card.text : `${card.text.slice(0, 42)}${card.text.length > 42 ? "..." : ""}`}
        </p>
        <AnimatePresence>
          {open && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="mt-3 inline-block text-berry"
              aria-hidden="true"
            >
              ♥
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.li>
  );
}

export function ReasonsGrid() {
  const initial = useMemo<ReasonCard[]>(
    () => loveStory.reasons.map((text, index) => ({ id: `reason-${index}`, text })),
    [],
  );
  const [cards, setCards] = useState(initial);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [extraIndex, setExtraIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

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
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.28em] text-berry/80">
            {loveStory.chapters.reasons.navLabel}
          </p>
          <h2 className="mt-3 font-serif text-3xl text-plum sm:text-5xl">
            {loveStory.chapters.reasons.title}
          </h2>
          <p className="mt-4 text-lg text-plum/80">
            {loveStory.chapters.reasons.subtitle}
          </p>
        </motion.div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <ReasonCardItem
              key={card.id}
              card={card}
              index={index}
              open={openIds.has(card.id)}
              onToggle={() => toggle(card.id)}
            />
          ))}
        </ul>

        <motion.button
          type="button"
          onClick={addReason}
          disabled={exhausted}
          whileHover={exhausted ? {} : { scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 min-h-12 rounded-full bg-berry px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {exhausted ? loveStory.reasonsExhausted : loveStory.reasonsButton}
        </motion.button>
      </div>
    </section>
  );
}

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { loveStory } from "../config/loveStory";

const MOODS = [
  { id: "happy", label: "Happy 😊", message: loveStory.moodMessages.happy },
  { id: "tired", label: "Tired 🥺", message: loveStory.moodMessages.tired },
  { id: "low", label: "Feeling low 💗", message: loveStory.moodMessages.low },
  { id: "smile", label: "Need a smile ✨", message: loveStory.moodMessages.smile },
] as const;

export function MoodGarden() {
  const [mood, setMood] = useState<(typeof MOODS)[number]["id"] | null>(null);
  const selected = MOODS.find((item) => item.id === mood);

  return (
    <section className="bg-peach/40 px-5 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl text-plum sm:text-4xl">{loveStory.moodTitle}</h2>
        <p className="mt-3 text-sm text-plum/75">{loveStory.moodIntro}</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {MOODS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMood(item.id)}
              aria-pressed={mood === item.id}
              className={`min-h-12 rounded-2xl px-3 py-3 text-sm font-semibold shadow-sm ${
                mood === item.id ? "bg-berry text-white" : "bg-white/80 text-plum"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mx-auto mt-6 min-h-20 max-w-lg">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.p
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="paper-grain rounded-2xl px-5 py-4 text-base text-plum"
              >
                {selected.message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

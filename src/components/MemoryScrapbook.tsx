import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { loveStory } from "../config/loveStory";

interface Card {
  src?: string;
  caption: string;
  alt: string;
  illustrated: boolean;
}

export function MemoryScrapbook() {
  const cards = useMemo<Card[]>(() => {
    if (loveStory.photos.length > 0) {
      return loveStory.photos.map((photo) => ({
        src: photo.src,
        caption: photo.caption,
        alt: photo.alt,
        illustrated: false,
      }));
    }
    return loveStory.scrapbookPlaceholderCaptions.map((caption, index) => ({
      caption,
      alt: `Illustrated placeholder card ${index + 1}`,
      illustrated: true,
    }));
  }, []);

  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % cards.length));
      if (event.key === "ArrowLeft") {
        setActive((i) => (i === null ? i : (i - 1 + cards.length) % cards.length));
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, cards.length]);

  const current = active !== null ? cards[active] : null;

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-serif text-3xl text-plum sm:text-5xl">{loveStory.scrapbookTitle}</h2>
        <p className="mt-3 text-sm text-plum/70">
          {loveStory.photos.length === 0
            ? "Illustrated keepsakes for now. Add photos in src/config/loveStory.ts whenever you're ready."
            : "A few little frames, saved with care."}
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <li key={card.caption} className={index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className="w-full rounded-sm bg-white p-3 pb-8 text-left shadow-xl transition hover:-translate-y-1"
              >
                <div className="relative overflow-hidden rounded-sm">
                  <span className="absolute left-6 top-0 z-10 h-4 w-16 -translate-y-1/2 rotate-[-8deg] bg-rose/80" />
                  {card.illustrated ? (
                    <IllustratedMemory index={index} />
                  ) : (
                    <img
                      src={card.src}
                      alt={card.alt}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>
                <p className="mt-4 font-script text-xl text-plum">{card.caption}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {createPortal(
      <AnimatePresence>
        {current && active !== null ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-[#50334D]/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={current.caption}
              className="relative w-full max-w-lg rounded-3xl bg-cream p-4 shadow-2xl"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              {current.illustrated ? (
                <IllustratedMemory index={active} />
              ) : (
                <img src={current.src} alt={current.alt} className="max-h-[60vh] w-full rounded-2xl object-contain" />
              )}
              <p className="mt-4 text-center font-script text-2xl">{current.caption}</p>
              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full bg-blush"
                  onClick={() => setActive((i) => (i === null ? i : (i - 1 + cards.length) % cards.length))}
                  aria-label="Previous memory"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full bg-blush"
                  onClick={() => setActive(null)}
                  aria-label="Close lightbox"
                >
                  <X />
                </button>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full bg-blush"
                  onClick={() => setActive((i) => (i === null ? i : (i + 1) % cards.length))}
                  aria-label="Next memory"
                >
                  <ChevronRight />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
      )}
    </section>
  );
}

function IllustratedMemory({ index }: { index: number }) {
  const palettes = ["bg-blush", "bg-lavender", "bg-peach", "bg-rose/60"];
  return (
    <div className={`grid aspect-[4/5] place-items-center ${palettes[index % palettes.length]}`}>
      <div className="text-center text-plum">
        <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-white/70 shadow-inner" />
        <p className="font-serif text-lg">A keepsake</p>
        <p className="text-xs text-plum/70">waiting for a photo</p>
      </div>
    </div>
  );
}

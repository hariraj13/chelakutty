import { AnimatePresence, motion, useInView } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { loveStory } from "../config/loveStory";

interface Card {
  src?: string;
  caption: string;
  alt: string;
  illustrated: boolean;
}

/** Single scrapbook card with scroll-reveal + 3-D tilt on hover */
function ScrapbookCard({
  card,
  index,
  onClick,
}: {
  card: Card;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const baseRotation = index % 2 === 0 ? -2 : 2;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * -10, y: cx * 10 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 48, rotate: baseRotation - 3 }}
      animate={
        inView
          ? { opacity: 1, y: 0, rotate: baseRotation }
          : { opacity: 0, y: 48, rotate: baseRotation - 3 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ transformStyle: "preserve-3d", perspective: 800 }}
        className="w-full rounded-sm bg-white p-3 pb-8 text-left shadow-xl"
        whileHover={{ scale: 1.04, zIndex: 10 }}
        whileTap={{ scale: 0.98 }}
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
              className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}
          {/* Polaroid shine overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)",
            }}
          />
        </div>
        <p className="mt-4 font-script text-xl text-plum">{card.caption}</p>
      </motion.button>
    </motion.li>
  );
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
      if (event.key === "ArrowRight")
        setActive((i) => (i === null ? i : (i + 1) % cards.length));
      if (event.key === "ArrowLeft")
        setActive((i) =>
          i === null ? i : (i - 1 + cards.length) % cards.length,
        );
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, cards.length]);

  const current = active !== null ? cards[active] : null;

  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-3xl text-plum sm:text-5xl">
            {loveStory.scrapbookTitle}
          </h2>
          <p className="mt-3 text-sm text-plum/70">
            {loveStory.photos.length === 0
              ? "Illustrated keepsakes for now. Add photos in src/config/loveStory.ts whenever you're ready."
              : "Tap any photo to open it. 💗"}
          </p>
        </motion.div>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card, index) => (
            <ScrapbookCard
              key={card.caption}
              card={card}
              index={index}
              onClick={() => setActive(index)}
            />
          ))}
        </ul>
      </div>

      {createPortal(
        <AnimatePresence>
          {current && active !== null ? (
            <motion.div
              className="fixed inset-0 z-50 grid place-items-center bg-[#50334D]/75 px-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActive(null)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={current.caption}
                className="relative w-full max-w-lg rounded-3xl bg-cream p-4 shadow-2xl"
                initial={{ y: 40, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                onClick={(event) => event.stopPropagation()}
              >
                {/* Caption badge */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-berry/60">
                    {active + 1} / {cards.length}
                  </span>
                  <button
                    type="button"
                    className="grid h-9 w-9 place-items-center rounded-full bg-blush text-plum transition hover:bg-rose"
                    onClick={() => setActive(null)}
                    aria-label="Close lightbox"
                  >
                    <X size={16} />
                  </button>
                </div>

                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.28 }}
                >
                  {current.illustrated ? (
                    <IllustratedMemory index={active} />
                  ) : (
                    <img
                      src={current.src}
                      alt={current.alt}
                      className="max-h-[65vh] w-full rounded-2xl object-contain shadow-lg"
                    />
                  )}
                </motion.div>

                <p className="mt-4 text-center font-script text-2xl text-plum">
                  {current.caption}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-full bg-blush text-plum transition hover:bg-rose"
                    onClick={() =>
                      setActive((i) =>
                        i === null ? i : (i - 1 + cards.length) % cards.length,
                      )
                    }
                    aria-label="Previous memory"
                  >
                    <ChevronLeft />
                  </button>
                  <div className="flex gap-1.5">
                    {cards.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`Go to photo ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === active
                            ? "w-5 bg-berry"
                            : "w-2 bg-berry/30 hover:bg-berry/60"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-full bg-blush text-plum transition hover:bg-rose"
                    onClick={() =>
                      setActive((i) => (i === null ? i : (i + 1) % cards.length))
                    }
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
    <div
      className={`grid aspect-[4/5] place-items-center ${palettes[index % palettes.length]}`}
    >
      <div className="text-center text-plum">
        <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-white/70 shadow-inner" />
        <p className="font-serif text-lg">A keepsake</p>
        <p className="text-xs text-plum/70">waiting for a photo</p>
      </div>
    </div>
  );
}

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { loveStory } from "../config/loveStory";

export function SecretSurprise() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) lastFocus.current?.focus();
  }, [open]);

  function reveal() {
    setOpen(true);
    setIndex((i) => (i + 1) % loveStory.secretNotes.length);
  }

  const note =
    loveStory.secretNotes[(index + loveStory.secretNotes.length - 1) % loveStory.secretNotes.length] ??
    loveStory.secretNotes[0];

  return (
    <>
      <div className="fixed right-4 top-4 z-40 flex max-w-[11rem] flex-col items-end gap-2">
        <p className="rounded-full bg-white/80 px-3 py-1 text-left text-[11px] text-plum/70 shadow-sm backdrop-blur">
          {loveStory.secretHint}
        </p>
        <button
          type="button"
          onClick={reveal}
          className="grid h-12 w-12 place-items-center rounded-full bg-berry text-lg text-white shadow-lg"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className="sr-only">Open a secret note</span>
          <span aria-hidden="true">♥</span>
        </button>
      </div>

      {createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-[#50334D]/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="paper-grain relative w-full max-w-sm rounded-3xl bg-[#FFF9F5] p-6 text-center shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id={titleId} className="font-serif text-2xl text-plum">
                A little secret
              </h2>
              <p className="mt-4 text-base text-plum/90">{note}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="mt-6 min-h-11 rounded-full bg-berry px-5 py-2 text-sm font-semibold text-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
      )}
    </>
  );
}

import { motion, AnimatePresence } from "motion/react";
import { Pause, Play, Volume2, VolumeX, Music2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { loveStory } from "../config/loveStory";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [showPrompt, setShowPrompt] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [muted, volume]);

  if (!loveStory.enableMusic) return null;

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio || failed) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
        setShowPrompt(false);
      }
    } catch {
      setFailed(true);
      setPlaying(false);
    }
  }

  async function acceptPrompt() {
    setDismissed(true);
    setShowPrompt(false);
    const audio = audioRef.current;
    if (!audio || failed) return;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setFailed(true);
    }
  }

  function declinePrompt() {
    setDismissed(true);
    setShowPrompt(false);
  }

  return (
    <>
      {/* Auto-play prompt */}
      <AnimatePresence>
        {showPrompt && !dismissed && !failed && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ delay: 1.5, duration: 0.5, type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 w-[min(88vw,340px)] rounded-2xl border border-rose/40 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-sm sm:left-auto sm:right-6 sm:translate-x-0"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-berry text-white">
                <Music2 size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-plum">A little song for you 🎵</p>
                <p className="text-xs text-plum/60">Want to play background music?</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={acceptPrompt}
                className="flex-1 rounded-full bg-berry py-2 text-xs font-semibold text-white shadow-md transition hover:brightness-105"
              >
                Yes, play it 🎶
              </button>
              <button
                type="button"
                onClick={declinePrompt}
                className="flex-1 rounded-full bg-blush py-2 text-xs font-semibold text-plum transition hover:bg-rose/40"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player widget */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-20 left-4 z-40 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-lg backdrop-blur sm:bottom-6"
      >
        <audio
          ref={audioRef}
          src={loveStory.musicPath}
          loop
          preload="none"
          onError={() => setFailed(true)}
          onEnded={() => setPlaying(false)}
        />

        <div className="mb-2 flex items-center gap-2">
          {/* Animated waveform bars */}
          <div className="flex items-end gap-[3px] h-4" aria-hidden="true">
            {[0.5, 1, 0.7, 0.9, 0.4].map((h, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-berry"
                animate={
                  playing
                    ? { scaleY: [h, 1, h * 0.6, 1, h], opacity: [0.7, 1, 0.6, 1, 0.7] }
                    : { scaleY: 0.3, opacity: 0.3 }
                }
                transition={
                  playing
                    ? { duration: 0.8 + i * 0.1, repeat: Infinity, ease: "easeInOut" }
                    : {}
                }
                style={{ height: "16px", transformOrigin: "bottom" }}
              />
            ))}
          </div>
          <p className="text-[11px] uppercase tracking-wide text-plum/60">
            {loveStory.musicLabel}
          </p>
        </div>

        {failed ? (
          <p className="max-w-[10rem] text-xs text-plum/70">
            Add a .mp3 track at {loveStory.musicPath}
          </p>
        ) : (
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={togglePlay}
              whileTap={{ scale: 0.9 }}
              className="grid h-10 w-10 place-items-center rounded-full bg-berry text-white shadow-md"
              aria-label={playing ? "Pause music" : "Play music"}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={playing ? "pause" : "play"}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {playing ? <Pause size={16} /> : <Play size={16} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <button
              type="button"
              onClick={() => setMuted((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full bg-blush text-plum transition hover:bg-rose/40"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <label className="sr-only" htmlFor="music-volume">
              Volume
            </label>
            <input
              id="music-volume"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="w-16 accent-berry"
            />
          </div>
        )}
      </motion.div>
    </>
  );
}

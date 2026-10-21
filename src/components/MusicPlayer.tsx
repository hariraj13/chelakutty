import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { loveStory } from "../config/loveStory";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [volume, setVolume] = useState(0.45);

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
      }
    } catch {
      setFailed(true);
      setPlaying(false);
    }
  }

  return (
    <div className="fixed bottom-20 left-4 z-40 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-lg backdrop-blur sm:bottom-6">
      <audio
        ref={audioRef}
        src={loveStory.musicPath}
        loop
        preload="none"
        onError={() => setFailed(true)}
        onEnded={() => setPlaying(false)}
      />
      <p className="mb-2 text-[11px] uppercase tracking-wide text-plum/60">{loveStory.musicLabel}</p>
      {failed ? (
        <p className="max-w-[10rem] text-xs text-plum/70">
          Music file missing. Add a licensed track at {loveStory.musicPath}.
        </p>
      ) : (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="grid h-10 w-10 place-items-center rounded-full bg-berry text-white"
            aria-label={playing ? "Pause music" : "Play music"}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            type="button"
            onClick={() => setMuted((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full bg-blush text-plum"
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
    </div>
  );
}

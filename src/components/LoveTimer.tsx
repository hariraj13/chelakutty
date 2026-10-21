import { useEffect, useState } from "react";
import { loveStory } from "../config/loveStory";

function parseStart(value: string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatElapsed(from: Date, now: Date): string {
  let seconds = Math.max(0, Math.floor((now.getTime() - from.getTime()) / 1000));
  const days = Math.floor(seconds / 86400);
  seconds -= days * 86400;
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

export function LoveTimer() {
  const start = parseStart(
    loveStory.enableTimer ? loveStory.relationshipStartDate : null,
  );
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!loveStory.enableTimer || !loveStory.relationshipStartDate) return;
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-xl rounded-[2rem] bg-white/70 px-6 py-10 text-center shadow-md">
        <h2 className="font-serif text-3xl text-plum">{loveStory.timerTitle}</h2>
        {start ? (
          <p className="mt-4 text-lg text-berry" aria-live="polite">
            {formatElapsed(start, now)}
          </p>
        ) : (
          <p className="mt-4 text-base text-plum/80">{loveStory.timerFallback}</p>
        )}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";

const CHAPTER_IDS = [
  "chapter-beginning",
  "chapter-reasons",
  "chapter-letter",
  "chapter-universe",
  "chapter-finale",
] as const;

export function useChapterProgress(): number {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const sections = CHAPTER_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          const index = CHAPTER_IDS.indexOf(
            visible[0].target.id as (typeof CHAPTER_IDS)[number],
          );
          if (index >= 0) setFilled(index + 1);
        }
      },
      { threshold: [0.18, 0.35, 0.55], rootMargin: "-12% 0px -35% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return filled;
}

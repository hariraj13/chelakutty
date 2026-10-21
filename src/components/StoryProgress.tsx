import { loveStory } from "../config/loveStory";
import { useChapterProgress } from "../hooks/useChapterProgress";

const CHAPTERS = [
  { href: "#chapter-beginning", label: loveStory.chapters.beginning.navLabel },
  { href: "#chapter-reasons", label: loveStory.chapters.reasons.navLabel },
  { href: "#chapter-letter", label: loveStory.chapters.letter.navLabel },
  { href: "#chapter-universe", label: loveStory.chapters.universe.navLabel },
  { href: "#chapter-finale", label: loveStory.chapters.finale.navLabel },
];

export function StoryProgress() {
  const filled = useChapterProgress();

  return (
    <nav
      aria-label="Story chapters"
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/70 bg-white/80 px-3 py-2 shadow-lg backdrop-blur"
    >
      <ol className="flex items-center gap-2">
        {CHAPTERS.map((chapter, index) => {
          const active = index < filled;
          return (
            <li key={chapter.href}>
              <a
                href={chapter.href}
                className={`grid h-8 w-8 place-items-center rounded-full text-sm transition ${
                  active ? "bg-berry text-white" : "bg-blush text-plum/50"
                }`}
                aria-label={chapter.label}
                title={chapter.label}
              >
                ♥
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

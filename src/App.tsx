import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChapterBeginning } from "./components/ChapterBeginning";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { FinalSurprise } from "./components/FinalSurprise";
import { HugInteraction } from "./components/HugInteraction";
import { LoveLetter } from "./components/LoveLetter";
import { LoveTimer } from "./components/LoveTimer";
import { MemoryScrapbook } from "./components/MemoryScrapbook";
import { MoodGarden } from "./components/MoodGarden";
import { MusicPlayer } from "./components/MusicPlayer";
import { ReasonsGrid } from "./components/ReasonsGrid";
import { SecretSurprise } from "./components/SecretSurprise";
import { StarrySky } from "./components/StarrySky";
import { StoryHero } from "./components/StoryHero";
import { StoryProgress } from "./components/StoryProgress";
import { loveStory } from "./config/loveStory";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [scene, setScene] = useState<"intro" | "story">("intro");

  useEffect(() => {
    document.title = loveStory.documentTitle;
  }, []);

  function enterStory() {
    setScene("story");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }), 30);
  }

  function restart() {
    window.scrollTo({ top: 0, behavior: "auto" });
    setScene("intro");
  }

  return (
    <div className="min-h-dvh bg-cream text-plum">
      <a
        href="#main-story"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to story
      </a>
      <AnimatePresence mode="wait">
        {scene === "intro" ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.5 }}
          >
            <EnvelopeIntro reducedMotion={reducedMotion} onComplete={enterStory} />
          </motion.div>
        ) : (
          <motion.div
            key="story"
            id="main-story"
            className="pb-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.6 }}
            style={{ transform: "none" }}
          >
            <StoryProgress />
            <SecretSurprise />
            <StoryHero reducedMotion={reducedMotion} />
            <ChapterBeginning />
            <ReasonsGrid />
            <LoveLetter reducedMotion={reducedMotion} />
            <StarrySky />
            <HugInteraction reducedMotion={reducedMotion} />
            <MemoryScrapbook />
            <MoodGarden />
            <LoveTimer />
            <FinalSurprise reducedMotion={reducedMotion} onRestart={restart} />
            <footer className="bg-cream px-5 py-10 text-center text-xs text-plum/50">
              A tiny universe made just for {loveStory.nickname}.
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
      <MusicPlayer />
    </div>
  );
}

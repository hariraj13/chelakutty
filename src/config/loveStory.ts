export type ThemeName = "cute-dreamy";

export interface PhotoItem {
  src: string;
  caption: string;
  alt: string;
}

export interface MoodMessages {
  happy: string;
  tired: string;
  low: string;
  smile: string;
}

export interface LoveStoryConfig {
  recipientName: string;
  nickname: string;
  senderName: string;
  theme: ThemeName;
  documentTitle: string;
  openingGreeting: string;
  openingSubtitle: string;
  openingButton: string;
  skipIntroLabel: string;
  heroHeadline: string;
  heroSupporting: string;
  heroRomanticLine: string;
  heroPrimaryButton: string;
  heroSecondaryButton: string;
  heroSecretNotes: string[];
  chapters: {
    beginning: { navLabel: string; title: string; body: string };
    reasons: { navLabel: string; title: string; subtitle: string };
    letter: { navLabel: string; title: string };
    universe: { navLabel: string; title: string };
    finale: { navLabel: string; title: string };
  };
  beginningNotes: {
    heart: string;
    star: string;
    envelope: string;
  };
  reasons: string[];
  extraReasons: string[];
  reasonsButton: string;
  reasonsExhausted: string;
  loveLetter: string[];
  letterReplayLabel: string;
  starMessages: string[];
  hugPrompt: string;
  hugButton: string;
  hugMessage: string;
  secretHint: string;
  secretNotes: string[];
  scrapbookTitle: string;
  scrapbookPlaceholderCaptions: string[];
  photos: PhotoItem[];
  moodTitle: string;
  moodIntro: string;
  moodMessages: MoodMessages;
  timerTitle: string;
  timerFallback: string;
  relationshipStartDate: string | null;
  enableTimer: boolean;
  finaleLines: string[];
  finaleMessage: string;
  finaleButton: string;
  finaleReply: string;
  readAgainLabel: string;
  enableMusic: boolean;
  musicPath: string;
  musicLabel: string;
  reducedMotionDefault: boolean | "system";
}

export const loveStory: LoveStoryConfig = {
  recipientName: "Haritha",
  nickname: "Chella Kutty",
  senderName: "Un favourite person",
  theme: "cute-dreamy",
  documentTitle: "For Haritha 💗",
  openingGreeting: "Heyyy, Chella Kutty... 💗",
  openingSubtitle: "I made a little something just for you.",
  openingButton: "Open your little surprise ✨",
  skipIntroLabel: "Skip intro",
  heroHeadline: "For my Haritha, my Chella Kutty 💗",
  heroSupporting:
    "Out of all the little surprises in this world, this one has your name written all over it.",
  heroRomanticLine:
    "Konjam cute-ah sollanum na... nee enakku romba special di. 🥹",
  heroPrimaryButton: "Let's explore our little story",
  heroSecondaryButton: "There's a secret for you 👀",
  heroSecretNotes: [
    "Psst... you make ordinary days feel a little softer.",
    "I hope this tiny universe makes you smile, Chella Kutty.",
    "Unakkaga dhaan indha ellam. One little world, just for you.",
    "If you needed a reminder today: you're deeply appreciated.",
  ],
  chapters: {
    beginning: {
      navLabel: "The Little Beginning",
      title: "Some people make life a little more beautiful.",
      body: "And somehow, you became one of my favorite parts of it.",
    },
    reasons: {
      navLabel: "Things I Adore About You",
      title: "Unna pidikka reasons kekkuriya?",
      subtitle: "Start counting, Chella Kutty... we'd be here for a while. 🥹",
    },
    letter: {
      navLabel: "A Letter From My Heart",
      title: "A little letter from my heart.",
    },
    universe: {
      navLabel: "Our Little Universe",
      title: "If I could gift you the stars...",
    },
    finale: {
      navLabel: "One Last Thing, Chella Kutty",
      title: "One last thing, Chella Kutty.",
    },
  },
  beginningNotes: {
    heart: "Un smile pathale podhum di, en mood-e maaridum. 💗",
    star: "Nee nee-ah irukkuradhu dhaan enakku romba special.",
    envelope:
      "Indha chinna surprise full-ah unakkaga dhaan, Chella Kutty.",
  },
  reasons: [
    "Un smile enakku romba pidikkum di.",
    "Nee pesura chinna chinna vishayangal kooda enakku special.",
    "Un cute habits ellam enakku thani favourite.",
    "Unkooda pesura moments enakku romba precious.",
    "Nee happy-ah irundha, unna paathu naanum happy aagiduven.",
    "Nee perfect-ah irukkanum nu illa. Nee nee-ah irundha podhum.",
    "Unna pathi innum neraya therinjukkanum nu aasai.",
    "Indha ulagam full-ah irundhaalum, un maadhiri oruthanga special dhaan.",
    "Un feelings-um un dreams-um enakku mukkiyam.",
    "Every day, I want to find another little reason to appreciate you.",
  ],
  extraReasons: [
    "Un voice-la oru warmth irukku... adhu enakku romba comforting.",
    "Nee care panra way-um, chinna details notice panra way-um azhaga irukku.",
    "Even a short conversation with you can brighten the whole day.",
    "Un honesty-um un softness-um rendume enakku special.",
    "I like the way you exist in this world, Chella Kutty. Quietly, beautifully, fully you.",
    "Unakkaga oru smile varanum nu dhaan indha little notes ellam.",
  ],
  reasonsButton: "One more reason, please 💌",
  reasonsExhausted: "That's all for now... but the list in my heart keeps growing.",
  loveLetter: [
    "Heyyy, en Chella Kutty... ❤️",
    "Unkitta ellathayum perfect-ah solla enakku eppovume vaartha kidaikkum nu solla mudiyadhu. Aana onnu mattum unakku theriyanum.",
    "Nee enakku romba special di.",
    "Un smile, un way of talking, un chinna chinna habits, nee share panra thoughts — idhellam enakku azhagana little moments.",
    "Sometimes, oru simple conversation kooda en day-ah better aakkidum.",
    "Naan perfect-ah irukka maatten. Aana unna purinjukka, un feelings-ku value kudukka, un dreams-ah support panna, namma relationship-ah care panna ennaala mudinja alavukku sincere-ah try pannuven.",
    "Nee happy-ah irukkura days mattum illa, konjam tired-ah irukkura days-layum, un feelings important dhaan.",
    "Indha website romba periya gift illa irukkalaam. Aana idhula irukkura ovvoru chinna detail-um unakku oru smile vara vendum nu dhaan.",
    "And if I could choose one more time, I'd still want the chance to know you, care for you, and make more beautiful memories with you.",
    "Always be the beautiful, unique person you are, Chella Kutty.",
    "With lots of love,",
  ],
  letterReplayLabel: "Open the letter again",
  starMessages: [
    "You deserve all the little happiness in this world.",
    "Whenever life feels heavy, remember that your feelings matter.",
    "Un smile-ah protect panniko, Chella Kutty. Adhu romba azhaga irukku.",
    "Even on ordinary days, you deserve extraordinary kindness.",
    "Un dreams ellathayum pursue panna unakku confidence irukkanum.",
    "One tiny star, one tiny reminder: you're special. 💗",
  ],
  hugPrompt: "Konjam virtual hug venuma, Chella Kutty?",
  hugButton: "Yes, gimme a hug 🫂",
  hugMessage:
    "Sending you the biggest virtual hug. Konjam close-ah irundha maadhiri imagine panniko. 💗",
  secretHint: "Psst... there's one more little secret.",
  secretNotes: [
    "Unakku indha chinna surprise pidikkum nu namburen, Chella Kutty.",
    "Nee sirikkumbodhu, indha website create pannadhu worth it aagidum. 🥹",
    "Here's your tiny reminder: you're appreciated more than you know.",
    "One more virtual kiss for you. Mwahhh 💗",
  ],
  scrapbookTitle: "Our little moments, forever saved. 📸",
  scrapbookPlaceholderCaptions: [
    "A little moment worth keeping.",
    "One of my favorite kinds of happiness.",
    "A memory I'd love to revisit.",
    "Just you being you.",
  ],
  photos: [
    {
      src: "/images/photo1.jpg",
      caption: "Salon day, face mask & all 😄",
      alt: "Both of them at the salon, he has a face mask on",
    },
    {
      src: "/images/photo2.jpg",
      caption: "Those eyes say it all 💗",
      alt: "Cute selfie together at the salon",
    },
    {
      src: "/images/photo3.jpg",
      caption: "Late night calls hit different 🌙",
      alt: "FaceTime call screenshot, her close-up smiling",
    },
    {
      src: "/images/photo4.jpg",
      caption: "Her little kiss ❤️",
      alt: "She's kissing him on the cheek at the cafe",
    },
    {
      src: "/images/photo5.jpg",
      caption: "My favourite people kind of moment",
      alt: "Cosy selfie together at the cafe",
    },
    {
      src: "/images/photo6.jpg",
      caption: "That hug said everything 🫂",
      alt: "She's smiling while being hugged from behind at the restaurant",
    },
    {
      src: "/images/photo7.jpg",
      caption: "Forehead kiss — pure love 💕",
      alt: "He's kissing her forehead, she's smiling with eyes closed",
    },
  ],
  moodTitle: "A tiny mood garden",
  moodIntro:
    "Choose whatever feels closest right now. No detecting, no guessing — just a little note waiting for you.",
  moodMessages: {
    happy: "Un happiness ippadiye continue aaganum di. Un joy-ah celebrate pannalaam! 💗",
    tired:
      "Konjam rest eduthuko, Chella Kutty. Ella vishayathayum ore time-la handle panna vendiyadhu illa.",
    low: "Parava illa di. Every day perfect-ah irukkanum nu illa. Un feelings-ku space kuduthuko.",
    smile: "Emergency smile delivery! 🚚💕 Unakkaga oru chinna virtual hug-um bonus-ah.",
  },
  timerTitle: "Every moment has its own little magic.",
  timerFallback: "Our story has its own beautiful timeline. 💗",
  relationshipStartDate: null,
  enableTimer: false,
  finaleLines: [
    "Hey, Haritha...",
    "Before you close this little world, I want you to remember something.",
    "You don't have to be perfect to be special.",
    "You deserve kindness, respect, laughter, and a love that keeps choosing you.",
    "I'm happy I get to know you, care about you, and make more memories with you.",
    "And if I had to write one last line just for you...",
  ],
  finaleMessage:
    "En Chella Kutty, nee enakku romba special di. Innum neraya azhagana memories create pannalaam. I choose you, again and again. 💗",
  finaleButton: "Send a little love back 💌",
  finaleReply:
    "That smile of yours... I hope this little surprise gave you one. 🥹💕",
  readAgainLabel: "Read our story again",
  enableMusic: true,
  musicPath: "/audio/romantic-music.mp3",
  musicLabel: "Optional music",
  reducedMotionDefault: "system",
};

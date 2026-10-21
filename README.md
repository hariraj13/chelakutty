# For Haritha 💗

A tiny interactive love story for Haritha — *Chella Kutty*.

This is a personal, client-side React experience. There is no backend, no login, no analytics, and no form that sends a message anywhere.

## Requirements

- Node.js 20.19+ or 22.12+ recommended (the project also installs on Node 22.11 with engine warnings)
- npm 11+

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run typecheck
```

- `npm run dev` — local development at the URL Vite prints (usually `http://localhost:5173`)
- `npm run build` — production TypeScript check + Vite build
- `npm run preview` — serve the production build locally

## Personalization

All names, copy, photos, music, and optional timer settings live in one file:

`src/config/loveStory.ts`

Change that file before sharing the site. The UI reads from this config instead of scattering personal details across components.

Useful fields:

| Field | What it does |
| --- | --- |
| `recipientName`, `nickname`, `senderName` | Names and letter signature |
| `openingGreeting`, `heroHeadline`, letter, reasons, stars, secrets, finale | Story copy |
| `photos` | Scrapbook images (`src` under `/public`, plus `caption` and `alt`) |
| `relationshipStartDate`, `enableTimer` | Live elapsed-time counter (off by default) |
| `enableMusic`, `musicPath` | Optional local audio, never autoplay |
| `reducedMotionDefault` | `"system"` respects OS reduced-motion; `true`/`false` force it |

Missing photos, a missing music file, or a disabled timer all fail gracefully.

## Adding photographs

1. Put images in `public/images/` (for example `public/images/keep-sake-1.jpg`).
2. In `src/config/loveStory.ts`, set:

```ts
photos: [
  {
    src: "/images/keep-sake-1.jpg",
    caption: "A little moment worth keeping.",
    alt: "A personal photograph of a quiet, happy moment.",
  },
],
```

Until you add photos, the scrapbook uses illustrated placeholder cards on purpose. It does not invent real memories.

Keep files reasonably sized (around 1200px on the long edge) so the gallery stays fast on phones.

## Adding music

Music is optional. Playback starts **only** after she taps play.

1. Place a file you have the right to use at `public/audio/romantic-music.mp3`.
2. Keep `enableMusic: true` and `musicPath: "/audio/romantic-music.mp3"`.
3. If the file is missing, the player shows a quiet note and the rest of the story still works.

Do not autoplay audio. The site never does.

## Optional relationship timer

Leave these as they are unless you explicitly want a live counter:

```ts
relationshipStartDate: null,
enableTimer: false,
```

To enable it, set a real ISO date you are comfortable sharing, for example:

```ts
relationshipStartDate: "2024-02-14",
enableTimer: true,
```

If the date is missing or invalid, the section shows: *Our story has its own beautiful timeline.*

## Deploying on Vercel

1. Push this folder to GitHub (or import it from Vercel).
2. In Vercel: **Add New Project** → select the repo.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

`vercel.json` already rewrites unknown routes to `index.html`.

You can also deploy from the CLI:

```bash
npm i -g vercel
vercel
```

## Accessibility

- Skip intro is always available
- Keyboard-accessible stars, cards, lightbox, and secret modal
- Escape closes the secret note and scrapbook lightbox
- `prefers-reduced-motion` simplifies motion (or set `reducedMotionDefault`)
- The story is complete with sound off

## Details you may still want to set

- Your preferred signature (`senderName`)
- Real photos and captions
- A licensed music file
- A relationship start date (only if you want the timer)
- Any line of Tanglish or English you want softer, longer, or more private

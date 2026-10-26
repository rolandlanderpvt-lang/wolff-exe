# WOLFF.EXE

A static, arcade-inspired personal profile hub built as a single-page website. It combines a cinematic entrance sequence, a randomized soundtrack, a responsive gallery wall, and direct links to social profiles.

## Features

- Eight-second video entrance with sound and muted entry options
- Randomized 15-track audio player with shuffle, volume, mute, and Media Session support
- Animated poster reveal with pause, replay, reduced-motion support, and responsive layouts
- Interactive hero artwork and lightweight interface feedback
- Mobile and tablet layouts for viewports from 320px to 1024px
- Open Graph and Twitter metadata, plus a ready-made link-preview image
- No build process or runtime dependencies beyond Google Fonts

## Run locally

Clone the repository and serve it from a local HTTP server:

```bash
python3 -m http.server 8000
```

On Windows:

```powershell
py -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

A local server is recommended because browsers may restrict video, audio, and other features when `index.html` is opened directly from the filesystem.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Page markup, metadata, and profile destinations |
| `style.css` | Core visual design, entrance, and poster-wall styling |
| `responsive.css` | Phone and tablet refinements |
| `app.js` | Entrance sequence, interactions, and audio player |
| `playlist.js` | Track names and local audio paths |
| `posters.js` | Poster reveal behavior and controls |
| `media/` | Entrance video, audio, skull artwork, and social-preview image |
| `posters/` | Gallery artwork |
| `EXPORT_MANIFEST.json` | Asset sizes and SHA-256 checksums |

## Accessibility and performance

- Respects `prefers-reduced-motion`
- Preserves the full entrance-video frame across layouts
- Preloads media only when it is needed
- Uses semantic controls, visible focus states, image alt text, and live-status messages
- Keeps the experience functional without JavaScript: the entrance and player are hidden, while the poster wall remains visible

## Deployment

This project can be deployed to any static host, including GitHub Pages, Netlify, Vercel, or Cloudflare Pages.

Before sharing a deployed site, update the commented Open Graph and Twitter image tags in `index.html` with the final domain so social platforms can generate rich link previews.

## Content notice

The repository includes visual and audio assets used by the site. Confirm that you have the necessary rights before republishing or deploying the included media publicly.

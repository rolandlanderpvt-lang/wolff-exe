# WOLFF.EXE

## Run locally
Clone or download this repository, open a terminal in its folder, and run:

    python3 -m http.server 8000

On Windows, `py -m http.server 8000` also works. Open http://localhost:8000.
No npm install or build step is required. All website assets are included.
A local HTTP server is recommended instead of opening index.html as a file.

## Files
- index.html: page markup and profile links
- style.css: desktop design, entrance and poster styling
- responsive.css: phone/tablet layouts and touch controls (loaded last)
- app.js: 8-second entrance, audio player, profile interactions
- playlist.js: 15 owner-selected track titles and local MP3 paths
- posters.js: momentary poster appearances at two-second intervals for 20 seconds, then all six remain visible; begins when the wall is in view after the entrance; supports pause, Show All, replay and reduced motion
- media/: 15 MP3 files, skull entrance MP4 and poster frame JPEG
- posters/: five JPEG artworks and a rasterized version of the supplied PDF
- EXPORT_MANIFEST.json: file sizes and SHA-256 checksums

## Current behaviour to preserve
- Random track is selected and preloaded on page load. Enter with Sound uses that same prepared track, avoiding a fresh download on click.
- Music continues after the 8-second entrance. Shuffle chooses another track; finished tracks advance randomly.
- The supplied 5.7-second silent video loops during the 8-second entrance. Skip/Replay controls remain available.
- The entrance and main-screen artwork preserve the complete video frame.
- Posters settle permanently for the current page visit; reloading starts a new reveal.
- Browser localStorage remembers whether the entrance has been seen. Use Replay the Entrance to test it again.
- Mobile/tablet browser layout checks covered widths 320–1024px, including landscape. Physical iOS/Android device testing remains separate.

## Sharing and privacy
The hosted site's ChatGPT sign-in gate and viewer allowlist are hosting settings, not part of this static source. This export contains no authentication system. If hosted independently, these files are accessible under that host's own access rules. This ZIP does not grant access to the original hosting account, chats or deployment controls.

No credentials, account allowlist, deployment IDs, Git history, or hosting manifest are included. Google Fonts remains an external dependency with local font fallbacks. All other referenced visual and audio assets are included. Published static music and images are downloadable by viewers.

## Handoff prompt for Claude
Review this static personal website and help improve it. Start by reading README.md and the HTML/CSS/JavaScript. Preserve its dark arcade identity, all profile destinations, supplied artwork, 8-second entrance, 15-track shuffle player, early audio preloading and poster reveal. Explain proposed changes, then return complete modified files with the same relative asset paths. Treat hosting/authentication separately from website code. Do not invent profile links, introduce credentials, or assume this export has a backend.

This is a source/media export, not a transfer of ownership of the hosted Site. The original FLAC uploads are not included; the browser-ready MP3 versions are included in full.

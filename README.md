# Charcoal Studio Showcase

A mobile GitHub Pages gallery for reviewing Charcoal Studio renders in a browser, without repository access or the GitHub app.

## Add a future render

1. Finish the production gates and confirm the job is release-ready.
2. On the production Mac, run `scripts/add-showcase.sh <collection-slug> <video-slug> <source.mp4>`.
3. Add the verified film metadata to a collection in `data/showcases.json`. Put the newest collection first and preserve earlier collections for comparison. Each collection has `id`, `title`, `sourceCommit`, and `films`. Each film has `slug`, `title`, `duration`, `promise`, `video`, and `poster`; `transcript` is optional.
4. Keep the top-level legacy `collection` and `films` fields in sync with the newest collection so an older cached page remains usable.
5. Check native playback, seeking and layout at phone width, then commit and push to `main`. GitHub Actions publishes the gallery.

The helper preserves the original streams, moves the MP4 index to the beginning for mobile playback, and creates a lightweight poster frame. Input videos must already use browser-compatible H.264 video and AAC audio. Rendering and media processing run on the production Mac.

Link directly to a collection and film with `?collection=<collection-id>#<film-slug>`.
Publish release-ready movies by default. An owner-requested review preview may be included in a separate collection explicitly labeled as a preview, with `releaseReady: false` and its outstanding release checks stated. Never present a preview as a passed production release. Publish only rendered media, plain narration transcripts and public provenance. Never copy workspace URLs, credentials, private production configuration or internal job directories into this repository.

# Charcoal Studio Showcase

A mobile-first GitHub Pages gallery for reviewing Charcoal Studio renders without requiring repository access or the GitHub app.

## Add a future render

1. Run `scripts/add-showcase.sh <collection-slug> <video-slug> <source.mp4>`.
2. Add the film metadata to `data/showcases.json`.
3. Commit and push to `main`. GitHub Actions publishes the updated gallery automatically.

The helper preserves the original streams, moves the MP4 index to the beginning for mobile playback, and creates a lightweight poster frame.

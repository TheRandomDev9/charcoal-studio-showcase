#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 3 ]]; then
  echo "Usage: $0 <collection-slug> <video-slug> <source.mp4>" >&2
  exit 2
fi

collection="$1"
slug="$2"
source_video="$3"
video_dir="videos/$collection"
poster_dir="posters/$collection"

command -v ffmpeg >/dev/null || { echo "ffmpeg is required" >&2; exit 1; }
[[ -f "$source_video" ]] || { echo "Video not found: $source_video" >&2; exit 1; }

mkdir -p "$video_dir" "$poster_dir"
ffmpeg -y -i "$source_video" -c copy -movflags +faststart "$video_dir/$slug.mp4"
ffmpeg -y -ss 00:00:03 -i "$video_dir/$slug.mp4" -frames:v 1 -vf scale=540:-2 -q:v 3 -update 1 "$poster_dir/$slug.jpg"

echo "Added $video_dir/$slug.mp4"
echo "Add its title, duration, promise, video and poster paths to data/showcases.json."

This personal website must stay intentionally minimal: use only plain HTML and CSS, avoid frameworks, build tools, or dependencies, and prioritize fast loading, simple structure, and easy long-term maintenance.

## Paper thumbnails

- This image workflow applies only to paper thumbnails in `assets/paper-figures/`.
- Keep the original full-resolution file intact; never overwrite or delete it.
- Store optimized derivatives (AVIF + JPG, 640px wide) next to the original, e.g. with ffmpeg:
  `ffmpeg -i original.png -vf scale=640:-2 -q:v 28 name.jpg`
  `ffmpeg -i original.png -vf scale=640:-2 -pix_fmt yuv420p -c:v libsvtav1 -crf 35 name.avif`
- Reference them via a `<picture>` element: AVIF `<source>` first, JPG fallback in `<img>`.

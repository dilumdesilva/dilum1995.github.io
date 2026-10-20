# Design guide: Quiet Spec

The site keeps a strict spec-sheet layout (12-column grid, shared-border cells, hairline rules) but speaks quietly: light type, muted colour and slow, smooth motion. Expressiveness comes from animation, not from weight or colour.

## Type
One family, **Archivo**, at normal width. Nothing else.

| Role | Weight | Case | Used for |
|---|---|---|---|
| Display | 200–300, tracking -0.035em | Sentence | Name, section titles, quotes, stats, contact |
| Body | 400–500 | Sentence | Paragraphs, card titles, nav |
| Label | 500, 12.5px | Sentence | Section labels, dates, meta |

Use the `.display` and `.label` classes. No uppercase labels, no condensed or expanded widths, no serif, italics or monospace.

## Colour
- Dark: ink `#0c0e11`, panel `#13161b`, text `#edf1f5`, muted `#8a94a3`, rules `#1f232a`.
- Light: pure white with ink text. No cream or beige.
- **Signal** (Flutter sky `#13b9fd` / `#0461d1`) is used sparingly: the rotating role word, active states, small hover accents. Never for large type or filled blocks.
- Google's four colours appear **only** in the GDE mark and as small timeline category dots.

## Shape and layout
- 12-column grid. Section headers put the label in columns 1–3 and the title in columns 4–12, under a 1px rule.
- 6px corners. No soft shadows or glassmorphism (the scrolled nav's light blur is the one exception).
- Group items as cells that share 1px borders, not floating cards with gaps.
- Markers are small circles.

## Motion
- Easing is a long expo-out (`cubic-bezier(.16, 1, .3, 1)`), 1–1.8s.
- Reveals: masked slides. Headings rise word by word, grid cells open in sequence, images settle from a slight zoom, list rows stagger in.
- Hovers: small lifts and nudges (4–10px), quiet panel wipes, colour shifts. No colour inversions.
- The nav tucks away while scrolling down and returns on scroll up.
- No cursor-following glow, grain, sparkles or magnetic buttons.
- Respect `prefers-reduced-motion`.

## Copy
- Short, plain sentences ending in full stops.
- No em dashes, no "Let's build something", no emoji, no sparkle glyphs.
- Separators are `/`, `:` or `·`.

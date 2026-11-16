# VisiLogo design system (Bold)

Restyled on 16 Nov 2026. The layout, sections and copy below are still the Studio build of 2 Nov; the look is now set by `frontend/src/styles/bold.css`, loaded last. Where this section and the older Studio notes disagree, this section wins.

## Bold layer (current look)

- Direction: clean white ground, near-black ink, one orange. Heavy grotesk heads, soft rounded cards and buttons, dark rounded panels set 20px in from the page edge (hero, ink bands, footer).
- Tokens: `bold.css` overrides the palette, `--font-display`, `--display-weight` (600), radii and shadows from `tokens.css`. Change values there, not in `tokens.css`.
- Type: display is Schibsted Grotesk 600/700 (self-hosted via @fontsource), tracking -0.032em. Body stays Geist 400/500. Hedvig Letters Serif is gone.
- Radius: panels 28px, cards 22px, small cards 16px, controls 12px, tags are pills.
- Buttons: 52px, no border. `.btn` is ink with white text, `.btn--primary` is orange with ink text, and any non-primary button on a dark panel turns white. Arrow icons nudge up-right on hover.
- Cards: white, 1px `--color-rule` edge, one soft drop shadow (`--shadow-card`). No crop marks, no dot grid, no grain, no glass blur.
- Hero: `.hero__panel`, dark, copy bottom-left, flowing accent lines drawn in SVG in `Hero.jsx`. The wordmark construction drawing was removed.
- Footer and `.section--ink` are dark panels; `.section--band` is a light grey panel. The footer re-scopes the ink/muted/rule tokens to light values.

---

# Earlier notes: Studio (layout and structure still apply; colours, type and depth are superseded above)

Locked on 2 Nov 2026 during the homepage redesign. Every new or redesigned page reads this first. Tokens live in `frontend/src/styles/tokens.css`, element rules in `base.css`, components in `studio.css`. No colour or font-family outside those files.

## Direction

A design studio's proof sheet, caught mid-build. Cool studio-white paper, blue-black ink, one cadmium orange. The page shows type being measured, because measuring and building brands is what VisiLogo sells. Spare, exact copy: verbs over adjectives, prices stated plainly.

## Palette (OKLCH)

| Token | Value | Use |
| --- | --- | --- |
| `--color-paper` | 97.2% 0.006 215 | page ground |
| `--color-paper-2` | 94% 0.009 215 | bands (process) |
| `--color-paper-hi` | 99% 0.004 215 | sheets, cards, inputs |
| `--color-ink` | 16% 0.032 250 | text, rules opening a set, the one dark band |
| `--color-ink-2` | 34% 0.022 245 | running text |
| `--color-muted` | 49% 0.018 240 | labels, captions |
| `--color-rule` | 84% 0.010 225 | hairlines between rows |
| `--color-accent` | 68% 0.172 50 | the one filled action, construction guides, underlines on hover. Never type, never a field |

Posture: restrained. Orange under 5% of any screen.

## Type

- Display: Hedvig Letters Serif 400 (its only weight), tracking −0.022em, line-height 1.0–1.05, sentence case. Heads, figures, wordmark only.
- Body: Geist 400/500, 16px minimum, line-height 1.55.
- Labels: Geist 500, 14px, `--color-muted`, sentence case, never tracked capitals, never an eyebrow above a heading.
- Self-hosted via @fontsource (no Google Fonts requests). Polish copy goes through `nb()` from `src/lib/typo.js` so no line ends on a one-letter word.
- Hedvig metrics (units of 1000): ascender 800, cap 700, x-height 520, baseline 0, descender −247. Any construction drawing uses these.

## Space and layout

- Container 1440px, gutter 64/24/16px, 12 columns, 32px gap.
- Spacing scale: 2, 4, 8, 12, 16, 24, 40, 64, 96, 144. No raw lengths.
- Section padding 120/144/176px at desktop, mixed; bands 120px.
- Head block: `h2` on columns 1–6, lead on 8–12, bottom-aligned.

## Depth

Paper objects only get a shadow (`--shadow-sheet`, lit top-left): case sheet, contact form, report card, the lead price plan. Everything else is flat and parted by hairlines. Crop marks (`.crop`, `.crop--sheet`) on every printed piece.

## Components

- Button `.btn`: 48px, 1px ink border, 2px radius, inset 1px rule at 2px, crop marks appear on hover, `scale(0.97)` on press. `.btn--primary` orange fill with ink text, one per screen (hero, contact submit). `.btn--sm` 40px in the nav.
- Input `.input`: 48px, 1px muted border, 3px radius, `paper-hi` fill, focus = 2px focus outline inset.
- Segmented control `.seg`: tabs with arrow-key support, selected = ink fill.
- Index rows: native `<details>`, number column 3rem, title at item size, plus/minus sign.
- Steps: real `<ol>`, numeral in Hedvig 48–72px over a 1px ink rule.

## Motion

Guides draw in once (900ms, ease-out). State changes 120–220ms. Only transform and opacity. Everything still under reduced motion.

## Subpage pattern

Every route uses the same frame, from `frontend/src/components/studio/`:

- `PageHead`: breadcrumbs, h1 (max 18ch), one lead, optional right-hand aside (form card, price tag, discount table) on columns 8–12.
- Body on 12 columns: head or controls on the left (4 cols, sticky), content on the right (8 cols); or info 6 cols + sticky form 5 cols.
- Close with `CtaBand` (ink) on content pages, `ToolsStrip` (paper-2) on tool pages before a result exists.
- Forms that convert sit on a `.contact__form` / `.tool-card` sheet with crop marks; one orange button per screen.
- `IndustryPage` for vertical landing pages: problems beside the answer.

## Leftovers

`index.css` still carries the old dark utility classes (`.btn-primary`, `.glass-card`, …) and `.legacy-dark` exists in `studio.css`; nothing renders with them any more. Unused components: DataStrip, TrustBar, GoogleReviews, FunnelCalculator, LeadFinder, SpamScanner, UtmBuilder.

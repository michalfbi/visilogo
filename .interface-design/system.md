# VisiLogo design system (Studio)

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

## Still on the old system

All routes except `/` render inside `.legacy-dark` (black, Inter, cyan). Next pass: `/proces`, `/skonfiguruj-projekt`, `/zamowienie/:planId`, then the tools and industry pages.

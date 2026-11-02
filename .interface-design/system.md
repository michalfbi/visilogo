# VisiLogo design system (FORMFIELD language)

Changed on 2 Nov 2026: the Studio proof-sheet look was replaced by the FORMFIELD visual language. Content is unchanged. Tokens are in `frontend/src/styles/formfield.css`, a layer loaded after `tokens.css`, `base.css` and `studio.css` that redefines their variables. Do not add colours or font families outside that file.

## Direction

The page reads as a pale mineral room with a dark, translucent architectural study in it. It is precise, physical and quiet, with generous negative space and editorial type. There is one oxide registration mark.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| Ink | #11110F | text, panel hairlines, primary action fill, the ink band |
| Chalk | #F2F0EA | page ground, pills, fields, dialogs |
| Cool fog | #D9DDD8 | quiet bands (mixed 55% into chalk), hero tint |
| Aluminum | #AEB5B1 | scrollbar, film metal |
| Oxide | #B85E3E | registration glyph, step numbers, error tone (mixed with ink for text contrast) |

## Type

- Space Grotesk 600 for the wordmark (uppercase, −0.03em), headings, figures and step numbers.
- DM Sans 400/500 for everything else, including the hero headline. The headline is quiet editorial type, not display type.
- Both are self-hosted with @fontsource. Google Fonts is not used, for GDPR reasons. Polish copy goes through `nb()`.

## Shapes

- Pills (999px) for every action. `.btn` is the general pill: chalk with a 10–18% ink border, turning to an ink fill with chalk text on hover. `.btn--primary` is ink-filled. `.pill` is the compact hero pill.
- Panels (sheet, contact form, receipt, tool card, dialog) use a 12px radius, a 1px ink hairline and no shadow.
- Fields use an 8px radius and a 1px ink border at 25%. Focus is a 2px ink ring with a 3px offset.
- Press feedback is `scale(0.97)` over 160ms. The ease is `cubic-bezier(0.23, 1, 0.32, 1)`. Nav hover is opacity 0.55 over 180ms.

## Hero (home only)

- The hero fills the viewport. It shows `hero-poster.jpg` and an all-intra 24 fps film: `hero-film-scrub.mp4` at 1080p, or `-960.mp4` below 768px. Above the film are a fog tint, a vignette and a veil.
- The film never plays. Horizontal pointer movement eases it to a target time and quantises to 24 fps (`useFilmScrub` in Hero.jsx).
- The blurred two-line intro is decorative. The h1 and lead are typed out (600ms delay, 38ms per character). The full text stays in the DOM as transparent characters.
- Pills fade in after 400ms.
- With reduced motion, only the poster shows and the text and pills appear immediately.
- The film source is a Three.js scene, rendered offline (scene.html in the session scratchpad; not in the repo).

## Navigation

- The nav is fixed. It is transparent over the hero and becomes chalk at 86% with an 8px blur on scroll or on any subpage. Subpages get `padding-top: var(--nav-h)`.
- Desktop (≥68rem) shows a comma-separated sentence "Usługi, Proces, Realizacje, Pakiety, Konfigurator, Narzędzia" and an underlined "Darmowa analiza".
- "Narzędzia" opens the tools dialog (`Dialog` in `components/studio/formfield.jsx`, shared through `ToolsDialogContext`).
- Mobile has a 28px hamburger that morphs to an X and opens a full overlay. While the overlay is open, main is inert. Escape closes it and returns focus to the hamburger.

## Layout

The gutter is 40, 32 or 20px, shared by the nav, hero and sections. The 12-column grid and the subpage pattern (PageHead, CtaBand, ToolsStrip, IndustryPage) are unchanged.

## Leftovers

- The `.construct*` and `.crop` rules in studio.css are unused.
- The old dark utilities remain in index.css.
- These components are unused: DataStrip, TrustBar, GoogleReviews, FunnelCalculator, LeadFinder, SpamScanner, UtmBuilder.

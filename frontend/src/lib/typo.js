// Polish typesetting: keep one-letter words (and a few short prepositions)
// on the line with the word that follows, so no line ends on "w", "i", "z".
const SHORT = /(^|[\s(„])([aiouwzAIOUWZ]|na|do|od|za|po|ze|we|ku|Na|Do|Od|Za|Po|Ze|We)\s+/g;

export const nb = (text) => (typeof text === 'string' ? text.replace(SHORT, '$1$2 ').replace(SHORT, '$1$2 ') : text);

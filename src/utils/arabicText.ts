type ArabicLetterForms = {
  isolated: string
  final?: string
  initial?: string
  medial?: string
}

const LETTER_FORMS: Record<string, ArabicLetterForms> = {
  '\u0621': { isolated: '\uFE80' }, // hamza
  '\u0622': { isolated: '\uFE81', final: '\uFE82' }, // alef madda
  '\u0623': { isolated: '\uFE83', final: '\uFE84' }, // alef hamza above
  '\u0624': { isolated: '\uFE85', final: '\uFE86' }, // waw hamza
  '\u0625': { isolated: '\uFE87', final: '\uFE88' }, // alef hamza below
  '\u0626': { isolated: '\uFE89', final: '\uFE8A', initial: '\uFE8B', medial: '\uFE8C' }, // yeh hamza
  '\u0627': { isolated: '\uFE8D', final: '\uFE8E' }, // alef
  '\u0628': { isolated: '\uFE8F', final: '\uFE90', initial: '\uFE91', medial: '\uFE92' }, // beh
  '\u0629': { isolated: '\uFE93', final: '\uFE94' }, // teh marbuta
  '\u062A': { isolated: '\uFE95', final: '\uFE96', initial: '\uFE97', medial: '\uFE98' }, // teh
  '\u062B': { isolated: '\uFE99', final: '\uFE9A', initial: '\uFE9B', medial: '\uFE9C' }, // theh
  '\u062C': { isolated: '\uFE9D', final: '\uFE9E', initial: '\uFE9F', medial: '\uFEA0' }, // jeem
  '\u062D': { isolated: '\uFEA1', final: '\uFEA2', initial: '\uFEA3', medial: '\uFEA4' }, // hah
  '\u062E': { isolated: '\uFEA5', final: '\uFEA6', initial: '\uFEA7', medial: '\uFEA8' }, // khah
  '\u062F': { isolated: '\uFEA9', final: '\uFEAA' }, // dal
  '\u0630': { isolated: '\uFEAB', final: '\uFEAC' }, // thal
  '\u0631': { isolated: '\uFEAD', final: '\uFEAE' }, // reh
  '\u0632': { isolated: '\uFEAF', final: '\uFEB0' }, // zain
  '\u0633': { isolated: '\uFEB1', final: '\uFEB2', initial: '\uFEB3', medial: '\uFEB4' }, // seen
  '\u0634': { isolated: '\uFEB5', final: '\uFEB6', initial: '\uFEB7', medial: '\uFEB8' }, // sheen
  '\u0635': { isolated: '\uFEB9', final: '\uFEBA', initial: '\uFEBB', medial: '\uFEBC' }, // sad
  '\u0636': { isolated: '\uFEBD', final: '\uFEBE', initial: '\uFEBF', medial: '\uFEC0' }, // dad
  '\u0637': { isolated: '\uFEC1', final: '\uFEC2', initial: '\uFEC3', medial: '\uFEC4' }, // tah
  '\u0638': { isolated: '\uFEC5', final: '\uFEC6', initial: '\uFEC7', medial: '\uFEC8' }, // zah
  '\u0639': { isolated: '\uFEC9', final: '\uFECA', initial: '\uFECB', medial: '\uFECC' }, // ain
  '\u063A': { isolated: '\uFECD', final: '\uFECE', initial: '\uFECF', medial: '\uFED0' }, // ghain
  '\u0641': { isolated: '\uFED1', final: '\uFED2', initial: '\uFED3', medial: '\uFED4' }, // feh
  '\u0642': { isolated: '\uFED5', final: '\uFED6', initial: '\uFED7', medial: '\uFED8' }, // qaf
  '\u0643': { isolated: '\uFED9', final: '\uFEDA', initial: '\uFEDB', medial: '\uFEDC' }, // kaf
  '\u0644': { isolated: '\uFEDD', final: '\uFEDE', initial: '\uFEDF', medial: '\uFEE0' }, // lam
  '\u0645': { isolated: '\uFEE1', final: '\uFEE2', initial: '\uFEE3', medial: '\uFEE4' }, // meem
  '\u0646': { isolated: '\uFEE5', final: '\uFEE6', initial: '\uFEE7', medial: '\uFEE8' }, // noon
  '\u0647': { isolated: '\uFEE9', final: '\uFEEA', initial: '\uFEEB', medial: '\uFEEC' }, // heh
  '\u0648': { isolated: '\uFEED', final: '\uFEEE' }, // waw
  '\u0649': { isolated: '\uFEEF', final: '\uFEF0' }, // alef maqsoora
  '\u064A': { isolated: '\uFEF1', final: '\uFEF2', initial: '\uFEF3', medial: '\uFEF4' }, // yeh
  '\u067B': { isolated: '\uFB66', final: '\uFB67', initial: '\uFB68', medial: '\uFB69' }, // used in Tunisian (beh with dot below)
  '\u067E': { isolated: '\uFB56', final: '\uFB57', initial: '\uFB58', medial: '\uFB59' }, // peh
  '\u0686': { isolated: '\uFB7A', final: '\uFB7B', initial: '\uFB7C', medial: '\uFB7D' }, // tcheh
  '\u0698': { isolated: '\uFB8A', final: '\uFB8B' }, // jeh
  '\u06A4': { isolated: '\uFB6A', final: '\uFB6B', initial: '\uFB6C', medial: '\uFB6D' }, // veh
  '\u06AF': { isolated: '\uFB92', final: '\uFB93', initial: '\uFB94', medial: '\uFB95' }, // gaf
}

const LAM_CHAR = '\u0644'

const LAM_ALEF_COMBINATIONS: Record<
  string,
  {
    isolated: string
    final: string
  }
> = {
  '\u0627': { isolated: '\uFEFB', final: '\uFEFC' },
  '\u0623': { isolated: '\uFEF7', final: '\uFEF8' },
  '\u0625': { isolated: '\uFEF9', final: '\uFEFA' },
  '\u0622': { isolated: '\uFEF5', final: '\uFEF6' },
}

const ARABIC_DIGITS = ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669']

const canConnectToNext = (char: string) => {
  const forms = LETTER_FORMS[char]
  return Boolean(forms?.initial || forms?.medial)
}

const canConnectToPrev = (char: string) => {
  const forms = LETTER_FORMS[char]
  return Boolean(forms?.final || forms?.medial)
}

const isArabicLetter = (char: string) => Boolean(LETTER_FORMS[char])

const convertDigits = (value: string) =>
  value.replace(/\d/g, (digit) => ARABIC_DIGITS[Number.parseInt(digit, 10)] ?? digit)

const swapParentheses = (value: string) =>
  value
    .replace(/\(/g, '\uFD3E')
    .replace(/\)/g, '\uFD3F')
    .replace(/\uFD3E/g, ')')
    .replace(/\uFD3F/g, '(')

const findPreviousArabicIndex = (chars: string[], start: number) => {
  for (let i = start - 1; i >= 0; i -= 1) {
    if (isArabicLetter(chars[i])) return i
    if (/\s/.test(chars[i])) continue
    return -1
  }
  return -1
}

const findNextArabicIndex = (chars: string[], start: number) => {
  for (let i = start + 1; i < chars.length; i += 1) {
    if (isArabicLetter(chars[i])) return i
    if (/\s/.test(chars[i])) continue
    return -1
  }
  return -1
}

export const shapeArabicText = (input: string) => {
  const chars = Array.from(swapParentheses(convertDigits(input)))
  const shaped: string[] = []

  for (let index = 0; index < chars.length; index += 1) {
    const char = chars[index]

    if (!isArabicLetter(char)) {
      shaped.push(char)
      continue
    }

    const nextChar = chars[index + 1]
    if (char === LAM_CHAR && nextChar && LAM_ALEF_COMBINATIONS[nextChar]) {
      const prevIndex = findPreviousArabicIndex(chars, index)
      const prevChar = prevIndex >= 0 ? chars[prevIndex] : null
      const combo = LAM_ALEF_COMBINATIONS[nextChar]
      const connectPrev = prevChar ? canConnectToNext(prevChar) : false
      shaped.push(connectPrev ? combo.final : combo.isolated)
      index += 1
      continue
    }

    const prevIndex = findPreviousArabicIndex(chars, index)
    const nextIndex = findNextArabicIndex(chars, index)
    const prevChar = prevIndex >= 0 ? chars[prevIndex] : null
    const followingChar = nextIndex >= 0 ? chars[nextIndex] : null
    const forms = LETTER_FORMS[char]

    if (!forms) {
      shaped.push(char)
      continue
    }

    const connectPrev = prevChar ? canConnectToNext(prevChar) : false
    const connectNext = followingChar ? canConnectToPrev(followingChar) : false

    let glyph = forms.isolated
    if (connectPrev && connectNext && forms.medial) {
      glyph = forms.medial
    } else if (connectPrev && forms.final) {
      glyph = forms.final
    } else if (connectNext && forms.initial) {
      glyph = forms.initial
    }

    shaped.push(glyph)
  }

  return shaped.join('')
}

export const prepareArabicPdfText = (value: string) => {
  const shaped = shapeArabicText(value)
  return Array.from(shaped).reverse().join('')
}



/**
 * Возвращает принимаемый текст после замены экранированных символов.
 * @param {string} text Текст, где есть экранированные символы.
 * @returns {string} Текст после замены.
 */
export const replacementEscapeSymbols = (text: string | null): string | null => {
  if (text === null) return null

  const replSymbol: string[] = ["'", '"', '/', '<', '>', '&', '\\']
  const escapeSymbols: string[] = ['&#x27;', '&quot;', '&#x2F;', '&lt;', '&gt;', '&amp;', '&#x5C;']
  const escapeSymbolsMap = new Map(escapeSymbols.map((symb, i) => [symb, replSymbol[i]]))

  return text.replace(/&#x27;|&quot;|&#x2F;|&lt;|&gt;|&amp;|&#x5C;/g, (matched) => {
    return escapeSymbolsMap.get(matched) || matched
  })
}

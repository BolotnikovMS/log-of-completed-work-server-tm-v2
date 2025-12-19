/**
 * Возвращает рандомную строку из 5 символов.
 * @returns {string} Random string.
 */
export const randomStr = (): string => Math.random().toString(36).slice(2, 7)

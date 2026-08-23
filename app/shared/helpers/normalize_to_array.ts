type FilterValue = string | number | (string | number)[] | undefined | null

export const normalizeToNumberArray = (value: FilterValue): number[] | undefined => {
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  if (Array.isArray(value)) {
    return value
      .map((v) => Number(v))
      .filter((n) => !Number.isNaN(n))
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((v) => Number(v.trim()))
      .filter((n) => !Number.isNaN(n))
  }

  return [Number(value)].filter((n) => !Number.isNaN(n))
}

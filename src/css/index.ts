export function normalizeUnit(value: string | number, unit = 'px') {
  const toNumber = typeof value === 'string' ? Number.parseFloat(value) : value
  return `${Number.isNaN(toNumber) ? 0 : toNumber}${unit}`
}

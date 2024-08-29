export function sum<T>(arr: T[], field: keyof T) {
  return arr.reduce((acc, cur) => acc + (cur[field] as number), 0)
}

export function avg<T>(arr: T[], field: keyof T) {
  return sum(arr, field) / arr.length
}

export function getMaxNumber<T>(arr: T[], field: keyof T): number {
  return Math.max(...arr.map(item => item[field] as number))
}

export function getMinNumber<T>(arr: T[], field: keyof T): number {
  return Math.min(...arr.map(item => item[field] as number))
}

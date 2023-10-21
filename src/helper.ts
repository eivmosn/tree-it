import type { MaybeObject } from './type'

export const isArray = Array.isArray

export function toTypeString(value: unknown): string {
  return Object.prototype.toString.call(value)
}

export function isNumber(val: unknown): val is number {
  return toTypeString(val) === '[object Number]'
}

export function isString(val: unknown): val is string {
  return toTypeString(val) === '[object String]'
}

export function isBoolean(val: unknown): val is boolean {
  return toTypeString(val) === '[object Boolean]'
}

export function isObject(val: unknown): val is MaybeObject {
  return toTypeString(val) === '[object Object]'
}

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

export function isEmpty(val: unknown): boolean {
  if (val === null || val === undefined)
    return true
  if (isArray(val) || isString(val))
    return val.length === 0
  if (isObject(val))
    return Object.keys(val).length === 0
  return false
}

export function toString(val: unknown): string {
  if (isArray(val) || isObject(val))
    return JSON.stringify(val)
  return String(val)
}

export function toNumber(val: unknown) {
  return Number(val)
}

export function hasOwn(val: MaybeObject, key: string) {
  return Object.hasOwn(val, key)
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function hyphenate(str: string) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

export function isSame(val: any, other: any) {
  return Object.is(val, other)
}

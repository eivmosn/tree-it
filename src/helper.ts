import type { MaybeArray, MaybeObject } from './type'

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

export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>
}

export function compact(val: MaybeArray) {
  return val.filter(item => item !== null && item !== undefined && item !== '' && !Number.isNaN(item))
}

export function compile(code: string) {
  code = `with (sandbox) { ${code} }`
  const fn = new Function('sandbox', code)
  return (sandbox: MaybeObject) => {
    const proxy = new Proxy(sandbox, {
      has() {
        return true
      },
      get(target, key, receiver) {
        if (key === Symbol.unscopables)
          return undefined
        return Reflect.get(target, key, receiver)
      },
    })
    return fn(proxy)
  }
}

export function createScript(code: string, sandbox: MaybeObject = {}) {
  const excute = compile(code)
  return excute({
    ...sandbox,
    console,
  })
}

export function get(object: object, path: string, defaultValue = undefined) {
  const paths = path.split('.')
  return paths.reduce((result, key) => {
    if (result && isObject(result) && hasOwn(result, key))
      return result[key]
    else
      return defaultValue
  }, object)
}

export function set(object: MaybeObject, path: string, value: any): void {
  const paths = path.split('.')
  for (let i = 0, length = paths.length; i < length - 1; i++) {
    const key = paths[i]
    if (!object[key] || !isObject(object[key]))
      object[key] = {}
    object = object[key]
  }
  object[paths[paths.length - 1]] = value
}

/**
 * @vue-shared
 */
export function makeMap(
  str: string,
  expectsLowerCase?: boolean,
): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++)
    map[list[i]] = true
  return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val]
}

import type { MaybeObject } from './type'
import { hyphenate } from './helper'

export function toString(style: MaybeObject) {
  return Object.entries(style).map(([k, v]) => `${hyphenate(k)}:${v}`).join(';')
}

export function fromString(style: string) {
  return style.split(';').reduce((acc, cur) => {
    const [k, v] = cur.split(':')
    acc[k] = v
    return acc
  }, {} as MaybeObject)
}

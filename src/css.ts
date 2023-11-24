import { hyphenate, isNumber, isString, isStringNumber } from './helper'
import type { LooseMap } from './type'

export function toString(style: CSSStyleDeclaration) {
  return Object.entries(style).map(([k, v]) => `${hyphenate(k)}:${v}`).join(';')
}

export function fromString(style: string) {
  return style.split(';').reduce<LooseMap<string>>((acc, cur) => {
    const [k, v] = cur.split(':')
    acc[k] = v
    return acc
  }, {})
}

export function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, '')
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)
  return `rgb(${r}, ${g}, ${b})`
}

export function setStyle(element: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  for (const [key, value] of Object.entries(styles))
    element.style.setProperty(hyphenate(key), value as string)
}

export function withUnit(value: number | string, unit = 'px') {
  if (isNumber(value) || isStringNumber(value))
    return `${value}${unit}`
  else if (isString(value))
    return value
}

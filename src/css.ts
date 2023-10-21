import type { MaybeObject } from './type'

function toKebab(input: string) {
  let output = ''
  for (let i = 0, char = ''; i < input.length; i++) {
    char = input.charAt(i)
    if (char >= 'A' && char <= 'Z')
      output += `-${char.toLowerCase()}`
    else
      output += char
  }
  return output
}

export function toString(style: MaybeObject) {
  return Object.entries(style).map(([k, v]) => `${toKebab(k)}:${v}`).join(';')
}

export function fromString(style: string) {
  return style.split(';').reduce((acc, cur) => {
    const [k, v] = cur.split(':')
    acc[k] = v
    return acc
  }, {} as MaybeObject)
}

import { setStyle } from './css'
import type { DeepPartial } from './type'

export function hasClass(el: HTMLElement, className: string) {
  return el.classList.contains(className)
}

export function createElement<T extends keyof HTMLElementTagNameMap>(tag: T, options?: DeepPartial<HTMLElementTagNameMap[T]>) {
  const el = document.createElement(tag)
  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      key === 'style' ? setStyle(el, value) : el.setAttribute(key, value)
    })
  }
  return el
}

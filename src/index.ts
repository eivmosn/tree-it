export function get<T extends object>(source: T, path: string, defaultValue = undefined) {
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  const result = keys.reduce((obj, key) => {
    return Object(obj)[key]
  }, source)
  return result === undefined ? defaultValue : result
}

export function set<T extends object>(source: T, path: string, value: any) {
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  const lastKey = keys.pop()
  const target = keys.reduce((obj, key) => {
    if (!Object.prototype.hasOwnProperty.call(obj, key))
      Object(obj)[key] = {}
    return Object(obj)[key]
  }, source)
  if (lastKey)
    target[lastKey as keyof T] = value
}

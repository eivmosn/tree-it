export * from './type'

function _splitKeys(path: string) {
  return path.replace(/\[(\d+)\]/g, '.$1').split('.')
}

export function compile(code: string) {
  code = `with (sandbox) { ${code} }`
  const fn = new Function('sandbox', code)
  return (sandbox: any) => {
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

export function createScript(code: string, sandbox: any = {}) {
  const excute = compile(code)
  return excute({
    ...sandbox,
    JSON,
    console,
    Object,
    Array,
    Promise,
    FormData,
  })
}

export function fromString(style: string) {
  return style.split(';').reduce<any>((acc, cur) => {
    const [k, v] = cur.split(':')
    acc[k] = v
    return acc
  }, {})
}

export function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => {
      const base64 = reader.result as string
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}

export function get<T>(source: T, path: string, defaultValue = undefined) {
  const keys = _splitKeys(path)
  const result = keys.reduce((obj: T, key: string | number) => {
    return Object(obj)[key]
  }, source)
  return result === undefined ? defaultValue : result
}

export function set<T>(source: T, path: string, value: any): T {
  const keys = _splitKeys(path)
  const lastKey = keys.pop()

  if (!lastKey)
    return source

  const target = keys.reduce((obj: any, key: string | number) => {
    if (!obj[key])
      obj[key] = {}
    return obj[key]
  }, source)

  target[lastKey] = value

  return source
}

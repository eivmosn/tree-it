export * from './type'

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
  })
}

export * from './type'

export function blobToBase64(file: File | Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result as string
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}

export function get<T extends object>(source: T, path: string, defaultValue = undefined) {
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  const result = keys.reduce((obj, key) => {
    return Object(obj)[key]
  }, source)
  return result === undefined ? defaultValue : result
}

export function getUrlParams(url: string) {
  const search = new URL(url).search
  return Object.fromEntries(new URLSearchParams(search))
}

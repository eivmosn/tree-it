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

export function base64ToFile(base64String: string, fileName: string) {
  const binaryData = atob(base64String)
  const arrayBuffer = new ArrayBuffer(binaryData.length)
  const uint8Array = new Uint8Array(arrayBuffer)
  for (let i = 0; i < binaryData.length; i++)
    uint8Array[i] = binaryData.charCodeAt(i)
  const blob = new Blob([uint8Array], { type: 'application/octet-stream' })
  const file = new File([blob], fileName, { type: 'application/octet-stream' })
  return file
}

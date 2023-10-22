export function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export function base64ToBlob(base64: string) {
  const b64 = base64.replace(/^data:image\/\w+;base64,/, '')
  const bstr = atob(b64)
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--)
    u8arr[n] = bstr.charCodeAt(n)

  return new Blob([u8arr])
}

export function fileName(headers: string) {
  const match = headers.match(/filename="(.+)"/)
  if (match)
    return match[1]
  return ''
}

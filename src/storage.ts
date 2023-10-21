export function set(key: string, value: any, ttl?: number) {
  const now = new Date()
  if (ttl) {
    localStorage.setItem(key, JSON.stringify({
      value,
      expires: now.getTime() + ttl * 1000,
    }))
  }
  else {
    localStorage.setItem(key, JSON.stringify({
      value,
    }))
  }
}

export function get(key: string) {
  const item = localStorage.getItem(key)
  if (!item)
    return null

  const data = JSON.parse(item)
  const now = new Date()
  if (data.expires && data.expires < now.getTime()) {
    localStorage.removeItem(key)
    return null
  }
  return data.value
}

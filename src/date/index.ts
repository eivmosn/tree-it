const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const day = new Date().getDate()
const hour = new Date().getHours()
const minute = new Date().getMinutes()
const second = new Date().getSeconds()

export function isValidDate(date: Date | string): boolean {
  return date instanceof Date && !Number.isNaN(date.getTime())
}

export function currentDate(): string {
  return `${year}-${month}-${day}`
}

export function currentTime(): string {
  return `${hour}:${minute}:${second}`
}

export function currentDateTime(): string {
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export function currentYear(): number {
  return year
}

export function currentMonth(): number {
  return month
}

export function currentDay(): number {
  return day
}

export function formatDate(date: string, format: string): string {
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const hour = dateObj.getHours()
  const minute = dateObj.getMinutes()
  const second = dateObj.getSeconds()
  const formattedDate = format.replace(/YYYY/g, year.toString())
    .replace(/MM/g, month.toString().padStart(2, '0'))
    .replace(/DD/g, day.toString().padStart(2, '0'))
    .replace(/HH/g, hour.toString().padStart(2, '0'))
    .replace(/mm/g, minute.toString().padStart(2, '0'))
    .replace(/ss/g, second.toString().padStart(2, '0'))
  return formattedDate
}

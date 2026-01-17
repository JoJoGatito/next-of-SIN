export function dateKeyFromDateLocal(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  // Format as YYYY-MM-DD in the **local** timezone
  return `${year}-${month}-${day}`
}

export function parseDateKeyToLocalDate(key: string): Date {
  // Expecting YYYY-MM-DD; fall back defensively if malformed
  const [y, m, d] = key.split('-').map(Number)
  const year = Number.isFinite(y) ? y : new Date().getFullYear()
  const monthIndex = Number.isFinite(m) ? m - 1 : 0
  const day = Number.isFinite(d) ? d : 1

  return new Date(year, monthIndex, day)
}


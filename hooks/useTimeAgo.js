const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]
const getDiffsTime = timestamp => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000
  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}
export const useTimeAgo = (timestamp) => {
  const { value, unit } = getDiffsTime(timestamp)
  const relativeTime = new Intl.RelativeTimeFormat(navigator.language, { style: 'short' })
  return relativeTime.format(value, unit)
}

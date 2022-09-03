import { useEffect, useState } from 'react'

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
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}
export const useTimeAgo = (timestamp) => {
  const [timeago, setTimeAgo] = useState(() => getDiffsTime(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDiffsTime(timestamp)
      setTimeAgo(newTimeAgo)
    }, 5000)

    return () => clearInterval(interval)
  }, [timestamp])

  const { value, unit } = timeago
  const relativeTime = new Intl.RelativeTimeFormat('ES-es', { style: 'short' })
  return relativeTime.format(value, unit)
}

import { DateFormat, getTimestampTextParams } from "../types"

const getCurrentSeason = (): string => {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return "봄"
  if (month >= 6 && month <= 8) return "여름"
  if (month >= 9 && month <= 11) return "가을"
  return "겨울"
}

const formatDate = (date: Date, format: DateFormat): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  switch (format) {
    case "YYYY.MM.DD":
      return `${year}.${month}.${day}`
    case "YYYY/MM/DD":
      return `${year}/${month}/${day}`
    case "MM.DD.YYYY":
      return `${month}.${day}.${year}`
    default:
      return `${year}.${month}.${day}`
  }
}

export const getTimestampText = ({
  timestampSettings,
  weather,
}: getTimestampTextParams): string => {
  const now = new Date()
  const dateStr = formatDate(now, timestampSettings.dateFormat)
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`

  let timestampText = `${dateStr} ${timeStr}`

  if (timestampSettings.showSeason) {
    timestampText += ` · ${getCurrentSeason()}`
  }

  if (timestampSettings.showWeather && weather) {
    timestampText += `\n${weather.condition} ${weather.min}°-${weather.current}°-${weather.max}°`
  }

  return timestampText
}

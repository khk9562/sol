export type TabType = "camera" | "album" | "settings"
export type DateFormat = "YYYY.MM.DD" | "YYYY/MM/DD" | "MM.DD.YYYY"
export type WeatherCondition = "맑음" | "흐림" | "비" | "눈" | "안개"

export interface Position {
  x: number
  y: number
}

export interface WeatherData {
  current: number
  min: number
  max: number
  condition: WeatherCondition
  icon: string
}

export interface TimestampSettings {
  dateFormat: DateFormat
  color: string
  position: Position
  showWeather: boolean
  showSeason: boolean
  fontSize: number
}

export interface PhotoData {
  id: string
  uri: string
  timestamp: string
  settings: TimestampSettings
  timestampText: string
}

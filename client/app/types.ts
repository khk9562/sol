import { CameraCapturedPicture, CameraView } from "expo-camera"

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

export interface TabsProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

export interface SettingProps {
  timestampSettings: TimestampSettings
  setTimestampSettings: React.Dispatch<React.SetStateAction<TimestampSettings>>
  // setTimestampSettings: (value: TimestampSettings | ((prev: TimestampSettings) => TimestampSettings)) => void;
}

export interface getTimestampTextParams {
  timestampSettings: TimestampSettings
  weather: WeatherData | null
}

export interface TimeStampEditorProps {
  show: boolean
  onClose: () => void
  currentPhoto: CameraCapturedPicture | null
  timestampSettings: TimestampSettings
  weather: WeatherData | null
  onSave: ({ timestampSettings, weather }: getTimestampTextParams) => void
}

export interface initializeFnProps {
  checkPermission: React.Dispatch<React.SetStateAction<boolean | null>>
  loadPhotos: () => void
}

export interface CameraComponentPros {
  // CHECK: Ref 타입은 아래처럼 처리
  cameraRef: React.RefObject<CameraView | null>
  hasPermission: boolean | null
  setCurrentPhoto: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | null>
  >
  handleOpenTimeStampEditor: () => void
}

import React, { useState, useRef } from "react"
import { StatusBar, SafeAreaView } from "react-native"
import { MainStyles } from "@/app/style/main"
import { CameraCapturedPicture, CameraView } from "expo-camera"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  TabType,
  WeatherData,
  TimestampSettings,
  PhotoData,
  getTimestampTextParams,
} from "./types"

import { getTimestampText } from "./utils/date"
import useIntializedApp from "./hooks/useInitializeApp"

import AppRouter from "./routes/AppRouter"
import Tabs from "./components/Tabs"
import TimeStampEditor from "./screens/TimeStampEditor"

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("camera")
  const [photos, setPhotos] = useState<PhotoData[]>([])
  const [showTimestampEditor, setShowTimestampEditor] = useState<boolean>(false)
  const [currentPhoto, setCurrentPhoto] =
    useState<CameraCapturedPicture | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  const [timestampSettings, setTimestampSettings] = useState<TimestampSettings>(
    {
      dateFormat: "YYYY.MM.DD",
      color: "#FFFFFF",
      position: { x: 20, y: 50 },
      showWeather: true,
      showSeason: true,
      fontSize: 16,
    }
  )

  const cameraRef = useRef<CameraView>(null)

  const loadPhotos = async (): Promise<void> => {
    try {
      const savedPhotos = await AsyncStorage.getItem("ootd_photos")
      if (savedPhotos) {
        setPhotos(JSON.parse(savedPhotos))
      }
    } catch (error) {
      console.log("사진을 불러올 수 없습니다:", error)
    }
  }

  // 앱 초기화
  useIntializedApp({
    checkPermission: setHasPermission,
    loadPhotos,
  })

  const savePhotos = async (newPhotos: PhotoData[]): Promise<void> => {
    try {
      await AsyncStorage.setItem("ootd_photos", JSON.stringify(newPhotos))
    } catch (error) {
      console.log("사진을 저장할 수 없습니다:", error)
    }
  }

  const savePhotoWithTimestamp = ({
    timestampSettings,
    weather,
  }: getTimestampTextParams): void => {
    if (!currentPhoto) return

    const newPhoto: PhotoData = {
      id: Date.now().toString(),
      uri: currentPhoto.uri,
      timestamp: new Date().toISOString(),
      settings: { ...timestampSettings },
      timestampText: getTimestampText({ timestampSettings, weather }),
    }

    const updatedPhotos = [newPhoto, ...photos]
    setPhotos(updatedPhotos)
    savePhotos(updatedPhotos)
    setShowTimestampEditor(false)
    setCurrentPhoto(null)
    setActiveTab("album")
  }

  return (
    <SafeAreaView style={MainStyles.container}>
      <StatusBar barStyle='light-content' backgroundColor='#1a1a1a' />
      <AppRouter
        activeTab={activeTab}
        cameraRef={cameraRef}
        hasPermission={hasPermission}
        setCurrentPhoto={setCurrentPhoto}
        handleOpenTimeStampEditor={() => setShowTimestampEditor(false)}
        photos={photos}
        timestampSettings={timestampSettings}
        setTimestampSettings={setTimestampSettings}
      />

      <TimeStampEditor
        show={showTimestampEditor}
        onClose={() => setShowTimestampEditor(false)}
        currentPhoto={currentPhoto}
        timestampSettings={timestampSettings}
        weather={weather}
        onSave={savePhotoWithTimestamp}
      />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  )
}

export default App

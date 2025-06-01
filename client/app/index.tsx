import React, { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native"
import { MainStyles } from "@/app/style/main"
import {
  Camera,
  CameraCapturedPicture,
  CameraView,
  CameraPictureOptions,
} from "expo-camera"
import * as ImagePicker from "expo-image-picker"
import * as Location from "expo-location"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import {
  TabType,
  DateFormat,
  WeatherData,
  TimestampSettings,
  PhotoData,
} from "./types"
import { requestPermissions } from "./utils/requestPermission"
import { getCurrentLocation } from "./utils/getCurrentLocation"
import { getWeatherData } from "./utils/getWeather"

const { width, height } = Dimensions.get("window")

const App: React.FC = () => {
  // State 정의
  const [activeTab, setActiveTab] = useState<TabType>("camera")
  const [photos, setPhotos] = useState<PhotoData[]>([])
  const [showTimestampEditor, setShowTimestampEditor] = useState<boolean>(false)
  const [currentPhoto, setCurrentPhoto] =
    useState<CameraCapturedPicture | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  // 타임스탬프 설정
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

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const isPermitted = await requestPermissions()
        setHasPermission(isPermitted)

        loadPhotos()

        // 위치 정보 가져오기
        const locationData = await getCurrentLocation()
        if (locationData?.coords) {
          await getWeatherData(
            locationData.coords.latitude,
            locationData.coords.longitude
          )
        }
      } catch (error) {
        console.error("초기화 실패:", error)
      }
    }

    initializeApp()
  }, [])

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

  const savePhotos = async (newPhotos: PhotoData[]): Promise<void> => {
    try {
      await AsyncStorage.setItem("ootd_photos", JSON.stringify(newPhotos))
    } catch (error) {
      console.log("사진을 저장할 수 없습니다:", error)
    }
  }

  const takePicture = async (): Promise<void> => {
    if (cameraRef.current) {
      try {
        const options: CameraPictureOptions = {
          quality: 0.8,
          base64: false,
          skipProcessing: false,
        }
        const photo: CameraCapturedPicture =
          await cameraRef.current.takePictureAsync(options)
        setCurrentPhoto(photo)
        setShowTimestampEditor(true)
      } catch (error) {
        console.error("사진 촬영 실패:", error)
        Alert.alert("오류", "사진 촬영에 실패했습니다.")
      }
    }
  }

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

  const getTimestampText = (): string => {
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

  const savePhotoWithTimestamp = (): void => {
    if (!currentPhoto) return

    const newPhoto: PhotoData = {
      id: Date.now().toString(),
      uri: currentPhoto.uri,
      timestamp: new Date().toISOString(),
      settings: { ...timestampSettings },
      timestampText: getTimestampText(),
    }

    const updatedPhotos = [newPhoto, ...photos]
    setPhotos(updatedPhotos)
    savePhotos(updatedPhotos)
    setShowTimestampEditor(false)
    setCurrentPhoto(null)
    setActiveTab("album")
  }

  const renderCamera = (): JSX.Element => {
    if (hasPermission === null) {
      return (
        <View style={MainStyles.centerContainer}>
          <Text style={MainStyles.messageText}>카메라 권한을 확인 중...</Text>
        </View>
      )
    }

    if (hasPermission === false) {
      return (
        <View style={MainStyles.centerContainer}>
          <Text style={MainStyles.messageText}>카메라 권한이 필요합니다</Text>
          <TouchableOpacity
            style={MainStyles.permissionButton}
            onPress={requestPermissions}
          >
            <Text style={MainStyles.permissionButtonText}>권한 요청</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={MainStyles.cameraContainer}>
        <CameraView style={MainStyles.camera} ref={cameraRef} facing={"back"}>
          <View style={MainStyles.cameraOverlay}>
            <TouchableOpacity
              style={MainStyles.captureButton}
              onPress={takePicture}
            >
              <View style={MainStyles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    )
  }

  const renderAlbum = (): JSX.Element => (
    <ScrollView style={MainStyles.albumContainer}>
      <View style={MainStyles.photoGrid}>
        {photos.length === 0 ? (
          <View style={MainStyles.centerContainer}>
            <Text style={MainStyles.messageText}>
              아직 촬영한 사진이 없습니다
            </Text>
          </View>
        ) : (
          photos.map((photo: PhotoData) => (
            <View key={photo.id} style={MainStyles.photoItem}>
              <Image
                source={{ uri: photo.uri }}
                style={MainStyles.photoThumbnail}
              />
              <View
                style={[
                  MainStyles.timestampOverlay,
                  {
                    left: photo.settings.position.x,
                    top: photo.settings.position.y,
                  },
                ]}
              >
                <Text
                  style={[
                    MainStyles.timestampText,
                    {
                      color: photo.settings.color,
                      fontSize: photo.settings.fontSize,
                    },
                  ]}
                >
                  {photo.timestampText}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  )

  const renderSettings = (): JSX.Element => {
    const dateFormats: DateFormat[] = ["YYYY.MM.DD", "YYYY/MM/DD", "MM.DD.YYYY"]
    const colors: string[] = [
      "#FFFFFF",
      "#000000",
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
    ]

    return (
      <ScrollView style={MainStyles.settingsContainer}>
        <View style={MainStyles.settingSection}>
          <Text style={MainStyles.sectionTitle}>타임스탬프 설정</Text>

          <View style={MainStyles.settingItem}>
            <Text style={MainStyles.settingLabel}>날짜 형식</Text>
            <View style={MainStyles.buttonGroup}>
              {dateFormats.map((format: DateFormat) => (
                <TouchableOpacity
                  key={format}
                  style={[
                    MainStyles.formatButton,
                    timestampSettings.dateFormat === format &&
                      MainStyles.formatButtonActive,
                  ]}
                  onPress={() =>
                    setTimestampSettings((prev) => ({
                      ...prev,
                      dateFormat: format,
                    }))
                  }
                >
                  <Text
                    style={[
                      MainStyles.formatButtonText,
                      timestampSettings.dateFormat === format &&
                        MainStyles.formatButtonTextActive,
                    ]}
                  >
                    {format}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={MainStyles.settingItem}>
            <Text style={MainStyles.settingLabel}>색상</Text>
            <View style={MainStyles.colorPicker}>
              {colors.map((color: string) => (
                <TouchableOpacity
                  key={color}
                  style={[MainStyles.colorOption, { backgroundColor: color }]}
                  onPress={() =>
                    setTimestampSettings((prev) => ({ ...prev, color }))
                  }
                >
                  {timestampSettings.color === color && (
                    <Ionicons
                      name='checkmark'
                      size={16}
                      color={color === "#FFFFFF" ? "#000" : "#FFF"}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={MainStyles.settingItem}>
            <TouchableOpacity
              style={MainStyles.toggleButton}
              onPress={() =>
                setTimestampSettings((prev) => ({
                  ...prev,
                  showWeather: !prev.showWeather,
                }))
              }
            >
              <Text style={MainStyles.settingLabel}>날씨 정보 표시</Text>
              <Ionicons
                name={
                  timestampSettings.showWeather ? "toggle" : "toggle-outline"
                }
                size={24}
                color={timestampSettings.showWeather ? "#4ECDC4" : "#ccc"}
              />
            </TouchableOpacity>
          </View>

          <View style={MainStyles.settingItem}>
            <TouchableOpacity
              style={MainStyles.toggleButton}
              onPress={() =>
                setTimestampSettings((prev) => ({
                  ...prev,
                  showSeason: !prev.showSeason,
                }))
              }
            >
              <Text style={MainStyles.settingLabel}>계절 태그 표시</Text>
              <Ionicons
                name={
                  timestampSettings.showSeason ? "toggle" : "toggle-outline"
                }
                size={24}
                color={timestampSettings.showSeason ? "#4ECDC4" : "#ccc"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }

  const renderTimestampEditor = (): JSX.Element => (
    <Modal visible={showTimestampEditor} animationType='slide'>
      <View style={MainStyles.editorContainer}>
        {currentPhoto && (
          <Image
            source={{ uri: currentPhoto.uri }}
            style={MainStyles.previewImage}
          />
        )}
        <View
          style={[
            MainStyles.timestampPreview,
            {
              left: timestampSettings.position.x,
              top: timestampSettings.position.y,
            },
          ]}
        >
          <Text
            style={[
              MainStyles.timestampText,
              {
                color: timestampSettings.color,
                fontSize: timestampSettings.fontSize,
              },
            ]}
          >
            {getTimestampText()}
          </Text>
        </View>

        <View style={MainStyles.editorControls}>
          <TouchableOpacity
            style={MainStyles.saveButton}
            onPress={savePhotoWithTimestamp}
          >
            <Text style={MainStyles.saveButtonText}>저장</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={MainStyles.cancelButton}
            onPress={() => setShowTimestampEditor(false)}
          >
            <Text style={MainStyles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  return (
    <SafeAreaView style={MainStyles.container}>
      <StatusBar barStyle='light-content' backgroundColor='#1a1a1a' />

      {(() => {
        switch (activeTab) {
          case "camera":
            return <>{renderCamera()}</>
          case "album":
            return <>{renderAlbum()}</>
          case "settings":
            return <>{renderSettings()}</>
          default:
            return null
        }
      })()}

      <>{renderTimestampEditor()}</>

      <View style={MainStyles.bottomNav}>
        <TouchableOpacity
          style={[
            MainStyles.navButton,
            activeTab === "album" && MainStyles.navButtonActive,
          ]}
          onPress={() => setActiveTab("album")}
        >
          <Ionicons
            name='images'
            size={24}
            color={activeTab === "album" ? "#4ECDC4" : "#666"}
          />
          <Text
            style={[
              MainStyles.navText,
              activeTab === "album" && MainStyles.navTextActive,
            ]}
          >
            앨범
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            MainStyles.navButton,
            activeTab === "camera" && MainStyles.navButtonActive,
          ]}
          onPress={() => setActiveTab("camera")}
        >
          <Ionicons
            name='camera'
            size={24}
            color={activeTab === "camera" ? "#4ECDC4" : "#666"}
          />
          <Text
            style={[
              MainStyles.navText,
              activeTab === "camera" && MainStyles.navTextActive,
            ]}
          >
            카메라
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            MainStyles.navButton,
            activeTab === "settings" && MainStyles.navButtonActive,
          ]}
          onPress={() => setActiveTab("settings")}
        >
          <Ionicons
            name='settings'
            size={24}
            color={activeTab === "settings" ? "#4ECDC4" : "#666"}
          />
          <Text
            style={[
              MainStyles.navText,
              activeTab === "settings" && MainStyles.navTextActive,
            ]}
          >
            설정
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default App

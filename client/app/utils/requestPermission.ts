import { Camera } from "expo-camera"
import * as ImagePicker from "expo-image-picker"
import * as Location from "expo-location"
import { Alert } from "react-native"

export const requestPermissions = async (): Promise<boolean> => {
  try {
    const { status: cameraStatus } =
      await Camera.requestCameraPermissionsAsync()
    const { status: mediaStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync()

    // setHasPermission(cameraStatus === "granted")

    if (
      cameraStatus !== "granted" ||
      mediaStatus !== "granted" ||
      locationStatus !== "granted"
    ) {
      Alert.alert("권한 필요", "카메라, 갤러리, 위치 권한이 필요합니다.")
    }

    if (cameraStatus === "granted") return true

    return false
  } catch (error) {
    console.error("권한 요청 실패:", error)
    // setHasPermission(false)
    return false
  }
}

import { View, Text, TouchableOpacity, Alert } from "react-native"
import {
  CameraView,
  CameraCapturedPicture,
  CameraPictureOptions,
} from "expo-camera"
import { MainStyles } from "../style/main"
import { requestPermissions } from "../utils/requestPermission"
import { CameraComponentPros } from "../types"

export default function Camera({
  cameraRef,
  hasPermission,
  setCurrentPhoto,
  handleOpenTimeStampEditor,
}: CameraComponentPros) {
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
        // setShowTimestampEditor(true)
        handleOpenTimeStampEditor()
      } catch (error) {
        console.error("사진 촬영 실패:", error)
        Alert.alert("오류", "사진 촬영에 실패했습니다.")
      }
    }
  }

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

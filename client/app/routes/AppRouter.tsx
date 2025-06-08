import React from "react"
import Camera from "../components/Camera"
import Album from "../screens/Album"
import Setting from "../screens/Setting"
import { AppRouterProps } from "../types"

export default function AppRouter({
  activeTab,
  cameraRef,
  hasPermission,
  setCurrentPhoto,
  handleOpenTimeStampEditor,
  photos,
  timestampSettings,
  setTimestampSettings,
}: AppRouterProps) {
  switch (activeTab) {
    case "camera":
      return (
        <Camera
          cameraRef={cameraRef}
          hasPermission={hasPermission}
          setCurrentPhoto={setCurrentPhoto}
          handleOpenTimeStampEditor={handleOpenTimeStampEditor}
        />
      )
    case "album":
      return <Album photos={photos} />
    case "settings":
      return (
        <Setting
          timestampSettings={timestampSettings}
          setTimestampSettings={setTimestampSettings}
        />
      )
    default:
      return null
  }
}

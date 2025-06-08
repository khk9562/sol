import { useState, useEffect } from "react"
import { getCurrentPosition, watchPosition } from "../utils/location"
// CHECK: 굳이 getCurrentPosition이 필요한가?
// watchPostion 과의 차이점은 정확도 보다 속도면에서 우월,

// 좌표 기록 용도
export default function useGeolocation() {
  const [isRecording, setIsRecording] = useState(false)
  const [watchId, setWatchId] = useState(null)
  const [positions, setPositions] = useState([])

  const handleUpdateRoutes = (latlng) => {
    // TODO: latlng 타입 확인 필요함
    setPositions((prev) => [...prev, latlng])
  }

  // 위치 추적 시작
  const startTracking = async () => {
    if (navigator.geolocation) {
      // TODO: 위치 서비스 제공 수락
      alert("위치 서비스 제공에 동의해주세요!")
      return
    }

    try {
      const firstRoute = getCurrentPosition()
      console.log("firstRoute", firstRoute)

      setIsRecording(true)

      const watchID = watchPosition(handleUpdateRoutes)
      setWatchId(watchID)

      if (!watchID) throw new Error("기록에 실패하였습니다.")
    } catch (error) {
      console.error(error)
      setIsRecording(false)
      alert(error?.message || "기록 실패")
    }
  }

  const endTracking = () => {
    try {
      const lastRoute = getCurrentPosition()
      if (navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId)
      }
      setIsRecording(false)
    } catch (error) {
      console.error(error)
      alert(error?.message || "다시 정지 버튼을 눌러주세요!")
    }
  }

  return {
    isRecording,
    positions,
    startTracking,
    endTracking,
  }
}

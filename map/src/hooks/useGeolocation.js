import { useState, useEffect } from "react"
import {
  getCurrentPosition,
  watchPosition,
  getGeoPermitStatus,
} from "../utils/location"

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
    try {
      const isPermitted = await getGeoPermitStatus()
      if (!isPermitted) throw new Error("위치 서비스 제공에 동의해 주세요.")

      //   CHECK: 처음 시작 위치 필요한지 체크
      //   const firstRoute = getCurrentPosition()
      //   console.log("firstRoute", firstRoute)

      setIsRecording(true)

      const watchID = watchPosition(handleUpdateRoutes)
      if (!watchID) throw new Error("기록에 실패하였습니다.")
      setWatchId(watchID)
    } catch (error) {
      console.error(error)
      setIsRecording(false)
      alert(error?.message || "기록 실패")
    }
  }

  const endTracking = () => {
    try {
      //   CHECK: 처음 시작 위치 필요한지 체크
      //   const lastRoute = getCurrentPosition()
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

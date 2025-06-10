import { useState, useEffect } from "react"
import {
  watchPosition,
  getGeoPermitStatus,
  requestGeoPermission,
} from "../utils/location"

// CHECK: 굳이 getCurrentPosition이 필요한가?
// watchPostion 과의 차이점은 정확도 보다 속도면에서 우월,

// 좌표 기록 용도
export default function useGeolocation() {
  const [isRecording, setIsRecording] = useState(false)
  const [watchId, setWatchId] = useState(null)
  const [positions, setPositions] = useState([])

  const handleUpdateRoutes = (coords) => {
    const position = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp: Date.now(),
    }

    setPositions((prev) => [...prev, position])
  }

  // 위치 추적 시작
  const startTracking = async () => {
    try {
      let isPermitted = await getGeoPermitStatus()
      if (!isPermitted) {
        console.log("위치 권한 요청")
        await requestGeoPermission()
        isPermitted = await getGeoPermitStatus()

        if (!isPermitted) {
          throw new Error(
            "위치 서비스 권한이 필요합니다. 브라우저 설정에서 위치 권한을 허용해 주세요."
          )
        }
      }

      const watchID = await watchPosition((position) => {
        if (!isRecording) {
          setIsRecording(true)
        }
        handleUpdateRoutes(position?.coords)
      })

      if (!watchID) throw new Error("기록에 실패하였습니다.")

      console.log("watchID", watchID)
      setWatchId(watchID)
      setIsRecording(true)
      // setPositions([]) // 새로운 추적 시작 시 이전 위치 초기화
    } catch (error) {
      console.error(error)
      setIsRecording(false)
      alert(error?.message || "기록 실패")
    }
  }

  const endTracking = () => {
    try {
      if (navigator.geolocation && watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
      setIsRecording(false)
      setWatchId(null)
      console.log("위치 추적 종료")

      sessionStorage.setItem("track", JSON.stringify(positions))
    } catch (error) {
      console.error(error)
      alert(error?.message || "다시 정지 버튼을 눌러주세요!")
    }
  }

  // 컴포넌트 언마운트 시 추적 정리
  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [watchId])

  useEffect(() => {
    console.log("positions", positions)
  }, [positions])

  return {
    isRecording,
    positions,
    startTracking,
    endTracking,
  }
}

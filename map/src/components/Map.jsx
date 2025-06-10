import { useState, useEffect, useMemo } from "react"
import styles from "./Map.module.css"
import useInitMap from "../hooks/useInitMap"
import useGeolocation from "../hooks/useGeolocation"
import useMapTracking from "../hooks/useMapTracking"

const MapComp = () => {
  const { mapRef, map } = useInitMap()
  const { isRecording, positions, startTracking, endTracking } =
    useGeolocation()
  const [testPositions, setTestPositions] = useState([])
  // 실제 positions와 테스트 positions 합치기
  const allPositions = useMemo(() => {
    return [...positions, ...testPositions]
  }, [positions, testPositions])

  const { totalDistance, clearMapData, fitBounds } = useMapTracking(
    map,
    allPositions
  )

  // 추적 시작 핸들러
  const handleStartTracking = () => {
    clearMapData() // 이전 추적 데이터 정리
    startTracking()
  }

  // 추적 종료 핸들러
  const handleEndTracking = () => {
    endTracking()
    // 기록 보존을 위해 지도 데이터는 유지
  }

  // 전체 경로 보기
  const handleFitBounds = () => {
    if (allPositions.length > 0) {
      fitBounds()
    }
  }

  const handleClearData = () => {
    clearMapData()
    window.location.reload()
  }

  // 테스트용 위치 추가 함수
  const addTestPosition = () => {
    const testCoords = [
      { latitude: 37.5665, longitude: 126.978 }, // 서울시청 (시작점)
      { latitude: 37.567, longitude: 126.9785 }, // 북동쪽으로 조금
      { latitude: 37.5675, longitude: 126.9795 }, // 더 동쪽으로
      { latitude: 37.568, longitude: 126.981 }, // 계속 동쪽으로 (곡선 시작)
      { latitude: 37.5682, longitude: 126.9825 }, // 조금 더 북쪽과 동쪽
      { latitude: 37.568, longitude: 126.984 }, // 살짝 남쪽으로 돌기 시작
      { latitude: 37.5675, longitude: 126.9855 }, // 남동쪽으로
      { latitude: 37.5668, longitude: 126.9865 }, // 더 남쪽으로
      { latitude: 37.566, longitude: 126.987 }, // 남서쪽으로 꺾임
      { latitude: 37.565, longitude: 126.9875 }, // 계속 남서쪽
      { latitude: 37.564, longitude: 126.9872 }, // 서쪽으로 돌기 시작
      { latitude: 37.5632, longitude: 126.9865 }, // 서쪽으로
      { latitude: 37.5628, longitude: 126.985 }, // 북서쪽으로 곡선
      { latitude: 37.563, longitude: 126.9835 }, // 북쪽으로
      { latitude: 37.5635, longitude: 126.982 }, // 북동쪽으로 돌아감
      { latitude: 37.5642, longitude: 126.981 }, // 원래 방향으로
      { latitude: 37.5648, longitude: 126.98 }, // 시작점 근처로
      { latitude: 37.5655, longitude: 126.979 }, // 거의 원점 근처
      { latitude: 37.566, longitude: 126.9785 }, // 시작점 근처 완료
    ]
    const nextIndex = testPositions.length % testCoords.length
    const newPosition = {
      ...testCoords[nextIndex],
      timestamp: Date.now(),
    }

    setTestPositions((prev) => [...prev, newPosition])
  }

  return (
    <article className={styles.MapCont}>
      <div
        className={styles.Map}
        id='map'
        ref={mapRef}
        style={{ width: "1143px", height: "594px" }}
      />

      <div className={styles.btns}>
        {!isRecording ? (
          <button type='button' onClick={handleStartTracking}>
            기록 시작
          </button>
        ) : (
          <button type='button' onClick={handleEndTracking}>
            기록 정지
          </button>
        )}
      </div>

      {allPositions.length > 0 && (
        <div className={styles.btns}>
          <button
            type='button'
            onClick={handleFitBounds}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            🗺️ 전체 경로 보기
          </button>

          <button
            type='button'
            onClick={handleClearData}
            style={{
              padding: "12px 24px",
              backgroundColor: "#64748b",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            🗑️ 지우기
          </button>
        </div>
      )}
      <button
        type='button'
        onClick={addTestPosition}
        style={{
          padding: "12px 24px",
          backgroundColor: "#f59e0b",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        🧪 테스트 위치 추가
      </button>

      {!!totalDistance && <p>{totalDistance?.toFixed(2)}km</p>}
    </article>
  )
}

export default MapComp

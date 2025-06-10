import { useState, useEffect } from "react"

const useMapTracking = (map, positions) => {
  const [startMarker, setStartMarker] = useState(null)
  const [endMarker, setEndMarker] = useState(null)
  const [polyline, setPolyline] = useState(null)

  // 거리 계산 함수
  const calculateDistance = (positions) => {
    if (positions.length < 2) return 0

    let totalDistance = 0

    for (let i = 1; i < positions.length; i++) {
      const prev = positions[i - 1]
      const curr = positions[i]

      // 하버사인 공식으로 거리 계산 (km)
      const R = 6371
      const dLat = ((curr.latitude - prev.latitude) * Math.PI) / 180
      const dLon = ((curr.longitude - prev.longitude) * Math.PI) / 180
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((prev.latitude * Math.PI) / 180) *
          Math.cos((curr.latitude * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c

      totalDistance += distance
    }

    return totalDistance
  }

  // 시작점 마커 생성
  const createStartMarker = (position) => {
    if (!map || !window.naver) return null
    try {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          position.latitude,
          position.longitude
        ),
        map: map,
        title: "시작점",
        icon: {
          content:
            '<div style="background: #ff0000; border: 2px solid #fff; border-radius: 50%; width: 12px; height: 12px;"></div>',
          anchor: new window.naver.maps.Point(6, 6),
        },
      })

      return marker
    } catch (error) {
      console.error("Error creating start marker:", error)
      return null
    }
  }

  const createEndMarker = (position) => {
    if (!map || !window.naver) return null
    try {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          position.latitude,
          position.longitude
        ),
        map: map,
        title: "종료점",
        icon: {
          content:
            '<div style="background: #007bff; border: 2px solid #fff; border-radius: 50%; width: 12px; height: 12px; z-index:99999"></div>',
          anchor: new window.naver.maps.Point(6, 6),
        },
      })

      return marker
    } catch (error) {
      console.error("Error creating end marker:", error)
      return null
    }
  }

  // 경로선 생성
  const createPolyline = (positions) => {
    if (!map || !window.naver || positions.length < 2) return null

    try {
      const path = positions.map(
        (pos) => new window.naver.maps.LatLng(pos.latitude, pos.longitude)
      )

      const polyline = new window.naver.maps.Polyline({
        map: map,
        path: path,
        strokeColor: "#3b82f6",
        strokeWeight: 4,
        strokeOpacity: 0.8,
        strokeLineCap: "round",
        strokeLineJoin: "round",
      })

      return polyline
    } catch (error) {
      console.error("Error creating polyline:", error)
      return null
    }
  }

  // positions 변경 시 지도 업데이트
  useEffect(() => {
    if (!map || !positions || positions.length === 0) return

    // 1. 시작점 마커 표시 (첫 번째 위치에만)
    if (positions.length === 1 && !startMarker) {
      console.log("Creating start marker at:", positions[0])
      const marker = createStartMarker(positions[0])

      if (marker) {
        setStartMarker(marker)
        console.log("Start marker created successfully")

        const startPosition = new window.naver.maps.LatLng(
          positions[0].latitude,
          positions[0].longitude
        )
        map.setCenter(startPosition)
        map.setZoom(16)
      } else {
        console.error("Failed to create start marker")
      }
    }

    // 2. 경로 그리기 (2개 이상의 위치가 있을 때)
    if (positions.length >= 2) {
      // 기존 polyline 제거
      if (polyline) {
        polyline.setMap(null)
      }

      // 새 polyline 생성
      const newPolyline = createPolyline(positions)
      if (newPolyline) {
        setPolyline(newPolyline)
        console.log("Polyline created successfully")
      } else {
        console.error("Failed to create polyline")
      }

      // 마지막 위치로 지도 중심 이동 (부드럽게)
      const lastPosition = positions[positions.length - 1]
      const newCenter = new window.naver.maps.LatLng(
        lastPosition.latitude,
        lastPosition.longitude
      )
      map.panTo(newCenter)

      // 종료점 마커 갱신
      if (endMarker) {
        endMarker.setMap(null)
      }
      const end = createEndMarker(positions[positions.length - 1])
      if (end) {
        setEndMarker(end)
        console.log("End marker updated successfully")
      } else {
        console.error("Failed to create end marker")
      }
    }
  }, [positions, map])

  // 지도 데이터 초기화
  const clearMapData = () => {
    if (startMarker) {
      startMarker.setMap(null)
      setStartMarker(null)
    }
    if (polyline) {
      polyline.setMap(null)
      setPolyline(null)
    }
    if (endMarker) {
      endMarker.setMap(null)
      setEndMarker(null)
    }
  }

  // 경로 전체 보기 (모든 좌표가 보이도록 지도 조정)
  const fitBounds = () => {
    if (!map || !positions || positions.length === 0) return

    if (positions.length === 1) {
      // 단일 점인 경우
      const position = new window.naver.maps.LatLng(
        positions[0].latitude,
        positions[0].longitude
      )
      map.setCenter(position)
      map.setZoom(16)
    } else {
      // 여러 점인 경우 bounds 계산
      const bounds = new window.naver.maps.LatLngBounds()
      positions.forEach((pos) => {
        bounds.extend(new window.naver.maps.LatLng(pos.latitude, pos.longitude))
      })
      map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 })
    }
  }

  return {
    totalDistance: calculateDistance(positions),
    clearMapData,
    fitBounds,
    startMarker,
    polyline,
  }
}

export default useMapTracking

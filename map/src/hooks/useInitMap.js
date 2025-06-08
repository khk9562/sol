import { useState, useEffect, useRef } from "react"

export default function useInitMap(initialLat, initialLng) {
  const mapRef = useRef(null)
  const { naver } = window

  // 지도의 초기 중심 좌표
  const location = new naver.maps.LatLng(
    initialLat || 37.5666103,
    initialLng || 126.9783882
  )

  const mapOptions = {
    center: location,
    logoControl: false, // 네이버 로고 표시 X
    mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
    scaleControl: true, // 지도 축척 컨트롤의 표시 여부
    tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
    zoom: 14, // 지도의 초기 줌 레벨
    zoomControl: true, // 줌 컨트롤 표시
    zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
  }
  useEffect(() => {
    const map = new naver.maps.Map(mapRef.current, mapOptions)
    // const marker = new naver.maps.Marker({
    //   position: location,
    //   map: map,
    // })
    console.log("map", map)
  }, [])

  return {
    mapRef,
  }
}

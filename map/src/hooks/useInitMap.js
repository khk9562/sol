import { useState, useEffect, useRef } from "react"

export default function useInitMap(initialLat, initialLng) {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (!window.naver || !mapRef.current) return

    const { naver } = window

    const location = new naver.maps.LatLng(
      initialLat || 37.5666103,
      initialLng || 126.9783882
    )

    const mapOptions = {
      center: location,
      logoControl: false,
      mapDataControl: false,
      scaleControl: true,
      tileDuration: 200,
      zoom: 14,
      zoomControl: true,
      zoomControlOptions: { position: 9 },
    }

    const mapInstance = new naver.maps.Map(mapRef.current, mapOptions)
    setMap(mapInstance)

    console.log("Map initialized:", mapInstance)
  }, [initialLat, initialLng])

  return {
    mapRef,
    map,
  }
}

import { useEffect } from "react"
import { requestPermissions } from "../utils/requestPermission"
import { getCurrentLocation } from "../utils/getCurrentLocation"
import { getWeatherData } from "../utils/getWeather"
import { initializeFnProps } from "../types"

export default function useIntializedApp({
  checkPermission,
  loadPhotos,
}: initializeFnProps) {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const isPermitted = await requestPermissions()
        checkPermission(isPermitted)

        loadPhotos()

        // 위치 정보 가져오기
        const locationData = await getCurrentLocation()
        if (locationData?.coords) {
          await getWeatherData(
            locationData.coords.latitude,
            locationData.coords.longitude
          )
        }
      } catch (error) {
        console.error(error)
      }
    }
    initializeApp()
  }, [])
}

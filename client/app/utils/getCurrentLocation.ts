import * as Location from "expo-location"

export const getCurrentLocation =
  async (): Promise<Location.LocationObject | null> => {
    try {
      const locationResult = await Location.getCurrentPositionAsync({})
      return locationResult
    } catch (error) {
      console.log("위치 정보를 가져올 수 없습니다:", error)
      return null // 에러 시 null 반환
    }
  }

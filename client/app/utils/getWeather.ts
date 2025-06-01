import { WeatherData } from "../types"

export const getWeatherData = async (
  lat: number,
  lon: number
): Promise<WeatherData | null> => {
  try {
    // 실제 날씨 API 호출 대신 더미 데이터 사용
    const mockWeather: WeatherData = {
      current: 22,
      min: 18,
      max: 26,
      condition: "맑음",
      icon: "sunny",
    }
    return mockWeather
  } catch (error) {
    console.log("날씨 정보를 가져올 수 없습니다:", error)
    return null
  }
}

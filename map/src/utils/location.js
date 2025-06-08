export const getCurrentPosition = () => {
  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  const onSuccess = (pos) => {
    const crd = pos.coords

    return {
      lat: crd.latitude,
      long: crd.longitude,
      accuracy: crd.accuracy,
    }
  }

  const onError = (err) => {
    console.error("좌표 가져오기 실패", err)
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, [options])
  }
}

export const watchPosition = (onUpdate) => {
  const id = navigator.geolocation.watchPosition(
    (pos) => {
      const latlng = new naver.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
      )

      onUpdate && onUpdate(latlng)

      //   return latlng
    },
    (err) => console.error("위치 추적 에러", err),
    { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
  )
  return id
}

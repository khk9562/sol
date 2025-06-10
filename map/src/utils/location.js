export const watchPosition = (callback) => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"))
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log("위치 성공:", position.coords)
        callback(position)
      },
      (error) => {
        console.error("위치 추적 에러:", error)
        // 에러가 있어도 계속 시도 (에러를 무시)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      }
    )

    resolve(watchId)
  })
}
// export const watchPosition = (successCallback) => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error("브라우저가 위치 서비스를 지원하지 않습니다."))
//       return
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         successCallback(position) // 위치 업데이트 콜백 실행
//         resolve(watchId) // 첫 번째 성공 시 watchId 반환
//       },
//       (error) => {
//         console.error("위치 추적 에러", error)
//         switch (error.code) {
//           case 2: // POSITION_UNAVAILABLE
//             reject(
//               new Error(
//                 "위치 정보를 사용할 수 없습니다. WiFi나 모바일 데이터 연결을 확인해주세요."
//               )
//             )
//             break
//           default:
//             reject(new Error("위치 추적 중 오류가 발생했습니다."))
//         }
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 1000,
//       }
//     )
//   })
// }

export const getGeoPermitStatus = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(false)
      return
    }

    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        resolve(result.state === "granted")
      })
    } else {
      // 권한 API가 없는 경우, 일단 true로 가정하고 실제 요청에서 처리
      resolve(true)
    }
  })
}

// export const requestGeoPermission = async () => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error("이 브라우저는 위치 서비스를 지원하지 않습니다."))
//       return
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         console.log("위치 권한 승인됨:", position)
//         resolve(true)
//       },
//       (error) => {
//         console.error("위치 권한 거부 또는 오류:", error)
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             reject(
//               new Error(
//                 "위치 서비스 사용을 거부하셨습니다. 브라우저 설정에서 위치 권한을 허용해 주세요."
//               )
//             )
//             break
//           case error.POSITION_UNAVAILABLE:
//             reject(new Error("위치 정보를 사용할 수 없습니다."))
//             break
//           case error.TIMEOUT:
//             reject(new Error("위치 정보 요청 시간이 초과되었습니다."))
//             break
//           default:
//             reject(new Error("위치 정보를 가져오는데 실패했습니다."))
//         }
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 1000,
//       }
//     )
//   })
// }

export const requestGeoPermission = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      () => resolve(true),
      () => reject(new Error("Permission denied")),
      { timeout: 5000 }
    )
  })
}

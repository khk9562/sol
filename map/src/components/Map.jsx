import { useState, useEffect } from "react"
import styles from "./Map.module.css"
import useInitMap from "../hooks/useInitMap"
import useGeolocation from "../hooks/useGeolocation"

const MapComp = () => {
  const { mapRef } = useInitMap()
  const { isRecording, positions, startTracking, endTracking } =
    useGeolocation()

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
          <button type='button' onClick={startTracking}>
            기록
          </button>
        ) : (
          <button type='button' onClick={endTracking}>
            정지
          </button>
        )}
      </div>
    </article>
  )
}

export default MapComp

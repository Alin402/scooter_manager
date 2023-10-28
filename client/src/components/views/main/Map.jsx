import React, { useEffect } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { mapConfig } from "./mapConfig";
import { useSelector } from "react-redux";

const containerStyle = {
  width: '100%',
  height: '90%'
};

const center = {
  ...mapConfig.CITY_COORDS
};

function MyComponent({ newStationCoords, 
  setNewStationCoords, 
  inAddNewStationMode, 
  setOpenAddStationModal,
  selectedStation,
  setSelectedStation
}) {

  const station = useSelector(state => state.station);
  useEffect(() => {
    console.log(station.stations);
  }, [])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapConfig.API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(13)
  }, [])

  useEffect(() => {
    console.log(center)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const getClickedCoords = (e) => {
    if (inAddNewStationMode) {
      setNewStationCoords({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      })
      setOpenAddStationModal(true);
    }
  }

  const handleMarkerClick = (station) => {
    setSelectedStation(station);
  }

  return isLoaded ? (
      <GoogleMap
        map={map}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => getClickedCoords(e)}
      >
        {
          station.stations.length && station.stations.map((station, index) => {
            return (
              <MarkerF 
                key={index}
                position={station.coords}
                label={station.name}
                onClick={() => handleMarkerClick(station)}
              />
            )
          })
        }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
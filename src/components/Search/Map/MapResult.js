import { observer, inject } from 'mobx-react'
import { useCallback, useEffect, useState, } from 'react'

import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { Typography } from '@material-ui/core';
import MapInfoCard from './MapInfoCard';



const MapResult = inject('UserStore', 'SearchStore', 'GeneralStore')(observer((props) =>  {
  
  const {trade} = props

  const [infoWindow, setInfoWindow] = useState(null)



  return (
    <div>
      <Marker onClick={(marker) => {
        !infoWindow ? 
        setInfoWindow({
          lat: marker.latLng.lat(),
          lng: marker.latLng.lng()
        }) :
        setInfoWindow(null)
        }}
        position={{
        lat: trade.user_id.location.lat,
        lng: trade.user_id.location.lng,
      }} >
      {infoWindow && 
      <InfoWindow onCloseClick={() => setInfoWindow(null)} position={{lat: infoWindow.lat, lng: infoWindow.lng}}>
        <MapInfoCard trade={trade} />
      </InfoWindow>}
      </Marker>
    </div>
)
}))

export default MapResult
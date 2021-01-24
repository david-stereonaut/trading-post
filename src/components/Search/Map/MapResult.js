import { observer, inject } from 'mobx-react'
import { useCallback, useEffect, useState, } from 'react'

import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { Typography } from '@material-ui/core';
import MapTradeInfoCard from './MapTradeInfoCard';
import MapUserInfoCard from './MapUserInfoCard';



const MapResult = inject('UserStore', 'SearchStore', 'GeneralStore')(observer((props) =>  {
  
  const {data, SearchStore} = props

  const [infoWindow, setInfoWindow] = useState(null)

  const [position, setPosition] = useState({
    lat: SearchStore.searchFor === 'trades' ? data.user_id.location.lat+(Math.random()*0.0005) : data.location.lat,
    lng: SearchStore.searchFor === 'trades' ? data.user_id.location.lng+(Math.random()*0.0005) : data.location.lng,
  })


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
        position={position} >
      {infoWindow && 
      <InfoWindow onCloseClick={() => setInfoWindow(null)} position={{lat: infoWindow.lat, lng: infoWindow.lng}}>
        {SearchStore.searchFor === 'trades' ? <MapTradeInfoCard trade={data} /> : <MapUserInfoCard user={data} /> }
      </InfoWindow>}
      </Marker>
    </div>
)
}))

export default MapResult
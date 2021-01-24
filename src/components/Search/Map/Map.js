import { observer, inject } from 'mobx-react'
import { useCallback, useEffect, useState, } from 'react'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MapResult from './MapResult';

const containerStyle = {
  float: 'right',
  width: '33vw',
  height: '90vh'
};


const Map = inject('UserStore', 'SearchStore', 'GeneralStore', 'MapStore')(observer((props) =>  {
  
  const { UserStore, SearchStore, GeneralStore, MapStore } = props
  
  const center = {
    lat: UserStore.user.firstName ? UserStore.user.location.lat : 0,
    lng: UserStore.user.firstName ? UserStore.user.location.lng : 0,
  };
  

  return (
  <LoadScript
  googleMapsApiKey="AIzaSyBZbfnMyK4xaIDNevsXwulDnxC9nhZ0rS0"
>
  <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={14}
    clickableIcons={false}
  >
    {SearchStore.tradesResults.map(trade => <MapResult trade={trade} />)}
  </GoogleMap>
</LoadScript>
)
}))

export default Map
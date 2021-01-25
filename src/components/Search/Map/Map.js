import { observer, inject } from 'mobx-react'
import { useCallback, useEffect, useState, } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MapResult from './MapResult';
import { Slide } from '@material-ui/core';

const containerStyle = {
  height: '87vh',
  width: 'calc(100% - 800px)',
};


const Map = inject('UserStore', 'SearchStore', 'GeneralStore', 'MapStore')(observer((props) => {

  const { UserStore, SearchStore, GeneralStore, MapStore, showMap } = props

  const center = {
    lat: UserStore.user.firstName ? UserStore.user.location.lat : 0,
    lng: UserStore.user.firstName ? UserStore.user.location.lng : 0,
  };


  return (
    <LoadScript
      googleMapsApiKey= "AIzaSyBZbfnMyK4xaIDNevsXwulDnxC9nhZ0rS0"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        clickableIcons={false}
      >
        {SearchStore.results.length > 0 && SearchStore.results[0].thumbnail && SearchStore.searchFor === 'trades' && SearchStore.results.map(data => <MapResult data={data} />)}
        {SearchStore.results.length > 0 && SearchStore.results[0].firstName && SearchStore.searchFor === 'people' && SearchStore.results.map(data => <MapResult data={data} />)}
      </GoogleMap>
    </LoadScript>
  )
}))

export default Map
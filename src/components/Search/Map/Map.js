import { observer, inject } from 'mobx-react'
import { useCallback, useEffect, useState, } from 'react'
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import MapResult from './MapResult';
import { Slide } from '@material-ui/core';

const containerStyle = {
  height: '87vh',
  width: 'calc(100% - 800px)',
};


const Map = inject('UserStore', 'SearchStore', 'GeneralStore', 'MapStore')(observer((props) => {

  const { UserStore, SearchStore, GeneralStore, MapStore, showMap } = props

  const [center, setCenter] = useState({
    lat: UserStore.user.firstName ? UserStore.user.location.lat : 32.064,
    lng: UserStore.user.firstName ? UserStore.user.location.lng : 34.764,
  })
  const [autocomplete, setAutocomplete] = useState(null)
  const [zoom, setZoom] = useState(5)

  const onLoad = (autocomplete) => {

    setAutocomplete(autocomplete)
  }

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      let place = autocomplete.getPlace()
      if (place.address_components) {
        let chosenLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
        setCenter(chosenLocation)
        setZoom(10)
      }
    }
  }


  return (
    <LoadScript
      googleMapsApiKey= "AIzaSyBZbfnMyK4xaIDNevsXwulDnxC9nhZ0rS0"
      language='en'
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        clickableIcons={false}
      >
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Look for a place"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
        </Autocomplete>
        {SearchStore.results.length > 0 && SearchStore.results[0].thumbnail && SearchStore.searchFor === 'trades' && SearchStore.results.map(data => <MapResult data={data} />)}
        {SearchStore.results.length > 0 && SearchStore.results[0].firstName && SearchStore.searchFor === 'people' && SearchStore.results.map(data => <MapResult data={data} />)}
      </GoogleMap>
    </LoadScript>
  )
}))

export default Map
import { observer, inject } from 'mobx-react'
import {  useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { Button, Dialog, DialogContent, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import MapIcon from '@material-ui/icons/Map';
import { Autocomplete, GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            marginTop: 10
        },
        
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          margin: 10,
          minWidth: 150,
          '& > *': {
            margin: 10,
            minWidth: 150
          },
        },
        width: '50%'
    },
    mapDialog: {
    }
}))

const Register = inject('GeneralStore', 'UserStore', 'MessagesStore')(observer((props) => {

    const [inputs, setInputs] = useState({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    })
    const [zoom, setZoom] = useState(5)
    const [city, setCity] = useState(null)
    const [country, setCountry] = useState(null)
    const [location, setLocation] = useState(null)
    const [mapCenter, setMapCenter] = useState({lat:32.064,lng:34.764})
    const [openMap, setOpenMap] = useState(false)
    const [autocomplete, setAutocomplete] = useState(null)
    const [error, setError] = useState('')
    let { GeneralStore, UserStore, MessagesStore } = props

    const history = useHistory()

    const classes = useStyles()

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
          setLocation(chosenLocation)
          setMapCenter(chosenLocation)
          setZoom(10)
          let newCity = null
          let newCountry = null
          place.address_components.forEach(ac => {
            
            if (ac.types.some(t => t === 'administrative_area_level_1')) {
              newCity = ac.long_name
            }
            if (ac.types.some(t => t === 'country')) {
              newCountry = ac.long_name
            }
          })
          if (!newCity) {
            place.address_components.forEach(ac => {
            
              if (ac.types.some(t => t === 'locality')) {
                newCity = ac.long_name
              }
              
            })
          }
          setCity(newCity)
          setCountry(newCountry)
        }
      } else {
        console.log('Autocomplete is not loaded yet!')
      }
    }

    const containerStyle = {
      height: 500,
      width: 500
    }

    const createMarker = async (e) => {
      let chosenLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      setLocation(chosenLocation)
      // setMapCenter(chosenLocation)
      let results = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&latlng=${chosenLocation.lat},${chosenLocation.lng}&key=AIzaSyBZbfnMyK4xaIDNevsXwulDnxC9nhZ0rS0&language=en`)
      let newCity = null
      let newCountry = null
      let address = results.data.results[0]
      address.address_components.forEach(ac => {
            
        if (ac.types.some(t => t === 'locality')) {
          newCity = ac.long_name
        }
        if (ac.types.some(t => t === 'country')) {
          newCountry = ac.long_name
        }
      })
      if (!newCity) {
        address.address_components.forEach(ac => {
        
          if (ac.types.some(t => t === 'administrative_area_level_1')) {
            newCity = ac.long_name
          }
          
        })
      }
      setCity(newCity)
      setCountry(newCountry)
    }

    const register = async () => {
      if (inputs.password !== inputs.confirmPassword) {
        setError('Passwords must match!')
        return
      }
      if (!inputs.email || !inputs.firstName || !inputs.lastName || !inputs.password) {
        setError('You must fill in all fields!')
        return
      }
      let newUser = {
        email: inputs.email,
        password: inputs.password,
        profilePic: {
          imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
          imageId: 'none'
        },
        description: '',
        images: [],
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        location: location ? { country, city, lat: location.lat, lng: location.lng } : null,
        offeringTags: [],
        seekingTags: [],
        tradeCards: [],
        conversations: [],
        content: [],
        reviews: []
      }
      console.log(newUser)
      const verify = await UserStore.registerUser(newUser)
        if (verify ==="ok"){
            await UserStore.fetchUser()
            MessagesStore.setUserId(UserStore.user._id)
            history.push('/search')
        } else {
            setInputs({
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              confirmPassword: ''
            })
            setError(verify)
        }
    }

    const handleInputs = ({ target }) => {
      const name = target.name
      const value = target.value
      setInputs({...inputs, [name]: value})
    }

    return (
      <div className={classes.container}>
            <Typography variant='h6'>Register a new account</Typography>
            <Paper className={classes.form}>
              <div>
                <TextField onChange={handleInputs} label="First name" name="firstName" value={inputs.firstName}  />
                <TextField onChange={handleInputs} label="Last name" name="lastName" value={inputs.lastName}  />
                <TextField onChange={handleInputs} label="Email" name="email" value={inputs.email}  />
              </div>
              <div>
                <TextField onChange={handleInputs} type='password' label="Password" value={inputs.password} name="password"  />
                <TextField onChange={handleInputs} type='password' label="Confirm password" value={inputs.confirmPassword} name="confirmPassword"  />
              </div>
            </Paper>
              <Typography variant='subtitle' style={{width: '30%'}}>Last stage - if you want us to show your trades on the map when people will search for trades, please press on the map icon and double click to place a marker on the desired place (You dont have to choose your house, just somewhere close enough to give people a general idea)</Typography>
              <IconButton onClick={() => setOpenMap(!openMap)}><MapIcon /></IconButton>
              {openMap && <LoadScript
                  googleMapsApiKey= "AIzaSyBZbfnMyK4xaIDNevsXwulDnxC9nhZ0rS0"
                  libraries={["places"]}
                  language="en"
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={zoom}
                    clickableIcons={false}
                    options={{ gestureHandling: "greedy" }}
                    onDblClick={createMarker}
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
                  {location && <Marker position={location} />}
                  </GoogleMap>
                </LoadScript>}
              <Button style={{flexGrow: 0}} onClick={register} >Register</Button>
              {error && <Typography style={{color: 'red'}}>{error}</Typography>}
        </div>
    )
}))

export default Register
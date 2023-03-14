import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '800px'
};

const center = {
  lat: 39.9526,
  lng: -75.1652
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDYtBn9FOgfklur2ZwTPVkNPJ5j7mudC-E"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(async function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
	await fetch(`http://127.0.0.1:8080/https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shop&location=${center.lat},${center.lng}&radius=1000&region=us&type=hotel&key=AIzaSyDYtBn9FOgfklur2ZwTPVkNPJ5j7mudC-E`,{ headers: {
		'Access-Control-Allow-Origin': 'http://localhost:3000',
		'Access-Control-Allow-Credentials': 'true'
	} })
	.then( response => response.json())
	.then( data => console.log(data))
	.catch(error => console.log(error))
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}


export default MyComponent
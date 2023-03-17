import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '800px'
};

const center = {
  lat: 39.9526,
  lng: -75.1652
};

interface selectedHotel  {
  name: string,
  address: string,
  photo: string
}

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDYtBn9FOgfklur2ZwTPVkNPJ5j7mudC-E"
  })

  const [map, setMap] = React.useState(null)
  const [Hotels, setHotels] = React.useState<any[]>([])
  const [SelectedHotel, setSelectedHotel] = React.useState<selectedHotel | undefined>(undefined)
  

  const onLoad = React.useCallback(async function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
	await fetch(`https://greekgram.christianpedro.dev/https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels&location=${center.lat},${center.lng}&radius=1000&region=us&type=hotel&key=AIzaSyDYtBn9FOgfklur2ZwTPVkNPJ5j7mudC-E`,{ headers: {
		'Access-Control-Allow-Origin': 'http://localhost:3000',
		'Access-Control-Allow-Credentials': 'true'
	} })
	.then( response => response.json())
	.then( data => {
		console.log(data.results)
		let returnedArray: any[] = data.results
		Hotels.push(returnedArray)
		// setHotels(returnedArray)
		console.log(Hotels)
		console.log('^^')
	})
	.catch(error => console.log('error present'))
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  const displayHotelInfo = (address: string, name: string, photo: string): void => {
    console.log('clicked on marker')
    setSelectedHotel({name: name, address: address, photo: photo})
    console.log(SelectedHotel)
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        { Hotels[0] !== undefined ? 
          Hotels[0].map( (hotel: any) => {
            return (
              <Marker
              key={hotel.place_id}
                position={hotel.geometry.location}
                onLoad={onLoad}
                visible={true}
                onClick={() => {displayHotelInfo(hotel.formatted_address, hotel.name, hotel.photos[0].photo_reference)}}
                />
              )

          }) : null
        }
        <div id="hotelInfo">
          <h1>{ SelectedHotel !== undefined ? SelectedHotel.name : ""}</h1>
          <h3>{ SelectedHotel !== undefined ? SelectedHotel.address : ""}</h3>
          <img src={SelectedHotel !== undefined ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${SelectedHotel.photo}&key=AIzaSyDYtBn9FOgfklur2ZwTPVkNPJ5j7mudC-E` : ""}></img>

        </div>
        <></>
      </GoogleMap>
  ) : <></>
}


export default MyComponent
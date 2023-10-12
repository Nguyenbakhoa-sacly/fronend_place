
// const API_KEY = 'pk.bc948954b5801f7b8a0d24af16813ed4'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './Map.scss'

const PlacesMap = (props) => {
  const { coordinates } = props
  const position = [coordinates.lat, coordinates.lng];
  return (
    <>
      <div className='placesmap'>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}></Marker>
        </MapContainer>
      </div>
    </>

  )
}
export default PlacesMap
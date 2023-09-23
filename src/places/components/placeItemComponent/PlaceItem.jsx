import React, { useState } from 'react'
import { Button, Card, Modal, Map } from '../../../shared'
import './PlaceItem.scss'
const PlaceItem = (props) => {
  const { key, id, title, image, description, address, creatorId, coordinates } = props

  const [showMap, setShowMap] = useState(false)

  const handleShowMap = () => {
    setShowMap(true)
  }
  const handleHideMap = () => {
    setShowMap(false)

  }
  return (
    <>
      <Modal
        show={showMap}
        onCancel={handleHideMap}
        header={address}
        footer={<Button onClick={handleHideMap}>CLOSE</Button>}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
      >
        <div className='map-container'>

          <Map address={address} />
          {/* <iframe title="map" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
            src={'https://maps.google.com/maps?q=' + props.coordinates.lat.toString() + ',' + props.coordinates.lng.toString() + '&t=&z=15&ie=UTF8&iwloc=&output=embed'}>
          </iframe>
          <script
            type='text/javascript'
            src='https://embedmaps.com/google-maps-authorization/script.js?id=5a33be79e53caf0a07dfec499abf84b7b481f165'>
          </script> */}
        </div>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={image} alt={title} />
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>

            <Button
              onClick={handleShowMap}
              inverse
            >VIEW ON MAP</Button>
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  )
}

export default PlaceItem

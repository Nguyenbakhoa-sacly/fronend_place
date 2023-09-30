import React, { useState, useContext } from 'react'
import { Button, Card, Modal, Map } from '../../../shared'
import { AuthContext } from '../../../shared/context/auth-context'
import './PlaceItem.scss'
const PlaceItem = (props) => {
  const auth = useContext(AuthContext)
  const { key, id, title, image, description, address, creatorId, coordinates } = props

  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const handleShowMap = () => {
    setShowMap(true)
  }
  const handleHideMap = () => {
    setShowMap(false)
  }
  const handleDelete = () => {
    alert(`Are you sure you want to delete`)
    setShowConfirmModal(false);
  }
  return (
    <>
      {/* modal view map */}
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
        </div>
      </Modal>
      {/* modal delete */}
      <Modal
        show={showConfirmModal}
        // onCancel={() => setShowConfirmModal(false)}
        header='Are tou sure'
        footerClass='place-item__modal-actions'
        footer={
          <>
            <Button
              inverse
              onClick={() => setShowConfirmModal(false)}
            >CANCEL</Button>
            <Button
              danger
              onClick={handleDelete}
            >DELETE</Button>
          </>
        }
      >
        <p>Do you want to peoceed and delete this place ?
          Please note that it can't be undone thereafter.
        </p >
      </Modal >

      {/* modal*/}

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
            {
              auth.isLoggedIn && (
                <>
                  <Button to={`/places/${id}`}>EDIT</Button>
                  <Button onClick={() => setShowConfirmModal(true)} danger>DELETE</Button>
                </>
              )
            }
          </div>
        </Card>
      </li>
    </>
  )
}

export default PlaceItem

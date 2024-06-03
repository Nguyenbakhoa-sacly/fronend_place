import React, { useState, useContext } from 'react'
import { Button, Card, Modal, PlacesMap, ErrorModal, LoadingSpinner } from '../../../shared'
import { AuthContext } from '../../../shared/context/auth-context'
import { useHttpClient } from '../../../shared/hooks/http-hook'

import './PlaceItem.scss'
const PlaceItem = (props) => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { id, title, image, description, address, creatorId, coordinates } = props
  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const handleShowMap = () => {
    setShowMap(true)
  }
  const handleHideMap = () => {
    setShowMap(false)
  }
  const handleDelete = async () => {
    setShowConfirmModal(false);

    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/places/${id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      props.onDelete(id);
    } catch (e) { }
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
          <PlacesMap coordinates={coordinates} />
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
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-item__image'>
            <img src={`${import.meta.env.VITE_BACKEND_ASSET_URL}/${image}`} alt={title} />
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            <Button
              onClick={handleShowMap}

            >VIEW ON MAP</Button>
            {
              auth.userId === creatorId && (
                <>
                  <Button to={`/places/${id}`}>EDIT</Button>
                  <Button onClick={() => setShowConfirmModal(true)}>DELETE</Button>
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

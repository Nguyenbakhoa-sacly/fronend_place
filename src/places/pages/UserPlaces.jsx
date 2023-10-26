import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceList from '../components/placeListComponent/PlaceList'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { ErrorModal, LoadingSpinner } from '../../shared'
const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const id = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData =
          await sendRequest(
            `${import.meta.env.VITE_BACKEND_URL}/places/user/${id}`, 'GET')
        setLoadedPlaces(responseData.places);
      } catch (e) {

      }
    }
    fetchPlaces();

  }, [sendRequest, id])

  const placeDeleteHandler = (deletePlaceId) => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletePlaceId));
  }

  return (
    <>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces &&
        <PlaceList
          items={loadedPlaces}
          onDeletePlace={placeDeleteHandler}
        />
      }
    </>
  )
}

export default UserPlaces

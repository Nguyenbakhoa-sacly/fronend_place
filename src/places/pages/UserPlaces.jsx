import React from 'react'
import { useParams } from 'react-router-dom'
import PlaceList from '../components/placeListComponent/PlaceList'
const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire... State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://vuonlan.com.vn/wp-content/uploads/2023/06/50-ten-cac-loai-hoa-dep-y-nghia-nhat-the-gioi-982.jpg',
    address: '20 W 30th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creatorId: 'a1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://hoatuoihoamy.com/wp-content/uploads/2021/05/IMG_9880-1.jpg',
    address: '20 W 30th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creatorId: 'a2'

  },

]

const UserPlaces = () => {
  const id = useParams().userId;
  console.log(id);
  const loadedPlaces = DUMMY_PLACES.filter(
    pl => pl.creatorId === id)
  return (
    <>
      <PlaceList
        items={loadedPlaces}
      />
    </>
  )
}

export default UserPlaces

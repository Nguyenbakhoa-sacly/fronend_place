

import React from 'react'
import { Card, Button } from '../../../shared'
import PlaceItem from '../placeItemComponent/PlaceItem'
import './PlaceList.scss'


const PlaceList = (props) => {
  return (
    <>
      {
        props.items.length === 0 ?
          (<div className='place-list center'>
            <Card >
              <h2>No places found. Maybe create on?</h2>
              <Button to='/places/new'>Share Place</Button>
            </Card>
          </div>)
          :
          (
            <>
              <ul className='place-list'>
                {props.items.map((item) => (
                  <PlaceItem
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    address={item.address}
                    creatorId={item.creatorId}
                    coordinates={item.location}
                    onDelete={props.onDeletePlace}
                  />
                ))}
              </ul>
            </>
          )
      }
    </>
  )
}

export default PlaceList

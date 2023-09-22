import React from 'react'
import './UsersList.scss'
import { UsersItem } from '../../index'
import { Card } from '../../../shared'
const UsersList = (props) => {
  return (
    <>
      {
        props.items.length === 0 ?
          (
            <div className='center'>
              <Card>
                <h2>No users found</h2>
              </Card>
            </div>
          )
          : (
            <>
              <ul className='users-list'>
                {props.items.map(item => (
                  <UsersItem
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    placeCount={item.places}
                  />
                ))}
              </ul>
            </>
          )
      }
    </>
  )
}

export default UsersList

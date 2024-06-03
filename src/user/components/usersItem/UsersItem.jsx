import React from 'react'
import { Link } from 'react-router-dom'
import './UsersItem.scss'
import { Card, Avatar } from '../../../shared'

const UsersItem = (props) => {
  const { key, id, image, name, placeCount } = props
  return (
    <>
      <li className='user-item' key={key}>
        <Card className='user-item__content'>
          <Link to={`/${id}/places`}>
            <div className="user-item__image">
              <Avatar image={`http://127.0.0.1:3000/${image}`} alt={name} />
            </div>
            <div className="user-item__info">
              <h2>{name}</h2>
              <h3>
                {placeCount.length}
                {placeCount.length === (0 || 1) ? " Place " : " Places "}
              </h3>
            </div>
          </Link>
        </Card>
      </li>
    </>
  )
}

export default UsersItem

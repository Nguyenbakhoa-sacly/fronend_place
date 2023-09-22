
import React from 'react'
import { UsersList } from '../index'
const Users = () => {
  const USERS = [
    {
      id: "a1",
      name: "ba khoa",
      image: "https://file.hstatic.net/200000427529/article/y-nghia-hoa-cuc-hoa-mi_8a0b4007caf240f4a6f32d45e6a414d7.jpg",
      places: 3
    },
    {
      id: "a2",
      name: "ba khoa",
      image: "https://file.hstatic.net/200000427529/article/y-nghia-hoa-cuc-hoa-mi_8a0b4007caf240f4a6f32d45e6a414d7.jpg",
      places: 3
    },

  ]
  return (
    <>
      <UsersList items={USERS} />
    </>
  )
}

export default Users

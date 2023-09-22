import React from 'react'
import './NavLink.scss'
import { NavLink } from 'react-router-dom'

const NavLinkComponent = (props) => {
  return (
    <>
      <ul className='nav-links'>
        <li>
          <NavLink to='/'> ALL USERS </NavLink>
        </li>
        <li>
          <NavLink to='/a1/places'> MY PLACES  </NavLink>
        </li>
        <li>
          <NavLink to='/places/new'> ADD PLACES  </NavLink>
        </li>
        <li>
          <NavLink to='/auth'> AUTHENTICATE  </NavLink>
        </li>
      </ul>
    </>
  )
}

export default NavLinkComponent

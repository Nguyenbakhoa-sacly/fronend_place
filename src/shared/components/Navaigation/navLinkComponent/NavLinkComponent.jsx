import React, { useContext } from 'react'
import './NavLink.scss'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../context/auth-context'
import { Button } from '../../../../shared'
const NavLinkComponent = (props) => {

  const auth = useContext(AuthContext)
  return (
    <>
      <ul className='nav-links'>
        <li>
          <NavLink to='/'> ALL USERS </NavLink>
        </li>
        {auth.isLoggedIn &&
          (
            <>
              <li>
                <NavLink to={`/${auth.userId}/places`}> MY PLACES  </NavLink>
              </li>
              <li>
                <NavLink to='/places/new'> ADD PLACES  </NavLink>
              </li>
            </>
          )
        }
        {!auth.isLoggedIn &&
          (
            <li>
              <NavLink to='/auth'> AUTHENTICATE  </NavLink>
            </li>
          )
        }
        {auth.isLoggedIn &&
          (
            <li>
              <Button
                danger
                onClick={auth.logout}
              >
                LOGOUT
              </Button>
            </li>
          )
        }
      </ul>
    </>
  )
}

export default NavLinkComponent

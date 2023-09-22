import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MainNavaigation.scss'
import MainHeader from '../headerComponent/MainHeader'
import NavLinkComponent from '../navLinkComponent/NavLinkComponent'
import SideDrawer from '../sideDrawerComponent/SideDrawer'
import BackDrop from '../../UIElements/backDropComponent/BackDrop'
const MainNavaigation = () => {
  const [hideShow, setHideShow] = useState(false)
  const handleShow = () => {
    setHideShow(true)
  }
  const handleHide = () => {
    setHideShow(false)
  }
  return (
    <>
      {hideShow && <BackDrop onClick={handleHide} />}
      <SideDrawer show={hideShow} onClick={handleHide}>
        <nav
          className='main-navigation__drawer-nav'>
          <NavLinkComponent />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          onClick={handleShow}
          className='main-navigation__menu-btn'>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className='main-navigation__title'>
          <Link to='/'>
            YourPlaces
          </Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinkComponent />
        </nav>
      </MainHeader>
    </>
  )
}

export default MainNavaigation

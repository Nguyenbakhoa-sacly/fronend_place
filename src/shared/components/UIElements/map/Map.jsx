
import React from 'react'
import './Map.scss'

const Map = (props) => {
  const { address } = props
  console.log(address)
  return (
    <>
      <iframe width="100%" height="270" id="gmap_canvas" src="https://maps.google.com/maps?q=Thon%207,%20xa%20quynh%20vinh,%20hoang%20mai,%20nghe%20an&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
      </iframe>
    </>
  )
}

export default Map

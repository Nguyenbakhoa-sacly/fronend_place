import React from 'react'
import './LoadingSpinner.scss';
const loadingSpinner = (props) => {
  return (
    <>
      <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
        <div className="lds-dual-ring"></div>
      </div>
    </>
  )
}

export default loadingSpinner

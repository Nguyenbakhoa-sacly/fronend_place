import React from 'react'
import ReactDOM from 'react-dom';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './SideDrawer.scss'
const SideDrawer = (props) => {
  const nodeRef = useRef(null);
  const content =
    <CSSTransition
      nodeRef={nodeRef}
      in={props.show}
      timeout={200}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <aside
        onClick={props.onClick}
        ref={nodeRef}
        className='side-drawer'>{props.children}</aside>
    </CSSTransition>
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))

}

export default SideDrawer

import React from 'react'
import { connect } from 'react-redux'
import { toggleNavbar } from '../actions/toggle_navbar'

const MenuIcon = (props) => {
    return (
    <div className='menu-icon-background' onClick={props.toggleNavbar}>
        <div className='menu-icon-bar'></div>
        <div className='menu-icon-bar'></div>
        <div className='menu-icon-bar'></div>
    </div>
    )
}

export default connect(null, { toggleNavbar })(MenuIcon)
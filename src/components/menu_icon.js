import React from 'react'

const MenuIcon = (props) => {
    return (
    <div className='menu-icon-background' onClick={props.displayNav}>
        <div className='menu-icon-bar'></div>
        <div className='menu-icon-bar'></div>
        <div className='menu-icon-bar'></div>
    </div>
    )
}

export default MenuIcon
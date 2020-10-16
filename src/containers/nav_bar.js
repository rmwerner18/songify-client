import React from 'react'
import Grid from './grid'
import SongsContainer from './songs_container'
import UserPage from './user_page'
import { NavLink } from 'react-router-dom'

const link = {
    width: '100px',
    padding: '12px',
    margin: '3px 6px 3px',
    background: 'black',
    textDecoration: 'none',
    borderRadius: '10px',
    color: 'white',
  }
  
const NavBar = (props) =>
<div className='navbar'> 
  <NavLink
    to="/"
    exact
    style={link}
    activeStyle={{
      background: 'darkgray'
    }}
  >Home</NavLink>
  <NavLink
    to="/songs"
    exact
    style={link}
    activeStyle={{
      background: 'darkgray'
    }}
  >All Songs</NavLink>
  <NavLink
    to={`/users/${props.user.id}`}
    exact
    style={link}
    activeStyle={{
      background: 'darkgray'
    }}
  >Your Songs</NavLink>
</div>

  export default NavBar
import React from 'react'
import Grid from './grid'
import SongsContainer from './songs_container'
import UserPage from './user_page'
import { NavLink } from 'react-router-dom'

const link = {
    width: '100px',
    padding: '12px',
    margin: '3px 6px 3px',
    background: '#3E818F',
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
      background: '#7EBCC8'
    }}
  >Home</NavLink>
  <NavLink
    to="/songs"
    exact
    style={link}
    activeStyle={{
      background: '#7EBCC8'
    }}
  >All Songs</NavLink>
  {
    props.user.id
    ?
    <NavLink
    to={`/users/${props.user.id}`}
    exact
    style={link}
    activeStyle={{
      background: '#7EBCC8'
    }}
    >Your Songs</NavLink>
    :
    null
  }
  {
    props.user.id 
    ?
    <NavLink
      to='/logout'
      exact
      style={link}
      activeStyle={{
        background: '#7EBCC8'
      }}
    >Logout</NavLink>
    :
    <NavLink
      to='/login'
      exact
      style={link}
      activeStyle={{
        background: '#7EBCC8'
      }}
    >Login</NavLink>
  }
</div>

  export default NavBar
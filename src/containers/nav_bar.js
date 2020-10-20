import React from 'react'
import { NavLink } from 'react-router-dom'

const link = {
  width: '100px',
  padding: '12px',
  margin: '3px 6px 3px',
  background: '#FFFDF0',
  'font-family': "Courier New",
  textDecoration: 'none',
  borderRadius: '10px',
  color: 'black',
  fontWeight: '900'
}
  
const NavBar = (props) =>
<div className='navbar'> 
  <NavLink
    to="/"
    exact
    style={link}
    activeStyle={{
      background: '#B2854E'
    }}
  >Home</NavLink>
  <NavLink
    to="/songs"
    exact
    style={link}
    activeStyle={{
      background: '#B2854E'
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
      background: '#B2854E'
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
        background: '#B2854E'
      }}
    >Logout</NavLink>
    :
    <NavLink
      to='/login'
      exact
      style={link}
      activeStyle={{
        background: '#B2854E'
      }}
    >Login</NavLink>
  }
</div>

export default NavBar
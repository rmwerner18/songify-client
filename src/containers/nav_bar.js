import React from 'react'
import { NavLink } from 'react-router-dom'

const link = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50px',
  padding: '0 30px',
  // margin: '3px 6px 3px',
  background: 'transparent',
  'font-family': 'Courier New',
  textDecoration: 'none',
  borderRadius: '10px',
  color: '#595959',
  fontWeight: '900'
}

const createLink = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50px',
  padding: '0 30px',
  // margin: '3px 6px 3px',
  background: '#1ED760',
  'font-family': 'Courier New',
  textDecoration: 'none',
  borderRadius: '10px',
  color: '#595959',
  fontWeight: '900'
}

  
const NavBar = (props) =>
<div className='navbar'> 
  <NavLink
    to="/"
    exact
    style={createLink}
    activeStyle={{
      color: '#fff'
    }}
  >Create</NavLink>
  <NavLink
    to="/songs"
    exact
    style={link}
    activeStyle={{
      background: '#fff'
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
      background: '#fff'
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
        background: '#fff'
      }}
    >Logout</NavLink>
    :
    <NavLink
      to='/login'
      exact
      style={link}
      activeStyle={{
        background: '#fff'
      }}
    >Login</NavLink>
  }
</div>

export default NavBar
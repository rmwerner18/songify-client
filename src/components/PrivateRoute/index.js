import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
 // fix bug where redirects to login and then redirects to page
 const user = useSelector(state => state.user)
 console.log('user', user)
 return user.id ? children : <Redirect to='/login'/>

}

export default PrivateRoute
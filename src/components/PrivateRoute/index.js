import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
 const user = useSelector(state => state.user)
 console.log('children', children)

 return user.id ? children : <Redirect to='/login'/>
}

export default PrivateRoute
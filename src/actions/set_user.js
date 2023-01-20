import { fetchHeaders } from '../constants/fetch_headers'
import BASE_API_URL from '../constants/base_api_url'

const setUser = (user) => {
  return {
    type: 'SET_USER',
    user: user
  }
}

export const fetchUserFromToken = (token) => async dispatch => { 
  const fetchConfig = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await fetch(BASE_API_URL + 'profile', fetchConfig)
  const result = await response.json()
  console.log('user from token', result)
  console.log(result)
  if (result.user.id) {
    dispatch(setUser(result.user))
  }
}

export const login = (user) => async dispatch => {
  const fetchConfig = {
    method: "POST",
    headers: fetchHeaders,
    body: JSON.stringify({user: user})
  }

  const response = await fetch(BASE_API_URL + 'login', fetchConfig)
  const result = await response.json()
  if (result.user) {
    localStorage.setItem('token', result.jwt)
    dispatch(setUser(result.user))
    return true
  } else alert('invalid username or password')
}

export const signUp = (user) => async dispatch => {
  const fetchConfig = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': "application/json"
    },
    body: JSON.stringify({user: user})
  }
  
  const response = await fetch(BASE_API_URL + 'users', fetchConfig)
  const result = await response.json()
  localStorage.setItem('token', result.jwt);
  dispatch(setUser(result.user))
}
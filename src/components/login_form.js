import React from 'react'
import { login } from '../actions/set_user'
import { useDispatch } from 'react-redux'

const LoginForm = (props) => {
    const dispatch = useDispatch()

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(login({ username: props.state.username, password: props.state.password }))
    }

    return (
        <>
            <h1>login</h1>
            <form onSubmit={loginHandler} className='login-fields' id='login-fields'>
                <input 
                    type='text' 
                    name='username' 
                    onChange={props.changeHandler} 
                    value={props.state.username} 
                    placeholder='username' 
                    className='username'/>
                <input 
                    type='password' 
                    name='password' 
                    onChange={props.changeHandler} 
                    value={props.state.password} 
                    placeholder='password' 
                    className='password'/>
                <input 
                    type='submit'/>
            </form>
        </>
    )
}

export default LoginForm
import React from 'react'
import { signUp } from '../actions/set_user'
import { useDispatch } from 'react-redux'

const SignupForm = ({ username, password, findUser, changeHandler }) => {
    const dispatch = useDispatch()

    const signUpHandler = (e) => {
        e.preventDefault()
        if (!findUser()) {
            dispatch(signUp({ username: username, password: password }))
        }
    }

    return ( 
        <>
            <h1>sign-up</h1>
            {findUser() ? <span>This username is unavailable</span> : null}
            <form onSubmit={signUpHandler} className='login-fields'>
                <input 
                    type='text' 
                    name='username' 
                    onChange={changeHandler}
                    value={username} 
                    placeholder='username' 
                    className='username'/>
                <input 
                    type='password' 
                    name='password' 
                    onChange={changeHandler} 
                    value={password} 
                    placeholder='password' 
                    className='password'/>
                <input 
                    type='submit'/>
            </form>
        </>
    )
}

export default SignupForm
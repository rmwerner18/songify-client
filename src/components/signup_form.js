import React from 'react'
import { signUp } from '../actions/set_user'
import { connect } from 'react-redux'

const SignupForm = (props) => {

    const signUpHandler = (e) => {
        e.preventDefault()
        if (!props.findUser()) {
            props.signUp({ username: props.state.username, password: props.state.password })
        }
    }

    return ( 
        <>
            <h1>sign-up</h1>
            {props.findUser() ? <span>This username is unavailable</span> : null}
            <form onSubmit={signUpHandler} className='login-fields'>
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

export default connect(null, { signUp })(SignupForm)
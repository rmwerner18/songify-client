import React, { useState, useEffect } from 'react'
import { stopLoop } from '../helper_functions.js/stop_loop'
import SignupForm from '../components/signup_form'
import LoginForm from '../components/login_form'
import BASE_API_URL from '../constants/base_api_url'

const LoginPage = () => {
    const [hasAccount, setHasAccount] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])

    const findUser = () => {
        return users.find(user => user.username === username)
    }

    const changeHandler = (e) => {
        if( e.target.name === 'username') {
            setUsername(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    // const fetchUsers = () => {
    //     fetch(BASE_API_URL + '/users')
    //     .then(resp => resp.json())
    //     .then(users => setUsers(users))
    // }

    const changeModeHandler = (e) => {
        setHasAccount(!hasAccount)
        setUsername('')
        setPassword('')
    }
    
    const formButtonContents = () => {
        return hasAccount ? 'Don\'t have an account? Sign Up' : "Have an account? Sign In"
    }
    
    useEffect(() => {
        let cancel = false
        stopLoop()
        fetch(BASE_API_URL + '/users')
        .then(resp => resp.json())
        .then(users => {
            if (cancel) return
            setUsers(users)
        })

        return () => {
            cancel = true
        }
    }, [])

    return (
        <div className='login-all'>
            {hasAccount 
            ? 
            <LoginForm changeHandler={changeHandler} username={username} password={password}/> 
            :
            <SignupForm findUser={findUser} changeHandler={changeHandler} username={username} password={password}/>
            }
            <button onClick={changeModeHandler}>{formButtonContents()}</button> 
        </div>
    )
}

export default LoginPage
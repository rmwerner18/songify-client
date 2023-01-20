import React from 'react'
import { stopLoop } from '../helper_functions.js/stop_loop'
import SignupForm from '../components/signup_form'
import LoginForm from '../components/login_form'
import BASE_API_URL from '../constants/base_api_url'

class LoginPage extends React.Component {
    state = {
        hasAccount: true,
        username: '',
        password: '',
        users: []
    }

    findUser = () => {
        return this.state.users.find(user => user.username === this.state.username)
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    setUsers = () => {
        fetch(BASE_API_URL + '/users')
        .then(resp => resp.json())
        .then(users => this.setState({users: users}))
    }

    componentDidMount = () => {
        stopLoop()
        this.setUsers()
    }

    changeModeHandler = (e) => {
        this.setState(previousState => ({hasAccount: !previousState.hasAccount, username: '', password: ''}))
    }

    formButtonContents = () => {
        return this.state.hasAccount ? 'Don\'t have an account? Sign Up' : "Have an account? Sign In"
    }

    render() {
        return (
            <div className='login-all'>
                {this.state.hasAccount 
                ? 
                <LoginForm changeHandler={this.changeHandler} state={this.state}/> 
                :
                <SignupForm findUser={this.findUser} changeHandler={this.changeHandler} state={this.state}/>
                }
                <button onClick={this.changeModeHandler}>{this.formButtonContents()}</button> 
            </div>
        )
    }
}

export default LoginPage
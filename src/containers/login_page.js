import React from 'react'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { hideNavbar } from '../actions/hide_navbar'
import { connect } from 'react-redux'
import SignupForm from '../components/signup_form'
import LoginForm from '../components/login_form'

class LoginPage extends React.Component {
    state = {
        hasAccount: true,
        username: '',
        password: '',
        users: []
    }

    findUser = () => {
        console.log(this.state)
        return this.state.users.find(user => user.username === this.state.username)
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    setUsers = () => {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => this.setState({users: users}))
    }

    componentDidMount = () => {
        stopLoop()
        // this.props.hideNavbar()
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

export default connect(null, { hideNavbar })(LoginPage)
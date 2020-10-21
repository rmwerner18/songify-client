import React from 'react'
import * as Tone from 'tone'

class Login extends React.Component {
    state = {
        hasAccount: true,
        username: '',
        password: '',
        users: null
    }

    usernameIsTaken = () => {
        let taken = this.state.users.find(user => user.username === this.state.username)
        if (taken) {
            return true 
        } else return false
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value}, this.usernameIsTaken)
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => this.setState({users: users}))
    }

    changeModeHandler = (e) => {
        const message = document.querySelector('span')
        message.style.display = 'none'
        let text = e.target.innerText
        this.setState(previousState => ({hasAccount: !previousState.hasAccount, username: '', password: ''}))
        if (text === "Don't have an account? Sign Up") {
            e.target.innerText = "Have and account? Sign In"
        } else {
            e.target.innerText =  "Don't have an account? Sign Up"
        }
    }

    stopLoop = () => {
        Tone.Transport.stop()
        Tone.Transport.cancel()
    }

    signUpHandler = (e) => {
        e.preventDefault()
        if (this.usernameIsTaken() === false && this.state.hasAccount === false) {
            this.props.signUpHandler(e, this.state)
        } else {
            let message = document.querySelector('span')
            message.style.display = 'block'
        }
    }

    loginHandler = (e) => {
        e.preventDefault()
        if (this.usernameIsTaken() === false && this.state.hasAccount === true) {
            const message = document.querySelector('span')
            message.style.display = 'block'
        } else this.props.loginHandler(e, this.state)
    }

    render() {
        if (document.querySelector('.navbar')) {
            document.querySelector('.navbar').style.display = 'none'
        }

        this.stopLoop()

        return (
            <div className='login-all'>
                {this.state.hasAccount
                ?
                <>
                    <h1>login</h1>
                    <span>Invalid username or password</span>
                    <form onSubmit={this.loginHandler} className='login-fields' id='login-fields'>
                        <input type='text' name='username' onChange={this.changeHandler} value={this.state.username} placeholder='username' className='username'/>
                        <input type='password' name='password' onChange={this.changeHandler} value={this.state.password} placeholder='password' className='password'/>
                        <input type='submit'/>
                    </form>
                </>
                :
                <>
                    <h1>sign-up</h1>
                    <span>This username is unavailable</span>
                    <form onSubmit={this.signUpHandler} className='login-fields'>
                        <input type='text' name='username' onChange={this.changeHandler} value={this.state.username} placeholder='username' className='username'/>
                        <input type='password' name='password' onChange={this.changeHandler} value={this.state.password} placeholder='password' className='password'/>
                        <input type='submit'/>
                    </form>
                </>}
                <button onClick={this.changeModeHandler}>Don't have an account? Sign Up</button> 
            </div>
        )
    }
}

export default Login
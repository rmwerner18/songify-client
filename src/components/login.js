import React from 'react'

class Login extends React.Component {
    state = {
        hasAccount: true,
        username: '',
        password: ''
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    changeModeHandler = (e) => {
        let text = e.target.innerText
        this.setState(previousState => ({hasAccount: !previousState.hasAccount}))
        if (text === "Don't have an account? Sign Up") {
            e.target.innerText = "Have and account? Sign In"
        } else {
            e.target.innerText =  "Don't have an account? Sign Up"
        }
    }

    render() {
        if (document.querySelector('.navbar')) {
            document.querySelector('.navbar').style.display = 'none'
        }
        return (
            <>
                {this.state.hasAccount
                ?
                <form onSubmit={(e) => this.props.loginHandler(e, this.state)}>
                    <input type='text' name='username' onChange={this.changeHandler} value={this.state.username}/>
                    <input type='password' name='password' onChange={this.changeHandler} value={this.state.password}/>
                    <input type='submit'/>
                </form>
                :
                <form onSubmit={(e) => this.props.signUpHandler(e, this.state)}>
                    <input type='text' name='username' onChange={this.changeHandler} value={this.state.username}/>
                    <input type='password' name='password' onChange={this.changeHandler} value={this.state.password}/>
                    <input type='text' value='test'/>
                    <input type='submit'/>
                </form>}
                <button onClick={this.changeModeHandler}>Don't have an account? Sign Up</button> 
            </>
        )
    }
}

export default Login
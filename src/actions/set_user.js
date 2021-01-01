const setUser = (user) => {
    return {
        type: 'SET_USER',
        user: user
    }
}

export const fetchUserFromToken = (token) => dispatch => {
    return fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }}).then(resp => resp.json())
        .then(result => dispatch(setUser(result.user)))
}

export const login = (user) => dispatch => {
    fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': "application/json"
        },
        body: JSON.stringify({user: user})
      }).then(resp => resp.json())
      .then(result => {
        if (result.user) {
          localStorage.setItem('token', result.jwt)
          dispatch(setUser(result.user))
        } else {
          const message = document.querySelector('span')
          message.style.display = 'block'
        }
      })
}

export const signUp = (user) => dispatch => {
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify({user: user})
    }).then(resp => resp.json())
    .then(result => {
      localStorage.setItem('token', result.jwt);
      dispatch(setUser(result.user))
    })
}
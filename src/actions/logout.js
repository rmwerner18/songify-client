export const logout = () => {
    localStorage.removeItem('token')

    return {
        type: 'LOGOUT'
    }
}

// export const logout = () => dispatch => {
//     localStorage.removeItem('token')
// }




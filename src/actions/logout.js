export const logout = () => {
    localStorage.removeItem('token')
    return {
        type: 'LOGOUT'
    }
}





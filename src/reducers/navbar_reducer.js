export const navbarReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_NAVBAR':
            return !state
        case 'HIDE_NAVBAR':
            // edit this later
            return true
        default:
            return state
    }
}
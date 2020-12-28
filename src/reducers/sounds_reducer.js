export const soundsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SOUNDS':
            return action.sounds
        default:
            return state
    }
}
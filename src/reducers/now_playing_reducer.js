export const nowPlayingReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_NOW_PLAYING':
            return action.song
        case 'END_NOW_PLAYING':
            return {}
        default:
            return state
    }
}
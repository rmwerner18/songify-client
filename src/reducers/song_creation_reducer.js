export const songCreationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_HH_BEATS':
            return {hhBeats: action.beats}
        case 'CHANGE_SNARE_BEATS':
            return {snareBeats: action.beats}
        case 'CHANGE_KICK_BEATS':
            return {kickBeats: action.beats}
        default:
            return state
    }
}

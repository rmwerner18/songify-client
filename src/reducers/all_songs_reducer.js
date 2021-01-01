export const allSongsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_SONGS':
            return [...action.songs]
        default:
            return state
    }
}
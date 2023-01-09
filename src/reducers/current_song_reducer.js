import DEFAULT_SONG_STATE from '../constants/default_song_state'

export const currentSongReducer = (state = DEFAULT_SONG_STATE, action) => {
    let clearedBeats
    switch (action.type) {
        case 'SET_CURRENT_SONG':
            return Object.assign({}, state, action.song)
        case 'SONG_ATTR':
            return { ...state, ...action.payload}
        case 'CLEAR_MELODY':
            clearedBeats = {
                iBeats: [...action.iBeats],        
                iiBeats: [...action.iiBeats],
                iiiBeats: [...action.iiiBeats],
                ivBeats: [...action.ivBeats],
                vBeats: [...action.vBeats],        
                viBeats: [...action.viBeats],
                viiBeats: [...action.viiBeats],
                IBeats: [...action.IBeats] 
            }
            return Object.assign({}, state, clearedBeats)
        case 'CHANGE_INSTRUMENT':
            return Object.assign({}, state, {instrument: action.instrument})
        case 'CHANGE_TEMPO': 
            return Object.assign({}, state, {bpm: action.bpm})
        case 'CHANGE_ALL_CHORDS':
            return Object.assign({}, state, {chords: [...action.chords]})
        case 'CHANGE_SINGLE_CHORD':
            let newArr = state.chords
            newArr.splice(action.id, 1, action.chord)
            return Object.assign({}, state, {chords: newArr})
        default:
            return state
    }
}

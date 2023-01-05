import DEFAULT_SONG_STATE from "../constants/default_song_state"

export const currentSongReducer = (state = DEFAULT_SONG_STATE, action) => {
    let clearedBeats
    switch (action.type) {
        case 'SET_CURRENT_SONG':
            return Object.assign({}, state, action.song)
        // case 'CHANGE_HH_BEATS':
        //     return Object.assign({}, state, {hhBeats: [...action.beats]})
        // case 'CHANGE_SNARE_BEATS':
        //     return Object.assign({}, state, {snareBeats: [...action.beats]})
        // case 'CHANGE_KICK_BEATS':
        //     return Object.assign({}, state, {kickBeats: [...action.beats]})
        // case 'CLEAR_DRUMS':
        //     clearedBeats = {
        //         hhBeats: [...action.hhBeats], 
        //         snareBeats: [...action.snareBeats], 
        //         kickBeats: [...action.kickBeats]
        //     }
        //     return Object.assign({}, state, clearedBeats)
        case 'SONG_ATTR':
            return Object.assign({}, state, action.payload)
        // case 'CHANGE_KEY':
        //     return Object.assign({}, state, {melodyKey: action.key})
        // case 'CHANGE_MODE':
        //     return Object.assign({}, state, {melodyMode: action.mode})
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
        // case 'RESET_STATE':
        //     return DEFAULT_SONG_STATE
        default:
            return state
    }
}

import defaultChords from '../constants/default_chords'

let initialState = {
    id: null,
    user_id: null,
    likes: 0,
    chords: defaultChords,
    bpm: 100,
    snareBeats: [],
    kickBeats: [],
    hhBeats: [],
    instrument: "piano",
    iBeats: [],
    iiBeats: [],
    iiiBeats: [],
    ivBeats: [],
    vBeats: [],
    viBeats: [],
    viiBeats: [],
    IBeats: [],
    melodyKey: "C5",
    melodyMode: "ionian",
    isPlaying: false
}

export const currentSongReducer = (state = initialState, action) => {
    let clearedBeats
    switch (action.type) {
        case 'SET_CURRENT_SONG':
            return Object.assign({}, state, action.song)
        case 'CHANGE_HH_BEATS':
            return Object.assign({}, state, {hhBeats: [...action.beats]})
        case 'CHANGE_SNARE_BEATS':
            return Object.assign({}, state, {snareBeats: [...action.beats]})
        case 'CHANGE_KICK_BEATS':
            return Object.assign({}, state, {kickBeats: [...action.beats]})
        case 'CLEAR_DRUMS':
            clearedBeats = {
                hhBeats: [...action.hhBeats], 
                snareBeats: [...action.snareBeats], 
                kickBeats: [...action.kickBeats]
            }
            return Object.assign({}, state, clearedBeats)
        case 'CHANGE_i_BEATS':
            return Object.assign({}, state, {iBeats: [...action.beats]})
        case 'CHANGE_ii_BEATS':
            return Object.assign({}, state, {iiBeats: [...action.beats]})
        case 'CHANGE_iii_BEATS':
            return Object.assign({}, state, {iiiBeats: [...action.beats]})
        case 'CHANGE_iv_BEATS':
            return Object.assign({}, state, {ivBeats: [...action.beats]})
        case 'CHANGE_v_BEATS':
            return Object.assign({}, state, {vBeats: [...action.beats]})
        case 'CHANGE_vi_BEATS':
            return Object.assign({}, state, {viBeats: [...action.beats]})
        case 'CHANGE_vii_BEATS':
            return Object.assign({}, state, {viiBeats: [...action.beats]})
        case 'CHANGE_I_BEATS':
            return Object.assign({}, state, {IBeats: [...action.beats]})
        case 'CHANGE_KEY':
            return Object.assign({}, state, {melodyKey: action.key})
        case 'CHANGE_MODE':
            return Object.assign({}, state, {melodyMode: action.mode})
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

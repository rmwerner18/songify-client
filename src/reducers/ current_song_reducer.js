import defaultChords from '../default_chords'

let initialState = {
    user_id: null,
    likes: 0,
    chords: defaultChords,
    bpm: 100,
    snareBeats: [],
    kickBeats: [],
    hhBeats: [],
    instrument: "synth",
    iBeats: [],
    iiBeats: [],
    iiiBeats: [],
    ivBeats: [],
    vBeats: [],
    viBeats: [],
    viiBeats: [],
    IBeats: [],
    melodyKey: "C5",
    melodyMode: "ionian"
}

export const currentSongReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_HH_BEATS':
            return Object.assign({}, state, {hhBeats: [...action.beats]})
        case 'CHANGE_SNARE_BEATS':
            return Object.assign({}, state, {snareBeats: [...action.beats]})
        case 'CHANGE_KICK_BEATS':
            return Object.assign({}, state, {kickBeats: [...action.beats]})
        case 'CLEAR_DRUMS':
            let clearedBeats = {
                hhBeats: [...action.hhBeats], 
                snareBeats: [...action.snareBeats], 
                kickBeats: [...action.kickBeats]
            }
            return Object.assign({}, state, clearedBeats)
        case 'CHANGE_i_BEATS':
            return
        case 'CHANGE_ii_BEATS':
            return
        case 'CHANGE_iii_BEATS':
            return
        case 'CHANGE_iv_BEATS':
            return
        case 'CHANGE_v_BEATS':
            return
        case 'CHANGE_vi_BEATS':
            return
        case 'CHANGE_vii_BEATS':
            return
        case 'CHANGE_I_BEATS':
            return
        default:
            return state
    }
}

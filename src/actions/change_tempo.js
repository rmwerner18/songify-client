export const changeTempo = (bpm) => {
    return {
        type: 'CHANGE_TEMPO',
        bpm: bpm
    }
}
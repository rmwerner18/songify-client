export const clearDrums = () => {
    return {
        type: 'CLEAR_DRUMS',
        hhBeats: [],
        snareBeats: [],
        kickBeats: []
    }
}
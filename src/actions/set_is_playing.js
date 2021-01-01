export const startSong = () => {
    return {
        type: 'SET_IS_PLAYING',
        value: true
    }
}

export const stopSong = () => {
    return {
        type: 'SET_IS_PLAYING',
        value: false
    }
}
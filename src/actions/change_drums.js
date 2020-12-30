export const changeHHBeats = (beats) => {
    return {
        type: 'CHANGE_HH_BEATS',
        beats: beats
    }
}

export const changeSnareBeats = (beats) => {
    return {
        type: 'CHANGE_SNARE_BEATS',
        beats: beats
    }
}

export const changeKickBeats = (beats) => {
    return {
        type: 'CHANGE_KICK_BEATS',
        beats: beats
    }
}
export const setAllSongs = (songs) => {
    return {
        type: 'SET_ALL_SONGS',
        songs: songs
    }
}

export const setSongsLoaded = () => {
    return {
        // type: 'SET_SONGS_LOADED',
        // songs: ['loaded']
    }
}

export const fetchSongs = () => dispatch => {
    return fetch('http://localhost:3000/songs')
    .then(resp => resp.json())
    .then(songs => {
        // if (songs === []) {
        //     songs = 'loaded'
        // }
        dispatch(setAllSongs(songs))
    })
}
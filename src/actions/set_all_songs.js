const setAllSongs = (songs) => {
    return {
        type: 'SET_ALL_SONGS',
        songs: songs
    }
}

export const fetchSongs = () => dispatch => {
    return fetch('http://localhost:3000/songs')
    .then(resp => resp.json())
    .then(songs => dispatch(setAllSongs(songs)))
}
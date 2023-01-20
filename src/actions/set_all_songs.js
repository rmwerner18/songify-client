import BASE_API_URL from "../constants/base_api_url"

export const setAllSongs = (songs) => {
    return {
        type: 'SET_ALL_SONGS',
        songs: songs
    }
}

export const fetchSongs = () => dispatch => {
    return fetch(BASE_API_URL + 'songs')
    .then(resp => resp.json())
    .then(songs => dispatch(setAllSongs(songs)))
}
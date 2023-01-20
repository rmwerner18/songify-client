import BASE_API_URL from "../constants/base_api_url"

export const setAllSongs = (songs) => {
    return {
        type: 'SET_ALL_SONGS',
        songs: songs
    }
}

export const fetchSongs = () => async dispatch => {
    const response = await fetch(BASE_API_URL + 'songs')
    const songs = await response.json()
    dispatch(setAllSongs(songs))
}
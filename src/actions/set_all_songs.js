import BASE_API_URL from '../constants/base_api_url';

export const setAllSongs = (songs, error = null) => {
  return {
    type: 'SET_ALL_SONGS',
    songs: songs,
    error: error,
  };
};

export const fetchSongs = () => async (dispatch) => {
  try {
    const response = await fetch(BASE_API_URL + 'songs');
    const songs = await response.json();
    dispatch(setAllSongs(songs));
  } catch {
    dispatch(setAllSongs([], true));
  }
};

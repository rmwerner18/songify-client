import BASE_API_URL from '../constants/base_api_url';

export const setAllSongs = (songs) => {
  return {
    type: 'SET_ALL_SONGS',
    songs: songs,
  };
};

export const fetchSongs = () => async (dispatch) => {
  console.log('DELETE 4');
  const response = await fetch(BASE_API_URL + 'songs');
  console.log('DELETE 5');
  const songs = await response.json();
  console.log('DELETE 6');
  dispatch(setAllSongs(songs));
  console.log('DELETE 7');
};

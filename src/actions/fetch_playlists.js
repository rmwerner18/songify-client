import BASE_API_URL from '../constants/base_api_url';

const setPlaylists = (playlists) => {
  return {
    type: 'SET_PLAYLISTS',
    playlists: playlists,
  };
};

export const fetchPlaylists = () => async (dispatch) => {
  const res = await fetch(BASE_API_URL + 'playlists');
  const playlists = await res.json();
  dispatch(setPlaylists(playlists));
};

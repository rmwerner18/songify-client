import BASE_API_URL from '../constants/base_api_url';

export const setPlaylists = (playlists, error = null) => {
  return {
    type: 'SET_PLAYLISTS',
    playlists: playlists,
    error: error
  };
};

export const fetchPlaylists = () => async (dispatch) => {
  const res = await fetch(BASE_API_URL + 'playlists');
  const playlists = await res.json();
  try {
    dispatch(setPlaylists(playlists));
  } catch {
    dispatch(setPlaylists([], true));
  }
};

import BASE_API_URL from '../constants/base_api_url';

export const setPlaylists = (playlists, error = null) => {
  return {
    type: 'SET_PLAYLISTS',
    playlists: playlists,
    error: error,
  };
};

export const fetchPlaylists = (user_id) => async (dispatch) => {
  const res = await fetch(BASE_API_URL + 'playlists/user/' + user_id);
  const playlists = await res.json();
  try {
    dispatch(setPlaylists(playlists));
  } catch {
    dispatch(setPlaylists([], true));
  }
};

export const removePlaylistSong =
  (playlistId, songId) => (dispatch, getState) => {
    const state = getState();
    const playlists = state.allPlaylists.playlists;
    const newPlaylists = playlists.map((playlist) => {
      if (playlist.id !== parseInt(playlistId)) {
        return playlist;
      }
      const newPlaylistSongs = playlist.songs.filter(
        (song) => song.id !== songId
      );
      return { ...playlist, songs: newPlaylistSongs };
    });
    console.log({ newPlaylists });
    dispatch(setPlaylists(newPlaylists));
  };

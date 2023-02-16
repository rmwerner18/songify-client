export const playlistsReducer = (state = { playlists: [] }, action) => {
  switch (action.type) {
    case 'SET_PLAYLISTS':
      return {
        playlists: [...action.playlists],
        loaded: true,
        error: action.error,
      };
    default:
      return state;
  }
};

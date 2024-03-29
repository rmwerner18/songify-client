export const allSongsReducer = (state = { songs: [] }, action) => {
  switch (action.type) {
    case 'SET_ALL_SONGS':
      return { songs: [...action.songs], loaded: true, error: action.error };
    default:
      return state;
  }
};
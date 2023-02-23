import DEFAULT_SONG_STATE from '../constants/default_song_state';

export const currentSongReducer = (state = DEFAULT_SONG_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SONG':
      return { ...state, ...action.song };
    case 'SONG_ATTR':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

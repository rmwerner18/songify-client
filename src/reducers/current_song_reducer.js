import DEFAULT_SONG_STATE from '../constants/default_song_state';

export const currentSongReducer = (state = DEFAULT_SONG_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SONG':
      return { ...state, ...action.song };
    case 'SONG_ATTR':
      return { ...state, ...action.payload };
    case 'CHANGE_ALL_CHORDS':
      return { ...state, ...{ chords: [...action.chords] } };
    case 'CHANGE_SINGLE_CHORD':
      let newArr = state.chords;
      newArr.splice(action.id, 1, action.chord);
      return { ...state, ...{ chords: newArr } };
    default:
      return state;
  }
};

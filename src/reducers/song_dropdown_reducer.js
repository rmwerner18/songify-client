export const SongDropdownReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SONG_DROPDOWN':
      return action.payload;
    default:
      return state;
  }
};

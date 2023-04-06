export const setCurrentSong = (song) => {
  return {
    type: 'SET_CURRENT_SONG',
    song: song,
  };
};

export const changeSongAttribute = (attr) => {
  return {
    type: 'SONG_ATTR',
    payload: attr,
  };
};

export const clearCurrentBeat = () => {
  return {
    type: 'CLEAR_CURRENT_BEAT',
  };
};

export const setCurrentBeat = (beat) => {
  return {
    type: 'SET_CURRENT_BEAT',
    beat: beat,
  };
};

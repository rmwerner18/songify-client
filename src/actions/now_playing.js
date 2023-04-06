export const setNowPlaying = (song) => {
  return {
    type: 'SET_NOW_PLAYING',
    song: song,
  };
};

export const endNowPlaying = () => {
  return {
    type: 'END_NOW_PLAYING',
  };
};

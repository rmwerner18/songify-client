export const setNowPlaying = (song) => {
  return {
    type: 'SET_NOW_PLAYING',
    song: song,
  };
};

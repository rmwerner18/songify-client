export const changeSongAttribute = (attr) => {
  console.log(attr)
  return {
    type: 'SONG_ATTR',
    payload: attr,
  };
};

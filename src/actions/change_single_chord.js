export const changeSingleChord = (id, chord) => {
  return {
    type: 'CHANGE_SINGLE_CHORD',
    id: id,
    chord: chord,
  };
};

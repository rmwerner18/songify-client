export const changeAllChords = (chords) => {
  return {
    type: 'CHANGE_ALL_CHORDS',
    chords: chords,
  };
};

export const changeSingleChord = (id, chord) => {
  return {
    type: 'CHANGE_SINGLE_CHORD',
    id: id,
    chord: chord,
  };
};

export const setChordClipboard = (chord) => {
  return {
    type: 'SET_CHORD',
    chord,
  };
};
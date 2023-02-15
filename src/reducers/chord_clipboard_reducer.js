import DEFAULT_CHORDS from '../constants/default_chords';

export const chordClipboardReducer = (state = DEFAULT_CHORDS[0], action) => {
  switch (action.type) {
    case 'SET_CHORD':
      return action.chord;
    default:
      return state;
  }
};

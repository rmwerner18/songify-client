import DEFAULT_CHORDS from './default_chords';

const DEFAULT_SONG_STATE = {
  id: null,
  user_id: null,
  likes: 0,
  chords: DEFAULT_CHORDS,
  bpm: 100,
  swing: 0,
  snareBeats: [],
  kickBeats: [],
  hhBeats: [],
  instrument: 'piano',
  melodyInstrument: 'synth',
  iBeats: {},
  iiBeats: {},
  iiiBeats: {},
  ivBeats: {},
  vBeats: {},
  viBeats: {},
  viiBeats: {},
  IBeats: {},
  melodyKey: 'C5',
  melodyMode: 'ionian',
};

export default DEFAULT_SONG_STATE;

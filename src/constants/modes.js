const melodyNotes = [
  'C5',
  'C#5',
  'D5',
  'D#5',
  'E5',
  'F5',
  'F#5',
  'G5',
  'G#5',
  'A5',
  'A#5',
  'B5',
  'C6',
  'C#6',
  'D6',
  'D#6',
  'E6',
  'F6',
  'F#6',
  'G6',
  'G#6',
  'A6',
  'A#6',
  'B6',
];

const ionian = (melodyKey) => {
  let i = melodyNotes.findIndex((note) => note === melodyKey);
  return [
    melodyNotes[i],
    melodyNotes[i + 2],
    melodyNotes[i + 4],
    melodyNotes[i + 5],
    melodyNotes[i + 7],
    melodyNotes[i + 9],
    melodyNotes[i + 11],
    melodyNotes[i + 12],
  ];
};
const dorian = (melodyKey) => {
  let i = melodyNotes.findIndex((note) => note === melodyKey);
  return [
    melodyNotes[i],
    melodyNotes[i + 2],
    melodyNotes[i + 3],
    melodyNotes[i + 5],
    melodyNotes[i + 7],
    melodyNotes[i + 9],
    melodyNotes[i + 10],
    melodyNotes[i + 12],
  ];
};
const phrygian = (melodyKey) => {
  let i = melodyNotes.findIndex((note) => note === melodyKey);
  return [
    melodyNotes[i],
    melodyNotes[i + 1],
    melodyNotes[i + 3],
    melodyNotes[i + 5],
    melodyNotes[i + 7],
    melodyNotes[i + 8],
    melodyNotes[i + 10],
    melodyNotes[i + 12],
  ];
};
const lydian = (melodyKey) => {
  let i = melodyNotes.findIndex((note) => note === melodyKey);
  return [
    melodyNotes[i],
    melodyNotes[i + 2],
    melodyNotes[i + 4],
    melodyNotes[i + 6],
    melodyNotes[i + 7],
    melodyNotes[i + 9],
    melodyNotes[i + 11],
    melodyNotes[i + 12],
  ];
};
const mixolydian = (melodyKey) => {
  let i = melodyNotes.findIndex((note) => note === melodyKey);
  return [
    melodyNotes[i],
    melodyNotes[i + 2],
    melodyNotes[i + 4],
    melodyNotes[i + 5],
    melodyNotes[i + 7],
    melodyNotes[i + 9],
    melodyNotes[i + 10],
    melodyNotes[i + 12],
  ];
};
const aeolian = (melodyKey) => {
  let i = melodyNotes.findIndex((note) => note === melodyKey);
  return [
    melodyNotes[i],
    melodyNotes[i + 2],
    melodyNotes[i + 3],
    melodyNotes[i + 5],
    melodyNotes[i + 7],
    melodyNotes[i + 8],
    melodyNotes[i + 10],
    melodyNotes[i + 12],
  ];
};
const locrian = (melodyKey) => {
  let i = melodyNotes.findIndex((note) => note === melodyKey);
  return [
    melodyNotes[i],
    melodyNotes[i + 1],
    melodyNotes[i + 3],
    melodyNotes[i + 5],
    melodyNotes[i + 6],
    melodyNotes[i + 8],
    melodyNotes[i + 10],
    melodyNotes[i + 12],
  ];
};

const modes = {
  ionian,
  dorian,
  phrygian,
  lydian,
  mixolydian,
  aeolian,
  locrian,
};

export default modes;

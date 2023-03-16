import { MELODY_NOTES } from "./notes";

const ionian = (melodyKey) => {
  let i = MELODY_NOTES.findIndex((note) => note === melodyKey);
  return [
    MELODY_NOTES[i],
    MELODY_NOTES[i + 2],
    MELODY_NOTES[i + 4],
    MELODY_NOTES[i + 5],
    MELODY_NOTES[i + 7],
    MELODY_NOTES[i + 9],
    MELODY_NOTES[i + 11],
    MELODY_NOTES[i + 12],
  ];
};
const dorian = (melodyKey) => {
  let i = MELODY_NOTES.findIndex((note) => note === melodyKey);
  return [
    MELODY_NOTES[i],
    MELODY_NOTES[i + 2],
    MELODY_NOTES[i + 3],
    MELODY_NOTES[i + 5],
    MELODY_NOTES[i + 7],
    MELODY_NOTES[i + 9],
    MELODY_NOTES[i + 10],
    MELODY_NOTES[i + 12],
  ];
};
const phrygian = (melodyKey) => {
  let i = MELODY_NOTES.findIndex((note) => note === melodyKey);
  return [
    MELODY_NOTES[i],
    MELODY_NOTES[i + 1],
    MELODY_NOTES[i + 3],
    MELODY_NOTES[i + 5],
    MELODY_NOTES[i + 7],
    MELODY_NOTES[i + 8],
    MELODY_NOTES[i + 10],
    MELODY_NOTES[i + 12],
  ];
};
const lydian = (melodyKey) => {
  let i = MELODY_NOTES.findIndex((note) => note === melodyKey);
  return [
    MELODY_NOTES[i],
    MELODY_NOTES[i + 2],
    MELODY_NOTES[i + 4],
    MELODY_NOTES[i + 6],
    MELODY_NOTES[i + 7],
    MELODY_NOTES[i + 9],
    MELODY_NOTES[i + 11],
    MELODY_NOTES[i + 12],
  ];
};
const mixolydian = (melodyKey) => {
  let i = MELODY_NOTES.findIndex((note) => note === melodyKey);
  return [
    MELODY_NOTES[i],
    MELODY_NOTES[i + 2],
    MELODY_NOTES[i + 4],
    MELODY_NOTES[i + 5],
    MELODY_NOTES[i + 7],
    MELODY_NOTES[i + 9],
    MELODY_NOTES[i + 10],
    MELODY_NOTES[i + 12],
  ];
};
const aeolian = (melodyKey) => {
  let i = MELODY_NOTES.findIndex((note) => note === melodyKey);
  return [
    MELODY_NOTES[i],
    MELODY_NOTES[i + 2],
    MELODY_NOTES[i + 3],
    MELODY_NOTES[i + 5],
    MELODY_NOTES[i + 7],
    MELODY_NOTES[i + 8],
    MELODY_NOTES[i + 10],
    MELODY_NOTES[i + 12],
  ];
};
const locrian = (melodyKey) => {
  let i = MELODY_NOTES.findIndex((note) => note === melodyKey);
  return [
    MELODY_NOTES[i],
    MELODY_NOTES[i + 1],
    MELODY_NOTES[i + 3],
    MELODY_NOTES[i + 5],
    MELODY_NOTES[i + 6],
    MELODY_NOTES[i + 8],
    MELODY_NOTES[i + 10],
    MELODY_NOTES[i + 12],
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

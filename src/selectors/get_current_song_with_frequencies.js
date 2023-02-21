import { createSelector } from '@reduxjs/toolkit';
import { keyBy } from 'lodash';
var Octavian = require('octavian');

const getCurrentSong = (state) => state.currentSong;

const getCurrentSongWithFrequencies = createSelector(
  [getCurrentSong],
  (currentSong) => {
    let newChordsObject = currentSong.chords;
    if (Array.isArray(currentSong.chords)) {
      newChordsObject = keyBy(currentSong.chords, 'start_beat');
    }
    Object.keys(newChordsObject).map((startBeat) => {
      const createChord = (name, qual) => {
        let octavianChord;
        if (qual === 'augmented') {
          octavianChord = new Octavian.Chord(name);
          octavianChord.addInterval('majorThird');
          octavianChord.addInterval('minorSixth');
        } else if (qual === '5') {
          octavianChord = new Octavian.Chord(name);
          octavianChord.addInterval('perfectFifth');
          octavianChord.addInterval('perfectOctave');
        } else {
          octavianChord = new Octavian.Chord(name, qual);
        }
        return octavianChord;
      };

      const getFrequencies = (bass, name, qual, chord) => {
        let octavianChord = createChord(name, qual);
        let bassNote = new Octavian.Note(bass);
        octavianChord.frequencies.push(bassNote.frequency);
        chord.freqs = octavianChord.frequencies;
        return chord
      };
      const chord = newChordsObject[startBeat];
      return getFrequencies(chord['bass'], chord['name'], chord['quality'], chord);
    });
    return { ...currentSong, chords: newChordsObject };
  }
);

export default getCurrentSongWithFrequencies;

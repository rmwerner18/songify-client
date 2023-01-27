import { createSelector } from '@reduxjs/toolkit';
var Octavian = require('octavian');

const getCurrentSong = (state) => state.currentSong;

const getCurrentSongWithFrequencies = createSelector(
  [getCurrentSong],
  (currentSong) => {
    const freqs = currentSong.chords.map((chord) => {
      const createChord = (name, qual) => {
        let chord;
        if (qual === 'augmented') {
          chord = new Octavian.Chord(name);
          chord.addInterval('majorThird');
          chord.addInterval('minorSixth');
        } else if (qual === '5') {
          chord = new Octavian.Chord(name);
          chord.addInterval('perfectFifth');
          chord.addInterval('perfectOctave');
        } else {
          chord = new Octavian.Chord(name, qual);
        }
        return chord;
      };

      const getFrequencies = (bass, name, qual) => {
        let chord = createChord(name, qual);
        let freqs = chord.frequencies;
        let b = new Octavian.Note(bass);
        freqs.push(b.frequency);
        return freqs;
      };

      return getFrequencies(chord.bass, chord.name, chord.quality);
    });
    return { ...currentSong, freqs };
  }
);

export default getCurrentSongWithFrequencies;

import { createSelector } from '@reduxjs/toolkit';
var Octavian = require('octavian');

const getCurrentSong = (state) => state.currentSong;

const getCurrentSongWithFrequencies = createSelector(
  [getCurrentSong],
  (currentSong) => {
    Object.keys(currentSong.chords).map((chordIndex) => {
      // console.log(currentSong.chords)
      // console.log(chordIndex);
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
        // console.log({bass, name, qual})
        let chord = createChord(name, qual);
        let freqs = chord.frequencies;
        let b = new Octavian.Note(bass);
        freqs.push(b.frequency);
        currentSong.chords[chordIndex].freqs = freqs
        return currentSong.chords[chordIndex];
      };
      const chord = currentSong.chords[chordIndex]
      // console.log({chord})
      return getFrequencies(chord['bass'], chord['name'], chord['quality']);
    });
    // console.log(currentSong.chords)
    return { ...currentSong, chords: currentSong.chords };
  }
);

export default getCurrentSongWithFrequencies;

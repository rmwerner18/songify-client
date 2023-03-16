import * as Tone from 'tone';
import { MELODY_NOTES } from '../constants/notes';

export const stopLoop = ({ synth, chords } = {}) => {
  if (synth) {
    synth.triggerRelease(MELODY_NOTES, 0);
  }
  if (chords && synth) {
    Object.keys(chords).forEach((chordIndex) => {
      synth.triggerRelease(chords[chordIndex]['freqs'], 0);
    });
  }
  Tone.Transport.stop();
  Tone.Transport.cancel();
};

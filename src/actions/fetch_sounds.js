import * as Tone from 'tone';
import Snare from './sounds/snare.wav';
import Kick from './sounds/kick.wav';
import Hh from './sounds/hh.wav';

const setSounds = (sounds) => {
  return {
    type: 'SET_SOUNDS',
    sounds: sounds,
  };
};

export const fetchSounds = () => (dispatch) => {
  const snare = new Tone.Player(Snare).toDestination();
  const kick = new Tone.Player(Kick).toDestination();
  const hh = new Tone.Player(Hh).toDestination();
  const synth = new Tone.PolySynth().toDestination();
  const piano = new Tone.Sampler({
    urls: {
      C4: 'C4.mp3',
      'D#4': 'Ds4.mp3',
      'F#4': 'Fs4.mp3',
      A4: 'A4.mp3',
    },
    release: 1,
    baseUrl: 'https://tonejs.github.io/audio/salamander/',
  }).toDestination();

  Tone.loaded().then(() => {
    dispatch(
      setSounds({
        synth: synth,
        piano: piano,
        snare: snare,
        kick: kick,
        hh: hh,
      })
    );
  });
};

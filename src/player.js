import * as Tone from 'tone';
import modes from './constants/modes';

const player = (index, time, props) => {
  const {
    bpm,
    synth,
    piano,
    snare,
    kick,
    hh,
    melodyMode,
    melodyKey,
    instrument,
    freqs,
    kickBeats,
    snareBeats,
    hhBeats,
    iBeats,
    iiBeats,
    iiiBeats,
    ivBeats,
    vBeats,
    viBeats,
    viiBeats,
    IBeats,
  } = props;

  const melodyBeats = {
    iBeats,
    iiBeats,
    iiiBeats,
    ivBeats,
    vBeats,
    viBeats,
    viiBeats,
    IBeats
  };

  const drumBeats = {
    'kick': {
      'array': kickBeats,
      'sound': kick
    },
    'snare': {
      'array': snareBeats,
      'sound': snare
    },
    'hh': {
      'array': hhBeats,
      'sound': hh
    }
  };

  const chordBeats = [
    [0, 4],
    [8, 12],
    [16, 20],
    [24, 28]
  ]

  Tone.Transport.bpm.value = parseInt(bpm);
  const instrumentSound = instrument === 'synth' ? synth : piano;
  chordBeats.forEach((array, idx) => {
    if (array.includes(index)) {
      instrumentSound.triggerAttackRelease(freqs[idx], '2n', time)
    }
  })
  Object.keys(melodyBeats).forEach((beatType, beatIndex) => {
    if (melodyBeats[beatType].includes(index)) {
      instrumentSound.triggerAttackRelease(
        modes[melodyMode](melodyKey)[beatIndex],
        '8n',
        time
      );
    };
  });
  Object.keys(drumBeats).forEach((beatType) => {
    if (drumBeats[beatType]['array'].includes(index)) {
      drumBeats[beatType]['sound'].start(time)
    };
  }); 
  return;
};

export default player;

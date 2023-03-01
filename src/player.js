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
    melodyInstrument,
    melodyMode,
    melodyKey,
    instrument,
    chords,
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
    swing,
  } = props;

  const melodyBeats = {
    iBeats,
    iiBeats,
    iiiBeats,
    ivBeats,
    vBeats,
    viBeats,
    viiBeats,
    IBeats,
  };

  const drumBeats = {
    kick: {
      array: kickBeats,
      sound: kick,
    },
    snare: {
      array: snareBeats,
      sound: snare,
    },
    hh: {
      array: hhBeats,
      sound: hh,
    },
  };

  Tone.Transport.swing = swing;
  Tone.Transport.bpm.value = parseInt(bpm);
  const instrumentSound = instrument === 'synth' ? synth : piano;
  const melodyInstrumentSound = melodyInstrument === 'synth' ? synth : piano;

  Object.keys(chords).forEach(chordIndex => {
    if (chordIndex === index.toString()) {
      const t = Tone.Time('8n');
      instrumentSound.triggerAttackRelease(
        chords[chordIndex]['freqs'],
        t * chords[chordIndex]['duration'],
        time
      )
    }
  })
  Object.keys(melodyBeats).forEach((beatType, beatIndex) => {
    if (Object.keys(melodyBeats[beatType]).includes(index.toString())) {
      const t = Tone.Time('8n');
      melodyInstrumentSound.triggerAttackRelease(
        modes[melodyMode](melodyKey)[beatIndex],
        t * melodyBeats[beatType][index.toString()].duration,
        time
      );
    }
  });
  Object.keys(drumBeats).forEach((beatType) => {
    if (drumBeats[beatType]['array'].includes(index)) {
      drumBeats[beatType]['sound'].start(time);
    }
  });
  return;
};

export default player;

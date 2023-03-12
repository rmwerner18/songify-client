import * as Tone from 'tone';
import modes from './constants/modes';

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

const player = (index, time, props, stop = false) => {
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

  Tone.Transport.swing = swing;
  Tone.Transport.bpm.value = parseInt(bpm);
  const instrumentSound = instrument === 'synth' ? synth : piano;
  const melodyInstrumentSound = melodyInstrument === 'synth' ? synth : piano;

  if (stop) {
    return melodyInstrumentSound.triggerRelease(melodyNotes, 0);
  }

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

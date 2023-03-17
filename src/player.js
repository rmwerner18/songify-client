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

  Tone.Transport.swing = swing;
  Tone.Transport.bpm.value = parseInt(bpm);
  const instrumentSound = instrument === 'synth' ? synth : piano;
  const melodyInstrumentSound = melodyInstrument === 'synth' ? synth : piano;

  const melodyBeats = [
    iBeats,
    iiBeats,
    iiiBeats,
    ivBeats,
    vBeats,
    viBeats,
    viiBeats,
    IBeats,
  ];

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

  Object.keys(chords).forEach((startBeat) => {
    if (startBeat === index.toString()) {
      const t = Tone.Time('8n');
      instrumentSound.triggerAttack(chords[startBeat]['freqs'], time);
    }
    if (
      chords[startBeat]['start_beat'] + chords[startBeat]['duration'] ===
        index ||
      (chords[startBeat]['start_beat'] + chords[startBeat].duration === 32 &&
        index === 0)
    ) {
      piano.triggerRelease(chords[startBeat]['freqs'], time);
      synth.triggerRelease(chords[startBeat]['freqs'], time);
    }
  });
  melodyBeats.forEach((beatType, beatIndex) => {
    Object.keys(beatType).forEach((startBeat) => {
      if (startBeat === index.toString()) {
        melodyInstrumentSound.triggerAttack(
          modes[melodyMode](melodyKey)[beatIndex],
          time
        );
      }
      if (
        parseInt(startBeat) + beatType[startBeat].duration === index ||
        (parseInt(startBeat) + beatType[startBeat].duration === 32 &&
          index === 0)
      ) {
        piano.triggerRelease(modes[melodyMode](melodyKey)[beatIndex], time);
        synth.triggerRelease(modes[melodyMode](melodyKey)[beatIndex], time);
      }
    });
  });
  Object.keys(drumBeats).forEach((beatType) => {
    if (drumBeats[beatType]['array'].includes(index)) {
      drumBeats[beatType]['sound'].start(time);
    }
  });
  return;
};

export default player;

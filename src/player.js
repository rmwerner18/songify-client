import * as Tone from 'tone'
import modes from './constants/modes'

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
        IBeats
    } = props

    Tone.Transport.bpm.value = parseInt(bpm)
    const instrumentSound = instrument === 'synth' ? synth : piano
    if ([0, 4].includes(index)) {
        instrumentSound.triggerAttackRelease(freqs[0], '2n', time)
    } else if ([8, 12].includes(index)) {
        instrumentSound.triggerAttackRelease(freqs[1], '2n', time)
    } else if ([16, 20].includes(index)) {
        instrumentSound.triggerAttackRelease(freqs[2], '2n', time)
    } else if ([24, 28].includes(index)) {
        instrumentSound.triggerAttackRelease(freqs[3], '2n', time)
    } 
    if (kickBeats.includes(index)) {
        kick.start(time)
    }
    if (snareBeats.includes(index)) {
        snare.start(time)
    }
    if (hhBeats.includes(index)) {
        hh.start(time);
    }
    if (iBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[melodyMode](melodyKey)[0], '8n', time)
    }
    if (iiBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[melodyMode](melodyKey)[1], '8n', time)
    }
    if (iiiBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[melodyMode](melodyKey)[2], '8n', time)
    }
    if (ivBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[melodyMode](melodyKey)[3], '8n', time)
    }
    if (vBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[melodyMode](melodyKey)[4], '8n', time)
    }
    if (viBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[melodyMode](melodyKey)[5], '8n', time)
    }
    if (viiBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[melodyMode](melodyKey)[6], '8n', time)
    }
    if (IBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[melodyMode](melodyKey)[7], '8n', time)
    }
    return
}

export default player
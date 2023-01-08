import * as Tone from 'tone'
import modes from './constants/modes'

const player = (index, time, props) => {
    //destructure props
    // console.log(props)
    Tone.Transport.bpm.value = parseInt(props.bpm)
    const instrumentSound = props.instrument === 'synth' ? props.synth : props.piano
    if ([0, 4].includes(index)) {
        instrumentSound.triggerAttackRelease(props.freqs[0], '2n', time)
    } else if ([8, 12].includes(index)) {
        instrumentSound.triggerAttackRelease(props.freqs[1], '2n', time)
    } else if ([16, 20].includes(index)) {
        instrumentSound.triggerAttackRelease(props.freqs[2], '2n', time)
    } else if ([24, 28].includes(index)) {
        instrumentSound.triggerAttackRelease(props.freqs[3], '2n', time)
    } 
    if (props.kickBeats.includes(index)) {
        props.kick.start(time)
    }
    if (props.snareBeats.includes(index)) {
        props.snare.start(time)
    }
    if (props.hhBeats.includes(index)) {
        props.hh.start(time);
    }
    if (props.iBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[0], '8n', time)
    }
    if (props.iiBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[1], '8n', time)
    }
    if (props.iiiBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[2], '8n', time)
    }
    if (props.ivBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[3], '8n', time)
    }
    if (props.vBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[4], '8n', time)
    }
    if (props.viBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[5], '8n', time)
    }
    if (props.viiBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[6], '8n', time)
    }
    if (props.IBeats.includes(index)) {
        instrumentSound.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[7], '8n', time)
    }
    return
}

export default player
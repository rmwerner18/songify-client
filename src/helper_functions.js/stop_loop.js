import * as Tone from 'tone'

export const stopLoop = () => {
    Tone.Transport.stop()
    Tone.Transport.cancel()
}
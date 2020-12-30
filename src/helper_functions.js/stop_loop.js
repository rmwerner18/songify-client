export const stopLoop = () => {
    Tone.Transport.stop()
    Tone.Transport.cancel()
}
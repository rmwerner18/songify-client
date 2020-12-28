// export const setNumOfEigthNotes = (n, array) => {
//     for (let i=0; i<n; i++) {
//         array.push(i)
//     }
//   }

// export const startLoop = () => {
//     let array = []
//     this.setNumOfEigthNotes(32, array)
//     new Tone.Sequence((time, index) => {
//         this.player(index, time)
//     }, array).start(0)
//     Tone.Transport.start();
// }

// export const stopLoop = () => {
//     Tone.Transport.stop()
//     Tone.Transport.cancel()
// }
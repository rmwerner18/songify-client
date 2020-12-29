// import  * as Tone from 'tone'
// import player from './player'

// export const setNumOfEigthNotes = (n, array) => {
//     for (let i=0; i<n; i++) {
//         array.push(i)
//     }
//   }

// export const startLoop = (state, props) => {
//     let array = []
//     setNumOfEigthNotes(32, array)
//     new Tone.Sequence((time, index) => {
//         player(index, time)
//     }, array).start(0)
//     Tone.Transport.start();
// }

// export const stopLoop = () => {
//     Tone.Transport.stop()
//     Tone.Transport.cancel()
// }
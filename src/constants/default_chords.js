const defaultChords = [
    {
        bass: "C3",
        name: "C4", 
        quality: "majorSeventh", 
        freqs: [261.626, 329.628, 391.995, 493.883, 130.813]
    }, 
    {
        bass: "G3",
        name: "G4", 
        quality: "dominantSeventh", 
        freqs: [391.995, 493.883, 587.33, 698.456, 195.998]
    },
    {
        bass: "A3",
        name: "A4", 
        quality: "minorSeventh", 
        freqs: [440, 523.251, 659.255, 783.991, 220]
    },
    {
        bass: "F3",
        name: "F4", 
        quality: "majorSeventh", 
        freqs: [349.228, 440, 523.251, 659.255, 174.614]
    }
]

const QUALITIES = {
    aug: "augmented",
    M: "major"
}

export default defaultChords
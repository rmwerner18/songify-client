
const keyNotes = [
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
    'B6'
]


const ionian = (melodyKey) => {
    let i = keyNotes.findIndex(note => note === melodyKey)
    return ([
        keyNotes[i],
        keyNotes[i+2],
        keyNotes[i+4],
        keyNotes[i+5],
        keyNotes[i+7],
        keyNotes[i+9],
        keyNotes[i+11],
        keyNotes[i+12]
    ])
}
const dorian = (melodyKey) => {
    let i = keyNotes.findIndex(note => note === melodyKey)
    return ([
        keyNotes[i],
        keyNotes[i+2],
        keyNotes[i+3],
        keyNotes[i+5],
        keyNotes[i+7],
        keyNotes[i+9],
        keyNotes[i+10],
        keyNotes[i+12]
    ])
}
const phrygian = (melodyKey) => {
    let i = keyNotes.findIndex(note => note === melodyKey)
    return ([
        keyNotes[i],
        keyNotes[i+1],
        keyNotes[i+3],
        keyNotes[i+5],
        keyNotes[i+7],
        keyNotes[i+8],
        keyNotes[i+10],
        keyNotes[i+12]
    ])
}
const lydian = (melodyKey) => {
    let i = keyNotes.findIndex(note => note === melodyKey)
    return ([
        keyNotes[i],
        keyNotes[i+2],
        keyNotes[i+4],
        keyNotes[i+6],
        keyNotes[i+7],
        keyNotes[i+9],
        keyNotes[i+11],
        keyNotes[i+12]
    ])
}
const mixolydian = (melodyKey) => {
    let i = keyNotes.findIndex(note => note === melodyKey)
    return ([
        keyNotes[i],
        keyNotes[i+2],
        keyNotes[i+4],
        keyNotes[i+5],
        keyNotes[i+7],
        keyNotes[i+9],
        keyNotes[i+10],
        keyNotes[i+12]
    ])
}
const aeolian = (melodyKey) => {
    let i = keyNotes.findIndex(note => note === melodyKey)
    return ([
        keyNotes[i],
        keyNotes[i+2],
        keyNotes[i+3],
        keyNotes[i+5],
        keyNotes[i+7],
        keyNotes[i+8],
        keyNotes[i+10],
        keyNotes[i+12]
    ])
}
const locrian = (melodyKey) => {
    let i = keyNotes.findIndex(note => note === melodyKey)
    return ([
        keyNotes[i],
        keyNotes[i+1],
        keyNotes[i+3],
        keyNotes[i+5],
        keyNotes[i+6],
        keyNotes[i+8],
        keyNotes[i+10],
        keyNotes[i+12]
    ])
}


const modes = {
    ionian: ionian,
    dorian: dorian,
    phrygian: phrygian,
    lydian: lydian,
    mixolydian: mixolydian,
    aeolian: aeolian,
    locrian: locrian
}

export default modes
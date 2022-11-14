import React from 'react'
import * as Tone from 'tone'
import player from '../player'
import { setNumOfEigthNotes } from '../helper_functions.js/set_num_of_eigth_notes'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { setNowPlaying } from '../actions/set_now_playing'
import { endNowPlaying } from '../actions/end_now_playing'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 
// import { createSelector } from '@reduxjs/toolkit'
// import { useSelector } from 'react-redux'
// import { useEffect } from 'react'

var Octavian = require('octavian')

// const getCurrentSong = state => state.currentSong

// const getCurrentSongWithFrequencies = createSelector(
//     [getCurrentSong], currentSong => {
//         const freqs = currentSong.chords.map(chord => {
//             const createChord = (name, qual) => {
//                 let chord
//                 if (qual === "augmented") {
//                     chord = new Octavian.Chord(name)
//                     chord.addInterval('majorThird')
//                     chord.addInterval('minorSixth')
//                 } else if (qual === "5") {
//                     chord = new Octavian.Chord(name)
//                     chord.addInterval('perfectFifth')
//                     chord.addInterval('perfectOctave')
//                 } else {
//                     chord = new Octavian.Chord(name, qual)
//                 }
//                 return chord
//             }

//             const getFrequencies = (bass, name, qual) => {
//                 let chord = createChord(name, qual)
//                 let freqs = chord.frequencies
//                 let b = new Octavian.Note(bass)
//                 freqs.push(b.frequency)
//                 return freqs
//             }

//             return getFrequencies(chord.bass, chord.name, chord.quality)
//         }) 
//         return { ...currentSong, freqs }
//     }
// )

class PlayButton extends React.Component {
 
    // const currentSong = useSelector(getCurrentSongWithFrequencies)

    // useEffect(() => {
    // }, [currentSong])

    playerCaller = (index, time) => {
        return player(index, time, { ...this.props.sounds, ...this.props.song })
    }

    startLoop = () => {
        // console.log(currentSong)
        let array = []
        setNumOfEigthNotes(32, array)
        new Tone.Sequence((time, index) => {
            this.playerCaller(index, time)
        }, array).start(0)
        Tone.Transport.start();
    }

    playHandler = (e) => {
        if (Tone.Transport.state === "stopped") {
            Tone.Destination.context.resume().then(() => {
                this.startLoop()
            })
            this.props.setNowPlaying({song: 'current song'})
        } else {
            stopLoop()
            this.props.endNowPlaying()
        }
    }

    render() {
        return (
            <div className='grid-start-button-container'>
                <button id='grid-start-button' onClick={(e) => this.playHandler(e)}>
                        {this.props.nowPlaying.song 
                        ? <FontAwesomeIcon icon={solid('pause')} className='font-awesome'/> 
                        : <FontAwesomeIcon icon={solid('play')} />}
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {

    const freqs = state.currentSong.chords.map(chord => {
        const createChord = (name, qual) => {
            let chord
            if (qual === "augmented") {
                chord = new Octavian.Chord(name)
                chord.addInterval('majorThird')
                chord.addInterval('minorSixth')
            } else if (qual === "5") {
                chord = new Octavian.Chord(name)
                chord.addInterval('perfectFifth')
                chord.addInterval('perfectOctave')
            } else {
                chord = new Octavian.Chord(name, qual)
            }
            return chord
        }
        const getFrequencies = (bass, name, qual) => {
            let chord = createChord(name, qual)
            let freqs = chord.frequencies
            let b = new Octavian.Note(bass)
            freqs.push(b.frequency)
            return freqs
        }

        return getFrequencies(chord.bass, chord.name, chord.quality)
    })


    return {
        sounds: state.sounds,
        song: { ...state.currentSong, freqs },
        user: state.user,
        nowPlaying: state.nowPlaying
    }
}

export default connect(mapStateToProps, { setNowPlaying, endNowPlaying })(PlayButton)
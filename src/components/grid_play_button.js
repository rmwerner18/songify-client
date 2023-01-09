import React from 'react'
import * as Tone from 'tone'
import player from '../player'
import { setNumOfEigthNotes } from '../helper_functions.js/set_num_of_eigth_notes'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { setNowPlaying } from '../actions/set_now_playing'
import { endNowPlaying } from '../actions/end_now_playing'
import { setCurrentSong } from '../actions/set_current_song'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { setCurrentBeat } from '../actions/set_current_beat'
import { clearCurrentBeat } from '../actions/clear_current_beat'

var Octavian = require('octavian')

const getCurrentSong = state => state.currentSong

const getCurrentSongWithFrequencies = createSelector(
    [getCurrentSong], currentSong => {
        const freqs = currentSong.chords.map(chord => {
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
        return { ...currentSong, freqs }
    }
)

const GridPlayButton = props => {
 
    let currentSong = useSelector(getCurrentSongWithFrequencies)
    const sounds = useSelector(state => state.sounds)
    const nowPlaying = useSelector(state => state.nowPlaying)
    const songRef = useRef(currentSong)

    const dispatch = useDispatch()

    useEffect(() => {
        songRef.current = currentSong
    }, [currentSong])

    const playerCaller = (index, time) => {
        return player(index, time, { ...sounds, ...songRef.current})
    }

    const startLoop = () => {
        let array = []
        setNumOfEigthNotes(32, array)
        new Tone.Sequence((time, index) => {
            playerCaller(index, time)
            dispatch(setCurrentBeat(index))
        }, array).start(0)
        Tone.Transport.start();
    }

    const playHandler = (e) => {
        if (Tone.Transport.state === "stopped") {
            Tone.Destination.context.resume().then(() => {
                startLoop()
            })
            dispatch(setNowPlaying({song: 'current song'}))
        } else {
            stopLoop()
            dispatch(clearCurrentBeat())
            dispatch(endNowPlaying())
        }
    }

    return (
        <div className='start-button-container'>
            <button className='grid start-button' onClick={(e) => playHandler(e)}>
                    {nowPlaying.song 
                    ? <FontAwesomeIcon icon={solid('pause')} className='font-awesome'/> 
                    : <FontAwesomeIcon icon={solid('play')} />}
            </button>
        </div>
    )
}

export default GridPlayButton
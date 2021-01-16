import React from 'react'
import Chord from '../components/chord'
import { connect } from 'react-redux'

const ChordsContainer = props => {
    
    const showChords = () => {
        return props.song.chords.map((chord, index) => {
            return <Chord id={index} key={index}/>
        })
    }

    return (
        <div className="chord-container">
            {showChords()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        song: state.currentSong
    }
}

export default connect(mapStateToProps)(ChordsContainer)
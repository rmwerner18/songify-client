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

class PlayButton extends React.Component {
    playerCaller = (index, time) => {
        // const newObj = Object.assign({}, this.props.sounds, this.props.song)
        // const songProps = { ...this.props.sounds, ...this.props.song }
        return player(index, time, { ...this.props.sounds, ...this.props.song })
    }

    startLoop = () => {
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
    return {
        sounds: state.sounds,
        song: state.currentSong,
        user: state.user,
        nowPlaying: state.nowPlaying
    }
}

export default connect(mapStateToProps, { setNowPlaying, endNowPlaying })(PlayButton)

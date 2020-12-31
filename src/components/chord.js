import React from 'react';
import ChordForm from './chord_form'
import { connect } from 'react-redux'


class Chord extends React.Component {
    state = {
        modalIsOpen: false
    }

    clickHandler = () => {
        this.setState({modalIsOpen: true})
    }

    closeHandler = () => {
        this.setState({modalIsOpen: false})
    }

    render() {
        console.log(this.state)
        return (
        <>
            {this.state.modalIsOpen ?
            <div id={`chord-form-modal-${this.props.id}`} className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.closeHandler}>&times;</span>
                    <div>
                        {<ChordForm id={this.props.id} chord={this.props.chord} closeHandler={this.closeHandler}/>}
                    </div>
                </div>
            </div>
            :
            null
            }
            <div className="chord-box" onClick={this.clickHandler}>
                <span className="chord-name">
                    {this.props.chords[this.props.id].formattedName} {this.props.chords[this.props.id].formattedQuality} 
                    {this.props.chords[this.props.id].bass.length > 0 ? "/" + this.props.chords[this.props.id].formattedBass : null}
                </span>
            </div>
        </>
    )}
}

const mapStateToProps = state => {
    return {
        chords: state.currentSong.chords
    }
}

export default connect(mapStateToProps)(Chord)
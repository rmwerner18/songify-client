import React from 'react';

class TempoForm extends React.Component {
    state = {
        bpm: this.props.bpm
    }
    changeHandler = (e) => {
        console.log("FORM", e.target.value)
        this.setState({bpm: e.target.value})
        this.props.changeHandler(e.target.value)
    }
    render() {
        return (
            <>
                <input type="range" min="30" max='300' value={this.state.bpm} onChange={this.changeHandler}/>
                <p className="bpm-meter">bpm: {this.state.bpm}</p>
            </>
        )
    }
}

export default TempoForm

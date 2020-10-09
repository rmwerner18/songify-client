import { render } from '@testing-library/react'
import React from 'react'

class BeatForm extends React.Component {
    state = {
        hhBeats: [],
        snareBeats: [],
        kickBeats: []
    }

    changeHandler = (e, beats) => {
        console.log(e.target.id)
        let newArray = beats 
        if (beats.includes(parseInt(e.target.id))) {
            let index = newArray.findIndex(n => n === parseInt(e.target.id))
            newArray.splice(index, 1)
        } else {
            newArray.push(parseInt(e.target.id))
            console.log(newArray)
        }
        this.setState({[e.target.name]: newArray})
        this.props.changeHandler(e.target.name, newArray)
    }

    makeHHRows = () => {
        let array = []
        for (let i=0; i<32; i++) {
            array.push(i)
        }
        return array.map(n => <input type="checkbox" checked={this.state.hhBeats.includes(n)} name="hhBeats" id={n} onChange={(e) => this.changeHandler(e, this.state.hhBeats)}/>)
    }

    makeSnareRows = () => {
        let array = []
        for (let i=0; i<32; i++) {
            array.push(i)
        }
        return array.map(n => <input type="checkbox" checked={this.state.snareBeats.includes(n)} name="snareBeats" id={n} onChange={(e) => this.changeHandler(e, this.state.snareBeats)}/>)
    }

    makeKickRows = () => {
        let array = []
        for (let i=0; i<32; i++) {
            array.push(i)
        }
        return array.map(n => <input type="checkbox" checked={this.state.kickBeats.includes(n)} name="kickBeats" id={n} onChange={(e) => this.changeHandler(e, this.state.kickBeats)}/>)
    }

    render() {
        return(
            <>
            <div>   
                {this.makeHHRows()}
            </div>
            <div>
                {this.makeSnareRows()}
            </div>
            <div>
                {this.makeKickRows()}
            </div>
            </>
        )
    }
}

export default BeatForm
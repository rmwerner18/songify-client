import React from 'react'
import Grid from './grid'

const GridPage = props => {
    return (
        <div className='grid-page'>
            {props.song_id ? <h1>Edit</h1> : <h1>Create a Song</h1>}
            <Grid song_id={props.song_id ? props.song_id : null} />
        </div>
    )
}

export default GridPage
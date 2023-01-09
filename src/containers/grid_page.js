import React from 'react'
import Grid from './grid'
import SongOptionsContainer from './song_options_container'

const GridPage = props => {
    return (
        <div className='grid-page'>
            <SongOptionsContainer song_id={props.song_id ? props.song_id : null} />
            <Grid song_id={props.song_id ? props.song_id : null} />
        </div>
    )
}

export default GridPage
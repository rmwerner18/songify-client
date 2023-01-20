import React from 'react'
import Grid from './grid'
import GridOptionsContainer from './grid_options_container'

const GridPage = props => {
    return (
        <div className='grid-page'>
            <GridOptionsContainer song_id={props.song_id ? props.song_id : null} />
            <Grid song_id={props.song_id ? props.song_id : null} />
        </div>
    )
}

export default GridPage
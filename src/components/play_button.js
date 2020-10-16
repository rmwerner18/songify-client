import React from 'react'

const PlayButton = (props) => {
    return (
        <div onClick={props.clickHandler}className='start-button'>
            <div id='pause'>
                <div className='line line_1'/>
                <div className='line line_2'/>
            </div>
            <div id='play'>
                <div className='line line_1'/>
                <div className='line line_2'/>
                <div className='line line_3'/>
            </div>
        </div>
    )
}

export default PlayButton
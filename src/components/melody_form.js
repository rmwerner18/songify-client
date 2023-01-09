import React from 'react'
import CheckboxRow from '../containers/checkbox_row'

const MelodyForm = () => {

    const beatTypes = [
        'IBeats',
        'viiBeats',
        'viBeats',
        'vBeats',
        'ivBeats',
        'iiiBeats',
        'iiBeats',
        'iBeats'
    ]

    return(
        <div className='melody-form'>
            <div className='melody-container'>
                <div className='melody-labels'>
                    <p>i</p>
                    <p>vii</p>
                    <p>vi</p>
                    <p>v</p>
                    <p>iv</p>
                    <p>iii</p>
                    <p>ii</p>
                    <p>i</p>
                </div>
                <div>
                    {beatTypes.map(beatType => <CheckboxRow beatType={beatType}/>)}
                </div>
            </div>
        </div>
    )
}

export default MelodyForm
import React, { useState } from 'react'
import SearchBar from '../components/search_bar'
import SongsContainer from './songs_container'

const SongsPage = () => {
    let [searchInput, setSearchInput] = useState('')

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <div className='songs-page'>
            <SearchBar searchInput={searchInput} handleSearch={handleSearch}/>
            <SongsContainer searchInput={searchInput}/>
        </div>
    )
}

export default SongsPage
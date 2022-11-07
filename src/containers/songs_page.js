import React, { useState, useEffect } from 'react'
import SearchBar from '../components/search_bar'
import SongsContainer from './songs_container'
import { connect, useSelector } from 'react-redux'
import { fetchSongs } from '../actions/set_all_songs'

const SongsPage = (props) => {
    let [page, setPage] = useState('ALL_SONGS')
    let songs = useSelector(state => state.allSongs)
    const user = useSelector(state => state.user)
    
    // console.log('render SongsPage')
    
    // let [searchInput, setSearchInput] = useState('')
    // const handleSearch = (e) => {
    //     setSearchInput(e.target.value)
    // }

    const filterSongs = page => {
        switch(page) {
            case 'USER_SONGS':
                songs = songs.filter(song => song.user.id === user.id)
                return songs
            case 'LIKED_SONGS':
                songs = songs.filter(song => song.likes.find(like => like.user_id === user.id))
                return songs
            default:
                return songs
        }
    }

    const setActiveClass = (pageName) => {
        if (page === pageName) {
            return "active"
        }
        return ""
    }

    useEffect(() => {
        songs = props.fetchSongs()
    }, [])

    filterSongs(page)


    return (
        <div className='songs-page'>
            <div className='songs-page-menu'>
                <div onClick={() => setPage('ALL_SONGS')} className={setActiveClass('ALL_SONGS')} >All Songs</div>
                <div onClick={() => setPage('USER_SONGS')} className={setActiveClass('USER_SONGS')} >Songs You've Created</div>
                <div onClick={() => setPage('LIKED_SONGS')} className={setActiveClass('LIKED_SONGS')} >Songs You've Liked</div>
            </div>
            <div className='songs-container-container'>
                {/* <SearchBar searchInput={searchInput} handleSearch={handleSearch}/> */}
                <SongsContainer songs={filterSongs(page)} user={user}/>
            </div>
        </div>
    )
}

export default connect(null, { fetchSongs })(SongsPage)
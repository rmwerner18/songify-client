import React, { useState, useEffect } from 'react'
import SongsContainer from './songs_container'
import { connect, useSelector } from 'react-redux'
import { fetchSongs } from '../actions/set_all_songs'

const SongsPage = (props) => {
    let [page, setPage] = useState('ALL_SONGS')
    let songs = useSelector(state => state.allSongs)
    const user = useSelector(state => state.user)
    // let filterSongsCompleted = false

    const filterSongs = page => {
        // filterSongsCompleted = true
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

    console.log(songs)

    // const renderNoSongsMessage = () => {
    //     switch(props.page) {
    //         case 'USER_SONGS':
    //             return (
    //                 <>
    //                     <h1>You have not created any songs.</h1>
    //                     <span>Click the 'Create' tab to create a new song.</span>
    //                 </>
    //             )
    //         case 'LIKED_SONGS':
    //             return (
    //                 <>
    //                     <h1>You have not liked any songs.</h1>
    //                     <span>Click the like icon on a song to see it appear here</span>
    //                 </>
    //             )
    //         default:
    //             return (
    //                 <>
    //                     <h1>No songs have been created</h1>
    //                     <span>Click the 'Create' tab to create a new song.</span>
    //                 </>
    //             )
    //     }
    // }

    filterSongs(page)

    // console.log(filterSongsCompleted)
    return (
        <div className='songs-page'>
            <div className='songs-page-menu'>
                <div onClick={() => setPage('ALL_SONGS')} className={setActiveClass('ALL_SONGS')} >All Songs</div>
                <div onClick={() => setPage('USER_SONGS')} className={setActiveClass('USER_SONGS')} >Songs You've Created</div>
                <div onClick={() => setPage('LIKED_SONGS')} className={setActiveClass('LIKED_SONGS')} >Songs You've Liked</div>
            </div>
            <div className='songs-container-container'>
                <SongsContainer songs={songs} user={user} page={page}/>
            </div>
        </div>
    )
}

export default connect(null, { fetchSongs })(SongsPage)
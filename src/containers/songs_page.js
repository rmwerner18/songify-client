import React, { useState, useEffect, useRef } from 'react'
import SongsContainer from './songs_container'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSongs } from '../actions/set_all_songs'

const SongsPage = () => {
    let [page, setPage] = useState('ALL_SONGS')
    const songs = useSelector(state => state.allSongs)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const filterSongs = page => {
        if (songs !== 'loading') {           
            switch(page) {
                case 'USER_SONGS':
                    return songs.filter(song => song.user.id === user.id)  
                case 'LIKED_SONGS':
                    return songs.filter(song => song.likes.find(like => like.user_id === user.id))
                default:
                    return songs
            }
        }
    }

    const setActiveClass = (pageName) => {
        if (page === pageName) {
            return "active"
        }
        return ""
    }

    useEffect(() => {
        dispatch(fetchSongs())
    }, [])

    return (
        <div className='songs-page'>
            <div className='songs-page-menu'>
                <div onClick={() => setPage('ALL_SONGS')} className={setActiveClass('ALL_SONGS')} >All Songs</div>
                {user.id ?
                <>
                    <div onClick={() => setPage('USER_SONGS')} className={setActiveClass('USER_SONGS')} >Songs You've Created</div>
                    <div onClick={() => setPage('LIKED_SONGS')} className={setActiveClass('LIKED_SONGS')} >Songs You've Liked</div>
                </>
                :
                null}
            </div>
            <div className='songs-container-container'>
                <SongsContainer songs={filterSongs(page)} user={user} page={page}/>
            </div>
        </div>
    )
}

export default SongsPage
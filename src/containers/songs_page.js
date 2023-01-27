import React, { useState, useEffect } from 'react';
import SongsContainer from './songs_container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../actions/set_all_songs';
import VolumeForm from '../components/volume_form';

const SongsPage = () => {
  let [page, setPage] = useState('ALL_SONGS');
  const songs = useSelector((state) => state.allSongs.songs);
  const songsLoaded = useSelector((state) => state.allSongs.loaded);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const filterSongs = (page) => {
    switch (page) {
      case 'USER_SONGS':
        return songs.filter((song) => song.user.id === user.id);
      case 'LIKED_SONGS':
        return songs.filter((song) =>
          song.likes.find((like) => like.user_id === user.id)
        );
      default:
        return songs;
    }
  };

  const setActiveClass = (pageName) => {
    if (page === pageName) {
      return 'active';
    }
    return '';
  };

  useEffect(() => {
    dispatch(fetchSongs());
  }, []);

  return (
    <div className='songs-page'>
      <div className='songs-page-menu'>
        <div
          onClick={() => setPage('ALL_SONGS')}
          className={setActiveClass('ALL_SONGS')}
        >
          All Songs
        </div>
        {user.id ? (
          <>
            <div
              onClick={() => setPage('USER_SONGS')}
              className={setActiveClass('USER_SONGS')}
            >
              Songs You've Created
            </div>
            <div
              onClick={() => setPage('LIKED_SONGS')}
              className={setActiveClass('LIKED_SONGS')}
            >
              Songs You've Liked
            </div>
          </>
        ) : null}
      </div>
      <div className='songs-container-container'>
        <SongsContainer
          songsObject={{ songs: filterSongs(page), loaded: songsLoaded }}
          user={user}
        />
      </div>
      <div className='volume-form-container'>
        <VolumeForm />
      </div>
    </div>
  );
};

export default SongsPage;

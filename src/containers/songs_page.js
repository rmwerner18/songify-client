import React, { useState, useEffect } from 'react';
import SongsContainer from './songs_container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../actions/set_all_songs';
import VolumeForm from '../components/volume_form';
import AddPlaylistButton from '../components/add_playlist_icon';
import { fetchPlaylists } from '../actions/fetch_playlists';

const SongsPage = ({ playlistId = false }) => {
  let [page, setPage] = useState('ALL_SONGS');
  const songsLoaded = useSelector((state) => state.allSongs.loaded);
  const allSongs = useSelector((state) => state.allSongs.songs);
  const loadError = useSelector((state) => state.allSongs.error);
  const user = useSelector((state) => state.user);
  const playlists = useSelector((state) => state.playlists);
  const dispatch = useDispatch();

  const songs = playlistId
    ? playlists[playlistId].songs
    : allSongs

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

  const showPlaylists = () => {
    return playlists.map((playlist) => {
      return <p>{playlist.name}</p>;
    });
  };

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchPlaylists());
  }, []);

  return (
    <div className='songs-page'>
      <div className='songs-page-menu'>
        <div
          onClick={() => setPage('ALL_SONGS')}
          className={`menu-option ${setActiveClass('ALL_SONGS')}`}
        >
          All Songs
        </div>
        {user.id ? (
          <>
            <div
              onClick={() => setPage('USER_SONGS')}
              className={`menu-option ${setActiveClass('USER_SONGS')}`}
            >
              Songs You've Created
            </div>
            <div
              onClick={() => setPage('LIKED_SONGS')}
              className={`menu-option ${setActiveClass('LIKED_SONGS')}`}
            >
              Songs You've Liked
            </div>
          </>
        ) : null}
        <div className='playlist-section'>
          <div className='playlist-section-label'>
            <p>Playlists:</p>
            <AddPlaylistButton />
          </div>
          {showPlaylists()}
        </div>
        <div className='volume-form-container'>
          <VolumeForm />
        </div>
      </div>
      <div className='songs-container-container'>
        {playlistId ? (
          <SongsContainer
            songsObject={{
              songs: filterSongs(page),
              loaded: songsLoaded,
              error: loadError,
            }}
            playlistId={playlistId}
            user={user}
          />
        ) : (
          <SongsContainer
            songsObject={{
              songs: filterSongs(page),
              loaded: songsLoaded,
              error: loadError,
            }}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default SongsPage;

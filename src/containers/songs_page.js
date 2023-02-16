import React, { useState, useEffect } from 'react';
import SongsContainer from './songs_container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../actions/set_all_songs';
import VolumeForm from '../components/volume_form';
import AddPlaylistButton from '../components/add_playlist_icon';
import { fetchPlaylists } from '../actions/fetch_playlists';
import { NavLink } from 'react-router-dom';

const linkStyle = {
  color: 'var(--spotify-text)',
  textDecoration: 'none',
};

const activeLinkStyle = {
  color: '#fff',
};

const SongsPage = ({ type, playlistId = false }) => {
  const songsLoaded = useSelector((state) => state.allSongs.loaded);
  const songs = useSelector((state) => state.allSongs.songs);
  const loadError = useSelector((state) => state.allSongs.error);
  const user = useSelector((state) => state.user);
  const playlists = useSelector((state) => state.playlists);
  const dispatch = useDispatch();

  const filterSongs = () => {
    switch (type) {
      case 'user':
        return songs.filter((song) => song.user.id === user.id);
      case 'liked':
        return songs.filter((song) =>
          song.likes.find((like) => like.user_id === user.id)
        );
      case 'playlist':
        return songs.filter((song) => {
          song.playlists.find((playlist) => playlist.user_id === playlist.id);//fix this later
        });
      default:
        return songs;
    }
  };

  const showPlaylists = () => {
    return playlists.map((playlist) => {
      return (
        <NavLink
          to={'/playlists/' + playlist.id}
          exact
          style={linkStyle}
          activeStyle={activeLinkStyle}
        >
          <div>{playlist.name}</div>
        </NavLink>
      );
    });
  };

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchPlaylists());
  }, []);

  return (
    <div className='songs-page'>
      <div className='songs-page-menu'>
        <NavLink
          to='/songs'
          exact
          style={linkStyle}
          activeStyle={activeLinkStyle}
          className={`menu-option ${type === 'all' && 'active'}`}
        >
          All Songs
        </NavLink>
        <br />
        {user.id ? (
          <>
            <NavLink
              to={`/users/${user.id}/songs`}
              exact
              style={linkStyle}
              activeStyle={activeLinkStyle}
              className={`menu-option ${type === 'user' && 'active'}`}
            >
              Songs You've Created
            </NavLink>
            <br />
            <NavLink
              to={`/user/${user.id}/likes`}
              exact
              style={linkStyle}
              activeStyle={activeLinkStyle}
              className={`menu-option ${type === 'liked' && 'active'}`}
            >
              Songs You've Liked
            </NavLink>
            <br />
          </>
        ) : null}
        <div className='playlist-section'>
          <div className='playlist-section-label'>
            <p>Playlists:</p>
            <AddPlaylistButton />
          </div>
          {showPlaylists()}
        </div>
      </div>
      <div className='songs-container-container'>
        {playlistId ? (
          <SongsContainer
            songsObject={{
              songs: filterSongs(),
              loaded: songsLoaded,
              error: loadError,
            }}
            playlistId={playlistId}
            user={user}
          />
        ) : (
          <SongsContainer
            songsObject={{
              songs: filterSongs(),
              loaded: songsLoaded,
              error: loadError,
            }}
            user={user}
          />
        )}
      </div>
      <div className='volume-form-container'>
        <VolumeForm />
      </div>
    </div>
  );
};

export default SongsPage;

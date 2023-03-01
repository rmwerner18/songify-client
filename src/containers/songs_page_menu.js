import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddPlaylistButton from '../components/add_playlist_button';

const SongsPageMenu = ({ type }) => {
  const user = useSelector((state) => state.user);
  const playlists = user.playlists || []

  const linkStyle = {
    color: 'var(--spotify-text)',
    textDecoration: 'none',
  };

  const activeLinkStyle = {
    color: '#fff',
  };

  const showPlaylists = () => {
    return playlists.map((playlist) => {
      return (
        <NavLink
          to={'/songs/playlists/' + playlist.id}
          exact
          style={linkStyle}
          activeStyle={activeLinkStyle}
        >
          <div>
            {playlist.name} {playlist.id}
          </div>
        </NavLink>
      );
    });
  };

  return (
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
            to={`/songs/users/${user.id}`}
            exact
            style={linkStyle}
            activeStyle={activeLinkStyle}
            className={`menu-option ${type === 'user' && 'active'}`}
          >
            Your Songs
          </NavLink>
          <br />
          <NavLink
            to={`/songs/user/${user.id}/likes`}
            exact
            style={linkStyle}
            activeStyle={activeLinkStyle}
            className={`menu-option ${type === 'liked' && 'active'}`}
          >
            Liked Songs
          </NavLink>
          <br />
        </>
      ) : null}
      <div className='playlist-section'>
        <div className='playlist-section-label'>
          <p>Playlists:</p>
          <AddPlaylistButton playlists={playlists} />
        </div>
        {showPlaylists()}
      </div>
    </div>
  );
};

export default SongsPageMenu
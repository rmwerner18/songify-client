import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddPlaylistButton from '../components/add_playlist_button';
import { Menu, Divider } from '@mantine/core';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SongsPageMenu = ({ type }) => {
  const user = useSelector((state) => state.user);
  const playlists = useSelector((state) => state.allPlaylists.playlists);

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
        <div className='playlist-list-name menu-option'>
          <NavLink
            to={'/songs/playlists/' + playlist.id}
            exact
            style={linkStyle}
            activeStyle={activeLinkStyle}
          >
            <div>{playlist.name}</div>
          </NavLink>
          <Menu trigger='click'>
            <Menu.Target>
              <FontAwesomeIcon icon={solid('ellipsis')} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Rename</Menu.Item>
              <Menu.Item>Delete</Menu.Item>
              <Menu.Item>Play</Menu.Item>
              <Menu.Item>Duplicate</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
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
        <Divider size='xs' />
        <AddPlaylistButton playlists={playlists} />
        {showPlaylists()}
      </div>
    </div>
  );
};

export default SongsPageMenu;

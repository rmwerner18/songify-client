import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SongPlayButton from './play_buttons/song_play_button';
import SongOptionsContainer from '../containers/song_options_container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import SongDropdownMenu from './song_dropdown_menu';
import { Menu } from '@mantine/core';

const Song = ({ idx, song, playlistId }) => {
  const user = useSelector((state) => state.user);
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <div
      className={mouseOver ? 'song-box active' : 'song-box'}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => {
        setMouseOver(false);
      }}
    >
      <div className='song-number'>
        <SongPlayButton id={song.id} mouseOver={mouseOver} idx={idx} />
      </div>
      <h2 className='song-title'>{song.name}</h2>
      <p className='song-maker'>{song.user.username}</p>
      <span className='song-likes' id={`like-count-${song.id}`}>
        {song.likes.length}
      </span>
      <SongOptionsContainer song={song} />
      {mouseOver && user.id && (
        <Menu trigger='hover' keepMounted>
          <Menu.Target>
            <FontAwesomeIcon
              icon={solid('ellipsis')}
              className='font-awesome'
            />
          </Menu.Target>
          <SongDropdownMenu songId={song.id} playlistId={playlistId} />
        </Menu>
      )}
    </div>
  );
};

export default Song;

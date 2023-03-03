import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SongPlayButton from './play_buttons/song_play_button';
import SongOptionsContainer from '../containers/song_options_container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { setSongDropdown } from '../actions/set_song_dropdown';

const Song = ({ idx, song }) => {
  const user = useSelector((state) => state.user);
  const [mouseOver, setMouseOver] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      className={mouseOver ? 'song-box active' : 'song-box'}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => {
        setMouseOver(false);
        setDropdownOpen(false);
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
      {mouseOver && (
        <FontAwesomeIcon
          icon={solid('ellipsis')}
          className='font-awesome'
          onClick={(e) =>
            dispatch(
              setSongDropdown({ songId: song.id, x: e.clientX, y: e.clientY })
            )
          }
        />
      )}
    </div>
  );
};

export default Song;

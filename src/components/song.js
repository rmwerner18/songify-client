import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SongPlayButton from './play_buttons/song_play_button';
import SongOptionsContainer from '../containers/song_options_container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const Song = ({ idx, deleteHandler, likeHandler, song }) => {
  const user = useSelector((state) => state.user);
  const like = song.likes.find((like) => like.user_id === user.id);
  const [userLikesSong, setUserLikesSong] = useState(null);
  const [likes, setLikes] = useState(song.likes.length);
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    setUserLikesSong(!!like);
  }, [like]);

  const songLikeHandler = (e, id) => {
    userLikesSong ? setLikes(likes - 1) : setLikes(likes + 1);
    setUserLikesSong(!userLikesSong);
    likeHandler(e, song.id);
  };

  return (
    <div
      className={mouseOver ? 'song-box active' : 'song-box'}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <div className='song-number'>
        <SongPlayButton id={song.id} mouseOver={mouseOver} idx={idx} />
      </div>
      <h2 className='song-title'>{song.name}</h2>
      <p className='song-maker'>{song.user.username}</p>
      <span className='song-likes' id={`like-count-${song.id}`}>
        {likes}
      </span>
      <SongOptionsContainer
        deleteHandler={deleteHandler}
        song={song}
        likeHandler={songLikeHandler}
        user={user}
        userLikesSong={userLikesSong}
      />
      <FontAwesomeIcon icon={solid('ellipsis')} className='font-awesome' />
    </div>
  );
};

export default Song;

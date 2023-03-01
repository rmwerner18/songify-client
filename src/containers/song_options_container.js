import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteAndEditButtons from '../components/delete_and_edit_buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { setAllSongs } from '../actions/set_all_songs';
import { fetchHeaders } from '../constants/fetch_headers';
import BASE_API_URL from '../constants/base_api_url';

const SongOptionsContainer = ({ song }) => {
  const user = useSelector((state) => state.user);
  const songBelongsToUser = () => song.user.id === user.id && user.id;
  const dispatch = useDispatch();

  const like = () => {
    return song.likes.find((like) => like.user_id === user.id);
  };

  const deleteLike = async (like) => {
    const fetchConfig = {
      method: 'DELETE',
      headers: fetchHeaders,
    };
    const res = await fetch(BASE_API_URL + 'likes/' + like.id, fetchConfig);
    const songs = await res.json();
    dispatch(setAllSongs(songs));
  };

  const createLike = async () => {
    const fetchConfig = {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({
        song_id: song.id,
        user_id: user.id,
      }),
    };
    const res = await fetch(BASE_API_URL + 'likes/', fetchConfig);
    const songs = await res.json();
    dispatch(setAllSongs(songs));
  };

  const likeHandler = () => {
    if (user.id) {
      if (like()) {
        deleteLike(like());
      } else {
        createLike();
      }
    }
  };

  const songOptions = () => {
    return (
      <div className='song-options'>
        {songBelongsToUser() ? <DeleteAndEditButtons id={song.id} /> : null}
        {like() ? (
          <FontAwesomeIcon
            icon={solid('thumbs-up')}
            className='like-button font-awesome'
            onClick={likeHandler}
          />
        ) : (
          <FontAwesomeIcon
            icon={regular('thumbs-up')}
            className='like-button font-awesome'
            onClick={likeHandler}
          />
        )}
      </div>
    );
  };

  return user.id ? songOptions() : null;
};

export default SongOptionsContainer;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import BASE_API_URL from '../constants/base_api_url';
import { fetchHeaders } from '../constants/fetch_headers';
import { fetchPlaylists } from '../actions/fetch_playlists';

const PlaylistHeader = ({ playlist }) => {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [nameValidationMessage, setNameValidationMessage] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.length === 0) {
      return setNameValidationMessage(true);
    }

    const fetchConfig = {
      method: 'PATCH',
      headers: fetchHeaders,
      body: JSON.stringify(formData),
    };

    const res = await fetch(
      BASE_API_URL + 'playlists/' + playlist,
      fetchConfig
    );
    dispatch(fetchPlaylists());
    setFormData({ name: '' });
    setModal(false);
  };

  const handleChange = (e) => {
    if (nameValidationMessage) {
      setNameValidationMessage(false);
    }
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      {modal && (
        <div className='modal'>
          <div className='modal-content'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='playlist-detail-form'>
                {nameValidationMessage && (
                  <span style={{ color: 'red' }}>
                    Playlist Must Have A Name
                  </span>
                )}
                <input
                  type='text'
                  id='name'
                  placeholder='playlist name'
                  value={formData.name}
                  onChange={(e) => handleChange(e)}
                />
                {/* <textarea
                  type='text'
                  id='description'
                  placeholder='description'
                  value={formData.description}
                  onChange={(e) => handleChange(e)}
                /> */}
              </div>
              <button type='submit'>save</button>
            </form>
          </div>
        </div>
      )}
      <div>
        <div className='playlist-image-container'>
          <img />
        </div>
        <div className='playlist-name-container'>
          <h1 onClick={() => setModal(true)}>{playlist.name}</h1>
        </div>
      </div>
    </>
  );
};

export default PlaylistHeader;

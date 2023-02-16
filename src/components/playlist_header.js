import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import BASE_API_URL from '../constants/base_api_url';
import { fetchHeaders } from '../constants/fetch_headers';
import { fetchPlaylists } from '../actions/fetch_playlists';

const PlaylistHeader = ({ playlist }) => {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchConfig = {
      method: 'PATCH',
      headers: fetchHeaders,
      body: JSON.stringify(formData)
    }

    const res = await fetch(BASE_API_URL + 'playlists/' + playlist.id, fetchConfig);
    // const resJson = await res.json()
    dispatch(fetchPlaylists())
    setModal(false);
    // console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      {modal && (
        <div className='modal'>
          <div className='modal-content'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='playlist-detail-form'>
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
      <h1 onClick={() => setModal(true)}>{playlist.name}</h1>
    </>
  );
};

export default PlaylistHeader;

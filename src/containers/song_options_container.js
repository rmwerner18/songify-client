import React from 'react'
import { useSelector } from 'react-redux'
import DeleteAndEditButtons from '../components/delete_and_edit_buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'

const SongOptionsContainer = ({id, deleteHandler, song, user, likeHandler, userLikesSong}) => {

 const songBelongsToUser = () => song.user.id === user.id && user.id

 const songOptions = () => {
  return <div className='song-options'>
   {songBelongsToUser() ? <DeleteAndEditButtons id={id} deleteHandler={deleteHandler}/> : null}
    {userLikesSong ? 
     <FontAwesomeIcon icon={solid('thumbs-up')} className='like-button font-awesome' onClick={e => likeHandler(e, id)}/>
     :
     <FontAwesomeIcon icon={regular('thumbs-up')} className='like-button font-awesome' onClick={e => likeHandler(e, id)}/>
    }
  </div> 
 }

 return user ? songOptions() : null
}


export default SongOptionsContainer
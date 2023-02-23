import React from 'react';
import * as Tone from 'tone';
import player from '../../player';
import { stopLoop } from '../../helper_functions/stop_loop';
import { setNowPlaying } from '../../actions/set_now_playing';
import { endNowPlaying } from '../../actions/end_now_playing';
import { setCurrentSong } from '../../actions/set_current_song';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import getCurrentSongWithFrequencies from '../../selectors/get_current_song_with_frequencies';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { numberOfBeatsArray } from '../../helper_functions/make_beat_array';

const SongPlayButton = (props) => {
  let currentSong = useSelector(getCurrentSongWithFrequencies);
  const allSongs = useSelector((state) => state.allSongs.songs);
  const sounds = useSelector((state) => state.sounds);
  const nowPlaying = useSelector((state) => state.nowPlaying);
  const user = useSelector((state) => state.user);
  const songRef = useRef(currentSong);

  const dispatch = useDispatch();

  console.log('render SONG PLAY BUTTON');

  useEffect(() => {
    songRef.current = currentSong;
  }, [currentSong]);

  const playerCaller = (index, time) => {
    return player(index, time, { ...sounds, ...songRef.current });
  };

  const startLoop = () => {
    new Tone.Sequence((time, index) => {
      playerCaller(index, time);
    }, numberOfBeatsArray).start(0);
    Tone.Transport.start();
  };

  const playHandler = (e) => {
    dispatch(setCurrentSong(allSongs.find((song) => song.id === props.id)));
    if (!nowPlaying.song) {
      // Tone.Destination.context.resume().then(() => {
      startLoop();
      // })
      dispatch(
        setNowPlaying({ song: allSongs.find((song) => song.id === props.id) })
      );
    } else if (nowPlaying.song.id !== props.id) {
      stopLoop();
      dispatch(
        setNowPlaying({ song: allSongs.find((song) => song.id === props.id) })
      );
      startLoop();
    } else {
      stopLoop();
      dispatch(endNowPlaying());
    }
  };

  const displayIconOrNumber = () => {
    if (props.mouseOver) {
      if (nowPlaying.song && nowPlaying.song.id === props.id) {
        return (
          <FontAwesomeIcon icon={solid('pause')} className='font-awesome' />
        );
      } else {
        return <FontAwesomeIcon icon={solid('play')} />;
      }
    }
    if (nowPlaying.song && nowPlaying.song.id === props.id) {
      return (
        <FontAwesomeIcon icon={solid('volume-high')} className='font-awesome' />
      );
    }
    return props.idx + 1;
  };

  return (
    <div className='start-button-container'>
      <button className='song start-button' onClick={(e) => playHandler(e)}>
        {displayIconOrNumber()}
      </button>
    </div>
  );
};

export default SongPlayButton;

import React from 'react';
import * as Tone from 'tone';
import player from '../../player';
import { stopLoop } from '../../helper_functions/stop_loop';
import { setNowPlaying } from '../../actions/set_now_playing';
import { endNowPlaying } from '../../actions/end_now_playing';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setCurrentBeat } from '../../actions/set_current_beat';
import { clearCurrentBeat } from '../../actions/clear_current_beat';
import getCurrentSongWithFrequencies from '../../selectors/get_current_song_with_frequencies';
import { numberOfBeatsArray } from '../../helper_functions/make_beat_array';

const GridPlayButton = () => {

  let currentSong = useSelector(getCurrentSongWithFrequencies);
  const sounds = useSelector((state) => state.sounds);
  const nowPlaying = useSelector((state) => state.nowPlaying);
  const songRef = useRef(currentSong);

  const dispatch = useDispatch();

  useEffect(() => {
    songRef.current = currentSong;
  }, [currentSong]);

  const playerCaller = (index, time) => {
    return player(index, time, { ...sounds, ...songRef.current });
  };

  const startLoop = () => {
    new Tone.Sequence((time, index) => {
      playerCaller(index, time);
      dispatch(setCurrentBeat(index));
    }, numberOfBeatsArray).start(0);
    Tone.Transport.start();
  };

  const playHandler = (e) => {
    if (Tone.Transport.state === 'stopped') {
      Tone.Destination.context.resume().then(() => {
        startLoop();
      });
      dispatch(setNowPlaying({ song: 'current song' }));
    } else {
      stopLoop({ ...sounds, ...songRef.current });
      dispatch(clearCurrentBeat());
      dispatch(endNowPlaying());
      // player('index', 'time', { ...sounds, ...songRef.current }, true)
    }
  };

  return (
    <div className='start-button-container'>
      <button className='grid start-button' onClick={(e) => playHandler(e)}>
        {nowPlaying.song ? (
          <FontAwesomeIcon icon={solid('pause')} className='font-awesome' />
        ) : (
          <FontAwesomeIcon icon={solid('play')} />
        )}
      </button>
    </div>
  );
};

export default GridPlayButton;

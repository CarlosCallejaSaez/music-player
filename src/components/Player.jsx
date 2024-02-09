import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStop, FaForward, FaBackward, FaVolumeUp } from 'react-icons/fa';

const Player = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef();
  const imageRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;
    const image = imageRef.current;

    if (isPlaying) {
      audio.play();
      image.style.animationPlayState = 'running';
    } else {
      audio.pause();
      image.style.animationPlayState = 'paused';
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
    };

    const setInitialDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setInitialDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setInitialDuration);
    };
  }, []);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const stopHandler = () => {
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const nextSongHandler = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSongHandler = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  const volumeChangeHandler = (e) => {
    const value = e.target.value;
    setVolume(value);
    audioRef.current.volume = value;
  };

  const progressBarChangeHandler = (e) => {
    const value = e.target.value;
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="player">
      <div className="song-info">
        <h2>{songs[currentSongIndex].title}</h2>
        <p>{songs[currentSongIndex].artist}</p>
      </div>
      <div className="album-art">
        <img
          ref={imageRef}
          src={songs[currentSongIndex].cover}
          alt={`Cover for ${songs[currentSongIndex].title}`}
        />
      </div>
      <audio ref={audioRef} src={songs[currentSongIndex].src}></audio>
      <div className="controls">
        <FaBackward className="control-icon" onClick={prevSongHandler} />
        {isPlaying ? (
          <FaPause className="control-icon" onClick={playPauseHandler} />
        ) : (
          <FaPlay className="control-icon" onClick={playPauseHandler} />
        )}
        <FaStop className="control-icon" onClick={stopHandler} />
        <FaForward className="control-icon" onClick={nextSongHandler} />
      </div>
      <div className="progress-bar">
        <input
          type="range"
          value={currentTime}
          max={duration || 0}
          step={1}
          onChange={progressBarChangeHandler}
          ref={progressBarRef}
        />
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration - currentTime)}</span>
        </div>
      </div>
      <div className="volume">
        <FaVolumeUp className="volume-icon" />
        <input
          type="range"
          value={volume}
          max={1}
          step={0.01}
          onChange={volumeChangeHandler}
        />
      </div>
    </div>
  );
};

export default Player;

import React from 'react';
import { useState } from 'react';
import Player from './components/Player';
import './App.css';
import { FaLinkedin } from 'react-icons/fa';

const songs = [
  {
    title: 'Happy Song',
    artist: 'Pixabay',
    src: '../public/happy-song.mp3',
    cover: '../public/dvd-152917_1280.png'
  },
  {
    title: 'Legacy of Chopin',
    artist: 'Pixabay',
    src: '../public/assets/legacy-of-chopin.mp3',
    cover: '../public/dvd-152917_1280.png'
  },
  {
    title: 'Leva Eternity',
    artist: 'Pixabay',
    src: '../public/leva-eternity.mp3',
    cover: '../public/dvd-152917_1280.png'
  },
  {
    title: 'Good Night',
    artist: 'Pixabay',
    src: '../public/good-night.mp3',
    cover: '../public/dvd-152917_1280.png'
  },
 
  
];

const videos = [
  '../public/tunnel_-_124983 (720p).mp4',
  '../public/neon_-_21368 (360p).mp4',
  '../public/concert_-_1630 (360p).mp4',
  
];



function App() {

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const changeVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };
  return (
    <>
        <div className="header">
        <h1 className="title">Music Player Carlos Calleja</h1>
        <a href="https://www.linkedin.com/in/carlos-calleja-saez/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin
            className="linkedin-logo"
            size={30} 
          />
        </a>
      </div>

    
    <div className="app">
      
      
      <video
        autoPlay
        loop
        muted
        className="background-video"
        src={videos[currentVideoIndex]}
      ></video>
     
      <Player songs={songs} />
      <button className="change-video-button" onClick={changeVideo}>
        Change Background
      </button>
    </div>
    </>
  );
}

export default App;
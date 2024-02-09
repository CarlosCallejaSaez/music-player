import React from 'react';
import { useState } from 'react';
import Player from './components/Player';
import './App.css';
import { FaLinkedin } from 'react-icons/fa';

const songs = [
  {
    title: 'Song 1',
    artist: 'Artist 1',
    src: '../public/assets/song1.mp3',
    cover: '../public/assets/dvd-152917_1280.png'
  },
  {
    title: 'Good Night',
    artist: 'Artist 2',
    src: '../public/assets/good-night.mp3',
    cover: '../public/assets/dvd-152917_1280.png'
  },
 
  
];

const videos = [
  '../public/assets/neon_-_21368 (360p).mp4',
  '../public/assets/concert_-_1630 (360p).mp4',
  
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
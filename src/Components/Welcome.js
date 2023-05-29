import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import SignOut from '../Components/auth/SignOut';
import './../App.css'
import pinkRobot from './../assets/images/roseRobot-min.png';

const Welcome = ({ userProf }) => {
  const [user] = useAuthState(auth);
  const [joinUsername, setJoinUsername] = useState('');
  const [createGameName, setCreateGameName] = useState('');
  const navigate = useNavigate();

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    // Handle join form submission logic
    console.log('Join form submitted with username:', joinUsername);
    // Navigate to the joined game room
    navigate(`/gameroom/${joinUsername}`);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    // Handle create form submission logic
    console.log('Create form submitted with game name:', createGameName);
    // Navigate to the game creation lobby
    navigate('/hostgamelobby');
  };

  const handleCreateButtonClick = () => {
    // Handle game creation button click
    // Navigate to the game creation lobby
    navigate('/hostgamelobby');
  };

  return (
    <div>
      {user === null ? (
        <div className='welcomeContainer'>
          <h2 className='welcome'>{`Welcome ${userProf.displayName} !`}</h2>
          <div className="imgContainer">
            <img
              src={`${userProf.photoURL}`}
              alt={`robo avatar of ${userProf.displayName}`}
            />
          </div>

          <form className='welcomeForm' onSubmit={handleCreateSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter Game Room ID"
              value={joinUsername}
              onChange={(e) => setJoinUsername(e.target.value)}
              required
            />
            <input className='welcomeButton joinButton' type="submit" value="Join a Game" />
          </form>
          <button className='welcomeButton createButton'>Create a game</button>
        </div>
      ) : (
        <div className='welcomeContainer'>
          <h2 className='welcome'>{`Welcome ${user.displayName} !`}</h2>
          <div className="imgContainer">
            <img
              src={`${user.photoURL}`}
              alt={`robo avatar of ${user.displayName}`}
            />
          </div>

          <div className="gameOptions">
            <div className="formContainer">
              <button className='welcomeButton joinButton' type="submit" value="Join a Game">Join a Game</button>
              <form className='welcomeForm' onSubmit={handleJoinSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder=" Enter Game Room ID"
                  value={joinUsername}
                  onChange={(e) => setJoinUsername(e.target.value)}
                  required
                />
              </form>
            </div>
            <img src={pinkRobot} className="pinkRobotImg" alt="a pink robot standing" />
            <div className="createOption">
              <button className='welcomeButton createButton' onClick={handleCreateButtonClick}>Create a game</button>
            </div>
          </div>
        </div>
      )}
      <SignOut />
    </div>
  );
};

export default Welcome;

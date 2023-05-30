import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import SignOut from '../Components/auth/SignOut';
import './../App.css';
import pinkRobot from './../assets/images/roseRobot-min.png';

const Welcome = ({ userProf, error, sendError }) => {
  const [user] = useAuthState(auth);
  const [joinUsername, setJoinUsername] = useState('');

  const navigate = useNavigate();

  const handleJoinSubmit = (e) => {
    e.preventDefault();

    // Navigate to the joined game room
    navigate(`/gameroom/${joinUsername}`);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    // Navigate to the game creation lobby
    navigate('/hostgamelobby');
  };

  // Shows error message for 3 seconds
  if (error) {
    setTimeout(() => {
      sendError(false);
    }, 3000);
  }

  const handleCreateButtonClick = () => {
    // Handle game creation button click
    // Navigate to the game creation lobby
    navigate('/hostgamelobby');
  };

  return (
    <div>
      {user === null ? (
        <div className="welcomeContainer">
          <h2 className="welcome">{`Welcome ${userProf.displayName} !`}</h2>
          <div className="imgContainer">
            <img
              src={`${userProf.photoURL}`}
              alt={`robo avatar of ${userProf.displayName}`}
            />
          </div>

          <form className="welcomeForm" onSubmit={handleCreateSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter Game Room ID"
              value={joinUsername}
              onChange={(e) => setJoinUsername(e.target.value)}
              required
            />
            <input
              className="welcomeButton joinButton"
              type="submit"
              value="Join a Game"
            />
          </form>
          <button className="welcomeButton createButton">Create a game</button>
        </div>
      ) : (
        <div className="welcomeContainer">
          <h2 className="welcome">{`Welcome ${user.displayName} !`}</h2>
          <div className="imgContainer">
            <img
              src={`${user.photoURL}`}
              alt={`robo avatar of ${user.displayName}`}
            />
          </div>

          <div className="gameOptions">
          <div className="createOption">
              <button
                className="welcomeButton createButton"
                onClick={handleCreateButtonClick}
              >
                Create a game
              </button>
            </div>
            <img
              src={pinkRobot}
              className="pinkRobotImg"
              alt="a pink robot standing"
            />
            <div className="formContainer">
              <form className="welcomeForm" onSubmit={handleJoinSubmit}>
                <p className='joinText'>Join Existing Game</p>
                <input
                  type="text"
                  name="username"
                  placeholder=" Enter Game Room ID"
                  value={joinUsername}
                  onChange={(e) => setJoinUsername(e.target.value)}
                  required
                />
                <button
                  className="welcomeButton joinButton"
                  type="submit"
                  value="Join a Game"
                >
                  Play
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {error ? <h2>There was an Error in the API call. Try Again</h2> : null}
      <SignOut />
    </div>
  );
};

export default Welcome;

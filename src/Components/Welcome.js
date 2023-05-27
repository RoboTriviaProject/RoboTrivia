import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import SignOut from '../Components/auth/SignOut';

const Welcome = ({ userProf }) => {
  const [user] = useAuthState(auth);
  const [joinUsername, setJoinUsername] = useState('');
  const [createGameName, setCreateGameName] = useState('');
  const navigate = useNavigate();

  const handleJoinSubmit = (event) => {
    event.preventDefault();
    // Handle join form submission logic
    console.log('Join form submitted with username:', joinUsername);
    // Navigate to the joined game room
    navigate(`/gameroom/${joinUsername}`);
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
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
        <>
          <div className="imgContainer">
            <img
              src={`${userProf.photoURL}`}
              alt={`robo avatar of ${userProf.displayName}`}
            />
          </div>
          <h2>{`Welcome ${userProf.displayName}`}</h2>
          <form onSubmit={handleCreateSubmit}>
            <input
              type="text"
              name="username"
              placeholder="paste the game id"
              value={joinUsername}
              onChange={(e) => setJoinUsername(e.target.value)}
              required
            />
            <input type="submit" value="Join a Game" />
          </form>
          <button>Create a game</button>
        </>
      ) : (
        <>
          <div className="imgContainer">
            <img
              src={`${user.photoURL}`}
              alt={`robo avatar of ${user.displayName}`}
            />
          </div>
          <h2>{`Welcome ${user.displayName}`}</h2>
          <form onSubmit={handleJoinSubmit}>
            <input
              type="text"
              name="username"
              placeholder="paste the game id"
              value={joinUsername}
              onChange={(e) => setJoinUsername(e.target.value)}
              required
            />
            <input type="submit" value="Join a Game" />
          </form>
          <button onClick={handleCreateButtonClick}>Create a game</button>
        </>
      )}
      <SignOut />
    </div>
  );
};

export default Welcome;

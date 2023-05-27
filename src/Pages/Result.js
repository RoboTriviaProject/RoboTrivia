import React, { useState } from 'react';

const Results = () => {
  const [gameId, setGameId] = useState('');

  const generateGameId = () => {
    // Generate the game ID here
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const gameIdLength = 6;
    let newGameId = '';

    // Generate random characters to form the game ID
    for (let i = 0; i < gameIdLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newGameId += characters[randomIndex];
    }

    setGameId(newGameId);
  };

  const handleCopyJoinLink = () => {
    const joinLink = window.location.origin + `/join/${gameId}`;
    navigator.clipboard.writeText(joinLink);
  };

  return (
    <div>
      <h2>Results</h2>
      <button onClick={generateGameId}>Generate Game ID</button>
      {gameId && (
        <div>
          <p>Game ID: {gameId}</p>
          <button onClick={handleCopyJoinLink}>Copy Join Link</button>
          
        </div>
      )}
    </div>
  );
};

export default Results;
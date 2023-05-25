
import React from 'react';
import { Link } from 'react-router-dom';


const WaitingRoom = () => {
  return (
    <div>
      <h2>Waiting Room</h2>
      <p>Waiting for other players to join...</p>
      <Link to="/"></Link>
    </div>
  );
};

export default WaitingRoom;

// The useEffect hook is used to fetch the leaderboard data from Firebase when the component mounts and whenever the gameId prop changes
// It creates a reference to the Firebase Realtime Database based on the gameId.
// The onValue function listens for changes in the (leaderboard data) and triggers the callback function when the data is updated.
// Inside the callback function, the data from the snapshot is extracted and transformed into an array of leaderboard entries. (this might not be needed if its already done in firebase, I havent seen the firebase since you updated it)
// If the data is not null (i.e., leaderboard data exists), it is mapped into an array where each entry includes the playerId and other player data.
// The leaderboardData array is then set as the new state using the setLeaderboard function. If the data is null, indicating no leaderboard data, an empty array is set as the state.
// leaderboardListener is assuming we have a leaderboardRef in firebase for each gameId




import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase-config';

const Result = ({ gameId, score, userProf }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const leaderboardRef = ref(db, `gameSessions/${gameId}/leaderboard`);

    const leaderboardListener = onValue(leaderboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const leaderboardData = Object.entries(data).map(([playerId, playerData]) => ({
          playerId,
          ...playerData
        }));
        setLeaderboard(leaderboardData);
      } else {
        setLeaderboard([]);
      }
    });

    return () => {
      // Cleanup the listener when the component is unmounted
      leaderboardListener();
    };
  }, [gameId]);

  return (
    <div>
      <h2>Score: {score}</h2>
      <h3>User: {userProf.displayName}</h3>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Profile Pic</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={player.playerId}>
              <td>{index + 1}</td>
              <td><img src={userProf.photoURL} alt="Robo profile picture" /></td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
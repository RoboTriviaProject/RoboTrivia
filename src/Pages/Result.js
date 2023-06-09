import React, { useEffect, useState } from 'react';
import { ref, set, get, child, onValue } from 'firebase/database';
import { db } from '../firebase-config';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import SignOut from '../Components/auth/SignOut';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

const Result = ({ score }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [user] = useAuthState(auth);
  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameId && score !== undefined && user) {
      // Add this check
      const gameSessionRef = ref(db, `gameSessions/${gameId}`);
      const leaderboardRef = child(gameSessionRef, 'leaderboard');

      get(leaderboardRef).then((snapshot) => {
        if (snapshot.exists()) {
          // Leaderboard exists, add score
          const playerRef = child(leaderboardRef, user.uid);
          set(playerRef, {
            name: user.displayName,
            score: score,
            photoURL: user.photoURL,
          });
        } else {
          // Leaderboard does not exist, create it
          set(leaderboardRef, {
            [user.uid]: {
              name: user.displayName,
              score: score,
              photoURL: user.photoURL,
            },
          });
        }
      });

      const leaderboardListener = onValue(leaderboardRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const leaderboardData = Object.entries(data)
            .map(([playerId, playerData]) => ({
              playerId,
              ...playerData,
            }))
            // sort the scores in descending order
            .sort((a, b) => b.score - a.score);
          setLeaderboard(leaderboardData);
        } else {
          setLeaderboard([]);
        }
      });

      return () => {
        // Cleanup the listener when the component is unmounted
        leaderboardListener();
      };
    }
  }, [gameId, score, user]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleCopyGameId = () => {
    // Copy the game ID to the clipboard
    const gameIdInput = document.createElement('input');
    gameIdInput.value = gameId;
    document.body.appendChild(gameIdInput);
    gameIdInput.select();
    document.execCommand('copy');
    document.body.removeChild(gameIdInput);

    // Show a success message or perform any other desired action
    alert('Game ID copied to clipboard!');
  };

  return (
    <div className="resultFooter">
      <div className="resultContainer">
        <h2>Score: {score}</h2>
        <h3>User: {user ? user.displayName : 'Loading...'}</h3>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Avatar</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={player.playerId}>
                <td>{index + 1}</td>
                <td>
                  <img src={player.photoURL} alt="Player profile " />
                </td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="twoButtonsContainer">
          <button className="copyGameIdButton" onClick={handleCopyGameId}>
            Copy Game ID
          </button>
          <SignOut />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Result;

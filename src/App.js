import './App.css';
import Auth from './Components/auth/Auth';
import UserLogIn from './Components/auth/UserLogIn';
import Welcome from './Components/Welcome';
import SignOut from './Components/auth/SignOut';
import HostGameLobby from './Pages/HostGameLobby';
import GameRoom from './Pages/GameRoom';
import SignUp from './Components/auth/SignUp'
import Results from './Pages/Result';

import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const [user] = useAuthState(auth);
  const [userProf, setUserProf] = useState(null);
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [type, setType] = useState(null);
  const [gameId, setgameId] = useState('');
  const gameUrlRef = useRef(null);
  
  const handleStartQuiz = (
    selectedCategory,
    selectedDifficulty,
    selectedType,
    gameSessionID
  ) => {
    setCategory(selectedCategory);
    setDifficulty(selectedDifficulty);
    setType(selectedType);
    setgameId(gameSessionID);
  };

  const handleCopyGameUrl = () => {
    if (gameUrlRef.current) {
      gameUrlRef.current.select();
      document.execCommand("copy");
    }
  }

  return (
    <div className="hostLobby">
      <h1>Robo Trivia</h1>
      {!user ? (
        <Auth setUserProf={setUserProf} />
      ) : (
        <div>
          <Welcome userProf={userProf} />
          <SignOut
            setUserProf={setUserProf}
            setCategory={setCategory}
            setDifficulty={setDifficulty}
            setType={setType}
            setgameId={setgameId}
          />
          {category && difficulty && type ? (
            <GameRoom
              category={category}
              difficulty={difficulty}
              type={type}
              gameId={gameId}
            />
          ) : (
            <>
              <HostGameLobby handleStartQuiz={handleStartQuiz} />
              {gameId && (
                <div>
                  <p>Share Game ID with others:</p>
                  <input
                    type="text"
                    value={gameId}
                    ref={gameUrlRef}
                    readOnly
                  />
                  <button onClick={handleCopyGameUrl}>Copy</button>
                </div>
              )}
            </>
          )}
        </div>
      )}
          <Routes>
            <Route path="/hostgamelobby" element={<HostGameLobby />} />
            <Route path="/gameroom" element={<GameRoom />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/results" element={<Results />} />
          </Routes>
    </div>
  );
};

export default App;

import './App.css';
import Auth from './Components/auth/Auth';

import Welcome from './Components/Welcome';
import SignOut from './Components/auth/SignOut';
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HostGameLobby from './Pages/HostGameLobby';
import GameRoom from './Pages/GameRoom';

const App = () => {
  const [user] = useAuthState(auth);
  const [userProf, setUserProf] = useState(null);
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [type, setType] = useState(null);
  const [gameId, setgameId] = useState('');
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

  return (
    <div>
      <h1>Robo Trivia App</h1>
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
            <HostGameLobby handleStartQuiz={handleStartQuiz} />
          )}
          <Routes>
            <Route path="/hostgamelobby" element={<HostGameLobby />} />
            <Route path="/gameroom" element={<GameRoom />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;

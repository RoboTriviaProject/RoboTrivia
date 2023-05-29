import './App.css';
import Auth from './Components/auth/Auth';
import Welcome from './Components/Welcome';
import SignOut from './Components/auth/SignOut';
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HostGameLobby from './Pages/HostGameLobby';
import GameRoom from './Pages/GameRoom';
import Header from './Components/Header';
import Result from './Pages/Result';

const App = () => {
  const [user] = useAuthState(auth);
  const [userProf, setUserProf] = useState(null);
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [type, setType] = useState(null);

  // adding score here
  const [score, setScore] = useState(0);

  const handleStartQuiz = (
    selectedCategory,
    selectedDifficulty,
    selectedType
  ) => {
    setCategory(selectedCategory);
    setDifficulty(selectedDifficulty);
    setType(selectedType);
  };

  return (
    
    <div className="hostLobby">
    <Header />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/welcome" />
            ) : (
              <Auth setUserProf={setUserProf} />
            )
          }
        />
        <Route
          path="/welcome"
          element={user && <Welcome userProf={userProf} />}
        />
        <Route
          path="/"
          element={
            user ? (
              <SignOut
                setUserProf={setUserProf}
                setCategory={setCategory}
                setDifficulty={setDifficulty}
                setType={setType}
              />
            ) : null
          }
        />
        <Route
          path="/hostgamelobby"
          element={user && <HostGameLobby handleStartQuiz={handleStartQuiz} />}
        />
        <Route
          path="/gameroom/:gameId"
          element={
            user && (
              <GameRoom
                category={category}
                difficulty={difficulty}
                type={type}
                score={score}
                setScore={setScore}
              />
            )
          }
        />
        <Route
          path="/gameroom/:gameId/result"
          element={<Result score={score} />}
        />
      </Routes>
    </div>
  );
};

export default App;

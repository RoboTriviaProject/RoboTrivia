import './App.css';
import Auth from './Components/auth/Auth';
import Welcome from './Components/Welcome';
import SignOut from './Components/auth/SignOut';
import HostGameLobby from './Pages/HostGameLobby';
import GameRoom from './Pages/GameRoom';
import Header from './Components/Header';
import Result from './Pages/Result';
import SignUp from './Components/auth/SignUp';
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const [user] = useAuthState(auth);
  const [userProf, setUserProf] = useState(null);
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [type, setType] = useState(null);
  const [error, sendError] = useState(false);

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
          element={
            user && (
              <Welcome
                userProf={userProf}
                error={error}
                sendError={sendError}
              />
            )
          }
        />
        <Route
          path="/signout"
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
                setUserProf={setUserProf}
                setCategory={setCategory}
                setDifficulty={setDifficulty}
                setType={setType}
                sendError={sendError}
              />
            )
          }
        />
        <Route
          path="/gameroom/:gameId/result"
          element={<Result score={score} />}
        />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;

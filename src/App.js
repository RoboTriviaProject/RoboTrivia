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
import logo from './assets/images/robotLogo-min.png';
import helpIcon from './assets/images/helpIcon-min.png'

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
    
    <div className="hostLobby">
    <Header />
      {/* <header>
        {/* <h1>Robo Trivia</h1> */}

        {/* <img src={logo} className="logo" title="Home" alt="a yellow robot head" />
        <h1>Robo Trivia</h1>
        <img src={helpIcon} className="helpIcon" title="How to play" alt="circular help icon " /> */}
      {/* </header> */} 

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
                setgameId={setgameId}
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
                gameId={gameId}
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
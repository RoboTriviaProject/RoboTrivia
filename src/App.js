
import './App.css';


import { useState } from 'react';
 import {Routes, Route} from 'react-router-dom';
 import HostGameLobby from './Pages/HostGameLobby';
 import GameRoom from './Pages/GameRoom';

const App = () => {
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [type, setType] = useState(null);

   const handleStartQuiz = (selectedCategory, selectedDifficulty, selectedType) => {
    setCategory(selectedCategory);
    setDifficulty(selectedDifficulty);
    setType(selectedType);
   };

  return (
     <div>
       <h1>Robo Trivia</h1>
       {category && difficulty ? (
        <GameRoom category={category} difficulty={difficulty} type={type} />
      ) : (
        <HostGameLobby handleStartQuiz={handleStartQuiz} />
       )}
       <Routes>
         <Route path="/hostgamelobby" element={<HostGameLobby />}/> 
        <Route path="/gameroom" element={<GameRoom />}/>
       </Routes>
     </div>
  );
 };

export default App;


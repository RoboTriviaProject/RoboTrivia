import './App.css';
import Auth from './Components/auth/Auth';


import Welcome from './Components/Welcome';
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
 import {Routes, Route} from 'react-router-dom';
 import HostGameLobby from './Pages/HostGameLobby';
 import GameRoom from './Pages/GameRoom';


 const App = () => {
   const [user] = useAuthState(auth);
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
       <h1>Robo Trivia App</h1>
       {!user ? <Auth /> : (
         <div>
           <Welcome />
           {category && difficulty ? (
             <GameRoom category={category} difficulty={difficulty} />
           ) : (
             <HostGameLobby handleStartQuiz={handleStartQuiz} />
           )}
           <Routes>
             <Route path="/hostgamelobby" element={<HostGameLobby />}/> 
             <Route path="/gameroom" element={<GameRoom />}/>
           </Routes>
         </div>
       )}
     </div>
   );
 }
 
 export default App;





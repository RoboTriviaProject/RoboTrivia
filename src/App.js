
import './App.css';


import { useState } from 'react';
 import {Routes, Route} from 'react-router-dom';
 import Home from './Pages/Home';
 import Quiz from './Pages/Quiz';

const App = () => {
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

   const handleStartQuiz = (selectedCategory, selectedDifficulty) => {
    setCategory(selectedCategory);
     setDifficulty(selectedDifficulty);
   };

  return (
     <div>
       <h1>Robo Trivia</h1>
       {category && difficulty ? (
        <Quiz category={category} difficulty={difficulty} />
      ) : (
        <Home handleStartQuiz={handleStartQuiz} />
       )}
       <Routes>
         <Route path="/home" element={<Home />}/> 
        <Route path="/quiz" element={<Quiz />}/>
       </Routes>
     </div>
  );
 };

export default App;



import './App.css';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
// import Home from './Pages/Home';
// import Quiz from './Pages/Quiz';
// import Result from './Pages/Result';



// import {useState, useEffect} from 'react';
// import {Routes, Route} from 'react-router-dom';

// function App() {
// //  const [questions, setQuestions] = useState();

// //  const [triviaQuestion, setTriviaQuestion] = useState([]);

//  useEffect( () => {
//   axios( {
//     url : `https://opentdb.com/api.php?amount=10`
//   } ).then( (res)=>{
//       console.log(res.data.results);
//   })
//  } , [])







// const App = () => {
//   const [category, setCategory] = useState(null);
//   const [difficulty, setDifficulty] = useState(null);

//   const handleStartQuiz = (selectedCategory, selectedDifficulty) => {
//     setCategory(selectedCategory);
//     setDifficulty(selectedDifficulty);
//   };

//   if (category && difficulty) {
//     return <Quiz category={category} difficulty={difficulty} />;
//   } else {
//     return <Home handleStartQuiz={handleStartQuiz} />;
//   }
// };

//   return (
//     <div className="App">
//       <Header />
      
//       <Routes>
//           <Route path="/" element={<Home />}/>

//           <Route path="/quiz" element={<Quiz />}/>

//           <Route path="/result" element={<Result />}/>

//       </Routes>

//       <Footer />
//     </div>
    
//   );
// }

// export default App;


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
      {/* <Route exact path="/" element={<Home />} /> */}
        <Route path="/quiz" element={<Quiz />}/>
      </Routes>
    </div>
  );
};

export default App;
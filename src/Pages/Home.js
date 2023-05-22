import '../App.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


// const Home = () => {
//     return (
//         <div className="settingsSelect">
//             <TextField className="name" label="Enter Your Name" variant="outlined" />

//             <TextField className='category' selectlabel="Select Category" variant="outlined">
//                 {
//                     Categories.map((cat) => (
//                         <MenuItem key={cat.category} value={cat.value} >
//                             {cat.category}
//                         </MenuItem>
//                     ))
//                 }
//             </TextField>
//         </div>
//     )
// }
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ handleStartQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState(9); // Default category ID for General Knowledge
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium'); // Default difficulty level

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  const handleDifficultyChange = (event) => {
    const difficulty = event.target.value;
    setSelectedDifficulty(difficulty);
  };

  const handleQuizStart = () => {
    handleStartQuiz(selectedCategory, selectedDifficulty);
  };

  return (
    <div>
      <h2>Quiz App</h2>
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value={9}>General Knowledge</option>
          <option value={10}>Books</option>
          {/* Add more options for different categories */}
        </select>
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty:</label>
        <select id="difficulty" value={selectedDifficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <Link to="/quiz">
        <button onClick={handleQuizStart}>Start Quiz</button>
      </Link>
    </div>
  );
};

export default Home;


import '../App.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ handleStartQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState(9); // Default category ID for General Knowledge
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium'); // Default difficulty level
  // console.log(selectedCategory+ "|" +selectedDifficulty);
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
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value={9}>General Knowledge</option>
          <option value={10}>Books</option>
          <option value={11}>Films</option>
          <option value={12}>Music</option>
          <option value={13}>Musicals and Theaters</option>
          <option value={14}>Television</option>
          <option value={15}>Video Games</option>
          <option value={16}>Board Games</option>
          <option value={17}>Science and Nature</option>
          <option value={18}>Computer</option>
          <option value={19}>Mathematics</option>
          <option value={20}>Mythology</option>
          <option value={21}>Sports</option>
          <option value={22}>Geography</option>
          <option value={23}>History</option>
          <option value={24}>Politics</option>
          <option value={25}>Art</option>
          <option value={26}>Celebrities</option>
          <option value={27}>Animals</option>
          <option value={28}>Vehicles</option>
          <option value={29}>Comics</option>
          <option value={30}>Gadgets</option>
          <option value={31}>Japanese Anime</option>
          <option value={32}>Cartoon and Animations</option>
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
      {/* <Link to="/quiz"> */}
        <button onClick={handleQuizStart}>Start Quiz</button>
      {/* </Link> */}
    </div>
  );
};

export default Home;


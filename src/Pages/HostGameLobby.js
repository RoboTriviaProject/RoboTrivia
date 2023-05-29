import '../App.css';
import SignOut from '../Components/auth/SignOut';
import { push, ref, set } from 'firebase/database';
import { db } from '../firebase-config';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const HostGameLobby = ({ handleStartQuiz }) => {
  const [user] = useAuthState(auth);
  // storing the user's id in uid variable
  const uid = user.uid;
  const [selectedCategory, setSelectedCategory] = useState(9);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedType, setSelectedType] = useState('multiple');
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    // This gives me the index number of the category
    const selectedIndex = event.target.options.selectedIndex;
    // I use that to access the text of the category
    const categoryText = event.target.options[selectedIndex].text;

    setSelectedCategory(category);
    // Save the category text in a state so I can display it later
    setSubject(categoryText);
  };

  const handleDifficultyChange = (event) => {
    const difficulty = event.target.value;
    setSelectedDifficulty(difficulty);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
  };

  const handleQuizStart = () => {
    console.log(selectedCategory, selectedDifficulty, selectedType);
    // temporary check . will remove later
    if (!uid) console.log('nothing here');
    // Firebase databse setup
    const gameSessionRef = ref(db, 'gameSessions');
    const newGameSessionRef = push(gameSessionRef);
    const gameSessionID = newGameSessionRef.key;
    // Database node structure setup
    const gameSessionData = {
      host: uid,
      players: {
        [uid]: {
          username: user.displayName,
          avatar: 'ROBOhere',
          score: 0,
        },
      },
      category: subject,
      level: selectedDifficulty,
      type: selectedType,
      questions: [],
    };
    // Sending all the data to the firebase
    set(newGameSessionRef, gameSessionData)
      .then(() => console.log('Game session created successfully'))
      .catch((error) => console.log('Failed to create game session: ', error));

    handleStartQuiz(selectedCategory, selectedDifficulty, selectedType);
    navigate(`/gameroom/${gameSessionID}`);
  };

  return (
    <div>
      <div className="selectOptions">
        <div className="chooseCategory">
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
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

        <div className="chooseDifficulty">
          <label htmlFor="difficulty">Difficulty: </label>
          <select
            id="difficulty"
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="chooseType">
          <label htmlFor="type">Type: </label>
          <select id="type" value={selectedType} onChange={handleTypeChange}>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </div>
        {/* <Link to="/quiz"> */}
        <button onClick={handleQuizStart} className="startQuizButton">
          Start Quiz
        </button>
        {/* </Link> */}
      </div>
      <SignOut />
    </div>
  );
};

export default HostGameLobby;

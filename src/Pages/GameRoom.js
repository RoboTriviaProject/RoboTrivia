import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ref, set, get } from 'firebase/database';
import { db } from '../firebase-config';
import CountdownTimer from '../Components/CountdownTimer';
import { PacmanLoader } from 'react-spinners';
import '../App.css';

const GameRoom = ({
  category,
  difficulty,
  type,
  score,
  setScore,
  setUserProf,
  setCategory,
  setDifficulty,
  setType,
  sendError,
}) => {
  // Array to hold quiz questions
  const [questions, setQuestions] = useState([]);
  // Index for the current question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Error message
  const [error, setError] = useState('');
  // Status of the quiz
  const [quizCompleted, setQuizCompleted] = useState(false);
  // Grabs the game id from the URL
  const { gameId } = useParams();
  const navigate = useNavigate();
  // Effect hook to fetch data on initial render and on changes to category, difficulty, type
  // State for highlighting correct answer
  const [highlightAnswer, setHighlightAnswer] = useState(false);
  // State to control timer pause
  const [paused, setPaused] = useState(false);

  // function to shuffle the answer using Fisher-Yates Algo to increase player's suffering
  function shuffle(array) {
    // variable that holds the length of the array
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // loop continues until we have processed (almost) all elements in the array
    while (0 !== currentIndex) {
      // generate a random index in the range of unprocessed elements (from 0 to currentIndex - 1)
      randomIndex = Math.floor(Math.random() * currentIndex);
      //Decrease the range of unprocessed elements by
      currentIndex -= 1;

      // swapping the element at currentIndex with the element at randomIndex

      // save the element at currentIndex in temporaryValue
      temporaryValue = array[currentIndex];
      // replace the element at currentIndex with the element at randomIndex
      array[currentIndex] = array[randomIndex];
      // replace the element at randomIndex with the value saved in temporaryValue
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // Function to fetch data for the game
  const fetchData = useCallback(
    (category, difficulty, type) => {
      const gameSessionRef = ref(db, `gameSessions/${gameId}/questions`);
      get(gameSessionRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setQuestions(data);
            setLoading(false);
          } else {
            axios
              .get(
                `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`
              )
              .then((response) => {
                const questionsWithUniqueIds = response.data.results.map(
                  (question) => ({
                    ...question,
                    id: uuidv4(),
                    options: shuffle([
                      ...question.incorrect_answers,
                      question.correct_answer,
                    ]),
                  })
                );
                set(gameSessionRef, questionsWithUniqueIds)
                  .then(() => {
                    setQuestions(questionsWithUniqueIds);
                    setLoading(false);
                  })
                  .catch((error) => {
                    setError(
                      'Failed to save questions to Firebase. Please try again later.'
                    );
                    setLoading(false);
                  });
              })
              .catch((error) => {
                setError('Failed to fetch questions. Please try again later.');
                setLoading(false);
              });
          }
        })
        .catch((error) => {
          setError(
            'Failed to fetch data from Firebase. Please try again later.'
          );
          setLoading(false);
        });
    },
    [gameId]
  );
  // Effect hook to fetch data on initial render and on changes to category, difficulty, type
  useEffect(() => {
    fetchData(category, difficulty, type);
  }, [category, difficulty, type, fetchData]);

  // function to handle moving to the next question when the countdown timer expires
  const handleExpire = useCallback(() => {
    // Highlight the correct answer and pause the timer
    setHighlightAnswer(true);
    setPaused(true);

    // After 3 seconds, stop highlighting the answer, resume the timer, and move to the next question
    setTimeout(() => {
      setHighlightAnswer(false);
      setPaused(false);

      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setQuizCompleted(true);
        navigate(`/gameroom/${gameId}/result`);
      }
    }, 3000);
  }, [currentQuestion, questions.length, navigate, gameId]);

  // Handler for when an answer is selected
  const handleAnswer = (answer) => {
    if (quizCompleted) {
      navigate(`/gameroom/${gameId}/result`);
      // Don't update the score if the quiz is completed or the highlighted answer is shown
    }
    if (highlightAnswer) {
      // Don't update the score if the quiz is completed or the highlighted answer is shown
      return;
    }

    const currentQuestionObj = questions[currentQuestion];

    if (answer === currentQuestionObj.correct_answer) {
      setScore(score + 1);
    }

    setHighlightAnswer(true);
    setPaused(true);
    setTimeout(() => {
      setHighlightAnswer(false);
      setPaused(false);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setQuizCompleted(true);
        navigate(`/gameroom/${gameId}/result`);
      }
    }, 3000);
  };

  // Rendering based on different states
  if (loading) {
    return (
      <div className="spinnerContainer">
        <PacmanLoader color="#fff" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>
          <div className="spinnerContainer">
            <PacmanLoader color="#fff" size={50} />
          </div>
          <p>{error}</p>
          <button onClick={() => fetchData(category, difficulty, type)}>
            Please try again
          </button>
        </div>
      </div>
    );
  }

  // Rendering based on different states
  if (questions.length === 0) {
    setTimeout(() => {
      // Error message for the gamelooby
      sendError(true);
      navigate('/');
    }, 5000);

    return (
      <div className="spinnerContainer">
        <PacmanLoader color="#fff" size={50} />
      </div>
    );
  }

  const currentQuestionObj = questions[currentQuestion];
  const options = currentQuestionObj.options;

  const quitGame = () => {
    // Clear the user's profile and game-related states
    setUserProf(null);
    setCategory(null);
    setDifficulty(null);
    setType(null);
    setScore(0);

    // Navigate to the home page
    navigate('/');
  };

  return (
    <div>
      <div className="quizInfo">
        <p>Score: {score}/10</p>
        <h3>{questions[currentQuestion].category}</h3>
        <CountdownTimer
          key={currentQuestion}
          initialCount={15}
          onExpire={handleExpire}
          paused={paused}
        />
      </div>
      <div className="questionFromAPI">
        <h3>Question {currentQuestion + 1}</h3>
        <p dangerouslySetInnerHTML={{ __html: currentQuestionObj.question }} />
        <ul>
          {options.map((option) => {
            const optionId = uuidv4();
            const isCorrectAnswer =
              highlightAnswer && option === currentQuestionObj.correct_answer;
            return (
              <li
                key={optionId}
                onClick={() => handleAnswer(option)}
                className={
                  isCorrectAnswer ? 'correct-answer' : 'answer-options'
                }
              >
                {option}
              </li>
            );
          })}
        </ul>
      </div>

      <button onClick={quitGame}>Quit Game</button>
    </div>
  );
};

export default GameRoom;

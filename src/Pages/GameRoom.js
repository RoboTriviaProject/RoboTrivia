
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const GameRoom = ({ category, difficulty, type }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData(category, difficulty, type);
  }, [category, difficulty, type]);

  const fetchData = (category, difficulty, type) => {
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`)
      .then(response => {
        const questionsWithUniqueIds = response.data.results.map(question => ({
          ...question,
          id: uuidv4(),
        }));
        setQuestions(questionsWithUniqueIds);
        setLoading(false);
        console.log(questionsWithUniqueIds);
      })
      .catch(error => {
        setError('Failed to fetch questions. Please try again later.');
        setLoading(false);
        console.log(error);
      });
  };

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Quiz completed
    }
  };

  if (loading) {
    return (
      <div>
        {/* Loading... icon (react spinners package)*/}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {error}
        <button onClick={ () => fetchData(category, difficulty, type)}>Retry</button>
      </div>
    );
  }

  const currentQuestionObj = questions[currentQuestion];
  const options = [...currentQuestionObj.incorrect_answers, currentQuestionObj.correct_answer];
  //Its going to shuffle options.We can call the sort() method, which accepts a function that returns a value between -0.5 and 0.5:
  options.sort(() => Math.random() - 0.5);
  

  return (
    <div>
      <h2>Quiz App</h2>
      <h3>Question {currentQuestion + 1}</h3>
      <p dangerouslySetInnerHTML={{ __html: currentQuestionObj.question }} />
      <ul>
        {options.map((option, index) => (
          <li key={uuidv4} onClick={() => handleAnswer(option)}>
            {option}
          </li>
        ))}
      </ul>
      <p>Score: {score}</p>
      {currentQuestion === questions.length - 1 ? (
        // <Link to="/">
        //   <button>Finish Quiz</button>
        // </Link>
        <Link to="/">Go to Home</Link> 
      ) : null}
    </div>
  );
};

export default GameRoom;

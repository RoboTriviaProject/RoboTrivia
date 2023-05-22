import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Quiz = ({ category, difficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);


  useEffect(() => {
    fetchData(category, difficulty);
  }, [category, difficulty]);

  const fetchData = (category, difficulty) => {
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`)
      .then(response => {
        setQuestions(response.data.results);
      })
      .catch(error => {
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
      // You can show the final score or redirect to a different page
      // Navigate back to the home page
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestionObj = questions[currentQuestion];
  const options = [...currentQuestionObj.incorrect_answers, currentQuestionObj.correct_answer];
  options.sort(() => Math.random() - 0.5);

  return (
    <div>
      <h2>Quiz App</h2>
      <h3>Question {currentQuestion + 1}</h3>
      <p dangerouslySetInnerHTML={{ __html: currentQuestionObj.question }} />
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleAnswer(option)}>
            {option}
          </li>
        ))}
      </ul>
      <p>Score: {score}</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Quiz;


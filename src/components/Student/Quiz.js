import React, { useState, useEffect } from 'react';
import quizService from '../../services/quizService';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [purchasedQuizzes, setPurchasedQuizzes] = useState([]);
  const studentId = JSON.parse(sessionStorage.getItem('user')).id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizzesResponse = await quizService.getAllQuizzes();
        setQuizzes(quizzesResponse.data);

        const purchasedResponse = await quizService.getPurchasedQuizzes(studentId);
        setPurchasedQuizzes(purchasedResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [studentId]);

  const handleBuyQuiz = async (quizId) => {
    try {
      await quizService.buyQuiz(studentId, quizId);
      setPurchasedQuizzes([...purchasedQuizzes, quizId]);
    } catch (error) {
      console.error('Error buying quiz:', error);
    }
  };

  const handleAttemptQuiz = async (quizId) => {
    try {
      const response = await quizService.getQuizQuestions(quizId);
      const questions = response.data;
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };

  return (
    <div>
      <h2>Available Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <h3>{quiz.title}</h3>
            <p>Price: ${quiz.price}</p>
            {purchasedQuizzes.includes(quiz.id) ? (
              <button onClick={() => handleAttemptQuiz(quiz.id)}>Attempt Quiz</button>
            ) : (
              <button onClick={() => handleBuyQuiz(quiz.id)}>Buy Quiz</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;

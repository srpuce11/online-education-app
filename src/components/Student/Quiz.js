import React, { useState, useEffect } from 'react';
import quizService from '../../services/quizService';
import walletService from '../../services/walletService';
import { ToastContainer, toast } from 'react-toastify';
import QuizAttempt from '../Quiz/QuizAttempt';
const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [purchasedQuizzes, setPurchasedQuizzes] = useState([]);
  const studentId = JSON.parse(sessionStorage.getItem('user')).id;
  const [attemptingQuizId, setAttemptingQuizId] = useState(null); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizzesResponse = await quizService.getAllQuizzes();
        setQuizzes(quizzesResponse.data);

        const purchasedResponse = await quizService.getPurchasedQuizzes(studentId);
        setPurchasedQuizzes(purchasedResponse.data.map(quiz => quiz.quizId));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [studentId]);

  const handleBuyQuiz = async (quiz) => {
    try {
      await walletService.purchaseItem(studentId, quiz.id, 'quiz', quiz.price);

      await quizService.buyQuiz(studentId, quiz.id);
      setPurchasedQuizzes([...purchasedQuizzes, quiz.id]);
      toast.success('Quiz purchased successfully!');
    } catch (error) {
      console.error('Error buying quiz:', error);
      toast.error('Failed to purchase quiz');
    }
  
  };

  // const handleAttemptQuiz = async (quizId) => {
  //   try {
  //     const response = await quizService.getQuizQuestions(quizId);
  //     const questions = response.data;
  //   } catch (error) {
  //     console.error('Error fetching quiz questions:', error);
  //   }
  // };

  const handleAttemptQuiz = (quizId) => {
    setAttemptingQuizId(quizId); 
  };

  const handleBack = () => {
    setAttemptingQuizId(null); 
  };


  return (
    <div>
      {attemptingQuizId ? (
        <QuizAttempt quizId={attemptingQuizId} onBack={handleBack} /> // Render QuizAttempt if a quiz is being attempted
      ) : (
        <>
          <h2>Learn Quizzes</h2>
          <div>
            <h3>Purchased Quizzes</h3>
            {purchasedQuizzes.length > 0 ? (
              purchasedQuizzes.map((quizId) => (
                <p key={quizId}>Purchased Quiz ID: {quizId}</p>
              ))
            ) : (
              <p>No quizzes purchased yet.</p>
            )}
          </div>
          <div>
            <h3>Available Quizzes</h3>
            {quizzes.map((quiz) => (
              <div key={quiz.id}>
                <h4>{quiz.title}</h4>
                <p>{quiz.description}</p>
                <p>{quiz.price}</p>
                {purchasedQuizzes.includes(quiz.id) ? (
                  <button onClick={() => handleAttemptQuiz(quiz.id)}>Attempt Quiz</button>
                ) : (
                  <button onClick={() => handleBuyQuiz(quiz)}>Buy Quiz</button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Quiz;
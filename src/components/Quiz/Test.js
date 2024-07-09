import React, { useState, useEffect } from 'react';
import quizService from '../../services/quizService';

const QuizAttempt = ({ quizId, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const studentId = JSON.parse(sessionStorage.getItem('user')).id;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await quizService.getQuizQuestions(quizId);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const handleSubmit = async () => {
    try {
      await quizService.submitQuiz(studentId, quizId, answers);
      alert('Quiz submitted successfully!');
      onBack();
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz');
    }
  };

  return (
    <div>
      <h2>Attempt Quiz</h2>
      {questions?.map((question) => (
        <div key={question?.id}>
          <p>{question?.questionText}</p>
          {question?.options?.map((option) => (
            <label key={option?.id}>
              <input
                type="radio"
                name={`question-${question?.id}`}
                value={option?.id}
                checked={answers[question?.id] === option?.id}
                onChange={() => handleAnswerChange(question?.id, option?.id)}
              />
              {option?.text}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default QuizAttempt;

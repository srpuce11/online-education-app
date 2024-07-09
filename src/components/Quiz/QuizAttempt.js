import React, { useState, useEffect } from 'react';
import quizService from '../../services/quizService';

import { toast, ToastContainer } from 'react-toastify';

const QuizAttempt = ({ quizId, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const studentId = JSON.parse(sessionStorage.getItem('user')).id;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await quizService.getQuestionsByQuizId(quizId);
        const optionsPromises = fetchedQuestions.map(question =>
          quizService.getOptionsByQuestionId(quizId, question.id)
        );
        const fetchedOptions = await Promise.all(optionsPromises);
        
        const questionsWithOptions = fetchedQuestions.map((question, index) => ({
          ...question,
          options: fetchedOptions[index]
        }));
        setQuestions(questionsWithOptions);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    };
    if (score != null) { toast.success('Quiz submitted successfully! Your Total Score is '+ score); }
    
    fetchQuestions();
  }, [quizId, score]);

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const handleSubmit2 = async () => {
    try {
      await quizService.submitQuiz(studentId, quizId, answers);
      alert('Quiz submitted successfully!');
      onBack();
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz');
    }
  };
  const handleSubmit = async () => {
    try {

      //questions[question.id].option.correct

      // const correctOptionsResponse = await quizService.getCorrectOptions(quizId);
      // const correctOptions = correctOptionsResponse.data;
      let correctCount = 0;
        
      questions.forEach((question) => {
        question?.options.forEach((option) => {
          console.log(answers[question.id])
          console.log(option.question.id)
          console.log(option.correct)
           if (answers[question.id] === option.id && option.correct === true) {
           correctCount++;
         }
        });
       
      });
      console.log("score is ", score);
      setScore(correctCount);


    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz');
    }
  };




  return (
    <div> {!score ? (
      <li>Your Score is {score}</li>
    ) : ""}
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
              {option?.optionText}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
      <button onClick={onBack}>Back</button>
      <ToastContainer />
    </div>
  );
};

export default QuizAttempt;

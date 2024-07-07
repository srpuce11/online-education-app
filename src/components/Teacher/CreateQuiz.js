import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import quizService from '../../services/quizService';
import QuestionManagement from '../Quiz/QuestionManagement'; // Import your new component

function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizPrice, setQuizPrice] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const teacherId = JSON.parse(sessionStorage.getItem('user')).id;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const fetchedQuizzes = await quizService.getQuizzesByTeacherId(teacherId);
        setQuizzes(fetchedQuizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [teacherId]);

  const handleCreateQuiz = async () => {
    try {
      const quizData = {
        title: quizTitle,
        price: quizPrice,
        teacherId: teacherId
      };

      const createdQuiz = await quizService.createQuiz(quizData);
      setQuizzes([...quizzes, createdQuiz]);

      setQuizTitle('');
      setQuizPrice(0);
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await quizService.deleteQuiz(quizId);
        setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
      } catch (error) {
        console.error('Error deleting quiz:', error);
      }
    }
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <div>
        <label>Quiz Title:</label>
        <input type="text" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />
      </div>
      <div>
        <label>Quiz Price:</label>
        <input type="number" value={quizPrice} onChange={(e) => setQuizPrice(Number(e.target.value))} />
      </div>
      <button onClick={handleCreateQuiz}>Create Quiz</button>

      <h3>Quizzes Created by You</h3>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id}>
            <p>Title: {quiz.title}</p>
            <p>Price: {quiz.price}</p>
            <button onClick={() => handleDeleteQuiz(quiz.id)}>Delete Quiz</button>
            <Link to={`/manage-quiz/${quiz.id}`}>Manage Questions</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateQuiz;

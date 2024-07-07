import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import quizService from '../../services/quizService';

function QuestionManagement() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptionText, setNewOptionText] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [questionOptions, setQuestionOptions] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await quizService.getQuestionsByQuizId(quizId);
        setQuestions(fetchedQuestions);
        const optionsPromises = fetchedQuestions.map(question =>
          quizService.getOptionsByQuestionId(quizId, question.id)
        );
        const fetchedOptions = await Promise.all(optionsPromises);
        
        const optionsMap = fetchedOptions.reduce((acc, options, index) => {
          const questionId = fetchedQuestions[index].id;
          acc[questionId] = options;
          return acc;
        }, {});

        setQuestionOptions(optionsMap);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
};

    fetchQuestions();
  }, [quizId,newOptionText
  ]);

  const handleAddQuestion = async () => {
    try {
      const questionData = { questionText: newQuestionText };
      console.log(quizId, questionData);
      const createdQuestion = await quizService.addQuestion(quizId, questionData);
      setQuestions([...questions, createdQuestion]);
      setNewQuestionText('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await quizService.deleteQuestion(quizId, questionId);
      setQuestions(questions.filter(question => question.id !== questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleAddOption = async (questionId) => {
    try {
      const optionData = { optionText: newOptionText };
      await quizService.addOption(quizId, questionId, optionData);
      setNewOptionText('');
      setSelectedQuestionId(null);
      // Fetch updated questions
      const updatedQuestions = await quizService.getQuestionsByQuizId(quizId);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error adding option:', error);
    }
  };  

  return (
    <div>
      <h2>Manage Questions for Quiz</h2>
      <div>
        <input 
          type="text" 
          value={newQuestionText} 
          onChange={(e) => setNewQuestionText(e.target.value)} 
          placeholder="New Question" 
        />
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
      <ul>
      {questions.map(question => (
        <li key={question.id}>
          <p>{question.questionText}</p>
          <button onClick={() => handleDeleteQuestion(question.id)}>Delete Question</button>
          {selectedQuestionId === question.id ? (
            <div>
              <input 
                type="text" 
                value={newOptionText} 
                onChange={(e) => setNewOptionText(e.target.value)} 
                placeholder="New Option" 
              />
              <button onClick={() => handleAddOption(question.id)}>Add Option</button>
            </div>
          ) : (
            <button onClick={() => setSelectedQuestionId(question.id)}>Add Option</button>
          )}
          {questionOptions[question.id] && (
            <ul>
              {questionOptions[question.id].map(option => (
                <li key={option.id}>
                  {option.optionText}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
      
      </ul>
    </div>
  );
}

export default QuestionManagement;

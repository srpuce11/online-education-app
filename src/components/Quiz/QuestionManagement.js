import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import quizService from '../../services/quizService';
import questionService from '../../services/questionService';

function QuestionManagement() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptionText, setNewOptionText] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedCorrectOption, setSelectedCorrectOption] = useState({});

  useEffect(() => {
    const fetchQuestionsAndOptions = async () => {
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
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestionsAndOptions();
  }, [quizId]);

  const handleAddQuestion = async () => {
    try {
      const questionData = { questionText: newQuestionText };
      const createdQuestion = await quizService.addQuestion(quizId, questionData);
      setQuestions([...questions, { ...createdQuestion, options: [] }]);
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
      const createdOption = await quizService.addOption(quizId, questionId, optionData);
      setNewOptionText('');
      setSelectedQuestionId(null);

      setQuestions(prevQuestions =>
        prevQuestions.map(question =>
          question.id === questionId
            ? { ...question, options: [...question.options, createdOption] }
            : question
        )
      );
    } catch (error) {
      console.error('Error adding option:', error);
    }
  };


  const handleCorrectOptionChange = async (questionId, optionId) => {
    try {
      const updatedQuestions = questions.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            options: question.options.map(option => {
              const isCorrect = option.id === optionId;
              if (isCorrect) {
                questionService.updateOption(quizId, questionId, option.id, { ...option, correct: true });
              } else if (option.correct) {
                questionService.updateOption(quizId, questionId, option.id, { ...option, correct: false });
              }
              return { ...option, correct: isCorrect };
            })
          };
        }
        return question;
      });

      setQuestions(updatedQuestions);
      setSelectedCorrectOption(prev => ({ ...prev, [questionId]: optionId }));
    } catch (error) {
      console.error('Error updating correct option:', error);
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
      <p> Please add new options and tick on correct Answer</p>
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
          <ul>
          {question.options.map(option => (
            <li key={option.id} style={{ backgroundColor: option.correct ? 'green' : 'transparent' }}>
              {option.optionText}
              <input
                type="checkbox"
                checked={selectedCorrectOption[question.id] === option.id}
                onChange={() => handleCorrectOptionChange(question.id, option.id)}
              />
            </li>
          ))}
          </ul>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default QuestionManagement;
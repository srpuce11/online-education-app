import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL_QUIZ;

const questionService = {
  addQuestion: async (quizId, questionData) => {
    try {
      const response = await axios.post(`${API_URL}/quiz/${quizId}/question`, questionData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding question:', error);
      throw error;
    }
  },
  editQuestion: async (quizId, questionId, questionData) => {
    try {
      const response = await axios.put(`${API_URL}/quiz/${quizId}/question/${questionId}`, questionData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error editing question:', error);
      throw error;
    }
  },
  deleteQuestion: async (quizId, questionId) => {
    try {
      await axios.delete(`${API_URL}/quiz/${quizId}/question/${questionId}`);
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  },
  getQuestionsByQuizId: async (quizId) => {
    try {
      const response = await axios.get(`${API_URL}/quiz/${quizId}/question`);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  },
  addOption: async (quizId, questionId, optionData) => {
    try {
      const response = await axios.post(`${API_URL}/quiz/${quizId}/question/${questionId}/options`, optionData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding option:', error);
      throw error;
    }
  },
  addOption: async (quizId, questionId, optionData) => {
    const response = await fetch(`${API_URL}/quiz/${quizId}/question/${questionId}/options`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(optionData)
    });
    return response.json();
  },

  updateOption: async (quizId, questionId, optionId, optionData) => {
    const response = await fetch(`${API_URL}/quiz/${quizId}/question/${questionId}/options/${optionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(optionData)
    });
    return response.json();
  },
  getOptionsByQuestionId: async (quizId, questionId) => {
    try {
      const response = await axios.get(`${API_URL}/quiz/${quizId}/question/${questionId}/options`);
      return response.data;
    } catch (error) {
      console.error('Error fetching options:', error);
      throw error;
    }
  },
};


export default questionService;

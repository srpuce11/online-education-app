import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL_QUIZ;



const quizService = {
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
  }
};

export default quizService;
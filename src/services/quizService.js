import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL_QUIZ.concat('/quiz');

const quizService = {
  createQuiz: async (quizData) => {
    try {
      const response = await axios.post(`${API_URL}/quizzes`, quizData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw error;
    }
  },
  getQuizzesByTeacherId: async (teacherId) => {
    try {
      const response = await axios.get(`${API_URL}/quizzes/getQuizByTeacherId?teacherId=${teacherId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quizzes by teacher ID:', error);
      throw error;
    }
  },
  deleteQuiz: async (quizId) => {
    try {
      const response = await axios.delete(`${API_URL}/quizzes/${quizId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  },
  getQuestionsByQuizId: async (quizId) => {
    try {
      const response = await axios.get(`${API_URL}/${quizId}/question`);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions by quiz ID:', error);
      throw error;
    }
  },
  addQuestion: async (quizId, questionData) => {
    try {
      const response = await axios.post(`${API_URL}/${quizId}/question`, questionData, {
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
  deleteQuestion: async (quizId, questionId) => {
    try {
      const response = await axios.delete(`${API_URL}/${quizId}/question/${questionId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  },
  addOption: async (quizId, questionId, optionData) => {
    try {
      const response = await axios.post(`${API_URL}/${quizId}/question/${questionId}/options`, optionData, {
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
  getOptionsByQuestionId: async (quizId, questionId) => {
    try {
      const response = await axios.get(`${API_URL}/${quizId}/question/${questionId}/options`);
      return response.data;
    } catch (error) {
      console.error('Error fetching options:', error);
      throw error;
    }
  },
    getAllQuizzes: async () => {
    return axios.get(`${API_URL}/quizzes`);
  },
  
  getPurchasedQuizzes: async (studentId) => {
    return axios.get(`${API_URL}/student-quiz/${studentId}`);
  },
  
  buyQuiz: async (studentId, quizId) => {
    return axios.post(`${API_URL}/student-quiz`, { studentId, quizId });
  },

  getQuizQuestions: async (quizId) => {
    return axios.get(`${API_URL}/${quizId}/questions`);
  },
};

export default quizService;

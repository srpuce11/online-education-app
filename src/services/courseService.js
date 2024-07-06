import axios from 'axios';

const API_URL = 'http://192.168.29.245:8082/api/courses';

const courseService = {
  getCoursesByTeacher: async (teacherId) => {
    try {
      const response = await axios.get(`${API_URL}/getCourseByTeacherId?teacherId=${teacherId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },
  createCourse: async (newCourse) => {
    try {
      await axios.post(API_URL, newCourse);
      return true; 
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
},
};

export default courseService;

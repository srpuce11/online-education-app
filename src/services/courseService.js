import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL_COURSE.concat("/courses");

const courseService = {
  getCoursesByTeacher: async (teacherId) => {
    try {
      const response = await axios.get(
        `${API_URL}/getCourseByTeacherId?teacherId=${teacherId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },
  createCourse: async (newCourse) => {
    try {
      await axios.post(API_URL, newCourse);
      return true;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },
  deleteCourse: async (courseId) => {
    try {
      await axios.delete(`${API_URL}/${courseId}`);
      return true;
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  },
  updateCourse: async (courseId, updatedCourse) => {
    try {
      await axios.put(`${API_URL}/${courseId}`, updatedCourse);
      return true;
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },
  getCourseById: async (courseId) => {
    try {
      const response = await axios.get(`${API_URL}/${courseId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching course details:", error);
      throw error;
    }
  },
};

export default courseService;

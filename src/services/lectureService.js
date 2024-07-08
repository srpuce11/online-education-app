import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL_COURSE.concat("/courses");
console.log("API URSL FOR AUTH IS " ,API_URL);

const getFileNameFromUrl = (url) => {
  return url.substring(url.lastIndexOf('/') + 1);
};

const lectureService = {
  uploadLecture: async (courseId, lectureData, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('lecture', JSON.stringify(lectureData));

    try {
      const response = await axios.post(`${API_URL}/course/${courseId}/lectures`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading lecture:', error);
      throw error;
    }
  },
  deleteLecture: async (courseId, lectureId) => {
    try {
      await axios.delete(`${API_URL}/course/${courseId}/lectures/${lectureId}`);
    } catch (error) {
      console.error('Error deleting lecture:', error);
      throw error;
    }
  },
  getLecturesByCourseId: async (courseId) => {
    try {
      const response = await axios.get(`${API_URL}/course/${courseId}/lectures`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lectures:', error);
      throw error;
    }
  },

  streamLecture: async (courseId, videoUrl) => {
    const fileName = getFileNameFromUrl(videoUrl);
    const downloadUrl = `${API_URL}/course/${courseId}/lectures/download/${fileName}`;

    try {
      const response = await axios.get(downloadUrl, { responseType: 'stream' });
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error streaming lecture:', error);
      throw error;
    }
  },
};
 

export default lectureService;

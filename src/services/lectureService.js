import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL_COURSE.concat("/courses");
console.log("API URSL FOR AUTH IS " ,API_URL);

const getFileNameFromUrl = (url) => {
  return url.substring(url.lastIndexOf('/') + 1);
};

const lectureService = {

  uploadChunkLecture: async (courseId, lectureData, file) => {
    
    const CHUNK_SIZE = 1024 * 1024 *2;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('lecture', JSON.stringify(lectureData));
      formData.append('chunk', chunkIndex);
      formData.append('chunks', totalChunks);
      formData.append('fileName', "fileName123");

      try {
        await axios.post(`${API_URL}/course/${courseId}/lecturesInChunk`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } catch (error) {
        console.error('Error uploading chunk:', error);
        throw error;
      }
    }

    return { message: 'Upload complete' };
  },


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

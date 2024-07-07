import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';
import lectureService from '../../services/lectureService';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [selectedLectureUrl, setSelectedLectureUrl] = useState(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const fetchedCourse = await courseService.getCourseById(courseId);
        setCourse(fetchedCourse);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    const fetchLectures = async () => {
      try {
        const fetchedLectures = await lectureService.getLecturesByCourseId(courseId);
        setLectures(fetchedLectures);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    };

    fetchCourseDetails();
    fetchLectures();
  }, [courseId]);

  const handleDeleteCourse = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(courseId);
        alert('Course deleted successfully!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleDeleteLecture = async (lectureId) => {
    if (window.confirm('Are you sure you want to delete this lecture?')) {
      try {
        await lectureService.deleteLecture(courseId, lectureId);
        setLectures(prevLectures => prevLectures.filter(lecture => lecture.id !== lectureId));
        alert('Lecture deleted successfully!');
      } catch (error) {
        console.error('Error deleting lecture:', error);
      }
    }
  };

  const handleViewLecture = (lectureUrl) => {
    const videoFileName = getFileNameFromUrl(lectureUrl);
    const streamUrl = `${API_URL}/courses/course/${courseId}/lectures/download/${videoFileName}`;
    setSelectedLectureUrl(streamUrl);
  };

  const getFileNameFromUrl = (url) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Price: ${course.price}</p>
      <button onClick={handleDeleteCourse}>Delete Course</button>

      <h3>Lectures</h3>
      {selectedLectureUrl && (
        <div>
          <h3>Viewing Lecture</h3>
          <video width="640" height="480" controls>
            <source src={selectedLectureUrl} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <ul>
        {lectures.map((lecture) => (
          <li key={lecture.id}>
            <h4>{lecture.title}</h4>
            <button onClick={() => handleViewLecture(lecture.videoUrl)}>View Lecture</button>
            <button onClick={() => handleDeleteLecture(lecture.id)}>Delete Lecture</button>
          </li>
        ))}
      </ul>

     
    </div>
  );
};

export default CourseDetails;

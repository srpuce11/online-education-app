import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import courseService from '../../services/courseService';

const CreateCourseForm = () => {
  const { courseId } = useParams(); // If using React Router for course ID parameter
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const teacherId = JSON.parse(sessionStorage.getItem('user')).id;

  useEffect(() => {
    // Fetch course details if editing existing course
    if (courseId) {
      fetchCourseDetails(courseId);
    }
  }, [courseId]);

  const fetchCourseDetails = async (id) => {
    try {
      const course = await courseService.getCourseById(id);
      setTitle(course.title);
      setDescription(course.description);
      setPrice(course.price);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = { title, description, teacherId, price };

    try {
      if (courseId) {
        await courseService.updateCourse(courseId, courseData);
        alert('Course updated successfully!');
      } else {
        await courseService.createCourse(courseData);
        alert('Course created successfully!');
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(courseId);
        alert('Course deleted successfully!');
        // Optionally navigate to another page or update state
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <button type="submit">{courseId ? 'Update Course' : 'Create Course'}</button>
      {courseId && <button type="button" onClick={handleDelete}>Delete Course</button>}
    </form>
  );
};

export default CreateCourseForm;

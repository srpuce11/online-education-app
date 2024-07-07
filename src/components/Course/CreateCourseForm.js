import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import courseService from '../../services/courseService';

const CreateCourseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const teacherId = JSON.parse(sessionStorage.getItem('user')).id; 
  const navigate = useNavigate();
  const { courseId } = useParams(); // Get courseId from URL if present

  useEffect(() => {
    if (courseId) {
      const fetchCourseDetails = async () => {
        try {
          const course = await courseService.getCourseById(courseId);
          setTitle(course.title);
          setDescription(course.description);
          setPrice(course.price);
        } catch (error) {
          console.error('Error fetching course details:', error);
        }
      };

      fetchCourseDetails();
    }
  }, [courseId]);

  const handleCancel = () => {


    navigate(-1);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = { title, description, teacherId, price };
    try {
      if (courseId) {
        await courseService.updateCourse(courseId, courseData);
      } else {
        await courseService.createCourse(courseData);
      }
      navigate("/create-group");
    } catch (error) {
      console.error('Error saving course:', error);
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

      <button onClick={handleCancel}>Cancel</button>

    </form>
  );
};

export default CreateCourseForm;

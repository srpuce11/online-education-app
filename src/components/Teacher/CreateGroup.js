import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';

const CreateGroup = () => {
  const [courses, setCourses] = useState([]);
  const teacherId = JSON.parse(sessionStorage.getItem('user')).id; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await courseService.getCoursesByTeacher(teacherId);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [teacherId]);



  const handleCreateNewCourse = () => {
    navigate('/create-course'); // Adjust the route to your create course form component
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(courseId);
        setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));

      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/course-details/${courseId}`); // Adjust the route to your course details component
  };

  const handleEditCourse = (courseId) => {
    navigate(`/create-course/${courseId}`); // Adjust the route to your edit course form component
  };

  return (
    <div className="course-list">
      <h2>Your Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
            <button onClick={() => handleViewCourse(course.id)}>View Details</button>
            <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
            <button onClick={() => handleEditCourse(course.id)}>Edit</button>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateNewCourse}>Create New Course</button>

    </div>
  );
};

export default CreateGroup;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';

const CreateGroup = () => {
  const [courses, setCourses] = useState([]);
  const teacher_Id = JSON.parse(sessionStorage.getItem('user')).id; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await courseService.getCoursesByTeacher(teacher_Id);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [teacher_Id]);

  const handleCreateNewCourse = () => {
    navigate('/create-course'); // Adjust the route to your create course form component
  };

  return (
    <div>
      <h2>Courses Created by Teacher</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateNewCourse}>Create New Course</button>
    </div>
  );
};

export default CreateGroup;

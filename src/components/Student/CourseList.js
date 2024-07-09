import React, { useState, useEffect } from 'react';
import axios from 'axios';
import courseService from '../../services/courseService'; 
import { ToastContainer, toast } from 'react-toastify';

const CourseList = () => {
  const [groupedCourses, setGroupedCourses] = useState({});
  const studentId = JSON.parse(sessionStorage.getItem('user')).id; 
  const [anyNumber, setAnyNumber] = useState(0);
  
  useEffect(() => {
    const fetchCoursesAndTeachers = async () => {
      try {
        const allCourses = await courseService.getAllCourses();

        const studentCoursesResponse = await axios.get(`http://localhost:8082/api/courses/student-courses/${studentId}`);
        const studentCourses = studentCoursesResponse.data.map(course => course.courseId);

        const availableCourses = allCourses.filter(course => !studentCourses.includes(course.id));

        const coursesWithTeachers = await Promise.all(
          availableCourses.map(async (course) => {
            try {
              const teacherResponse = await axios.get(`http://localhost:8081/api/users/${course.teacherId}`);
              return { ...course, teacherEmail: teacherResponse.data.email };
            } catch (error) {
              console.error(`Error fetching teacher for course ${course.id}:`, error);
              return null;
            }
          })
        );

        const validCourses = coursesWithTeachers.filter(course => course !== null);

        const grouped = validCourses.reduce((acc, course) => {
          if (!acc[course.teacherEmail]) {
            acc[course.teacherEmail] = [];
          }
          acc[course.teacherEmail].push(course);
          return acc;
        }, {});
        
        setGroupedCourses(grouped);
      } catch (error) {
        console.error('Error fetching courses or teachers:', error);
      }
    };

    fetchCoursesAndTeachers();
  }, [studentId,anyNumber]);


  const handleBuyCourse = async (course) => {
    try {

      console.log(course.id, course.price)
      await axios.post('http://localhost:8084/api/wallets/purchase', {
        studentId: studentId,
        itemId: course.id,
        itemType: 'course',
        price: course.price
      }, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      });
      await axios.post('http://localhost:8082/api/courses/student-courses', {
        studentId: studentId,
        courseId: course.id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      });
      setAnyNumber(anyNumber + 1);
      toast.success('Course purchased successfully!');
    } catch (error) {
      console.error('Error purchasing course:', error);
      alert('Failed to purchase course');
    }
  };

  return (
    <div>
      {Object.keys(groupedCourses).map(teacherEmail => (
        <div key={teacherEmail}>
          <h2>Courses by {teacherEmail}</h2>
          <ul>
            {groupedCourses[teacherEmail].map(course => (
              <li key={course.id}>
                <p>Title: {course.title}</p>
                <p>Price: ${course.price}</p>
                <button onClick={() => handleBuyCourse(course)}>Buy</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default CourseList;

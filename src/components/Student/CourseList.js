import React, { useState, useEffect } from 'react';
import axios from 'axios';
import courseService from '../../services/courseService'; 

const CourseList = () => {
  const [groupedCourses, setGroupedCourses] = useState({});
  const studentId = JSON.parse(sessionStorage.getItem('user')).id; 

  useEffect(() => {
    const fetchCoursesAndTeachers = async () => {
      try {
        const allCourses = await courseService.getAllCourses();

        const studentCoursesResponse = await axios.get(`http://192.168.29.245:8082/api/courses/student-courses/${studentId}`);
        const studentCourses = studentCoursesResponse.data.map(course => course.courseId);

        const availableCourses = allCourses.filter(course => !studentCourses.includes(course.id));

        const coursesWithTeachers = await Promise.all(
          availableCourses.map(async (course) => {
            try {
              const teacherResponse = await axios.get(`http://192.168.29.245:8081/api/users/${course.teacherId}`);
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
  }, [studentId]);

  const handleBuyCourse = async (courseId) => {
    try {
      await axios.post('http://192.168.29.245:8082/api/courses/student-courses', {
        studentId: studentId,
        courseId: courseId
      });
      alert('Course purchased successfully!');
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
                <button onClick={() => handleBuyCourse(course.id)}>Buy</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CourseList;

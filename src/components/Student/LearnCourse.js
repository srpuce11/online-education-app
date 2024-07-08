import React, { useState, useEffect } from "react";
import axios from "axios";

const LearnCourse = () => {
  const [courses, setCourses] = useState([]);
  const studentId = JSON.parse(sessionStorage.getItem("user")).id;
  const [videoLinks, setVideoLinks] = useState({});

  useEffect(() => {
    const fetchCoursesAndLectures = async () => {
      try {
        const studentCoursesResponse = await axios.get(
          `http://192.168.29.245:8082/api/courses/student-courses/${studentId}`
        );
        const studentCourses = studentCoursesResponse.data;

        const coursesWithDetails = await Promise.all(
          studentCourses.map(async (studentCourse) => {
            const courseDetailsResponse = await axios.get(
              `http://192.168.29.245:8082/api/courses/${studentCourse.courseId}`
            );
            const courseDetails = courseDetailsResponse.data;
            const lecturesResponse = await axios.get(
              `http://192.168.29.245:8082/api/courses/course/${studentCourse.courseId}/lectures`
            );
            const lectures = lecturesResponse.data;

            return { ...courseDetails, lectures };
          })
        );

        setCourses(coursesWithDetails);
      } catch (error) {
        console.error("Error fetching courses or lectures:", error);
      }
    };

    fetchCoursesAndLectures();
  }, [studentId]);

  const handleDownloadVideo = (lectureId,videoUrl) => {
    const videoName = videoUrl.split("/").pop();
    const videoLinkTemp = `http://192.168.29.245:8082/api/courses/course/1/lectures/download/${videoName}`;
    setVideoLinks((prevLinks) => ({ ...prevLinks, [lectureId]: videoLinkTemp }));

    window.location.href = `http://192.168.29.245:8082/api/courses/course/1/lectures/download/${videoName}`;
  };

  return (
    <div>
      <h2>Learn Courses</h2>
      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <h4>Lectures</h4>
          <ul>
            {course.lectures.map((lecture) => (
              <li key={lecture.id}>
                <p>Title: {lecture.title}</p>
                <video width="3000" height="200" controls>
                  <source src={videoLinks[lecture.id]} type="video/webm" />
                </video>
                <button onClick={() => handleDownloadVideo(lecture.id,lecture.videoUrl)}>
                  Download/Stream Video
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LearnCourse;

import React, { useState, useEffect } from "react";
import courseService from "../../services/courseService";
import lectureService from "../../services/lectureService";

const PostLecture = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const coursesData = await courseService.getCoursesByTeacher(user.id);
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse || !title || !file) {
      alert("Please fill all fields and select a file.");
      return;
    }

    const lectureData = { title };
    try {
      await lectureService.uploadLecture(selectedCourse, lectureData, file);
      setSelectedCourse('');
      setTitle('');
      setFile(null);
      // Reset file input field
      e.target.reset();
    } catch (error) {
      console.error("Error uploading lecture:", error);
    }
  };

  return (
    <div>
      <h2>Post Lecture</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Lecture Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Video:</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Upload Lecture</button>
      </form>
    </div>
  );
};

export default PostLecture;

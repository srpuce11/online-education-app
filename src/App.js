import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LeftMenu from './components/LeftMenu/LeftMenu';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TeacherDashboard from './components/Teacher/Dashboard';
import CreateGroup from './components/Teacher/CreateGroup';
import PostLecture from './components/Teacher/PostLecture';
import CreateQuiz from './components/Teacher/CreateQuiz';
import ChatGroup from './components/Teacher/ChatGroup';
import StudentDashboard from './components/Student/Dashboard';
import CreateCourseForm from './components/Course/CreateCourseForm';
import CourseList from './components/Student/CourseList';
import CourseDetails from './components/Teacher/CourseDetails';
import Quiz from './components/Student/Quiz';
import Wallet from './components/Student/Wallet';
import QuestionManagement from './components/Quiz/QuestionManagement';
import LearnCourse from './components/Student/LearnCourse';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
const App = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setRole(user.role.toLowerCase());
        } else {
            setRole(null);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        setRole(null); 
    };

    return (
        <Router>
        <ToastContainer
        position="top-right"
        autoClose={100}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
            <div className="app">
                <Header onLogout={handleLogout} />
                <div className="main-content">
                    <LeftMenu role={role} />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login setRole={setRole}/>}  />
                            <Route path="/register" element={<Register />} />
                            
                            {role === 'teacher' && (
                                <>
                                    <Route path="/dashboard" element={<TeacherDashboard />} />
                                    <Route path="/create-group" element={<CreateGroup />} />
                                    <Route path="/create-course" element={<CreateCourseForm />} />  
                                    <Route path="/course-details/:courseId" element={<CourseDetails />} />                                  <Route path="/create-course/:courseId" element={<CreateCourseForm />} />
                                    <Route path="/post-lecture" element={<PostLecture />} />
                                    <Route path="/create-quiz" element={<CreateQuiz />} />
                                    <Route path="/manage-quiz/:quizId" element={<QuestionManagement />} />

                                    <Route path="/chat-group" element={<ChatGroup />} />
                                </>
                            )}
                            {role === 'student' && (
                                <>
                                    <Route path="/dashboard" element={<StudentDashboard />} />
                                    <Route path="/course-list" element={<CourseList />} />
                                    <Route path="/course-learn" element={<LearnCourse />} />
                                    <Route path="/quiz" element={<Quiz />} />
                                    <Route path="/wallet" element={<Wallet />} />
                                </>
                            )}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;

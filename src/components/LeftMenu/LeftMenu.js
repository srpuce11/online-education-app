import React from 'react';
import { Link } from 'react-router-dom';

const LeftMenu = ({ role }) => {
    return (
        <aside>
            <nav>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    {role === 'teacher' && (
                        <>
                            <li><Link to="/create-group">Courses</Link></li>
                            <li><Link to="/post-lecture">Post Lecture</Link></li>
                            <li><Link to="/create-quiz">Create Quiz</Link></li>
                            
                        </>
                    )}
                    {role === 'student' && (
                        <>
                            <li><Link to="/course-list">Buy New Course</Link></li>
                            <li><Link to="/course-learn">Start Learning</Link></li>
                            <li><Link to="/quiz">Quiz</Link></li>
                            <li><Link to="/wallet">Wallet</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </aside>
    );
};

export default LeftMenu;

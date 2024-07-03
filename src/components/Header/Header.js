import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
    return (
        <header>
            <h1>My Application</h1>
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/logout" onClick={onLogout}>Logout</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';





const Header = ({ onLogout}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(null);


    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(user.role.toLowerCase());
        } else {
            setIsLoggedIn(null);
        }
    });
    

  return (
    <header>
      <h1>Online Education Application</h1>
      <nav>
        <ul>
          {!isLoggedIn && <li><Link to="/register">Register</Link></li>}
          {!isLoggedIn ? (
            <li><Link to="/login">Login</Link></li>
          ) : (
            <li><Link to="/logout" onClick={onLogout}>Logout</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

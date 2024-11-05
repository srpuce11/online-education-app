import React, { useState } from "react";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
const Login = ({ setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = await authService.login(email, password);
      console.log("Role value >>> ", role);
        setRole(role);
      if (role === "teacher") {
        console.log("Navigating to teacher dashboard");
        navigate("/dashboard"); 
      } else if (role === "student") {
        console.log("Navigating to student dashboard");
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

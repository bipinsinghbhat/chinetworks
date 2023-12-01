import React, { useState } from "react";
import "./Login.css"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
const [islogged,setlogged]=useState(false)

  const navigate=useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginMessage("Please fill in all fields.");
      return;
    }

 
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    
    const user = existingUsers.find((user) => user.email === email && user.password === password);

    if (user) {
      setLoginMessage("Login successful!");
      setlogged(true)
      localStorage.setItem("loggedin",islogged)
        navigate("/Movie")
    
    } else {
      setLoginMessage("Invalid email or password.");
    }

    
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        {loginMessage && <p className="login-message">{loginMessage}</p>}
      </form>
    </div>
  );
};

export default Login;

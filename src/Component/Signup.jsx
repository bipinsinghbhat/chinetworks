import React, { useState } from "react";
import "./Signup.css"; 
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const navigate=useNavigate()

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setRegistrationMessage("Please fill in all fields.");
      return;
    }

   
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

   
    const userExists = existingUsers.some((user) => user.email === email);

    if (userExists) {
      setRegistrationMessage("User already exists. Please log in.");
    } else {
     
      const newUser = { name, email, password };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      setRegistrationMessage("User registered successfully!");
      
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login")
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Signup</button>

        {registrationMessage && <p className="registration-message">{registrationMessage}</p>}
      </form>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    message: "",
  });
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username: username,
        password: password,
      });
      if (response.status == 201) {
        console.log(response);
        navigate("/login");
      } else {
        setErrors({
          ...errors,
          message: "Could not register!",
        });
      }
    } catch (e) {
      console.log(e);
      setErrors({
        ...errors,
        message: e.message,
      });
    }
  };

  return (
    <div className="absolute w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full flex flex-col gap-2 p-10 rounded-md bg-indigo-100">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.message && <p>{errors.message}</p>}
        <button onClick={handleRegister}>Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

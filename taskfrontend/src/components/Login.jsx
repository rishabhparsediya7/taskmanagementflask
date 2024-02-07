import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    message: "",
  });
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: username,
        password: password,
      });
      if (response.status == 200) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("username", response.data.username);
        navigate("/tasks");
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

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="absolute w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full flex flex-col gap-2 p-10 rounded-md bg-indigo-100">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
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
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <Link className="underline text-indigo-500" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

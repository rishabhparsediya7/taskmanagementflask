import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="absolute top-2 right-2 flex gap-2">
      <a
        className="bg-indigo-400 text-white rounded-md p-3 uppercase tracking-wide"
        href="/tasks"
      >
        Tasks
      </a>
      <a
        className="bg-indigo-400 text-white rounded-md p-3 uppercase tracking-wide"
        href="/addtask"
      >
        Add Task
      </a>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

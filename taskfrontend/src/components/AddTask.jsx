import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";

function AddTask() {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({
    message: "",
  });
  const navigate = useNavigate();
  const handleAddTask = async () => {
    if (!content) {
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://127.0.0.1:5000/tasks",
        {
          content: content,
          user_id: localStorage.getItem("access_token"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 201) {
        console.log(response);
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

  return (
    <div>
      <Logout />
      <div className="absolute flex justify-center flex-col w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-full flex flex-col gap-2 p-10 rounded-md bg-indigo-100">
          <h1>Add Task</h1>
          <input
            type="text"
            placeholder="Task"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            disabled={!localStorage.getItem("access_token")}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;

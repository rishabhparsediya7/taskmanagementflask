import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logout from "./Logout";

function EditTask() {
  const { taskId } = useParams();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({
    message: "",
  });
  const navigate = useNavigate();
  const handleEditTask = async () => {
    if (!content) {
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(
        `http://127.0.0.1:5000/tasks/${taskId}`,
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
      if (response.status == 200) {
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
  useEffect(() => {
    if (localStorage.getItem("access_token") == null) {
    console.log('hn');
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Logout />
      <div className="absolute flex justify-center flex-col w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-full flex flex-col gap-2 p-10 rounded-md bg-indigo-100">
          <h1>Edit Task</h1>
          <input
            type="text"
            placeholder="Task"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleEditTask}
            disabled={!localStorage.getItem("access_token")}
          >
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;

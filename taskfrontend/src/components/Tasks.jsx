import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState({
    message: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const getTasks = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:5000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status == 200) {
          setTasks(response.data);
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

    if (localStorage.getItem("access_token")) {
      getTasks();
    }
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.delete(
        `http://127.0.0.1:5000/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        console.log("/tasks not called");
        window.location.reload();
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
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex flex-col">
      {tasks && (
        <TaskList
          tasks={tasks}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Tasks;

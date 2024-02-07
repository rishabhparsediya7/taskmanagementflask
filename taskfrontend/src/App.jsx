import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import EditTask from "./components/editTask";

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route exact path="/" element={<Tasks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/edittask/:taskId" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

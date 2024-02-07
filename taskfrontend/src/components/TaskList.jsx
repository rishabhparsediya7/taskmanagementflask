import React from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";

function TaskList({ tasks, handleDelete }) {
  return (
    <div>
      <Logout />
      <div className="mb-10 h-10"></div>
      <table className="table-auto w-full mt-10">
        <thead>
          <tr>
            <td className="px-4 py-2">#</td>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Content</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{task.id}</td>
              <td className="border px-4 py-2">{task.content}</td>
              <td className="border px-4 py-2">
                <Link
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
                  px-4 rounded mr-2"
                  to={`/edittask/${task.id}`}
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;

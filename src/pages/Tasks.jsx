import React from "react";
import TaskCard from "../components/tasks/TaskCard";

function Tasks({ tasks, onComplete, onDelete, onAdd }) {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800">All Tasks</h1>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 mt-16">
          No tasks yet. Create some tasks to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;

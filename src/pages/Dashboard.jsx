import React from "react";
import TaskCard from "../components/tasks/TaskCard";
import Modal from "../components/common/Modal";
import TaskForm from "../components/tasks/TaskForm";
import { useState } from "react";

function Dashboard({
  tasks,
  addTask,
  deleteTask,
  completeTask,
  isModalOpen,
  setIsModalOpen,
  setTasks,
  importTasks,
  exportTasks,
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Productivity Tracker
      </h1>
      <p className="text-gray-600 text-center mb-8">
        {tasks.length} tasks to manage
      </p>

      {/* Action Buttons */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mb-6">
        {/* Add Task Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2"
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
          Add New Task
        </button>

        {/* Export Button */}
        <button
          onClick={exportTasks}
          className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export
        </button>

        {/* Import Button */}
        <label className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer">
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Import
          <input
            type="file"
            accept=".json"
            onChange={importTasks}
            className="hidden"
          />
        </label>
      </div>

      {/* Task Grid or Empty State */}
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            No tasks yet. Create your first task to get started!
          </p>
          <p className="text-gray-400 text-sm">
            (We'll add a form to create tasks in the next step)
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tasks.map((task) => (
            // Implicit Return with Parentheses)  {tasks.map((task) => (...))}
            // Explicit Return with Curly Braces)  {tasks.map((task) => { return (...); })}
            // (task) => (...) is an arrow function - loops through each task in sampleTask array
            // (task) - Function parameter (each item from array)
            // => - Arrow function syntax (modern JavaScript)
            // (...) - What to return for each item
            <div key={task.id} className="w-full max-w-md mb-4">
              <TaskCard
                key={task.id}
                task={task}
                onComplete={completeTask}
                onDelete={deleteTask}
              />
            </div>
          ))}
        </div>
      )}

      {/* // Modal for Task Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm onSubmit={addTask} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default Dashboard;

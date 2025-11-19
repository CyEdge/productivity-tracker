// Defines your main React Component. Every React app starts from here.
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TaskForm from "./components/tasks/TaskForm";
import Modal from "./components/common/Modal";
import TaskCard from "./components/tasks/TaskCard";
function App() {
  // useLocalStorage hook to manage tasks with persistence in localStorage
  // 'tasks' is the key in localStorage, second parameter is the default value (empty array here)
  // Returns current tasks and function to update them
  // useLocalStorage works like useState but syncs with localStorage so data persists across page reloads
  const [tasks, setTasks] = useLocalStorage("tasks", [
    // useState([]) - returns an array with 2 elements: current state value (tasks) and function to update it (setTasks)
    {
      id: "1",
      title: "Complete project documentation",
      description: "Write comprehensive docs for the productivity tracker",
      priority: "High",
      status: "In Progress",
      createdAt: "2025-11-19T08:30:00",
      completedAt: null,
    },
    {
      id: "2",
      title: "Team standup meeting",
      description: "Daily sync with development team",
      priority: "Medium",
      status: "Complete",
      createdAt: "2025-11-19T09:00:00",
      completedAt: "2025-11-19T09:30:00",
    },
    {
      id: "3",
      title: "Review pull requests",
      description: "",
      priority: "High",
      status: "Incomplete",
      createdAt: "2025-11-19T10:00:00",
      completedAt: null,
    },
    {
      id: "4",
      title: "Update dependencies",
      description: "Check for outdated npm packages and update",
      priority: "Low",
      status: "Incomplete",
      createdAt: "2025-11-19T11:00:00",
      completedAt: null,
    },
    {
      id: "5",
      title: "Prepare presentation slides",
      description: "Create slides for client meeting",
      priority: "High",
      status: "In Progress",
      createdAt: "2025-11-19T14:00:00",
      completedAt: null,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to add a new task
  const addTask = (newTask) => {
    // parameter: newTask (the new task object to add)
    // ...tasks - Spread existing tasks (copy all items)
    // ,newTask - Add new task at the end
    setTasks([...tasks, newTask]);
    setIsModalOpen(false); // Close modal after adding task
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    // takes taskId (ID of task to delete)
    // .filter() creates a new array with items that pass a test
    // Test: task.id !== taskId (keep task if ID doesn't match)
    // Result: All tasks EXCEPT the one with matching ID
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to complete a task
  const completeTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "Complete",
              completedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  // Export tasks as JSON file
  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2); // Pretty-print JSON with 2-space indentation
    const dataBlob = new Blob([dataStr], { type: "application/json" }); // Create a Blob from JSON string
    const url = URL.createObjectURL(dataBlob); // Create a URL for the Blob
    const link = document.createElement("a"); // Create a temporary anchor element
    link.href = url; // Set href to Blob URL
    link.download = `tasks-backup-${
      // Filename with current date
      new Date().toISOString().split("T")[0] // Get date part only
    }.json`; // Set download attribute with filename
    link.click(); // Trigger download by simulating a click
    URL.revokeObjectURL(url); // Clean up the URL object after download
  };

  // Import tasks from JSON file
  const importTasks = (event) => {
    const file = event.target.files[0]; // Get selected file
    if (!file) return; // If no file, do nothing

    const reader = new FileReader(); // FileReader API to read file contents as text
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result); // Parse JSON content
        // Validate imported data structure (basic check)
        if (!Array.isArray(importedTasks)) {
          throw new Error("Invalid file format");
        }
        // Merge with existing tasks (avoid duplicates by ID)
        const existingIds = tasks.map((t) => t.id);
        const newTasks = importedTasks.filter(
          // Only add tasks with new IDs
          (t) => !existingIds.includes(t.id) // Filter out tasks with IDs already in existingIds
        );
        setTasks([...tasks, ...newTasks]); // Add new tasks to existing tasks
        alert(`Imported ${newTasks.length} new tasks!`); // Show success message
      } catch (error) {
        alert("Error importing tasks. Please check file format.");
        console.error("Import error:", error);
      }
    };
    reader.readAsText(file); // Read file as text to trigger onload event
  };

  return (
    // min-h-screen: Makes the background extend to full screen height.
    // bg-gray-100: Sets a soft light-gray background.
    // flex flex-col items-center justify-start: Uses Flexbox, stacks contents vertically, centers them, starts at the top.
    // p-8: Padding all around, making it look breathable.
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default App;
// So main.jsx can render it.

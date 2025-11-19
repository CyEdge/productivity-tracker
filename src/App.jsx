// Defines your main React Component. Every React app starts from here.
import { useState, useEffect } from "react";
import { notificationService } from "./services/notificationService";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useParams,
} from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./pages/Dashboard";
import TaskForm from "./components/tasks/TaskForm";
import Modal from "./components/common/Modal";
import Tasks from "./pages/Tasks";
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

  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  useEffect(() => {
    notificationService.init();
  }, []);

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

  useEffect(
    () => {
      // Effect to sync tasks to localStorage whenever tasks change
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Sync tasks to localStorage on every tasks change
    },
    [tasks] // Dependency array - runs effect whenever 'tasks' changes
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-white shadow p-4 flex justify-center gap-8 font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 border-b-4 border-blue-700"
                : "text-gray-600 hover:text-blue-700"
            }
            end
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 border-b-4 border-blue-700"
                : "text-gray-600 hover:text-blue-700"
            }
          >
            Tasks
          </NavLink>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                tasks={tasks}
                onComplete={completeTask}
                onDelete={deleteTask}
                onEdit={(task) => setEditingTask(task)} // open modal in edit mode
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <Tasks
                tasks={tasks}
                onComplete={completeTask}
                onDelete={deleteTask}
                onAdd={() => setIsModalOpen(true)}
                onEdit={(task) => setEditingTask(task)} // open modal in edit mode
              />
            }
          />
        </Routes>

        {/* Modal for adding tasks */}
        <Modal
          isOpen={isModalOpen || editingTask !== null}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          title={editingTask ? "Edit Task" : "Create New Task"}
        >
          <TaskForm
            initialData={editingTask}
            onSubmit={editingTask ? handleEditTask : addTask}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingTask(null);
            }}
          />
        </Modal>
      </div>
    </Router>
  );
}

export default App;
// So main.jsx can render it.

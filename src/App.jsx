// Defines your main React Component. Every React app starts from here.
import { useState } from "react";
import TaskCard from "./components/tasks/TaskCard";
function App() {
  // Sample tasks data - useState hook to manage tasks state
  const [tasks, setTasks] = useState([
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

  // Function to add a new task
  const addTask = (newTask) => {
    // parameter: newTask (the new task object to add)
    // ...tasks - Spread existing tasks (copy all items)
    // ,newTask - Add new task at the end
    setTasks([...tasks, newTask]);
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
    </div>
  );
}

export default App;
// So main.jsx can render it.

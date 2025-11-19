// Defines your main React Component. Every React app starts from here.
import TaskCard from "./components/tasks/TaskCard";
function App() {
  // Sample task data (hardcoded for now)
  const sampleTask = [
    {
      id: "1",
      title: "Complete project documentation",
      description:
        "Write comprehensive docs for the productivity tracker project",
      priority: "High",
      status: "In Progress",
      createdAt: "2025-11-19T08:30:00",
      completedAt: null,
    },
    {
      id: "2",
      title: "Buy groceries",
      description: "Milk, eggs, bread",
      priority: "Low", // Changed from "High" to "Low"
      status: "Incomplete",
      createdAt: "2025-11-19T08:30:00",
      completedAt: null,
    },
    {
      id: "3",
      title: "Team meeting",
      description: "", // Empty string
      priority: "Medium",
      status: "Complete",
      createdAt: "2025-11-19T08:30:00",
      completedAt: null,
    },
  ];

  return (
    // min-h-screen: Makes the background extend to full screen height.
    // bg-gray-100: Sets a soft light-gray background.
    // flex flex-col items-center justify-start: Uses Flexbox, stacks contents vertically, centers them, starts at the top.
    // p-8: Padding all around, making it look breathable.
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Productivity Tracker
      </h1>
      {sampleTask.map((task) => (
        <div key={task.id} className="w-full max-w-md mb-4">
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
}

export default App;
// So main.jsx can render it.
